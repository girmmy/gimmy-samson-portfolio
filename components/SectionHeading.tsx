"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

type Props = {
  /** Small monospace kicker, e.g. "work". */
  label: string;
  /** Heading text. */
  children: React.ReactNode;
  /** Margin-bottom utilities — each section spaces its heading differently. */
  className?: string;
  id?: string;
};

/**
 * The shared section heading: an accent rule that draws itself, then the
 * heading rises out from behind a clip mask. Replaces the hand-rolled
 * label + h2 pair that was duplicated across four sections.
 */
export default function SectionHeading({ label, children, className = "", id }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        // Hidden state is set here, not in inline styles: useGSAP runs in a
        // layout effect (pre-paint, so no flash), and this way a visitor whose
        // JS never loads still sees the headings instead of blank space.
        gsap.set(".sh-rule", { scaleX: 0 });
        gsap.set([".sh-label", ".sh-heading"], { autoAlpha: 0 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });

        tl.fromTo(".sh-rule", { scaleX: 0 }, { scaleX: 1, duration: 0.5, ease: EASE })
          .fromTo(".sh-label", { autoAlpha: 0, x: -8 }, { autoAlpha: 1, x: 0, duration: 0.4 }, "<0.1")
          // Rising out from behind the mask is what makes the heading feel
          // typeset rather than faded in.
          .fromTo(
            ".sh-heading",
            { yPercent: 108, autoAlpha: 0 },
            { yPercent: 0, autoAlpha: 1, duration: 0.75, ease: EASE },
            "<0.05",
          );

        return () => tl.scrollTrigger?.kill();
      });

      // Reduced motion: nothing is hidden in markup, so there is nothing to
      // reveal — the heading is simply already at rest.

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <div className="flex items-center gap-3 mb-3">
        <span
          aria-hidden="true"
          className="sh-rule block"
          style={{
            width: "2rem",
            height: "1px",
            background: "var(--color-accent)",
            transformOrigin: "0% 50%",
          }}
        />
        <p
          className="sh-label font-code text-xs tracking-[0.2em] uppercase"
          style={{ color: "var(--color-accent)" }}
        >
          {label}
        </p>
      </div>

      {/* Mask. Vertical padding leaves room for descenders so the clip does
          not shave the bottom off letters like "y" and "g". */}
      <div style={{ overflow: "hidden", paddingBottom: "0.15em", marginBottom: "-0.15em" }}>
        <h2
          id={id}
          className="sh-heading font-clash font-bold"
          style={{
            fontSize: "var(--text-h1)",
            color: "var(--color-text)",
          }}
        >
          {children}
        </h2>
      </div>
    </div>
  );
}
