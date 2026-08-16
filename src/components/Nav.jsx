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

        <div className="flex items-stretch gap-2 sm:gap-3">
          {/* Letting flex 'stretch' (the default cross-axis behavior) force
              this pill to exactly match the dev/life pill's height, rather
              than me calculating a pixel value by hand — guaranteed correct
              regardless of font-metric quirks, since the browser measures
              the actual sibling height itself. */}
          <div className="flex items-center rounded-full border border-white/10 bg-surface p-1 font-mono text-xs">
            <a
              href="/resume.pdf"
              target="_blank"
              rel="noreferrer"
              className="flex items-center h-full gap-1.5 px-3 rounded-full transition-colors text-muted hover:text-accent"
            >
              <FaFileAlt size={11} />
              <span className="hidden sm:inline">resume</span>
            </a>
          </div>

          {/* Original, untouched — this is exactly the size you liked. */}
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
        </div>
      </div>
    </header>
  );
}
