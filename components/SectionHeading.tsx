"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

type Props = {
  /** Two-digit section index, e.g. "02". */
  index: string;
  label: string;
  children: React.ReactNode;
  className?: string;
};

/**
 * Full-width header bar: index and label sit on a rule that draws itself,
 * then the title rises from behind a mask.
 */
export default function SectionHeading({ index, label, children, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        // Hidden state lives here, not in markup, so a visitor without JS
        // still gets a readable page.
        gsap.set(".sh-rule", { scaleX: 0 });
        gsap.set(".sh-meta", { autoAlpha: 0 });
        gsap.set(".sh-title", { yPercent: 110 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });

        tl.to(".sh-rule", { scaleX: 1, duration: 0.7, ease: EASE })
          .to(".sh-meta", { autoAlpha: 1, duration: 0.4 }, "<0.15")
          .to(".sh-title", { yPercent: 0, duration: 0.9, ease: "power4.out" }, "<0.05");

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <div
        className="sh-rule w-full mb-5"
        style={{ height: "1px", background: "var(--color-accent)", transformOrigin: "0% 50%" }}
        aria-hidden="true"
      />
      <div className="sh-meta flex items-baseline justify-between mb-6">
        <span className="kicker" style={{ color: "var(--color-accent)" }}>
          {label}
        </span>
        <span className="kicker" style={{ color: "var(--color-muted)" }}>
          {index}
        </span>
      </div>
      {/* Mask; the padding keeps descenders from being shaved. */}
      <div className="mask">
        <h2
          className="sh-title font-display"
          style={{
            fontSize: "var(--text-h1)",
            lineHeight: 0.92,
            fontWeight: 700,
            color: "var(--color-text)",
          }}
        >
          {children}
        </h2>
      </div>
    </div>
  );
}
