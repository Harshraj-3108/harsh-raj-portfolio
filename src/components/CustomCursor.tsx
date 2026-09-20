"use client";

import { useEffect, useRef, useState } from "react";

const HOVER_SELECTOR =
  "a, button, [role='button'], input, textarea, select, .nav-icon, [data-cursor-hover]";

export default function CustomCursor() {
  const outerRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);

  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const isFinePointer = window.matchMedia("(pointer: fine)").matches;
    if (!isFinePointer) {
      return;
    }

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;
    // this is a one-time client-capability check (pointer type) that can
    // only be known after mount, so it must run in this effect.
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setEnabled(true);

    // damping: how quickly each layer catches up to the real pointer.
    // reduced motion -> snap instantly (damping of 1) instead of lagging.
    const outerDamp = prefersReducedMotion ? 1 : 0.18;
    const innerDamp = prefersReducedMotion ? 1 : 0.4;
    const scaleDamp = prefersReducedMotion ? 1 : 0.3;

    const mouse = { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    const outerPos = { ...mouse };
    const innerPos = { ...mouse };
    let scale = 1;
    let scaleTarget = 1;
    let rafId: number;
    let hasMoved = false;

    function handleMouseMove(e: MouseEvent) {
      mouse.x = e.clientX;
      mouse.y = e.clientY;
      if (!hasMoved) {
        // snap on the very first move so the cursor doesn't fly in from center
        outerPos.x = e.clientX;
        outerPos.y = e.clientY;
        innerPos.x = e.clientX;
        innerPos.y = e.clientY;
        hasMoved = true;
        outerRef.current?.style.setProperty("opacity", "1");
        innerRef.current?.style.setProperty("opacity", "1");
      }
    }

    function handleMouseDown() {
      scaleTarget = 0.85;
    }
    function handleMouseUp() {
      scaleTarget = 1;
    }
    function handleMouseLeaveWindow() {
      outerRef.current?.style.setProperty("opacity", "0");
      innerRef.current?.style.setProperty("opacity", "0");
    }
    function handleMouseEnterWindow() {
      outerRef.current?.style.setProperty("opacity", "1");
      innerRef.current?.style.setProperty("opacity", "1");
    }

    function isHoverTarget(target: EventTarget | null) {
      return target instanceof Element && target.closest(HOVER_SELECTOR);
    }

    function handleMouseOver(e: MouseEvent) {
      if (isHoverTarget(e.target)) {
        outerRef.current?.classList.add("cursor-hover");
        innerRef.current?.classList.add("cursor-hover");
      }
    }
    function handleMouseOut(e: MouseEvent) {
      if (isHoverTarget(e.target)) {
        outerRef.current?.classList.remove("cursor-hover");
        innerRef.current?.classList.remove("cursor-hover");
      }
    }

    function loop() {
      outerPos.x += (mouse.x - outerPos.x) * outerDamp;
      outerPos.y += (mouse.y - outerPos.y) * outerDamp;
      innerPos.x += (mouse.x - innerPos.x) * innerDamp;
      innerPos.y += (mouse.y - innerPos.y) * innerDamp;
      scale += (scaleTarget - scale) * scaleDamp;

      if (outerRef.current) {
        outerRef.current.style.transform = `translate3d(${outerPos.x}px, ${outerPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      if (innerRef.current) {
        innerRef.current.style.transform = `translate3d(${innerPos.x}px, ${innerPos.y}px, 0) translate(-50%, -50%) scale(${scale})`;
      }
      rafId = requestAnimationFrame(loop);
    }

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mousedown", handleMouseDown);
    window.addEventListener("mouseup", handleMouseUp);
    document.addEventListener("mouseleave", handleMouseLeaveWindow);
    document.addEventListener("mouseenter", handleMouseEnterWindow);
    document.addEventListener("mouseover", handleMouseOver);
    document.addEventListener("mouseout", handleMouseOut);
    rafId = requestAnimationFrame(loop);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mousedown", handleMouseDown);
      window.removeEventListener("mouseup", handleMouseUp);
      document.removeEventListener("mouseleave", handleMouseLeaveWindow);
      document.removeEventListener("mouseenter", handleMouseEnterWindow);
      document.removeEventListener("mouseover", handleMouseOver);
      document.removeEventListener("mouseout", handleMouseOut);
      cancelAnimationFrame(rafId);
    };
  }, []);

  if (!enabled) return null;

  return (
    <>
      <div
        ref={outerRef}
        className="custom-cursor-outer"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
      <div
        ref={innerRef}
        className="custom-cursor-inner"
        style={{ opacity: 0 }}
        aria-hidden="true"
      />
    </>
  );
}
