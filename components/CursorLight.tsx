"use client";

import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

export default function CursorLight() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const shouldReduce = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Only show on non-touch devices
    const isFine = window.matchMedia("(pointer: fine)").matches;
    if (!isFine || shouldReduce) return;

    let rafId: number;
    let tx = -600, ty = -600;
    let cx = -600, cy = -600;
    let ix = -600, iy = -600;

    const onMove = (e: MouseEvent) => {
      tx = e.clientX;
      ty = e.clientY;
      if (!visible) setVisible(true);
    };

    const tick = () => {
      cx += (tx - cx) * 0.07;
      cy += (ty - cy) * 0.07;
      ix += (tx - ix) * 0.14;
      iy += (ty - iy) * 0.14;

      if (outerRef.current) {
        outerRef.current.style.left = cx + "px";
        outerRef.current.style.top  = cy + "px";
      }
      if (innerRef.current) {
        innerRef.current.style.left = ix + "px";
        innerRef.current.style.top  = iy + "px";
      }
      rafId = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    rafId = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      cancelAnimationFrame(rafId);
    };
  }, [shouldReduce, visible]);

  if (shouldReduce) return null;

  return (
    <>
      {/* Outer large glow */}
      <div
        ref={outerRef}
        aria-hidden="true"
        className="cursor-glow"
        style={{ opacity: visible ? 1 : 0 }}
      />
      {/* Inner sharper glow */}
      <div
        ref={innerRef}
        aria-hidden="true"
        style={{
          position: "fixed",
          pointerEvents: "none",
          zIndex: 9996,
          width: "200px",
          height: "200px",
          borderRadius: "50%",
          background: "radial-gradient(circle at center, var(--color-glow) 0%, transparent 70%)",
          transform: "translate(-50%, -50%)",
          opacity: visible ? 0.6 : 0,
          mixBlendMode: "screen",
          willChange: "left, top",
          transition: "opacity 0.5s ease",
        }}
      />
    </>
  );
}
