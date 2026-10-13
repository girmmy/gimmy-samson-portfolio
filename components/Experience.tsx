"use client";

import { useRef } from "react";
import Link from "next/link";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";
import { experiences, type Experience as Exp } from "@/data/experience";
import SectionHeading from "@/components/SectionHeading";

export default function Experience() {
  const root = useRef<HTMLElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();
      mm.add(MQ.isMotionOk, () => {
        const rows = gsap.utils.toArray<HTMLElement>(".exp-entry");
        gsap.set(rows, { autoAlpha: 0, y: 18 });
        const triggers = ScrollTrigger.batch(rows, {
          start: "top 90%",
          onEnter: (b) =>
            gsap.to(b, { autoAlpha: 1, y: 0, duration: 0.6, stagger: 0.07, ease: EASE, overwrite: true }),
        });
        return () => {
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
        <SectionHeading index="02" className="mb-14 md:mb-20">
          Where I&rsquo;ve worked
        </SectionHeading>

        {experiences.map((exp) => (
          <Entry key={exp.company + exp.role} exp={exp} />
        ))}
      </div>
    </section>
  );
}

function Entry({ exp }: { exp: Exp }) {
  return (
    <article className="exp-entry spine py-8" style={{ borderTop: "1px solid var(--rule)" }}>
      {/* The dates live out in the margin, where a printed CV puts them. */}
      <span className="label tnum" style={{ color: "var(--ink-3)" }}>
        {exp.period}
      </span>

      <div>
        <h3
          className="font-display"
          style={{ fontSize: "var(--t-xl)", fontWeight: 400, color: "var(--ink)" }}
        >
          {exp.role}
        </h3>

        <p className="mb-4 mt-0.5" style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)" }}>
          {exp.url ? (
            <Link href={exp.url} target="_blank" rel="noopener noreferrer" className="link">
              {exp.company}
            </Link>
          ) : (
            exp.company
          )}
        </p>

        {exp.bullets.length > 0 && (
          <ul className="measure space-y-3">
            {exp.bullets.map((bullet, i) => (
              <li
                key={i}
                className="relative pl-5"
                style={{ fontSize: "var(--t-sm)", color: "var(--ink-2)", lineHeight: 1.6 }}
              >
                <span
                  aria-hidden="true"
                  className="absolute left-0"
                  style={{ color: "var(--rule-strong)" }}
                >
                  —
                </span>
                {bullet}
              </li>
            ))}
          </ul>
        )}
      </div>
    </article>
  );
}
