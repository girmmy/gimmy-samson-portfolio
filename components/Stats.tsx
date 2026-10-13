"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";

/** Every figure here is one that appears on the résumé. */
const STATS = [
  { value: 30, suffix: "+", label: "high-severity vulns closed", sub: "legicycle · nist 800-53 / owasp" },
  { value: 250, suffix: "+", label: "users on bantr in open beta", sub: "founded, built, and scaled" },
  { value: 600, suffix: "+", label: "users served at sonaara", sub: "react native · 22% faster load" },
  { value: 20, suffix: "+", label: "freelance sites shipped", sub: "avg. 17% engagement lift" },
];

export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const triggers = gsap.utils.toArray<HTMLElement>(".stat").map((cell) => {
          const out = cell.querySelector<HTMLElement>(".stat-num");
          if (!out) return null;

          const target = Number(cell.dataset.value ?? 0);
          const suffix = cell.dataset.suffix ?? "";
          const obj = { v: 0 };

          const tween = gsap.to(obj, {
            v: target,
            duration: 1.5,
            ease: EASE,
            paused: true,
            onUpdate: () => {
              out.textContent = String(Math.round(obj.v)) + suffix;
            },
          });

          const st = ScrollTrigger.create({
            trigger: cell,
            start: "top 88%",
            once: true,
            onEnter: () => tween.play(),
          });
          return { tween, st };
        });

        return () => {
          triggers.forEach((t) => {
            if (!t) return;
            t.tween.kill();
            t.st.kill();
          });
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div ref={root} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
      {STATS.map((s) => (
        <div
          key={s.label}
          className="stat px-6 py-10 md:py-14"
          data-value={s.value}
          data-suffix={s.suffix}
          style={{ borderTop: "1px solid var(--color-border)", borderRight: "1px solid var(--color-border)" }}
        >
          <span
            className="stat-num font-display block mb-3"
            style={{
              fontSize: "clamp(2.75rem, 5vw, 4.25rem)",
              lineHeight: 1,
              fontWeight: 800,
              color: "var(--color-accent)",
            }}
          >
            0{s.suffix}
          </span>
          <span className="font-body block text-[15px] mb-1" style={{ color: "var(--color-text)" }}>
            {s.label}
          </span>
          <span className="kicker block" style={{ color: "var(--color-muted)" }}>
            {s.sub}
          </span>
        </div>
      ))}
    </div>
  );
}
