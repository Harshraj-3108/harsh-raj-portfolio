"use client";

import { useEffect, useRef } from "react";

export default function AmbientBackground() {
  const glowRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    // mouse-following glow: desktop only, and only when motion is allowed
    if (!isFinePointer || prefersReducedMotion || !glowRef.current) return;

    const el = glowRef.current;
    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const pos = { ...mouse };
    let rafId: number;
    let hasMoved = false;

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!hasMoved) {
        pos.x = e.clientX;
        pos.y = e.clientY;
        hasMoved = true;
        el.style.setProperty("opacity", "1");
      }
    }

    function loop() {
      // gentle lag so the glow "follows" rather than snaps
      pos.x += (mouse.x - pos.x) * 0.08;
      pos.y += (mouse.y - pos.y) * 0.08;
      el.style.setProperty("--mx", `${pos.x}px`);
      el.style.setProperty("--my", `${pos.y}px`);
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMouseMove);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      cancelAnimationFrame(rafId);
    };
  }, []);

  return (
    <div className="ambient-bg" aria-hidden="true">
      <div className="ambient-glow ambient-glow-1" />
      <div className="ambient-glow ambient-glow-2" />
      <div className="ambient-glow ambient-glow-3" />
      <div className="ambient-grid" />
      <div ref={glowRef} className="ambient-mouse-glow" style={{ opacity: 0 }} />
    </div>
  );
}
