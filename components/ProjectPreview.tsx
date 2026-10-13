"use client";

import { useEffect, useState, useRef } from "react";
import { X, ExternalLink } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

type Props = {
  url: string;
  title: string;
  isOpen: boolean;
  onClose: () => void;
};

export default function ProjectPreview({ url, title, isOpen, onClose }: Props) {
  const [timeLeft, setTimeLeft] = useState(60);
  const [iframeError, setIframeError] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!isOpen) {
      setTimeLeft(60);
      setIframeError(false);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    intervalRef.current = setInterval(() => {
      setTimeLeft((t) => Math.max(0, t - 1));
    }, 1000);

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isOpen]);

  useEffect(() => {
    if (timeLeft === 0 && isOpen) {
      if (intervalRef.current) clearInterval(intervalRef.current);
      onClose();
    }
  }, [timeLeft, isOpen, onClose]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  const pct = (timeLeft / 60) * 100;

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 hidden md:flex items-center justify-center p-6"
          style={{ background: "rgba(0,0,0,0.75)", backdropFilter: "blur(8px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
          role="dialog"
          aria-modal="true"
          aria-label={`Preview: ${title}`}
        >
          <motion.div
            initial={{ scale: 0.96, opacity: 0, y: 12 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.96, opacity: 0, y: 12 }}
            transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
            className="relative w-full max-w-5xl rounded-xl overflow-hidden flex flex-col"
            style={{
              height: "82vh",
              background: "var(--color-surface)",
              border: "1px solid var(--color-border)",
              boxShadow: "0 24px 80px rgba(0,0,0,0.4)",
            }}
          >
            {/* Browser chrome */}
            <div
              className="flex items-center gap-3 px-4 py-3 flex-shrink-0"
              style={{ borderBottom: "1px solid var(--color-border)", background: "var(--color-bg)" }}
            >
              {/* Traffic lights */}
              <div className="flex items-center gap-1.5">
                <button onClick={onClose} className="w-3 h-3 rounded-full bg-red-400 hover:bg-red-500 transition-colors" aria-label="Close preview" />
                <div className="w-3 h-3 rounded-full" style={{ background: "var(--color-border)" }} />
                <div className="w-3 h-3 rounded-full" style={{ background: "var(--color-border)" }} />
              </div>
              {/* URL bar */}
              <div
                className="flex-1 flex items-center gap-2 px-3 py-1 rounded text-xs font-code truncate"
                style={{ background: "var(--color-surface)", border: "1px solid var(--color-border)", color: "var(--color-muted)" }}
              >
                <span style={{ color: "var(--color-accent)" }}>🔒</span>
                <span className="truncate">{url}</span>
              </div>
              {/* Timer */}
              <div className="flex items-center gap-2">
                <span
                  className="font-code text-xs tabular-nums"
                  style={{ color: timeLeft <= 10 ? "var(--color-accent)" : "var(--color-muted)" }}
                >
                  {timeLeft}s
                </span>
                <a href={url} target="_blank" rel="noopener noreferrer" aria-label="Open in new tab">
                  <ExternalLink size={14} style={{ color: "var(--color-muted)" }} />
                </a>
                <button onClick={onClose} aria-label="Close">
                  <X size={16} style={{ color: "var(--color-muted)" }} />
                </button>
              </div>
            </div>

            {/* Progress bar */}
            <div className="h-0.5 flex-shrink-0" style={{ background: "var(--color-border)" }}>
              <div
                className="h-full transition-all duration-1000"
                style={{ width: `${pct}%`, background: "var(--color-accent)" }}
              />
            </div>

            {/* Iframe */}
            {iframeError ? (
              <div className="flex-1 flex flex-col items-center justify-center gap-4" style={{ color: "var(--color-muted)" }}>
                <p className="font-inter text-sm">This site can&apos;t be embedded — it blocks previews.</p>
                <a
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="font-code text-sm flex items-center gap-2 hover:underline"
                  style={{ color: "var(--color-accent)" }}
                >
                  <ExternalLink size={14} /> Open in new tab
                </a>
              </div>
            ) : (
              <iframe
                src={url}
                className="flex-1 w-full border-0"
                title={`Preview of ${title}`}
                onError={() => setIframeError(true)}
                onLoad={(e) => {
                  try {
                    // X-Frame-Options: deny leaves contentDocument null after load
                    const doc = e.currentTarget.contentDocument;
                    if (!doc || doc.URL === "about:blank") {
                      setIframeError(true);
                    }
                  } catch {
                    // Cross-origin access blocked = frame loaded fine
                  }
                }}
                sandbox="allow-scripts allow-same-origin allow-forms"
              />
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
