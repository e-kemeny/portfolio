import { Link, useLocation } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

export default function Nav() {
  const { pathname } = useLocation();
  const isLife = pathname.startsWith("/life");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-base/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-mono text-sm tracking-tight text-text">
          ethan<span className="text-accent">@</span>kemeny
          <span className="text-muted">:~$</span>
          <span className="animate-blink text-accent">_</span>
        </Link>

        <div className="flex items-center gap-3">
          <nav
            className="flex items-center rounded-full border border-white/10 bg-surface p-1 font-mono text-xs"
            aria-label="Site sections"
          >
            <Link
              to="/"
              className={`px-3 py-1.5 rounded-full transition-colors ${
                !isLife ? "bg-accent text-base font-bold" : "text-muted hover:text-text"
              }`}
            >
              ~/dev
            </Link>
            <Link
              to="/life"
              className={`px-3 py-1.5 rounded-full transition-colors ${
                isLife ? "bg-warm text-base font-bold" : "text-muted hover:text-text"
              }`}
            >
              ~/life
            </Link>
          </nav>

          {/* Resume: always points at /resume.pdf in the public folder. To
              update it, just replace public/resume.pdf with a new file of
              the exact same name and redeploy — no code changes ever needed. */}
          <a
            href="/resume.pdf"
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 rounded-full border border-white/10 bg-surface px-3 py-1.5 font-mono text-xs text-muted hover:text-accent hover:border-accent/40 transition-colors"
          >
            <FaFileAlt size={11} />
            resume
          </a>
        </div>
      </div>
    </header>
  );
}
