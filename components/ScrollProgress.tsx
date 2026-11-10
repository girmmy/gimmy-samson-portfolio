"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ } from "@/lib/gsap";

/**
 * Hairline accent rule across the top of the viewport, scrubbed to page scroll.
 * Animates `scaleX` only, so it never leaves the compositor — cheap enough to
 * be the one scrub-linked effect that also runs on phones.
 */
export default function ScrollProgress() {
  const bar = useRef<HTMLDivElement>(null);

  useGSAP(() => {
    const mm = gsap.matchMedia();

    mm.add(MQ.isMotionOk, () => {
      const tween = gsap.fromTo(
        bar.current,
        { scaleX: 0 },
        {
          scaleX: 1,
          ease: "none",
          scrollTrigger: {
            trigger: document.documentElement,
            start: "top top",
            end: "bottom bottom",
            scrub: 0.3,
          },
        },
      );
      return () => tween.scrollTrigger?.kill();
    });

    // Reduced motion: no bar at all rather than a jumping one.
    mm.add(MQ.reduced, () => {
      gsap.set(bar.current, { autoAlpha: 0 });
    });

    return () => mm.revert();
  });

  return (
    <div
      aria-hidden="true"
      className="fixed top-0 left-0 w-full pointer-events-none"
      style={{ height: "2px", zIndex: 100 }}
    >
      <div
        ref={bar}
        className="w-full h-full"
        style={{
          background: "var(--color-accent)",
          transform: "scaleX(0)",
          transformOrigin: "0% 50%",
          willChange: "transform",
        }}
      />
    </div>
  );
}
