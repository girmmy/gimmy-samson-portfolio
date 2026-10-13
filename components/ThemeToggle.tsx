"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

/**
 * Type-only, like everything else here. A sun/moon glyph would be the
 * project's one and only icon, which is worse than a word.
 */
export default function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  // Reserve the space so the header does not reflow on hydration.
  if (!mounted) {
    return <span className="label" style={{ color: "transparent" }} aria-hidden="true">Dark</span>;
  }

  const isDark = resolvedTheme === "dark";

  return (
    <button
      onClick={() => setTheme(isDark ? "light" : "dark")}
      className="label"
      style={{ color: "var(--ink-3)", background: "none", border: "none", cursor: "pointer", padding: 0 }}
      aria-label={isDark ? "Switch to light theme" : "Switch to dark theme"}
    >
      {isDark ? "Light" : "Dark"}
    </button>
  );
}
