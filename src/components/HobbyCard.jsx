export default function HobbyCard({ tag, title, blurb, video }) {
  return (
    <div className="rounded-lg border border-white/10 bg-surface overflow-hidden hover:border-warm/40 transition-colors">
      {video ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="w-full aspect-video object-cover"
        >
          <source src={video} type="video/mp4" />
        </video>
      ) : (
        <div className="w-full aspect-video border-b border-dashed border-white/15 flex items-center justify-center">
          <span className="font-data text-[10px] tracking-widest uppercase text-muted">
            video coming soon
          </span>
        </div>
      )}
      <div className="p-6">
        <span className="inline-block font-data text-[10px] tracking-widest uppercase text-warm mb-3">
          {tag}
        </span>
        <h3 className="font-mono text-base text-text mb-2">{title}</h3>
        <p className="text-xs text-muted leading-relaxed">{blurb}</p>
      </div>
    </div>
  );
}
