"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

type TypewriterProps = {
  /** Single-string mode: types once when scrolled into view (used by Projects). */
  text?: string;
  speed?: number;
  startDelay?: number;
  showCursor?: boolean;

  /** Rotating mode: cycles through phrases forever (used by Hero). */
  phrases?: string[];
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
  cursorClassName?: string;

  className?: string;
};

export default function Typewriter({
  text,
  speed = 45,
  startDelay = 0,
  showCursor = true,
  phrases,
  typingSpeed = 70,
  deletingSpeed = 40,
  pauseDuration = 1800,
  cursorClassName,
  className,
}: TypewriterProps) {
  if (phrases && phrases.length > 0) {
    return (
      <RotatingTypewriter
        phrases={phrases}
        typingSpeed={typingSpeed}
        deletingSpeed={deletingSpeed}
        pauseDuration={pauseDuration}
        className={className}
        cursorClassName={cursorClassName}
      />
    );
  }

  return (
    <OnceTypewriter
      text={text ?? ""}
      speed={speed}
      startDelay={startDelay}
      showCursor={showCursor}
      className={className}
    />
  );
}

/* ---------------------------------------------------------------------- */
/* Types once, triggered when scrolled into view. Used by Projects.tsx.   */
/* ---------------------------------------------------------------------- */

function OnceTypewriter({
  text,
  speed,
  startDelay,
  showCursor,
  className,
}: {
  text: string;
  speed: number;
  startDelay: number;
  showCursor: boolean;
  className?: string;
}) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.5 });
  const [displayed, setDisplayed] = useState("");
  const [done, setDone] = useState(false);

  useEffect(() => {
    if (!inView) return;

    let i = 0;
    let interval: ReturnType<typeof setInterval>;

    const timeout = setTimeout(() => {
      interval = setInterval(() => {
        i++;
        setDisplayed(text.slice(0, i));
        if (i >= text.length) {
          clearInterval(interval);
          setDone(true);
        }
      }, speed);
    }, startDelay);

    return () => {
      clearTimeout(timeout);
      clearInterval(interval);
    };
  }, [inView, text, speed, startDelay]);

  return (
    <span ref={ref} className={className}>
      {displayed}
      {showCursor && (
        <span
          className={`ml-0.5 inline-block h-[0.9em] w-[2px] translate-y-[0.1em] bg-current align-middle ${
            done ? "cursor-blink" : ""
          }`}
          aria-hidden="true"
        />
      )}
    </span>
  );
}

/* ---------------------------------------------------------------------- */
/* Loops through phrases: type -> pause -> delete -> next. Used by Hero.  */
/* ---------------------------------------------------------------------- */

function RotatingTypewriter({
  phrases,
  typingSpeed,
  deletingSpeed,
  pauseDuration,
  className,
  cursorClassName,
}: {
  phrases: string[];
  typingSpeed: number;
  deletingSpeed: number;
  pauseDuration: number;
  className?: string;
  cursorClassName?: string;
}) {
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [phase, setPhase] = useState<"typing" | "paused" | "deleting">(
    "typing"
  );
  const reducedMotionRef = useRef(false);

  useEffect(() => {
    reducedMotionRef.current =
      typeof window !== "undefined" &&
      window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // respect reduced motion: show the first phrase statically, no loop
    if (reducedMotionRef.current) {
      setDisplayed(phrases[0] ?? "");
    }
  }, [phrases]);

  useEffect(() => {
    if (reducedMotionRef.current) return;
    if (phrases.length === 0) return;

    const current = phrases[phraseIndex % phrases.length];
    let timeout: ReturnType<typeof setTimeout>;

    if (phase === "typing") {
      if (displayed.length < current.length) {
        const jitter = Math.random() * 24 - 12; // +/-12ms of natural variance
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length + 1));
        }, Math.max(20, typingSpeed + jitter));
      } else {
        timeout = setTimeout(() => setPhase("paused"), 10);
      }
    } else if (phase === "paused") {
      timeout = setTimeout(() => setPhase("deleting"), pauseDuration);
    } else {
      // deleting
      if (displayed.length > 0) {
        timeout = setTimeout(() => {
          setDisplayed(current.slice(0, displayed.length - 1));
        }, deletingSpeed);
      } else {
        timeout = setTimeout(() => {
          setPhraseIndex((i) => (i + 1) % phrases.length);
          setPhase("typing");
        }, 10);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayed, phase, phraseIndex, phrases, typingSpeed, deletingSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayed}
      <span
        className={`typewriter-caret ${
          phase === "paused" ? "typewriter-caret-blink" : ""
        } ${cursorClassName ?? ""}`}
        aria-hidden="true"
      />
    </span>
  );
}
