import { Link, useLocation } from "react-router-dom";
import { FaFileAlt } from "react-icons/fa";

export default function Nav() {
  const { pathname } = useLocation();
  const isLife = pathname.startsWith("/life");

  return (
    <header className="fixed top-0 left-0 right-0 z-50 border-b border-white/10 bg-base/80 backdrop-blur-md">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 py-4 flex items-center justify-between">
        <Link to="/" className="font-mono text-xs sm:text-sm tracking-tight text-text">
          ethan<span className="text-accent">@</span>kemeny
          <span className="text-muted">:~$</span>
          <span className="animate-blink text-accent">_</span>
        </Link>

        <div className="flex items-center gap-2 sm:gap-3">
          {/* Original padding-based sizing (p-1 outer, py-1.5 inner) — the
              size you liked. leading-none on both pills locks line-height to
              1 so the icon in the resume pill can't inflate its height
              relative to the plain-text dev/life pill sitting next to it. */}
          <div className="flex items-center rounded-full border border-white/10 bg-surface p-1 font-mono text-xs leading-none">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full transition-colors text-muted hover:text-accent leading-none"
            >
              <FaFileAlt size={11} className="shrink-0" />
              <span className="hidden sm:inline">resume</span>
            </a>
          </div>

          <nav
            className="flex items-center rounded-full border border-white/10 bg-surface p-1 font-mono text-xs leading-none"
            aria-label="Site sections"
          >
            <Link
              to="/"
              className={`inline-block px-3 py-1.5 rounded-full transition-colors leading-none ${
                !isLife ? "bg-accent text-base font-bold" : "text-muted hover:text-text"
              }`}
            >
              ~/dev
            </Link>
            <Link
              to="/life"
              className={`inline-block px-3 py-1.5 rounded-full transition-colors leading-none ${
                isLife ? "bg-warm text-base font-bold" : "text-muted hover:text-text"
              }`}
            >
              ~/life
            </Link>
          </nav>
        </div>
      </div>
    </header>
  );
}
