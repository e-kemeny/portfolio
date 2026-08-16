import { useEffect, useRef, useState } from "react";

/**
 * Wraps a section so it fades and slides up into place the moment it enters
 * the viewport, instead of just appearing instantly on scroll. Reveals once
 * and stays visible — doesn't re-hide if you scroll back up past it.
 * Respects prefers-reduced-motion by skipping the animation entirely.
 */
export default function Reveal({ children, className = "" }) {
  const ref = useRef(null);
  const [visible, setVisible] = useState(false);
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReduced(mq.matches);
    if (mq.matches) {
      setVisible(true);
      return;
    }

    const node = ref.current;
    if (!node) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.unobserve(node);
        }
      },
      // Shrinks the effective viewport bottom by 15%, so the reveal fires
      // while the section is still a bit below center-bottom rather than
      // right at the very edge of the screen.
      { threshold: 0.15, rootMargin: "0px 0px -15% 0px" }
    );
    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={className}
      style={
        reduced
          ? undefined
          : {
              opacity: visible ? 1 : 0,
              transform: visible ? "translateY(0)" : "translateY(16px)",
              transition: "opacity 0.6s ease, transform 0.6s ease",
            }
      }
    >
      {children}
    </div>
  );
}
