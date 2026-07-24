export default function Footer() {
  return (
    <footer className="border-t border-white/10 mt-32">
      <div className="max-w-5xl mx-auto px-6 py-10 flex flex-col sm:flex-row items-center justify-between gap-4 font-mono text-xs text-muted">
        <p>© {new Date().getFullYear()} Ethan Kemeny</p>
        <div className="flex gap-5">
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
          <a
            href="mailto:ethan.kemeny1@gmail.com"
            className="hover:text-accent transition-colors"
          >
            email
          </a>
        </div>
      </div>
    </footer>
  );
}
