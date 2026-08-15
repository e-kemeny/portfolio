import CopyEmailButton from "./CopyEmailButton";

export default function Footer() {
  const commitSha = import.meta.env.VITE_COMMIT_SHA;
  const repoOwner = import.meta.env.VITE_REPO_OWNER;
  const repoSlug = import.meta.env.VITE_REPO_SLUG;
  const isRealDeploy = commitSha && commitSha !== "local";
  const shortSha = isRealDeploy ? commitSha.slice(0, 7) : null;

  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        <p>© {new Date().getFullYear()} Ethan Kemeny</p>
        <div className="flex items-center gap-5">
          <a
            href="https://github.com/e-kemeny"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            github
          </a>
          <a
            href="https://www.linkedin.com/in/ethan-kemeny-"
            target="_blank"
            rel="noreferrer"
            className="hover:text-accent transition-colors"
          >
            linkedin
          </a>
          <CopyEmailButton email="ethan.kemeny1@gmail.com" className="hover:text-accent transition-colors">
            email
          </CopyEmailButton>
          {isRealDeploy && (
            <a
              href={`https://github.com/${repoOwner}/${repoSlug}/commit/${commitSha}`}
              target="_blank"
              rel="noreferrer"
              title="View the exact commit deployed on this page"
              className="flex items-center gap-1.5 hover:text-accent transition-colors border border-white/10 rounded px-2 py-1"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-accent" />
              {shortSha}
            </a>
          )}
        </div>
      </div>
    </footer>
  );
}
