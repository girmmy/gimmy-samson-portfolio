"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";
import { ExternalLink, Youtube } from "lucide-react";
import { projects } from "@/data/projects";

export default function Projects() {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const shouldReduce = useReducedMotion();

  const toggle = (i: number) => setActiveIndex((prev) => (prev === i ? null : i));

  return (
    <section id="work" className="section-divider py-24 md:py-32">
      <div className="container-site">
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="font-code text-xs tracking-[0.2em] uppercase mb-3"
          style={{ color: "var(--color-accent)" }}
        >
          work
        </motion.p>
        <motion.h2
          initial={shouldReduce ? {} : { opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.05 }}
          className="font-clash font-bold mb-10 md:mb-14"
          style={{ fontSize: "var(--text-h1)", color: "var(--color-text)" }}
        >
          Selected Work
        </motion.h2>

        {/* Desktop: editorial rows */}
        <div className="hidden md:block" style={{ borderTop: "1px solid var(--color-border)" }}>
          {projects.map((project, i) => (
            <motion.div
              key={project.index}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              style={{ borderBottom: "1px solid var(--color-border)" }}
            >
              <button
                className="w-full flex items-center gap-6 py-6 px-3 group text-left transition-colors duration-200"
                style={{ background: activeIndex === i ? "var(--color-surface)" : "transparent" }}
                onClick={() => toggle(i)}
                aria-expanded={activeIndex === i}
              >
                <span className="font-code text-xs w-7 flex-shrink-0" style={{ color: "var(--color-muted)" }}>
                  {project.index}
                </span>
                <span
                  className="font-clash font-medium flex-1 text-left transition-colors duration-150 group-hover:opacity-80"
                  style={{ fontSize: "var(--text-h2)", color: activeIndex === i ? "var(--color-accent)" : "var(--color-text)" }}
                >
                  {project.title}
                </span>
                <span className="font-code text-sm flex-shrink-0" style={{ color: "var(--color-muted)" }}>
                  {project.year}
                </span>
                <div className="hidden lg:flex flex-wrap gap-1.5 flex-shrink-0 max-w-xs justify-end">
                  {project.tags.slice(0, 3).map((tag) => (
                    <span
                      key={tag}
                      className="font-code text-[11px] rounded px-2.5 py-1"
                      style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <span
                  className="font-clash text-lg flex-shrink-0 ml-2 transition-transform duration-200"
                  style={{
                    color: "var(--color-muted)",
                    transform: activeIndex === i ? "rotate(45deg)" : "rotate(0deg)",
                    display: "inline-block",
                  }}
                  aria-hidden="true"
                >
                  +
                </span>
              </button>

              <AnimatePresence>
                {activeIndex === i && (
                  <motion.div
                    initial={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    animate={shouldReduce ? { opacity: 1 } : { height: "auto", opacity: 1 }}
                    exit={shouldReduce ? { opacity: 0 } : { height: 0, opacity: 0 }}
                    transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
                    style={{ overflow: "hidden", background: "var(--color-surface)" }}
                  >
                    <div className="px-3 pb-8 pl-16 grid md:grid-cols-[1fr_320px] gap-8 items-start">
                      {/* Left: bullets + actions */}
                      <div>
                        <ul className="space-y-3 mb-6 mt-4">
                          {project.description.map((point, j) => (
                            <li key={j} className="font-inter text-base leading-relaxed flex items-start gap-3"
                              style={{ color: "var(--color-body)" }}>
                              <span className="flex-shrink-0 mt-1 text-xs" style={{ color: "var(--color-accent)" }}>·</span>
                              {point}
                            </li>
                          ))}
                        </ul>
                        <div className="flex items-center gap-4">
                          <Link
                            href={project.link}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center gap-2 font-inter text-sm transition-colors duration-150"
                            style={{ color: "var(--color-accent)" }}
                          >
                            <ExternalLink size={14} /> View Project
                          </Link>
                          {project.video && (
                            <Link
                              href={project.video}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="inline-flex items-center gap-2 font-inter text-sm transition-colors duration-150"
                              style={{ color: "var(--color-muted)" }}
                              onMouseEnter={(e) => (e.currentTarget.style.color = "#FF0000")}
                              onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
                            >
                              <Youtube size={14} /> Watch Demo
                            </Link>
                          )}
                        </div>
                      </div>
                      {/* Right: project screenshot */}
                      <div
                        className="hidden md:block rounded overflow-hidden mt-4"
                        style={{ border: "1px solid var(--color-border)", aspectRatio: "16/9" }}
                      >
                        <Image
                          src={project.image}
                          alt={`${project.title} screenshot`}
                          width={320}
                          height={180}
                          className="w-full h-full object-cover object-top"
                        />
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </motion.div>
          ))}
        </div>

        {/* Mobile: stacked cards */}
        <div className="md:hidden space-y-4">
          {projects.map((project, i) => (
            <motion.div
              key={project.index}
              initial={shouldReduce ? {} : { opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.06 }}
              className="rounded overflow-hidden"
              style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)" }}
            >
              {/* Screenshot */}
              <div style={{ aspectRatio: "16/9", overflow: "hidden" }}>
                <Image
                  src={project.image}
                  alt={`${project.title} screenshot`}
                  width={600}
                  height={338}
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="p-5">
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <span className="font-code text-xs block mb-1" style={{ color: "var(--color-muted)" }}>{project.index}</span>
                    <h3 className="font-clash font-medium" style={{ fontSize: "var(--text-h2)", color: "var(--color-text)" }}>
                      {project.title}
                    </h3>
                  </div>
                  <span className="font-code text-sm flex-shrink-0 mt-1" style={{ color: "var(--color-muted)" }}>{project.year}</span>
                </div>
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {project.tags.slice(0, 4).map((tag) => (
                    <span key={tag} className="font-code text-[11px] rounded px-2.5 py-0.5"
                      style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}>
                      {tag}
                    </span>
                  ))}
                </div>
                <ul className="space-y-2.5 mb-5">
                  {project.description.map((point, j) => (
                    <li key={j} className="font-inter text-[15px] leading-relaxed flex items-start gap-3"
                      style={{ color: "var(--color-body)" }}>
                      <span className="flex-shrink-0 mt-1 text-xs" style={{ color: "var(--color-accent)" }}>·</span>
                      {point}
                    </li>
                  ))}
                </ul>
                <div className="flex items-center gap-4">
                  <Link href={project.link} target="_blank" rel="noopener noreferrer"
                    className="font-inter text-sm inline-flex items-center gap-2"
                    style={{ color: "var(--color-accent)" }}>
                    <ExternalLink size={13} /> View Project
                  </Link>
                  {project.video && (
                    <Link href={project.video} target="_blank" rel="noopener noreferrer"
                      className="font-inter text-sm inline-flex items-center gap-2"
                      style={{ color: "var(--color-muted)" }}>
                      <Youtube size={13} /> Watch Demo
                    </Link>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

    </section>
  );
}
