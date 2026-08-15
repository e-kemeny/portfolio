// Vercel Serverless Function — runs server-side, not in the visitor's browser.
//
// WHY THIS EXISTS: calling GitHub's public API directly from the browser
// means every visitor's IP address shares the same 60-requests/hour quota.
// Routing through here + edge caching means GitHub only gets called once
// every ~10 minutes total, no matter how much site traffic there is.
//
// IMPORTANT SHAPE NOTE: GitHub's /events/public endpoint no longer includes
// a `commits` array on PushEvent payloads — only `head` and `before` SHAs.
// (Older docs/examples online still show a `commits` array; that's stale.)
// So for each push we fetch the actual commit at `head` separately to get
// its real message.

export default async function handler(req, res) {
  const username = req.query.username || "e-kemeny";
  const limit = 5;

  try {
    const ghRes = await fetch(`https://api.github.com/users/${username}/events/public`, {
      headers: { "User-Agent": "ethankemeny.com" },
    });

    if (!ghRes.ok) {
      return res.status(ghRes.status).json({ error: "GitHub API error", status: ghRes.status });
    }

    const events = await ghRes.json();
    const pushEvents = events.filter((e) => e.type === "PushEvent" && e.payload?.head).slice(0, limit);

    // Fetch the real commit message for each push's head SHA. Resilient to
    // individual failures — one bad fetch shouldn't blank out the rest.
    const results = await Promise.allSettled(
      pushEvents.map(async (e) => {
        const commitRes = await fetch(
          `https://api.github.com/repos/${e.repo.name}/commits/${e.payload.head}`,
          { headers: { "User-Agent": "ethankemeny.com" } }
        );
        if (!commitRes.ok) throw new Error(`commit fetch failed: ${commitRes.status}`);
        const commitData = await commitRes.json();

        return {
          repo: e.repo.name.split("/")[1],
          repoUrl: `https://github.com/${e.repo.name}`,
          message: commitData.commit.message.split("\n")[0],
          sha: e.payload.head.slice(0, 7),
          url: `https://github.com/${e.repo.name}/commit/${e.payload.head}`,
          date: e.created_at,
        };
      })
    );

    const commits = results.filter((r) => r.status === "fulfilled").map((r) => r.value);

    res.setHeader("Cache-Control", "s-maxage=600, stale-while-revalidate=600");
    return res.status(200).json({ commits });
  } catch (err) {
    return res.status(500).json({ error: "Failed to fetch GitHub activity" });
  }
}