"use client";

import Image from "next/image";
import { Download } from "lucide-react";
import { motion, useReducedMotion } from "framer-motion";
import { useState } from "react";

const skills = [
  {
    label: "Frontend",
    items: ["React", "React Native", "Next.js", "TypeScript", "JavaScript", "Tailwind CSS", "HTML & CSS", "Bootstrap"],
  },
  {
    label: "Backend",
    items: ["Node.js", "Python", "Java", "REST APIs", "Firebase", "Supabase"],
  },
  {
    label: "AI & Tools",
    items: ["OpenAI API", "Claude API", "Figma", "Git & GitHub", "VS Code", "jQuery"],
  },
];

export default function About() {
  const shouldReduce = useReducedMotion();
  const [imgHovered, setImgHovered] = useState(false);

  const fadeUp = (delay = 0) =>
    shouldReduce
      ? {}
      : { initial: { opacity: 0, y: 24 }, whileInView: { opacity: 1, y: 0 }, viewport: { once: true }, transition: { duration: 0.5, delay, ease: [0.22, 1, 0.36, 1] } };

  return (
    <section id="about" className="section-divider py-24 md:py-32">
      <div className="container-site">
        <motion.p {...fadeUp()} className="font-code text-xs tracking-[0.2em] uppercase mb-3" style={{ color: "var(--color-accent)" }}>
          about
        </motion.p>
        <motion.h2 {...fadeUp(0.05)} className="font-clash font-bold mb-14 md:mb-20" style={{ fontSize: "var(--text-h1)", color: "var(--color-text)" }}>
          Who I Am
        </motion.h2>

        <div className="grid md:grid-cols-[220px_1fr] gap-12 lg:gap-24">
          {/* Headshot */}
          <motion.div {...fadeUp(0.1)} className="flex justify-center md:justify-start md:pt-2">
            <div
              className="relative w-[200px] h-[200px] md:w-[220px] md:h-[220px] rounded-full overflow-hidden cursor-default flex-shrink-0"
              style={{
                boxShadow: imgHovered
                  ? "0 0 0 3px var(--color-accent), 0 0 30px var(--color-accent-dim)"
                  : "0 0 0 2px var(--color-border)",
                transition: "box-shadow 0.25s ease",
              }}
              onMouseEnter={() => setImgHovered(true)}
              onMouseLeave={() => setImgHovered(false)}
            >
              <Image
                src="/gimmy-headshot.png"
                alt="Girmachew Samson"
                width={220}
                height={220}
                className="w-full h-full object-cover object-[center_15%]"
                priority
              />
            </div>
          </motion.div>

          {/* Bio + skills */}
          <div>
            <motion.p
              {...fadeUp(0.12)}
              className="font-inter text-lg leading-relaxed mb-12"
              style={{ color: "var(--color-body)" }}
            >
              Hi, I&apos;m Girmachew — Gimmy for short. I&apos;m an incoming CS student at Georgia Tech
              and the founder of Bantr, a live debating platform with 250+ users.
              I&apos;m currently deep in the AI space as a trainer and evaluator, working on
              model alignment and prompt engineering across real production pipelines.
              I build things.
            </motion.p>

            {/* Skills — bigger */}
            <motion.div {...fadeUp(0.18)} className="grid grid-cols-1 sm:grid-cols-3 gap-8 mb-12">
              {skills.map((group) => (
                <div key={group.label}>
                  <p className="font-code text-[11px] tracking-[0.25em] uppercase mb-4" style={{ color: "var(--color-muted)" }}>
                    {group.label}
                  </p>
                  <ul className="space-y-2.5">
                    {group.items.map((item) => (
                      <li
                        key={item}
                        className="font-inter text-base flex items-center gap-2.5 group cursor-default transition-colors duration-150"
                        style={{ color: "var(--color-body)" }}
                        onMouseEnter={(e) => (e.currentTarget.style.color = "var(--color-text)")}
                        onMouseLeave={(e) => (e.currentTarget.style.color = "var(--color-body)")}
                      >
                        <span className="text-sm flex-shrink-0 transition-colors" style={{ color: "var(--color-accent)" }}>·</span>
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>
              ))}
            </motion.div>

            {/* Resume */}
            <motion.div {...fadeUp(0.22)}>
              <a
                href="/Girmachew_Samson.pdf"
                download
                className="inline-flex items-center gap-2.5 font-inter text-sm px-6 py-3 rounded transition-all duration-150"
                style={{ border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-accent)";
                  e.currentTarget.style.color = "var(--color-accent)";
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.borderColor = "var(--color-border)";
                  e.currentTarget.style.color = "var(--color-muted)";
                }}
                aria-label="Download resume PDF"
              >
                <Download size={15} aria-hidden="true" />
                Download Resume
              </a>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
}
