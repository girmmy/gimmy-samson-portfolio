"use client";

import { useRef } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

type Props = {
  text: string;
  className?: string;
  style?: React.CSSProperties;
};

/**
 * Paragraph whose words ink in one at a time, tied to scroll position
 * rather than fired once. Scrubbed, so scrolling back un-inks them —
 * the reveal tracks you instead of playing at you.
 *
 * The dimmed state is applied by GSAP, never in markup, so without JS
 * (or under reduced motion) the paragraph just renders at full strength.
 */
export default function WordReveal({ text, className = "", style }: Props) {
  const root = useRef<HTMLParagraphElement>(null);
  const words = text.split(" ");

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const items = gsap.utils.toArray<HTMLElement>(".wr-word");
        gsap.set(items, { opacity: 0.16 });

        const tween = gsap.to(items, {
          opacity: 1,
          ease: "none",
          stagger: 0.4,
          scrollTrigger: {
            trigger: root.current,
            start: "top 80%",
            end: "bottom 60%",
            scrub: 0.5,
          },
        });

        return () => {
          tween.scrollTrigger?.kill();
          gsap.set(items, { clearProps: "opacity" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <p ref={root} className={className} style={style}>
      {words.map((word, i) => (
        <span
          key={i}
          className="wr-word"
          // inline-block is what makes each word animatable; the trailing
          // space is kept inside the span so wrapping still behaves.
          style={{ display: "inline-block", whiteSpace: "pre" }}
        >
          {word}
          {i < words.length - 1 ? " " : ""}
        </span>
      ))}
    </p>
  );
}
