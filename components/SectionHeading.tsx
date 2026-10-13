"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ, EASE } from "@/lib/gsap";

type Props = {
  index: string;
  children: React.ReactNode;
  /** Optional standfirst set under the heading. */
  standfirst?: string;
  className?: string;
};

/**
 * A section opener set like a chapter: the number sits out in the
 * margin, the title in the text column, a hairline above both.
 */
export default function SectionHeading({ index, children, standfirst, className = "" }: Props) {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        // Hidden state is applied here, never in markup, so the page is
        // complete without JS and under reduced motion.
        gsap.set(".sh-rule", { scaleX: 0 });
        gsap.set(".sh-num", { autoAlpha: 0 });
        gsap.set(".sh-title", { yPercent: 105 });
        gsap.set(".sh-stand", { autoAlpha: 0, y: 10 });

        const tl = gsap.timeline({
          scrollTrigger: { trigger: root.current, start: "top 85%", once: true },
        });
        tl.to(".sh-rule", { scaleX: 1, duration: 0.9, ease: EASE })
          .to(".sh-num", { autoAlpha: 1, duration: 0.5 }, "<0.15")
          .to(".sh-title", { yPercent: 0, duration: 0.9, ease: "power3.out" }, "<0.05")
          .to(".sh-stand", { autoAlpha: 1, y: 0, duration: 0.6, ease: EASE }, "<0.3");

        return () => tl.scrollTrigger?.kill();
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className={className}>
      <div
        className="sh-rule w-full mb-6"
        style={{ height: "1px", background: "var(--rule-strong)", transformOrigin: "0% 50%" }}
        aria-hidden="true"
      />
      <div className="spine">
        <span className="sh-num label tnum" style={{ color: "var(--ink-3)" }}>
          {index}
        </span>
        <div>
          <div className="mask">
            <h2
              className="sh-title"
              style={{
                fontSize: "var(--t-3xl)",
                lineHeight: 1.05,
                fontWeight: 400,
                letterSpacing: "-0.015em",
                color: "var(--ink)",
              }}
            >
              {children}
            </h2>
          </div>
          {standfirst && (
            <p
              className="sh-stand measure mt-4"
              style={{ fontSize: "var(--t-lg)", color: "var(--ink-3)", fontStyle: "italic" }}
            >
              {standfirst}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}
