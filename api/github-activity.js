// Vercel Serverless Function — runs server-side, not in the visitor's browser.
//
// WHY THIS EXISTS: calling GitHub's public API directly from the browser
// means every visitor's IP address shares the same 60-requests/hour quota.
// Routing through here + edge caching keeps GitHub API traffic low.
//
// This version fetches recently pushed public repos, then reads their actual
// commit history directly instead of relying on GitHub's delayed events feed.

export default async function handler(req, res) {
  const username = req.query.username || "e-kemeny";
  const limit = 5;

  try {
    const headers = {
      "User-Agent": "ethankemeny.com",
      Accept: "application/vnd.github+json",
      Authorization: `Bearer ${process.env.GITHUB_TOKEN}`,
    };

    const reposRes = await fetch(
      `https://api.github.com/users/${username}/repos?sort=pushed&per_page=10`,
      { headers }
    );

    if (!reposRes.ok) {
      return res.status(reposRes.status).json({
        error: "GitHub API error",
        status: reposRes.status,
      });
    }

    const repos = await reposRes.json();

    const results = await Promise.allSettled(
      repos.map(async (repo) => {
        const commitsRes = await fetch(
          `https://api.github.com/repos/${repo.full_name}/commits?per_page=${limit}`,
          { headers }
        );

        if (!commitsRes.ok) {
          throw new Error(`commit fetch failed: ${commitsRes.status}`);
        }

        const commits = await commitsRes.json();

        return commits.map((commit) => ({
          repo: repo.name,
          repoUrl: repo.html_url,
          message: commit.commit.message.split("\n")[0],
          sha: commit.sha.slice(0, 7),
          url: commit.html_url,
          date:
            commit.commit.author?.date ||
            commit.commit.committer?.date,
        }));
      })
    );

    const commits = results
      .filter((r) => r.status === "fulfilled")
      .flatMap((r) => r.value)
      .filter((c) => c.date)
      .sort((a, b) => new Date(b.date) - new Date(a.date))
      .slice(0, limit);

    res.setHeader(
      "Cache-Control",
      "s-maxage=60, stale-while-revalidate=60"
    );

    return res.status(200).json({ commits });
  } catch (err) {
    return res.status(500).json({
      error: "Failed to fetch GitHub activity",
    });
  }
}