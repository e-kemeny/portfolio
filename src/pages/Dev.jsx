import BootTerminal from "../components/BootTerminal";
import GitHubActivity from "../components/GitHubActivity";
import Reveal from "../components/Reveal";
import EmailLink from "../components/EmailLink";

const SKILLS = {
  "Languages": ["Python", "Java", "C", "TypeScript", "MASM Assembly"],
  "AI / ML": [
    "Scikit-Learn",
    "Pandas",
    "NumPy",
    "OpenAI API",
    "Prompt Engineering",
    "Retrieval-Augmented Generation",
    "Feature Engineering",
    "Model Evaluation",
    "Hyperparameter Optimization",
  ],
  "Backend / Tools": ["PostgreSQL", "Supabase", "Deno", "Git", "GitHub"],
};

const EDUCATION = {
  school: "Texas Tech University",
  degree: "B.S. Computer Science",
  minor: "Minor in Mathematics",
  gpa: "4.0 GPA",
  honor: "President's List",
};

const EXPERIENCE = [
  {
    role: "AI/ML Engineering Intern",
    org: "Klyc",
    period: "Current",
    points: [
      "Develop production multi-agent AI workflows for marketing automation",
      "Design structured LLM pipelines and validation systems for reliable AI outputs",
      "Improve backend reliability through typed workflows and scalable infrastructure",
    ],
  },
  {
    role: "Microsoft AI/ML Project",
    org: "GitHub Repository Trust Signals · Break Through Tech × Microsoft",
    period: "Aug 2026 – Present",
    points: [
      "Collaborating on a Microsoft-sponsored AI/ML challenge to develop data-driven signals for evaluating the trust and quality of public GitHub repositories",
      "Exploring repository activity, maintenance history, contributor networks, and other GitHub data to engineer and evaluate predictive trust signals",
      "Developing an interpretable ML approach for repository-level trust scoring backed by explainable evidence",
    ],
  },
  {
    role: "AI/ML Fellow",
    org: "Break Through Tech — Cornell Tech",
    period: "12-month fellowship · selected from 4,300+ applicants",
    points: [
      "Completed 135 hours of machine learning foundations covering supervised learning, neural networks, deep learning, LLMs, RAG, and agentic workflows",
      "Advanced into the industry AI Studio to apply machine learning to a real-world Microsoft-sponsored challenge",
    ],
  },
];

const PROJECTS = [
  {
    title: "Word2Vec From Scratch",
    blurb: "Built Skip-Gram with Negative Sampling from scratch in PyTorch, then added L1-regularized sparse embeddings to test the sparsity-vs-quality tradeoff. Pushing 57% of parameters to zero cut prediction loss 35% — but collapsed WordSim-353 correlation to near zero, a clean case of an optimization metric improving while representation quality didn't.",
    tag: "COMPLETE",
    link: "https://github.com/e-kemeny/personal-ai-engineering",
  },
  { title: "TODO: Project two", blurb: "A tool, agent, or pipeline you built outside of proprietary work.", tag: "TODO" },
  { title: "TODO: Project three", blurb: "Even a small Kaggle write-up counts — proof beats polish.", tag: "TODO" },
];

