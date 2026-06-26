"use client";

import Link from "next/link";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";
import { experiences } from "@/data/experience";

export default function Experience() {
  const shouldReduce = useReducedMotion();

  return (
    <section className="section-divider py-24 md:py-32">
      <div className="container-site">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-code text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          experience
        </motion.p>
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-clash font-bold mb-14 md:mb-20"
          style={{ fontSize: "var(--text-h1)", color: "var(--color-text)" }}
        >
          What I&apos;ve Done
        </motion.h2>

        <div className="relative">
          <div
            className="absolute left-[3px] top-0 bottom-0 w-px"
            style={{ background: "var(--color-border)" }}
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

      <ul className="space-y-3">
        {exp.bullets.map((bullet, j) => (
          <li key={j} className="font-inter text-base leading-relaxed flex items-start gap-3"
            style={{ color: "var(--color-body)" }}>
            <span className="flex-shrink-0 mt-1 text-xs" style={{ color: "var(--color-accent)" }}>·</span>
            {bullet}
          </li>
        ))}
      </ul>
    </motion.div>
  );
}
