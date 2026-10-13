"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

type Props = {
  items: string[];
  /** Seconds for one full pass. Larger = slower. */
  duration?: number;
  reverse?: boolean;
  className?: string;
};

/**
 * Infinite horizontal band of text. Two identical tracks sit side by side
 * and the pair translates by exactly one track width, so the seam is never
 * visible and the loop needs no measurement of individual items.
 */
export default function Marquee({ items, duration = 28, reverse = false, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const tween = gsap.to(".marquee__track", {
          xPercent: reverse ? 100 : -100,
          ease: "none",
          duration,
          repeat: -1,
        });
        return () => tween.kill();
      });

      return () => mm.revert();
    },
    { scope: root, dependencies: [duration, reverse] },
  );

  const Track = ({ hidden }: { hidden?: boolean }) => (
    <div className="marquee__track" aria-hidden={hidden ? "true" : undefined}>
      {items.map((item, i) => (
        <span key={i} className="flex items-center">
          <span className="kicker px-6 py-3" style={{ color: "var(--color-body)" }}>
            {item}
          </span>
          <span
            aria-hidden="true"
            className="block"
            style={{ width: "5px", height: "5px", background: "var(--color-accent)" }}
          />
        </span>
      ))}
    </div>
  );

  return (
    <div
      ref={root}
      className={`marquee ${className}`}
      style={{ borderBlock: "1px solid var(--color-border)", background: "var(--color-surface)" }}
    >
      {/* Second copy is decorative; screen readers read the first only. */}
      <Track />
      <Track hidden />
    </div>
  );
}