export default function Dev() {
  return (
    <main className="pt-32">
      {/* Hero */}
      <section className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-accent tracking-widest uppercase mb-4">
          // ~/dev — booting profile
        </p>
        <BootTerminal />
      </section>

      {/* Experience */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
          01 — Experience
        </h2>
        <div className="space-y-10">
          {EXPERIENCE.map((job) => (
            <div key={job.role} className="grid sm:grid-cols-[1fr_2fr] gap-4 sm:gap-8 pt-6">
              <div>
                <h3 className="font-mono text-lg text-text">{job.role}</h3>
                <p className="text-accent text-sm">{job.org}</p>
                <p className="font-data text-xs text-muted mt-1">{job.period}</p>
              </div>
              <ul className="space-y-2 text-sm text-text/80 leading-relaxed">
                {job.points.map((p) => (
                  <li key={p} className="flex gap-2">
                    <span className="text-accent">›</span>
                    <span>{p}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* Education */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
          02 — Education
        </h2>
        <div className="grid sm:grid-cols-[1fr_2fr] gap-4 sm:gap-8 pt-6">
          <div>
            <h3 className="font-mono text-lg text-text">{EDUCATION.degree}</h3>
            <p className="text-accent text-sm">{EDUCATION.school}</p>
            <p className="font-data text-xs text-muted mt-1">{EDUCATION.minor}</p>
          </div>
          <div className="flex flex-wrap items-center gap-3">
            <span className="inline-flex items-center font-data text-xs leading-none text-base bg-accent rounded px-3 py-1 font-bold">
              {EDUCATION.gpa}
            </span>
            <span className="inline-flex items-center font-data text-xs leading-none text-warm border border-warm/40 rounded px-3 py-1">
              {EDUCATION.honor}
            </span>
          </div>
        </div>
      </section>
      </Reveal>

      {/* Projects */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
          03 — Projects
        </h2>
        <div className="grid sm:grid-cols-3 gap-5">
          {PROJECTS.map((proj) => {
            const isTodo = proj.tag === "TODO";
            const CardTag = proj.link ? "a" : "div";
            return (
              <CardTag
                key={proj.title}
                {...(proj.link ? { href: proj.link, target: "_blank", rel: "noreferrer" } : {})}
                className={`rounded-lg border p-5 transition-colors block ${
                  isTodo
                    ? "border-dashed border-white/15 bg-surface hover:border-accent/40"
                    : "border-solid border-accent/30 bg-surface hover:border-accent"
                }`}
              >
                <span
                  className={`inline-block font-data text-[10px] tracking-widest uppercase rounded px-2 py-0.5 mb-3 ${
                    isTodo ? "text-warm border border-warm/30" : "text-accent border border-accent/40"
                  }`}
                >
                  {proj.tag}
                </span>
                <h3 className="font-mono text-sm text-text mb-2">{proj.title}</h3>
                <p className="text-xs text-muted leading-relaxed">{proj.blurb}</p>
              </CardTag>
            );
          })}
        </div>
        <p className="font-data text-xs text-muted mt-4">
          Private work note: much of my recent experience involves production and industry-sponsored
          systems that can't be shared publicly — the projects above will demonstrate the same
          engineering principles in the open.
        </p>
      </section>
      </Reveal>

      {/* Live activity */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
          04 — Recent Activity <span className="text-accent normal-case tracking-normal">(live from GitHub)</span>
        </h2>
        <div className="rounded-lg border border-white/10 bg-surface p-6">
          <GitHubActivity username="e-kemeny" limit={5} />
        </div>
      </section>
      </Reveal>

      {/* Skills */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
          05 — Stack
        </h2>
        <div className="grid sm:grid-cols-3 gap-8">
          {Object.entries(SKILLS).map(([cat, items]) => (
            <div key={cat}>
              <h3 className="font-mono text-sm text-accent mb-3">{cat}</h3>
              <div className="flex flex-wrap gap-2">
                {items.map((s) => (
                  <span
                    key={s}
                    className="font-data text-[11px] text-text/80 bg-surface border border-white/10 rounded px-2 py-1"
                  >
                    {s}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>
      </Reveal>

      {/* Achievements */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <h2 className="font-mono text-xs text-muted tracking-widest uppercase mb-8">
          06 — Recognition
        </h2>
        <ul className="grid sm:grid-cols-3 gap-5">
          {[
            "Break Through Tech AI Fellow — Cornell Tech",
            "Cornell Machine Learning Foundations Certificate",
            "President's List — Texas Tech University",
          ].map((item) => (
            <li key={item} className="rounded-lg border border-white/10 bg-surface p-4 text-sm leading-snug text-text/85">
              {item}
            </li>
          ))}
        </ul>
      </section>
      </Reveal>

      {/* Contact */}
      <Reveal>
      <section className="max-w-5xl mx-auto px-6 mt-28">
        <div className="rounded-lg border border-accent/30 bg-surface p-8 text-center">
          <h2 className="font-mono text-xl text-text mb-2">Let's build something.</h2>
          <p className="text-sm text-muted mb-6">
            Open to AI/ML engineering opportunities and collaborations.
          </p>
          <div className="flex justify-center gap-4 font-mono text-sm">
            <EmailLink
              email="ethan.kemeny1@gmail.com"
              className="rounded-full bg-accent text-base font-bold px-5 py-2 hover:brightness-110 transition"
            >
              Email me
            </EmailLink>
            <a
              href="https://www.linkedin.com/in/ethan-kemeny-"
              target="_blank"
              rel="noreferrer"
              className="rounded-full border border-white/20 px-5 py-2 hover:border-accent hover:text-accent transition"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </section>
      </Reveal>
    </main>
  );
}
