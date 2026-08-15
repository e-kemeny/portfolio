// Vercel Serverless Function — runs server-side, not in the visitor's browser.
//
// WHY THIS EXISTS: calling GitHub's public API directly from the browser
// means every visitor's IP address shares the same 60-requests/hour quota.
// On a shared network (dorm wifi, campus network, coffee shop), that quota
// gets exhausted fast by unrelated traffic, and the feature breaks for
// everyone on that IP until the hour resets.
//
// Moving the call here and caching the response means this function talks
// to GitHub at most once every 10 minutes, no matter how many people visit
// the site. Vercel's edge cache (via the Cache-Control header below) serves
// everyone else's requests from that single cached result.

export default async function handler(req, res) {
  const username = req.query.username || "e-kemeny";

  try {
    const ghRes = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: { "User-Agent": "ethankemeny.com" },
    });

    if (!ghRes.ok) {
      return res.status(ghRes.status).json({ error: "GitHub API error", status: ghRes.status });
    }

    const events = await ghRes.json();

    const pushEvents = events.filter((e) => e.type === "PushEvent");
    const commits = pushEvents
      .flatMap((e) =>
        e.payload.commits.map((c) => ({
          repo: e.repo.name.split("/")[1],
          repoUrl: `https://github.com/${e.repo.name}`,
          message: c.message.split("\n")[0],
          sha: c.sha.slice(0, 7),
          url: `https://github.com/${e.repo.name}/commit/${c.sha}`,
          date: e.created_at,
        }))
      )
      .slice(0, 10);

    // Cache at the edge for 10 minutes; serve stale for another 10 while
    // revalidating in the background. This is what keeps GitHub call volume
    // low regardless of visitor traffic.
    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=600");
    return res.status(200).json({ commits });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch GitHub activity" });
  }
}