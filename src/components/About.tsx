"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { MapPin } from "lucide-react";
import { site } from "@/config/site";
import { techStack } from "@/config/techStack";
import Reveal from "@/components/Reveal";

type Education = {
  school: string;
  degree: string;
  period: string;
  detail: string;
};

type ExperienceItem = {
  company: string;
  role: string;
  period: string;
  points: string[];
};

// TODO: replace with your real education history
const education: Education[] = [
  {
    school: "Future Institute of Engineering and Management, Kolkata",
    degree: "B.Tech, Computer Science & Engineering",
    period: "2024 - 2028",
    detail: "",
  },
];

// TODO: replace with your real work / internship experience (leave the array empty if none yet)
const experience: ExperienceItem[] = [];

export default function About() {
  // `mounted` guards react-icons SVG rendering to the client only.
  // react-icons inject an inline `color` style prop (e.g. `color: "#F24E1E"`) that the
  // Dark Reader browser extension rewrites to `rgb(...)` + `data-darkreader-*` attrs after SSR
  // but before React hydration, causing a server/client mismatch warning.
  // By rendering the icon only after mount we ensure SSR outputs no icon markup,
  // eliminating the diff entirely without using suppressHydrationWarning.
  const [mounted, setMounted] = useState(false);
  useEffect(() => { setMounted(true); }, []);

  return (
    <section id="about" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-5xl">
        {/* heading */}
        <Reveal className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Get to know me
          </p>
          <h2 className="font-display mt-3 text-5xl font-medium text-[var(--text)] sm:text-6xl">
            About{" "}
            <span className="italic bg-gradient-to-r from-[var(--text)] via-[#d98bd9] to-[#8b7bd9] bg-clip-text text-transparent">
              Me
            </span>
          </h2>
        </Reveal>

        {/* content grid */}
        <div className="mt-16 grid grid-cols-1 gap-12 md:grid-cols-[240px_1px_1fr] md:gap-10">
          {/* left: photo + bio */}
          <Reveal
            delay={0.1}
            className="flex flex-col items-center text-center md:items-start md:text-left"
          >
            <div className="h-40 w-40 overflow-hidden rounded-full border border-[var(--line-soft)]">
              <Image
                src="/profile.jpg"
                alt={site.name}
                width={320}
                height={320}
                className="h-full w-full object-cover"
                priority
              />
            </div>
            <p className="mt-6 text-[15px] leading-relaxed text-[var(--text-muted)]">
              {site.bio}
            </p>
            <div className="mt-6 flex items-center gap-2 text-sm text-[var(--text-muted)]">
              <MapPin size={15} strokeWidth={1.75} />
              {site.location}
            </div>
          </Reveal>

          {/* divider */}
          <div className="hidden bg-[var(--line-soft)] md:block" />

          {/* right: education, experience, tech stack */}
          <div className="flex flex-col gap-10">
            {/* education */}
            <Reveal delay={0.15}>
              <h3 className="font-display text-2xl font-medium text-[var(--text)]">
                Education
              </h3>
              <div className="mt-4 flex flex-col gap-5 border-t border-[var(--line-soft)] pt-4">
                {education.map((edu) => (
                  <div
                    key={edu.school}
                    className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start"
                  >
                    <div>
                      <p className="font-semibold text-[var(--text)]">
                        {edu.school}
                      </p>
                      <p className="text-sm text-[var(--text-muted)]">
                        {edu.degree}
                      </p>
                    </div>
                    <div className="shrink-0 text-sm text-[var(--text-muted)] sm:text-right">
                      <p>{edu.period}</p>
                      {edu.detail && <p>{edu.detail}</p>}
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>

            {/* experience */}
            {experience.length > 0 && (
              <Reveal delay={0.2}>
                <h3 className="font-display text-2xl font-medium text-[var(--text)]">
                  Experience
                </h3>
                <div className="mt-4 flex flex-col gap-6 border-t border-[var(--line-soft)] pt-4">
                  {experience.map((exp) => (
                    <div key={exp.company}>
                      <div className="flex flex-col justify-between gap-1 sm:flex-row sm:items-start">
                        <div>
                          <p className="font-semibold text-[var(--text)]">
                            {exp.company}
                          </p>
                          <p className="text-sm text-[var(--text-muted)]">
                            {exp.role}
                          </p>
                        </div>
                        <p className="shrink-0 text-sm text-[var(--text-muted)]">
                          {exp.period}
                        </p>
                      </div>
                      <ul className="mt-3 flex flex-col gap-2">
                        {exp.points.map((point) => (
                          <li
                            key={point}
                            className="border-l-2 border-[var(--line-soft)] pl-3 text-sm text-[var(--text-muted)]"
                          >
                            {point}
                          </li>
                        ))}
                      </ul>
                    </div>
                  ))}
                </div>
              </Reveal>
            )}

            {/* tech stack */}
            <Reveal delay={experience.length > 0 ? 0.25 : 0.2}>
              <h3 className="font-display text-2xl font-medium text-[var(--text)]">
                Tech Stack
              </h3>
              <div className="mt-4 flex flex-wrap gap-2 border-t border-[var(--line-soft)] pt-4">
                {techStack.map((tech, i) => {
                  const Icon = tech.icon;
                  return (
                    <motion.span
                      key={tech.name}
                      initial={{ opacity: 0, y: 10 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true, amount: 0.4 }}
                      transition={{
                        duration: 0.35,
                        delay: 0.02 * i,
                        ease: "easeOut",
                      }}
                      className="flex items-center gap-1.5 rounded-full border border-[var(--line-soft)] bg-[var(--surface)] px-3.5 py-1.5 text-sm text-[var(--text)]"
                    >
                      {/* Icon rendered client-only to prevent Dark Reader hydration mismatch */}
                      {mounted && <Icon size={15} color={tech.color} />}
                      {tech.name}
                    </motion.span>
                  );
                })}
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
