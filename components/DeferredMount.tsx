"use client";

import { useEffect, useState, type ReactNode } from "react";

export default function DeferredMount({ children }: { children: ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const idle = window.requestIdleCallback ?? ((cb: IdleRequestCallback) => setTimeout(cb, 200));
    const cancelIdle = window.cancelIdleCallback ?? clearTimeout;
    const id = idle(() => setMounted(true));
    return () => cancelIdle(id as number);
  }, []);

  if (!mounted) return null;
  return <>{children}</>;
}
