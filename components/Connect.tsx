"use client";

import Link from "next/link";
import { Linkedin, Github, Mail } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";

export default function Connect() {
  const shouldReduce = useReducedMotion();

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="connect" className="section-divider py-28 md:py-40">
      <div className="container-site flex flex-col items-center text-center">
        <motion.p {...fadeUp()} className="font-code text-xs tracking-[0.2em] uppercase mb-4" style={{ color: "var(--color-accent)" }}>
          connect
        </motion.p>

        <motion.h2
          {...fadeUp(0.06)}
          className="font-clash font-bold leading-tight mb-6 max-w-2xl"
          style={{ fontSize: "clamp(2.5rem, 6vw, 5rem)", color: "var(--color-text)" }}
        >
          Let&apos;s build<br />something.
        </motion.h2>

        <motion.p {...fadeUp(0.1)} className="font-inter text-lg mb-10 max-w-md" style={{ color: "var(--color-muted)" }}>
          Have a project in mind? I&apos;d love to hear about it.
        </motion.p>

        {/* Email CTA */}
        <motion.div {...fadeUp(0.14)} className="mb-12">
          <Link
            href="mailto:gimmys943@gmail.com"
            className="inline-flex items-center gap-3 font-inter font-medium transition-all duration-150 group"
            style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.5rem)", color: "var(--color-body)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-body)")}
          >
            <Mail size={22} aria-hidden="true" />
            gimmys943@gmail.com
          </Link>
        </motion.div>

        {/* Social links — centered, bigger icons */}
        <motion.div {...fadeUp(0.18)} className="flex items-center justify-center gap-8 mb-20">
          <Link
            href="https://linkedin.com/in/girmachew-samson"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-all duration-150 group"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            aria-label="LinkedIn profile"
          >
            <Linkedin size={28} aria-hidden="true" />
            <span className="font-inter text-sm">LinkedIn</span>
          </Link>
          <Link
            href="https://github.com/girmmy"
            target="_blank"
            rel="noopener noreferrer"
            className="flex flex-col items-center gap-2 transition-all duration-150 group"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-accent)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-muted)")}
            aria-label="GitHub profile"
          >
            <Github size={28} aria-hidden="true" />
            <span className="font-inter text-sm">GitHub</span>
          </Link>
        </motion.div>

        <div className="w-full" style={{ borderTop: "1px solid var(--color-border)", paddingTop: "1.5rem" }}>
          <p className="font-code text-xs" style={{ color: "var(--color-muted)" }}>
            © 2026 Girmachew Samson
          </p>
        </div>
      </div>
    </section>
  );
}
