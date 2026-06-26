"use client";

import { motion, useReducedMotion } from "framer-motion";
import {
  SiReact, SiTypescript, SiJavascript, SiNextdotjs, SiTailwindcss,
  SiFirebase, SiSupabase, SiPython, SiNodedotjs, SiGit, SiFigma, SiOpenai,
} from "react-icons/si";
import type { IconType } from "react-icons";

type TechIcon = {
  Icon: IconType;
  color: string;
  label: string;
  x: string;
  y: string;
  size: number;
  duration: number;
  delay: number;
  mobileHide?: boolean;
};

const ICONS: TechIcon[] = [
  { Icon: SiReact,      color: "#61DAFB", label: "React",      x: "72%", y: "18%", size: 42, duration: 3.2, delay: 0 },
  { Icon: SiTypescript, color: "#3178C6", label: "TypeScript",  x: "85%", y: "32%", size: 36, duration: 3.8, delay: 0.4 },
  { Icon: SiNextdotjs,  color: "var(--color-text)", label: "Next.js", x: "78%", y: "52%", size: 38, duration: 2.9, delay: 0.8 },
  { Icon: SiTailwindcss,color: "#38BDF8", label: "Tailwind",   x: "65%", y: "68%", size: 34, duration: 3.5, delay: 0.2, mobileHide: true },
  { Icon: SiSupabase,   color: "#3ECF8E", label: "Supabase",   x: "88%", y: "64%", size: 32, duration: 4.0, delay: 1.0, mobileHide: true },
  { Icon: SiFirebase,   color: "#FFA611", label: "Firebase",   x: "60%", y: "40%", size: 30, duration: 3.3, delay: 0.6, mobileHide: true },
  { Icon: SiPython,     color: "#3776AB", label: "Python",     x: "92%", y: "20%", size: 30, duration: 3.7, delay: 1.2, mobileHide: true },
  { Icon: SiNodedotjs,  color: "#68A063", label: "Node.js",    x: "55%", y: "80%", size: 28, duration: 3.1, delay: 0.9, mobileHide: true },
  { Icon: SiGit,        color: "#F05032", label: "Git",        x: "80%", y: "80%", size: 28, duration: 2.7, delay: 1.4, mobileHide: true },
  { Icon: SiFigma,      color: "#F24E1E", label: "Figma",      x: "95%", y: "46%", size: 26, duration: 3.6, delay: 0.5, mobileHide: true },
  { Icon: SiJavascript, color: "#F7DF1E", label: "JavaScript", x: "68%", y: "28%", size: 32, duration: 3.4, delay: 1.6, mobileHide: true },
  { Icon: SiOpenai,     color: "var(--color-text)", label: "OpenAI", x: "74%", y: "75%", size: 28, duration: 4.2, delay: 0.3, mobileHide: true },
];

export default function FloatingIcons() {
  const shouldReduce = useReducedMotion();

  return (
    <div
      aria-hidden="true"
      className="absolute inset-0 pointer-events-none overflow-hidden"
    >
      {ICONS.map((item) => (
        <motion.div
          key={item.label}
          className={item.mobileHide ? "hidden md:block absolute" : "absolute"}
          style={{ left: item.x, top: item.y }}
          initial={{ opacity: 0, y: 10 }}
          animate={
            shouldReduce
              ? { opacity: 0.25 }
              : {
                  opacity: [0, 0.35, 0.25],
                  y: [0, -item.size * 0.3, 0],
                }
          }
          transition={
            shouldReduce
              ? { duration: 0.5, delay: 0.2 }
              : {
                  opacity: { duration: 0.8, delay: item.delay },
                  y: {
                    duration: item.duration,
                    delay: item.delay,
                    repeat: Infinity,
                    ease: "easeInOut",
                  },
                }
          }
          title={item.label}
        >
          <item.Icon
            size={item.size}
            style={{ color: item.color, filter: "drop-shadow(0 2px 8px rgba(0,0,0,0.15))" }}
          />
        </motion.div>
      ))}
    </div>
  );
}
