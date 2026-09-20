"use client";

import { useEffect, useState } from "react";

const SESSION_KEY = "portfolio-intro-seen";

export default function IntroLoader() {
  const [show, setShow] = useState(true);
  const [fadeOut, setFadeOut] = useState(false);
  const [lineIndex, setLineIndex] = useState(0);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    let alreadySeen = false;
    try {
      alreadySeen = sessionStorage.getItem(SESSION_KEY) === "true";
    } catch {
      // sessionStorage can throw in some privacy modes — just play the intro
    }

    if (alreadySeen) {
      // one-time client-only check (sessionStorage) that can only be known
      // after mount — intentionally skips the intro on repeat visits.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setShow(false);
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    const markSeen = () => {
      try {
        sessionStorage.setItem(SESSION_KEY, "true");
      } catch {
        // ignore — worst case the intro plays again next time
      }
    };

    if (prefersReducedMotion) {
      // keep it on screen just long enough to read, then reveal Home directly
      markSeen();
      const t = setTimeout(() => setShow(false), 500);
      return () => clearTimeout(t);
    }

    const timers: ReturnType<typeof setTimeout>[] = [];
    timers.push(setTimeout(() => setLineIndex(1), 450)); // "Loading portfolio..."
    timers.push(setTimeout(() => setLineIndex(2), 950)); // "Initializing components..."
    timers.push(setTimeout(() => setReady(true), 1500)); // "✓ Ready"
    timers.push(
      setTimeout(() => {
        markSeen();
        setFadeOut(true);
      }, 1900)
    );
    timers.push(setTimeout(() => setShow(false), 1900 + 600)); // after fade transition

    return () => timers.forEach(clearTimeout);
  }, []);

  if (!show) return null;

  return (
    <div
      className={`intro-loader ${fadeOut ? "intro-loader-fade" : ""}`}
      role="status"
      aria-live="polite"
      aria-label="Portfolio loading"
    >
      <div className="intro-terminal">
        <p>
          <span className="intro-prompt">harsh@portfolio:~$</span> starting_up
          <span className="typewriter-caret typewriter-caret-blink" aria-hidden="true" />
        </p>
        {lineIndex >= 1 && <p className="intro-line">Loading portfolio...</p>}
        {lineIndex >= 2 && (
          <p className="intro-line">Initializing components...</p>
        )}
        {ready && <p className="intro-line intro-ready">✓ Ready</p>}
      </div>
    </div>
  );
}
