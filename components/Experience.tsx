"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";
import { experiences } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const shouldReduce = useReducedMotion();
  const timeline = useRef<HTMLDivElement>(null);

  // The accent line draws down the timeline as you scroll past it. Pure scaleY,
  // so it is as cheap as the progress bar and runs on phones too.
  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const tween = gsap.fromTo(
          ".exp-line-fill",
          { scaleY: 0 },
          {
            scaleY: 1,
            ease: "none",
            scrollTrigger: {
              trigger: timeline.current,
              start: "top 75%",
              end: "bottom 75%",
              scrub: 0.4,
            },
          },
        );
        return () => tween.scrollTrigger?.kill();
      });

      mm.add(MQ.reduced, () => {
        gsap.set(".exp-line-fill", { scaleY: 1 });
      });

      return () => mm.revert();
    },
    { scope: timeline },
  );

  return (
    <section className="section-divider py-24 md:py-32">
      <div className="container-site">
        <SectionHeading label="experience" className="mb-14 md:mb-20">
          What I&apos;ve Done
        </SectionHeading>

        <div className="relative" ref={timeline}>
          {/* Track */}
          <div
            className="absolute left-[3px] top-0 bottom-0 w-px"
            style={{ background: "var(--color-border)" }}
            aria-hidden="true"
          />
          {/* Accent fill that draws on scroll */}
          <div
            className="exp-line-fill absolute left-[3px] top-0 bottom-0 w-px"
            style={{
              background: "var(--color-accent)",
              transform: "scaleY(0)",
              transformOrigin: "50% 0%",
              willChange: "transform",
            }}
            aria-hidden="true"
          />
          <div className="space-y-0">
            {experiences.map((exp, i) => (
              <ExperienceItem key={exp.company + exp.role} exp={exp} index={i} shouldReduce={shouldReduce ?? false} />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

type ExpType = { role: string; company: string; url: string; period: string; bullets: string[] };

function ExperienceItem({ exp, index, shouldReduce }: { exp: ExpType; index: number; shouldReduce: boolean }) {
  const [hovered, setHovered] = useState(false);

  return (
    <motion.div
      initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.08 }}
      className="relative pl-10 pb-14"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Dot */}
      <div
        className="absolute left-0 top-[1.4rem] w-[7px] h-[7px] rounded-full border"
        style={{
          background: hovered ? "var(--color-accent)" : "var(--color-bg)",
          borderColor: hovered ? "var(--color-accent)" : "var(--color-muted)",
          transition: "all 0.2s ease",
          marginLeft: "-3px",
        }}
        aria-hidden="true"
      />

      <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1 mb-1.5">
        <h3 className="font-clash font-medium" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
          {exp.role}
        </h3>
        <span className="font-code text-sm flex-shrink-0" style={{ color: "var(--color-muted)" }}>
          {exp.period}
        </span>
      </div>

      {exp.url ? (
        <Link
          href={exp.url}
          target="_blank"
          rel="noopener noreferrer"
          className="font-inter text-sm mb-5 inline-block transition-colors duration-150"
          style={{ color: "var(--color-muted)" }}
          onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
          onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
        >
          {exp.company} ↗
        </Link>
      ) : (
        <p className="font-inter text-sm mb-5" style={{ color: "var(--color-muted)" }}>{exp.company}</p>
      )}

      {exp.bullets.length > 0 && (
      <ul className="space-y-3">
        {exp.bullets.map((bullet, j) => (
          <li key={j} className="font-inter text-base leading-relaxed flex items-start gap-3"
            style={{ color: "var(--color-body)" }}>
            <span className="flex-shrink-0 mt-1 text-xs" style={{ color: "var(--color-accent)" }}>·</span>
            {bullet}
          </li>
        ))}
      </ul>
      )}
    </motion.div>
  );
}
