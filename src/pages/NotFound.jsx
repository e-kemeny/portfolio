import { useState } from "react";
import { useNavigate } from "react-router-dom";

const RESPONSES = {
  help: "available commands: ls, whoami, sudo, cd ~, home, exit",
  ls: "resume.pdf  regrets.txt  the-page-you-wanted.md (not found)",
  whoami: "a lost visitor. it happens to the best of us.",
  "sudo rm -rf /": "nice try. permission denied — this isn't that kind of website.",
  sudo: "permission denied. this incident will not be reported, because nothing happened.",
  exit: "you can't exit a website. but you can go home.",
};

export default function NotFound() {
  const navigate = useNavigate();
  const [history, setHistory] = useState([
    { type: "system", text: "$ cd /the-page-you-were-looking-for" },
    { type: "error", text: "bash: cd: no such file or directory" },
    { type: "system", text: "// try typing a command below, or just `cd ~` to go home" },
  ]);
  const [input, setInput] = useState("");

  const runCommand = (raw) => {
    const cmd = raw.trim().toLowerCase();
    if (!cmd) return;

    if (cmd === "cd ~" || cmd === "cd" || cmd === "home") {
      setHistory((h) => [...h, { type: "input", text: cmd }, { type: "system", text: "$ cd ~ ... redirecting home" }]);
      setTimeout(() => navigate("/"), 700);
      return;
    }

    const response = RESPONSES[cmd] || `command not found: ${cmd}. try "help"`;
    setHistory((h) => [...h, { type: "input", text: cmd }, { type: "output", text: response }]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    runCommand(input);
    setInput("");
  };

  return (
    <main className="pt-32 pb-24 min-h-screen">
      <section className="max-w-2xl mx-auto px-6">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
          // 404 — not found
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl text-text mb-8">
          That directory doesn't exist.
        </h1>

        <div className="rounded-lg border border-white/10 bg-surface shadow-2xl shadow-black/40 overflow-hidden">
          <div className="flex items-center gap-1.5 px-4 py-3 border-b border-white/10 bg-surface2">
            <span className="w-2.5 h-2.5 rounded-full bg-[#FF5F56]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FFBD2E]" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#27C93F]" />
            <span className="ml-3 font-data text-[11px] text-muted">not-found.sh</span>
          </div>
          <div className="p-6 font-data text-sm leading-relaxed max-h-80 overflow-y-auto">
            {history.map((line, i) => (
              <div
                key={i}
                className={
                  line.type === "error"
                    ? "text-[#FF6B6B]"
                    : line.type === "output"
                    ? "text-text/85"
                    : line.type === "input"
                    ? "text-accent"
                    : "text-muted"
                }
              >
                {line.type === "input" ? `$ ${line.text}` : line.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSubmit} className="flex items-center border-t border-white/10 px-6 py-3">
            <span className="font-data text-sm text-accent mr-2">$</span>
            <input
              autoFocus
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="type a command..."
              className="flex-1 bg-transparent outline-none font-data text-sm text-text placeholder:text-muted"
            />
          </form>
        </div>

        <button
          onClick={() => navigate("/")}
          className="mt-6 font-mono text-xs text-muted hover:text-accent transition-colors"
        >
          or just click here to go home →
        </button>
      </section>
    </main>
  );
}
