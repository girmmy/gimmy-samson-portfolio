"use client";

import { useRef } from "react";
import { gsap, ScrollTrigger, useGSAP, MQ, EASE } from "@/lib/gsap";

/** Each figure appears on the résumé; none is invented for effect. */
const FIGURES = [
  { value: 30, suffix: "+", unit: "high-severity vulnerabilities", note: "closed at LegiCycle, against NIST 800-53 and OWASP" },
  { value: 250, suffix: "+", unit: "people in Bantr's open beta", note: "a platform I founded, designed, and built end to end" },
  { value: 600, suffix: "+", unit: "users served at Sonaara", note: "React Native, with load time cut by 22 per cent" },
  { value: 20, suffix: "+", unit: "freelance sites delivered", note: "averaging a 17 per cent lift in engagement" },
];

/**
 * Figures set as a table of record rather than four identical cards —
 * the content is heterogeneous, so a uniform grid would flatten it.
 */
export default function Stats() {
  const root = useRef<HTMLDivElement>(null);

  useGSAP(
    () => {
      const mm = gsap.matchMedia();

      mm.add(MQ.isMotionOk, () => {
        const rows = gsap.utils.toArray<HTMLElement>(".figure");

        const made = rows.map((row) => {
          const out = row.querySelector<HTMLElement>(".figure-num");
          if (!out) return null;

          const target = Number(row.dataset.value ?? 0);
          const suffix = row.dataset.suffix ?? "";
          const obj = { v: 0 };

          const tween = gsap.to(obj, {
            v: target,
            duration: 1.4,
            ease: EASE,
            paused: true,
            onUpdate: () => {
              out.textContent = String(Math.round(obj.v)) + suffix;
            },
          });

          const st = ScrollTrigger.create({
            trigger: row,
            start: "top 88%",
            once: true,
            onEnter: () => tween.play(),
          });

          return { tween, st };
        });

        return () =>
          made.forEach((m) => {
            if (!m) return;
            m.tween.kill();
            m.st.kill();
          });
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  return (
    <div className="container-site" ref={root}>
      <div className="spine">
        <span className="label" style={{ color: "var(--ink-3)" }}>
          By the numbers
        </span>
        <dl>
          {FIGURES.map((f) => (
            <div
              key={f.unit}
              className="figure grid gap-x-8 gap-y-1 md:grid-cols-[7.5rem_minmax(0,1fr)] items-baseline py-6"
              data-value={f.value}
              data-suffix={f.suffix}
              style={{ borderTop: "1px solid var(--rule)" }}
            >
              <dd
                className="figure-num font-display tnum"
                style={{
                  fontSize: "var(--t-2xl)",
                  lineHeight: 1,
                  fontWeight: 400,
                  color: "var(--accent)",
                }}
              >
                0{f.suffix}
              </dd>
              <dt>
                <span className="block" style={{ color: "var(--ink)" }}>
                  {f.unit}
                </span>
                <span
                  className="block mt-0.5"
                  style={{ fontSize: "var(--t-sm)", color: "var(--ink-3)" }}
                >
                  {f.note}
                </span>
              </dt>
            </div>
          ))}
        </dl>
      </div>
    </div>
  );
}
