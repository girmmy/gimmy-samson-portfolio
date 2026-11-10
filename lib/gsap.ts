"use client";

/**
 * Single place GSAP is configured. Every animated component imports from here
 * so the whole site shares one easing vocabulary with the existing Framer
 * Motion work (FM's [0.22, 1, 0.36, 1] is GSAP's "expo-ish" power3.out).
 */

import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { useGSAP } from "@gsap/react";

let registered = false;

if (typeof window !== "undefined" && !registered) {
  registered = true;
  gsap.registerPlugin(ScrollTrigger, useGSAP);

  // iOS/Android hide and show the address bar while scrolling, which fires a
  // resize and makes ScrollTrigger recalculate mid-scroll — that's the classic
  // "animation jumps on mobile" bug. Ignoring it keeps phones smooth.
  ScrollTrigger.config({ ignoreMobileResize: true });

  gsap.defaults({ ease: "power3.out", duration: 0.6 });
}

/** Matches the easing on the existing Framer Motion transitions. */
export const EASE = "power3.out";

/**
 * Breakpoint + reduced-motion conditions for `gsap.matchMedia()`.
 *
 * Scroll-scrubbed parallax runs on `isDesktop` only. Phones get entrance
 * reveals and the progress bar — both transform/opacity only, so they stay on
 * the compositor — and no scrub-linked work at all.
 */
export const MQ = {
  isDesktop: "(min-width: 768px) and (prefers-reduced-motion: no-preference)",
  isMobile: "(max-width: 767px) and (prefers-reduced-motion: no-preference)",
  isMotionOk: "(prefers-reduced-motion: no-preference)",
  reduced: "(prefers-reduced-motion: reduce)",
} as const;

export { gsap, ScrollTrigger, useGSAP };
