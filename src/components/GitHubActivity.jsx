import { useEffect, useState } from "react";

/**
 * Shows real, live commit activity — but fetched through our own /api/github-activity
 * serverless function instead of calling GitHub directly from the browser.
 *
 * Why: GitHub's unauthenticated API allows only 60 requests/hour PER IP ADDRESS.
 * Calling it directly from every visitor's browser means everyone sharing that
 * visitor's public IP (a whole dorm, office, or coffee shop) shares that same
 * quota — it breaks fast on any shared network. Routing through our own
 * cached serverless endpoint means GitHub only gets called once every ~10
 * minutes total, no matter how much traffic the site gets.
 */

const CACHE_KEY = "gh_activity_cache_v3";

const CACHE_TTL_MS = 5 * 60 * 1000; // client-side cache, shorter than the server cache

function timeAgo(dateStr) {
  const diffMs = Date.now() - new Date(dateStr).getTime();

  const mins = Math.floor(diffMs / 60000);

  if (mins < 60) return `${mins}m ago`;

  const hours = Math.floor(mins / 60);

  if (hours < 24) return `${hours}h ago`;

  const days = Math.floor(hours / 24);

  if (days < 30) return `${days}d ago`;

  return new Date(dateStr).toLocaleDateString();
}

export default function GitHubActivity({ username = "e-kemeny", limit = 5 }) {
  const [commits, setCommits] = useState(null);

  const [error, setError] = useState(false);

  useEffect(() => {
    let cancelled = false;

    async function load() {
      try {
        const cached = sessionStorage.getItem(CACHE_KEY);

        if (cached) {
          const { data, ts } = JSON.parse(cached);

          if (Date.now() - ts < CACHE_TTL_MS) {
            if (!cancelled) setCommits(data);

            return;
          }
        }

        const res = await fetch(
          `/api/github-activity?username=${username}`
        );

        if (!res.ok) throw new Error("API error");

        const { commits: fetched } = await res.json();

        const result = (fetched || [])
          .sort((a, b) => new Date(b.date) - new Date(a.date))
          .slice(0, limit);

        sessionStorage.setItem(
          CACHE_KEY,
          JSON.stringify({
            data: result,
            ts: Date.now(),
          })
        );

        if (!cancelled) setCommits(result);
      } catch (err) {
        if (!cancelled) setError(true);
      }
    }

    load();

    return () => {
      cancelled = true;
    };
  }, [username, limit]);

  if (error) {
    return (
      <p className="font-data text-xs text-muted">
        Couldn't load live activity right now —{" "}
        <a
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noreferrer"
          className="text-accent hover:underline"
        >
          view on GitHub
        </a>
        .
      </p>
    );
  }

  if (commits === null) {
    return (
      <p className="font-data text-xs text-muted animate-pulse">
        Fetching live commit history...
      </p>
    );
  }

  if (commits.length === 0) {
    return (
      <p className="font-data text-xs text-muted">
        No recent public activity.
      </p>
    );
  }

  return (
    <ul className="space-y-3">
      {commits.map((c) => (
        <li
          key={c.sha}
          className="flex items-start gap-3 font-data text-xs"
        >
          <span className="text-accent mt-0.5">$</span>

          <div className="min-w-0 flex-1">
            <a
              href={c.url}
              target="_blank"
              rel="noreferrer"
              className="text-text/85 hover:text-accent transition-colors break-words"
            >
              {c.message}
            </a>

            <div className="text-muted mt-0.5">
              <a
                href={c.repoUrl}
                target="_blank"
                rel="noreferrer"
                className="hover:text-warm"
              >
                {c.repo}
              </a>{" "}
              · {c.sha} · {timeAgo(c.date)}
            </div>
          </div>
        </li>
      ))}
    </ul>
  );
}