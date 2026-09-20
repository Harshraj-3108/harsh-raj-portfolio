"use client";

import Reveal from "@/components/Reveal";
import Typewriter from "@/components/Typewriter";

export default function Projects() {
  return (
    <section id="projects" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-2xl text-center">
        <Reveal>
          <p className="min-h-[1em] text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase">
            <Typewriter text="Explore My Creations" speed={35} />
          </p>
          <h2 className="font-display mt-3 text-5xl font-medium text-[var(--text)] sm:text-6xl">
            Project{" "}
            <span className="italic bg-gradient-to-r from-[#7dd3fc] via-[#a78bfa] to-[#f472b6] bg-clip-text text-transparent">
              Showcase
            </span>
          </h2>
        </Reveal>

        {/* terminal-style "coming soon" card */}
        <Reveal delay={0.15} className="mt-16">
          <div className="mx-auto overflow-hidden rounded-2xl border border-white/10 bg-white/[0.02] text-left shadow-[0_20px_60px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-1.5 border-b border-white/10 px-4 py-3">
              <span className="h-3 w-3 rounded-full bg-[#ff5f56]" />
              <span className="h-3 w-3 rounded-full bg-[#ffbd2e]" />
              <span className="h-3 w-3 rounded-full bg-[#27c93f]" />
              <span className="ml-2 font-mono text-xs text-[var(--text-muted)]">
                projects.tsx
              </span>
            </div>
            <div className="px-6 py-14 text-center font-mono sm:px-10">
              <p className="min-h-[1.2em] text-sm text-[var(--text-muted)]">
                <Typewriter
                  text="$ building_awesome_projects --status"
                  speed={28}
                />
              </p>
              <div className="mt-5 min-h-[1.2em] text-3xl font-semibold text-[var(--text)] sm:text-4xl">
                <Typewriter text="Coming Soon" speed={90} startDelay={1400} />
              </div>
              <p className="mt-5 text-xs text-[var(--text-muted)]">
                New projects dropping soon. Stay tuned.
              </p>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
