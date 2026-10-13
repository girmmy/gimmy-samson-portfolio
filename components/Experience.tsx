"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import { experiences, type Experience as Exp } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const root = useRef<HTMLElement>(null);
  const list = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        // Rail fills as you read down the list.
        const fill = gsap.fromTo(
          ".exp-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: list.current,
              start: "top 70%",
              end: "bottom 70%",
              scrub: 0.4,
            },
          },
        );

        const rows = gsap.utils.toArray<HTMLElement>(".exp-row");
        gsap.set(rows, { autoAlpha: 0, y: 24 });
        const triggers = ScrollTrigger.batch(rows, {
          start: "top 88%",
          onEnter: (b) =>
            gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.08, ease: EASE, overwrite: true }),
        });

        return () => {
          fill.scrollTrigger?.kill();
          triggers.forEach((t) => t.kill());
          gsap.set(rows, { clearProps: "all" });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <section id="experience" ref={root} className="py-20 md:py-28">
      <div className="container-site">
        <SectionHeading index="02" label="experience" className="mb-14 md:mb-20">
          What I&apos;ve Done
        </SectionHeading>

        <div className="relative" ref={list}>
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "var(--color-border)" }}
            aria-hidden="true"
          />
          <div
            className="exp-fill absolute left-0 top-0 bottom-0 w-px"
            style={{
              background: "var(--color-accent)",
              transform: "scaleY(0)",
              transformOrigin: "50% 0%",
              willChange: "transform",
            }}
            aria-hidden="true"
          />

          {experiences.map((exp) => (
            <Row key={exp.company + exp.role} exp={exp} />
          ))}
        </div>
      </div>
    </section>
  );
}

function Row({ exp }: { exp: Exp }) {
  const [hovered, setHovered] = useState(false);

  return (
    <div
      className="exp-row relative pl-6 md:pl-10 pb-12 md:pb-16"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <span
        aria-hidden="true"
        className="absolute left-0 top-[0.6rem]"
        style={{
          width: "9px",
          height: "9px",
          marginLeft: "-4px",
          background: hovered ? "var(--color-accent)" : "var(--color-bg)",
          border: `1px solid ${hovered ? "var(--color-accent)" : "var(--color-muted)"}`,
          transition: "all 0.2s ease",
        }}
      />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-2">
        <h3
          className="font-display"
          style={{ fontSize: "var(--text-h2)", fontWeight: 700, color: "var(--color-text)" }}
        >
          {exp.role}
        </h3>
        <span className="kicker flex-shrink-0" style={{ color: "var(--color-muted)" }}>
          {exp.period}
        </span>
      </div>

      {exp.url ? (
        <Link
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-code text-[13px] mb-5 inline-block"
          style={{ color: hovered ? "var(--color-accent)" : "var(--color-body)", transition: "color 0.2s" }}
        >
          {exp.company} ↗
        </Link>
      ) : (
        <p className="font-code text-[13px] mb-5" style={{ color: "var(--color-body)" }}>
          {exp.company}
        </p>
      )}

      {exp.bullets.length > 0 && (
        <ul className="space-y-2.5 max-w-3xl">
          {exp.bullets.map((bullet, i) => (
            <li
              key={i}
              className="font-body text-[15.5px] leading-relaxed flex gap-3"
              style={{ color: "var(--color-body)" }}
            >
              <span aria-hidden="true" className="flex-shrink-0" style={{ color: "var(--color-accent)" }}>
                —
              </span>
              {bullet}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
