"use client";

import { ArrowRight, ChevronDown } from "lucide-react";
import { site } from "@/config/site";
import Typewriter from "@/components/Typewriter";

const roles = [
  "Full Stack Developer",
  "MERN Stack Developer",
  "Backend Developer",
  "C++ & DSA Enthusiast",
  "Problem Solver",
];

export default function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-[100svh] overflow-hidden bg-[var(--bg)]"
    >
      {/* top accent hairline */}
      <div className="top-hairline absolute top-0 left-0 h-[2px] w-full" />

      {/* ambient background: soft radial glow + faint grid, both very subtle */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 55% 45% at 50% 30%, rgba(232,177,107,0.06), transparent 70%)",
        }}
      />
      <div
        aria-hidden="true"
        className="hero-grid-texture pointer-events-none absolute inset-0"
      />

      {/* a few tiny ambient dots, floating gently */}
      <span
        aria-hidden="true"
        className="float-dot pointer-events-none absolute top-[22%] left-[14%] hidden h-1 w-1 rounded-full bg-[var(--text)]/25 sm:block"
        style={{ animationDelay: "0s" }}
      />
      <span
        aria-hidden="true"
        className="float-dot pointer-events-none absolute top-[65%] left-[20%] hidden h-1.5 w-1.5 rounded-full bg-[var(--text)]/15 sm:block"
        style={{ animationDelay: "1.2s" }}
      />
      <span
        aria-hidden="true"
        className="float-dot pointer-events-none absolute top-[30%] right-[16%] hidden h-1 w-1 rounded-full bg-[var(--text)]/20 sm:block"
        style={{ animationDelay: "2.1s" }}
      />
      <span
        aria-hidden="true"
        className="float-dot pointer-events-none absolute top-[70%] right-[22%] hidden h-1.5 w-1.5 rounded-full bg-[var(--text)]/10 sm:block"
        style={{ animationDelay: "0.6s" }}
      />

      <div className="relative z-10 mx-auto flex min-h-[100svh] max-w-[1000px] flex-col items-center justify-center px-5 pt-28 pb-24 text-center sm:px-6">
        {/* eyebrow badge */}
        <div className="hero-enter badge-ring mb-6 rounded-full border border-[var(--line-soft)] px-4 py-1.5 text-xs text-[var(--text-muted)] sm:text-sm">
          {site.tagline}
        </div>

        {/* headline */}
        <h1 className="hero-enter hero-enter-delay-1 font-display text-[clamp(2rem,8.5vw,2.6rem)] leading-[1.15] font-medium text-[var(--text)] sm:text-6xl sm:leading-[1.14] lg:text-7xl">
          Building Digital Experiences
          <br />
          <span className="italic">That Feel Fast &amp; Effortless.</span>
        </h1>

        {/* rotating role typewriter */}
        <p className="hero-enter hero-enter-delay-2 mt-5 min-h-[1.6em] text-lg text-[var(--text-muted)] sm:mt-6 sm:text-xl">
          I&apos;m a{" "}
          <span className="font-medium text-[var(--text)]">
            <Typewriter
              phrases={roles}
              typingSpeed={70}
              deletingSpeed={40}
              pauseDuration={1800}
            />
          </span>
        </p>

        {/* description */}
        <p className="hero-enter hero-enter-delay-3 mx-auto mt-4 max-w-xl px-1 text-[15px] leading-7 text-[var(--text-muted)] sm:mt-5 sm:px-0 sm:text-base sm:leading-relaxed">
          Hey, I&apos;m {site.name} — a Computer Science student focused on
          building modern, scalable and user-friendly web applications.
        </p>

        {/* tiny tech line */}
        <p className="hero-enter hero-enter-delay-3 mt-3 text-xs tracking-wide text-[var(--text-muted)]/70 sm:text-sm">
          MERN Stack · C++ · DSA · Backend Development
        </p>

        {/* CTAs */}
        <div className="hero-enter hero-enter-delay-4 mt-7 flex flex-col items-center justify-center gap-3 min-[400px]:flex-row sm:mt-9 sm:gap-4">
          <a
            href={site.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="group flex max-[399px]:w-full max-[399px]:justify-center items-center gap-2 rounded-full border border-[var(--line-soft)] bg-[var(--surface)] px-6 py-3 text-sm font-medium text-[var(--text)] transition-all duration-[250ms] ease-out hover:-translate-y-0.5 hover:bg-[var(--surface-hover)] hover:shadow-[0_8px_24px_rgba(232,177,107,0.15)]"
          >
            <span aria-hidden="true">👋</span> Let&apos;s Connect
          </a>
          <a
            href={site.links.projects}
            className="group flex max-[399px]:w-full max-[399px]:justify-center items-center gap-2 rounded-full border border-[var(--line-soft)] px-6 py-3 text-sm font-medium text-[var(--text)] transition-all duration-[250ms] ease-out hover:border-[var(--text-muted)]"
          >
            View Projects{" "}
            <ArrowRight
              size={16}
              strokeWidth={1.75}
              className="transition-transform duration-[250ms] ease-out group-hover:translate-x-1"
            />
          </a>
        </div>

        {/* scroll indicator */}
        <a
          href={site.links.about}
          aria-label="Scroll to About section"
          className="hero-enter hero-enter-delay-4 mt-16 flex flex-col items-center gap-2 text-[11px] tracking-wide text-[var(--text-muted)]/60 uppercase transition-colors hover:text-[var(--text-muted)]"
        >
          Scroll to explore
          <ChevronDown size={14} strokeWidth={1.75} className="scroll-arrow" />
        </a>
      </div>

      {/* floating "currently building" card — desktop only, lower-right */}
      <div
        aria-hidden="false"
        className="float-slow pointer-events-none absolute right-10 bottom-24 hidden w-56 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface)] p-4 text-left shadow-[0_20px_40px_rgba(0,0,0,0.35)] backdrop-blur-sm lg:block"
      >
        <p className="text-[11px] tracking-wide text-[var(--text-muted)] uppercase">
          Currently building
        </p>
        <ul className="mt-2.5 flex flex-col gap-1.5 text-sm text-[var(--text)]">
          <li className="flex items-center gap-2">
            <span aria-hidden="true">⚡</span> Full Stack Projects
          </li>
          <li className="flex items-center gap-2 text-[var(--text-muted)]">
            <span aria-hidden="true">◉</span> MERN Stack
          </li>
          <li className="flex items-center gap-2 text-[var(--text-muted)]">
            <span aria-hidden="true">◉</span> Backend Systems
          </li>
        </ul>
      </div>

      {/* subtle ambient glow near the bottom, replacing the old huge arc */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[600px] -translate-x-1/2 translate-y-1/2"
        style={{
          background:
            "radial-gradient(ellipse 50% 50% at 50% 0%, rgba(200,210,225,0.08), transparent 75%)",
        }}
      />
    </section>
  );
}
