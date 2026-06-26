"use client";

import { useReducedMotion, motion } from "framer-motion";
import FloatingIcons from "@/components/FloatingIcons";

const WORDS = ["Girmachew", "Samson"];
const FULL_NAME = WORDS.join(" ");
const CHARS = FULL_NAME.split("");

export default function Hero() {
  const shouldReduce = useReducedMotion();

  const scrollTo = (id: string) =>
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center overflow-hidden"
      aria-labelledby="hero-heading"
    >
      {/* Ambient background glow */}
      <div
        aria-hidden="true"
        className="absolute pointer-events-none"
        style={{
          top: "-15%",
          left: "-8%",
          width: "700px",
          height: "700px",
          borderRadius: "50%",
          background: "var(--color-accent-dim)",
          filter: "blur(140px)",
        }}
      />

      {/* Floating tech icons (right side) */}
      <FloatingIcons />

      <div className="container-site relative z-10 pt-28 pb-28 md:pt-36 md:pb-36">
        {/* "or Gimmy Samson" label */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          className="font-inter text-lg mb-4 tracking-wide"
          style={{ color: "var(--color-muted)" }}
        >
          or Gimmy...
        </motion.p>

        {/* Name — character stagger */}
        <h1
          id="hero-heading"
          className="font-clash font-bold leading-[0.95] mb-8"
          style={{
            fontSize: "var(--text-display)",
            color: "var(--color-text)",
          }}
          aria-label={FULL_NAME}
        >
          {shouldReduce ? (
            <motion.span
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5 }}
            >
              {FULL_NAME}
            </motion.span>
          ) : (
            <>
              {WORDS.map((word, wi) => {
                const offset = wi === 0 ? 0 : WORDS[0].length + 1;
                return (
                  <span
                    key={wi}
                    style={{ display: "inline-block", whiteSpace: "nowrap" }}
                  >
                    {word.split("").map((char, ci) => (
                      <motion.span
                        key={ci}
                        aria-hidden="true"
                        initial={{ opacity: 0, y: 22 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + (offset + ci) * 0.03,
                          ease: [0.22, 1, 0.36, 1],
                        }}
                        style={{ display: "inline-block" }}
                      >
                        {char}
                      </motion.span>
                    ))}
                    {wi < WORDS.length - 1 && (
                      <motion.span
                        aria-hidden="true"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{
                          duration: 0.4,
                          delay: 0.15 + (offset + word.length) * 0.03,
                        }}
                        style={{ display: "inline-block", whiteSpace: "pre" }}
                      >
                        {" "}
                      </motion.span>
                    )}
                  </span>
                );
              })}
            </>
          )}
        </h1>

        {/* Subtitle — Inter, bigger */}
        <motion.p
          initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduce ? 0.1 : 0.75 }}
          className="font-inter mb-12 flex items-center gap-3 flex-wrap"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.35rem)",
            color: "var(--color-body)",
          }}
        >
          <span>CS @ Georgia Tech</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: shouldReduce ? 0.1 : 1.1 }}
            style={{ color: "var(--color-accent)", fontWeight: "bold" }}
          >
            ·
          </motion.span>
          <span>Founder, Bantr</span>
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: shouldReduce ? 0.1 : 1.2 }}
            style={{ color: "var(--color-accent)", fontWeight: "bold" }}
          >
            ·
          </motion.span>
          <span>AI Enthusiast</span>
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={shouldReduce ? {} : { opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: shouldReduce ? 0.2 : 0.9 }}
          className="flex items-center gap-6 flex-wrap"
        >
          <button
            onClick={() => scrollTo("work")}
            className="font-inter font-medium text-base px-8 py-3 rounded-sm transition-all duration-150 hover:scale-[1.02] active:scale-[0.98]"
            style={{
              border: "1.5px solid var(--color-accent)",
              color: "var(--color-accent)",
              background: "transparent",
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = "var(--color-accent)";
              e.currentTarget.style.color = "var(--color-bg)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = "transparent";
              e.currentTarget.style.color = "var(--color-accent)";
            }}
          >
            View Work
          </button>
          <button
            onClick={() => scrollTo("connect")}
            className="font-inter text-base transition-colors duration-150"
            style={{ color: "var(--color-muted)" }}
            onMouseEnter={(e) =>
              (e.currentTarget.style.color = "var(--color-text)")
            }
            onMouseLeave={(e) =>
              (e.currentTarget.style.color = "var(--color-muted)")
            }
          >
            Get In Touch →
          </button>
        </motion.div>
      </div>
    </section>
  );
}
