const HOBBIES = [
  {
    tag: "sports",
    title: "Basketball, baseball & soccer",
    blurb: "TODO: add a line about how you play — league, pickup games, position, whatever's true.",
  },
  {
    tag: "music",
    title: "Producing in FL Studio",
    blurb: "TODO: link a track, a SoundCloud, or describe your sound/genre.",
  },
  {
    tag: "music",
    title: "Violin",
    blurb: "TODO: performer or student? Any recordings or repertoire worth mentioning.",
  },
  {
    tag: "video",
    title: "YouTube",
    blurb: "TODO: drop your channel link and what you make content about.",
  },
  {
    tag: "cooking",
    title: "Cooking — especially chicken",
    blurb: "TODO: a favorite recipe, technique, or dish you're proud of.",
  },
  {
    tag: "cooking",
    title: "New York & Neapolitan pizza from scratch",
    blurb: "TODO: dough recipe, oven setup, or a photo of your best pie.",
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
          Basketball courts, a violin case, an oven that's seen too much flour, and whatever
          track is loading in FL Studio. This is the rest of it.
        </p>
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-16 grid sm:grid-cols-2 gap-5">
        {HOBBIES.map((h) => (
          <div
            key={h.title}
            className="rounded-lg border border-white/10 bg-surface p-6 hover:border-warm/40 transition-colors"
          >
            <span className="inline-block font-data text-[10px] tracking-widest uppercase text-warm mb-3">
              {h.tag}
            </span>
            <h3 className="font-mono text-base text-text mb-2">{h.title}</h3>
            <p className="text-xs text-muted leading-relaxed">{h.blurb}</p>
          </div>
        ))}
      </section>

      <section className="max-w-5xl mx-auto px-6 mt-24">
        <div className="rounded-lg border border-warm/30 bg-surface p-8 text-center">
          <h2 className="font-mono text-xl text-text mb-2">Building things outside of code, too.</h2>
          <p className="text-sm text-muted">
            Also always tinkering on businesses and side projects — more on that soon.
          </p>
        </div>
      </section>
    </main>
  );
}
