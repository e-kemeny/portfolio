import { useEffect, useState } from "react";

const LINES = [
  { text: "$ whoami", delay: 0 },
  { text: "Ethan Kemeny", delay: 500, accent: true },
  { text: "$ cat role.txt", delay: 900 },
  { text: "AI/ML Engineer — Computer Science @ Texas Tech", delay: 1400 },
  { text: "$ cat status.txt", delay: 1900 },
  {
    text: "Break Through Tech AI Fellow @ Cornell Tech (selected from 4,300+ applicants)",
    delay: 2400,
  },
  { text: "$ ./run --mission", delay: 3100 },
  {
    text: "> Transforming possibility into meaning.",
    delay: 3600,
    accent: true,
  },
];

export default function BootTerminal() {
  const [visibleCount, setVisibleCount] = useState(0);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setVisibleCount(LINES.length);
      return;
    }
    const timers = LINES.map((line, i) =>
      setTimeout(() => setVisibleCount((c) => Math.max(c, i + 1)), line.delay)
    );
    return () => timers.forEach(clearTimeout);
  }, []);

  return (
    <div className="rounded-lg border border-white/10 bg-surface shadow-2xl shadow-black/40 overflow-hidden">
      <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-surface2">
        <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
        <span className="ml-3 font-data text-[11px] text-muted">boot.sh</span>
      </div>
      <div className="p-6 font-data text-sm leading-relaxed min-h-[220px]">
        {LINES.slice(0, visibleCount).map((line, i) => (
          <div
            key={i}
            className={reduced ? "" : "animate-fadeUp"}
            style={{
              color: line.accent ? "#39FF88" : line.text.startsWith("$") ? "#8A8F98" : "#E8E6DD",
            }}
          >
            {line.text}
          </div>
        ))}
        {visibleCount >= LINES.length && (
          <span className="inline-block w-2 h-4 bg-accent animate-blink align-middle ml-0.5" />
        )}
      </div>
    </div>
  );
}
