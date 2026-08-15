import HobbyCard from "../components/HobbyCard";

const HOBBIES = [
  {
    tag: "sports",
    title: "Second base, top-30 nationally ranked",
    blurb:
      "Played second base for The Woodlands High School, a program ranked around the top 30 in the nation. These days it's pickup basketball whenever I can get a run in.",
    video: null, // drop a clip at /public/videos/sports.mp4 and set video="/videos/sports.mp4"
  },
  {
    tag: "music",
    title: "Producing in FL Studio",
    blurb: "On and off since 2021 — whatever's stuck in my head that week turns into a loop.",
    video: null,
  },
  {
    tag: "music",
    title: "Violin",
    blurb: "Grew up playing. Not a daily habit anymore, but the training stuck.",
    video: null,
  },
  {
    tag: "video",
    title: "YouTube",
    blurb: "A channel I've kept going for a while — see for yourself.",
    video: null,
  },
  {
    tag: "cooking",
    title: "Neapolitan pizza from scratch",
    blurb: "Chasing that blistered, leopard-spotted crust — dough, oven, and technique, dialed in over time.",
    video: null,
  },
];

export default function Life() {
  return (
    <main className="pt-32 pb-24">
      <section className="max-w-5xl mx-auto px-6">
        <p className="font-mono text-xs text-warm tracking-widest uppercase mb-4">
          // ~/life — everything beyond the keyboard
        </p>
        <h1 className="font-mono text-3xl sm:text-4xl text-text max-w-2xl leading-snug">
          Same person, different directory.
        </h1>
        <p className="text-muted mt-4 max-w-xl text-sm leading-relaxed">
          Second base, a pickup game, FL Studio at 1am, a violin that doesn't come out as often
          as it used to, and an oven that's seen more flour than it should have. This is the
          rest of it.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16 grid sm:grid-cols-2 gap-5">
        {HOBBIES.map((h) => (
          <HobbyCard key={h.title} {...h} />
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="rounded-lg border border-warm/30 bg-surface p-8 text-center">
          <h2 className="font-mono text-xl text-text mb-2">There's more than this, too.</h2>
          <p className="text-sm text-muted">
            A few other things I'm into aren't up here yet — more to come.
          </p>
        </div>
      </section>
    </main>
  );
}
