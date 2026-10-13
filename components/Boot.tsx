"use client";

import { useRef, useState } from "react";
import { gsap, useGSAP, MQ } from "@/lib/gsap";

const LINES = [
  "init runtime",
  "mount agent tooling",
  "link georgia tech",
  "resolve legicycle",
  "ready",
];

/**
 * Cold-open overlay: a counter runs to 100 while status lines print, then
 * the panel splits and clears. Shown once per tab — a visitor who navigates
 * back should not sit through it again.
 */
export default function Boot() {
  const root = useRef<HTMLDivElement>(null);
  const [done, setDone] = useState(false);

  useGSAP(
    () => {
      let seen = false;
      try {
        seen = sessionStorage.getItem("gs-boot") === "1";
      } catch {
        // Private mode or blocked storage: just play it.
      }

      const finish = () => {
        try {
          sessionStorage.setItem("gs-boot", "1");
        } catch {
          /* non-fatal */
        }
        setDone(true);
        document.body.style.removeProperty("overflow");
      };

      const mm = gsap.matchMedia();

      // Already seen, or the visitor asked for less motion: never show it.
      mm.add(MQ.reduced, finish);
      if (seen) {
        finish();
        return () => mm.revert();
      }

      mm.add(MQ.isMotionOk, () => {
        document.body.style.overflow = "hidden";
        const counter = { v: 0 };

        const tl = gsap.timeline({ onComplete: finish });

        // Failsafe. The overlay locks page scroll while it plays, so if the
        // ticker is throttled (background tab, very slow device) and the
        // timeline stalls, the visitor would be stuck on a black screen.
        // Wall-clock timeout, independent of the GSAP ticker.
        const bail = window.setTimeout(() => {
          if (tl.isActive() || tl.progress() < 1) {
            tl.progress(1).kill();
            finish();
          }
        }, 5000);

        tl.to(counter, {
          v: 100,
          duration: 1.5,
          ease: "power2.inOut",
          onUpdate: () => {
            const el = root.current?.querySelector(".boot-count");
            if (el) el.textContent = String(Math.round(counter.v)).padStart(3, "0");
          },
        })
          .to(".boot-bar", { scaleX: 1, duration: 1.5, ease: "power2.inOut" }, 0)
          .fromTo(
            ".boot-line",
            { autoAlpha: 0, x: -6 },
            { autoAlpha: 1, x: 0, duration: 0.2, stagger: 0.26 },
            0.1,
          )
          .to(".boot-content", { autoAlpha: 0, duration: 0.25 }, ">-0.1")
          // Split the panel and pull it off the screen.
          .to(".boot-half-top", { yPercent: -100, duration: 0.7, ease: "power4.inOut" }, ">")
          .to(".boot-half-bottom", { yPercent: 100, duration: 0.7, ease: "power4.inOut" }, "<");

        return () => {
          window.clearTimeout(bail);
          tl.kill();
          document.body.style.removeProperty("overflow");
        };
      });

      return () => mm.revert();
    },
    { scope: root },
  );

  if (done) return null;

  return (
    <div
      ref={root}
      aria-hidden="true"
      className="fixed inset-0"
      style={{ zIndex: 9999, pointerEvents: "none" }}
    >
      <div
        className="boot-half-top absolute inset-x-0 top-0"
        style={{ height: "50.5%", background: "var(--color-bg)" }}
      />
      <div
        className="boot-half-bottom absolute inset-x-0 bottom-0"
        style={{ height: "50.5%", background: "var(--color-bg)" }}
      />

      <div className="boot-content absolute inset-0 flex flex-col justify-between p-6 md:p-10">
        <div className="flex items-start justify-between">
          <span className="kicker" style={{ color: "var(--color-muted)" }}>
            girmachew samson
          </span>
          <span className="kicker" style={{ color: "var(--color-accent)" }}>
            <span className="boot-count">000</span>
          </span>
        </div>

        <div className="flex flex-col gap-1.5">
          {LINES.map((line) => (
            <span
              key={line}
              className="boot-line kicker"
              style={{ color: "var(--color-body)" }}
            >
              <span style={{ color: "var(--color-accent)" }}>›</span> {line}
            </span>
          ))}
          <div
            className="mt-5 w-full"
            style={{ height: "1px", background: "var(--color-border)" }}
          >
            <div
              className="boot-bar h-full"
              style={{
                background: "var(--color-accent)",
                transform: "scaleX(0)",
                transformOrigin: "0% 50%",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
