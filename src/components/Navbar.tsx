"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Home, SquareUser, SquareCode, Mail, Sun, Moon } from "lucide-react";
import { site } from "@/config/site";

function LinkedinIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4V8h4v1.5A5.98 5.98 0 0 1 16 8Z" />
      <rect x="2" y="9" width="4" height="12" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  );
}

function GithubIcon({ size = 17 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.75}
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M15 22v-3.4a3.3 3.3 0 0 0-.94-2.6c3.14-.35 6.44-1.54 6.44-7a5.44 5.44 0 0 0-1.5-3.75 5.07 5.07 0 0 0-.09-3.77s-1.18-.35-3.91 1.48a13.38 13.38 0 0 0-7 0C5.27.68 4.09 1.03 4.09 1.03a5.07 5.07 0 0 0-.09 3.77A5.44 5.44 0 0 0 2.5 8.55c0 5.42 3.3 6.61 6.44 7a3.3 3.3 0 0 0-.94 2.55V22" />
      <path d="M9 20c-3 .9-5.5 0-7-3" />
    </svg>
  );
}

const navItems = [
  { id: "home", href: site.links.home, label: "Home", icon: Home },
  { id: "about", href: site.links.about, label: "About", icon: SquareUser },
  { id: "projects", href: site.links.projects, label: "Projects", icon: SquareCode },
  { id: "contact", href: site.links.contact, label: "Contact", icon: Mail },
];

export default function Navbar() {
  const [isDark, setIsDark] = useState(true);
  const [active, setActive] = useState("home");

  useEffect(() => {
    const root = document.documentElement;
    const currentTheme = root.dataset.theme;
    if (currentTheme === "light" || currentTheme === "dark") {
      // The root theme is set before hydration to avoid a flash of the wrong theme.
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setIsDark(currentTheme === "dark");
    }
  }, []);

  function toggleTheme() {
    const nextTheme = isDark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    setIsDark(nextTheme === "dark");
    try {
      localStorage.setItem("portfolio-theme", nextTheme);
    } catch {
      // The theme still applies for the current visit if storage is unavailable.
    }
  }

  // scroll-spy: highlight whichever section the user has scrolled to.
  // Uses each section's position relative to scroll offset instead of
  // IntersectionObserver, so it can't get confused when two short
  // sections are visible at once — it always follows document order:
  // Home -> About -> Projects -> Contact.
  useEffect(() => {
    const sections = navItems
      .map((item) => document.getElementById(item.id))
      .filter((el): el is HTMLElement => el !== null);

    if (sections.length === 0) return;

    const NAVBAR_OFFSET = 140; // account for the fixed navbar height

    let ticking = false;

    function updateActive() {
      ticking = false;
      const scrollPos = window.scrollY + NAVBAR_OFFSET;

      let current = sections[0].id;
      for (const section of sections) {
        if (section.offsetTop <= scrollPos) {
          current = section.id;
        }
      }

      // if we're within a few px of the bottom of the page, force the
      // last section active (handles short final sections / footer gap)
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 4;
      if (atBottom) {
        current = sections[sections.length - 1].id;
      }

      setActive(current);
    }

    function onScroll() {
      if (!ticking) {
        ticking = true;
        requestAnimationFrame(updateActive);
      }
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  return (
    <nav className="fixed top-6 left-1/2 -translate-x-1/2 z-50">
      <div className="flex items-center gap-1.5 rounded-full border border-[var(--line-soft)] bg-[var(--nav-bg)]/90 px-2.5 py-2 shadow-[0_8px_30px_rgba(0,0,0,0.4)] backdrop-blur-md">
        {navItems.map(({ id, href, label, icon: Icon }) => {
          const isActive = active === id;
          return (
            <a
              key={label}
              href={href}
              aria-label={label}
              aria-current={isActive ? "page" : undefined}
              className="relative flex h-9 w-9 items-center justify-center rounded-full transition-colors"
            >
              {isActive && (
                <motion.span
                  layoutId="nav-active-pill"
                  className="absolute inset-0 rounded-full bg-[var(--text)]"
                  transition={{ type: "spring", stiffness: 400, damping: 32 }}
                />
              )}
              <motion.span
                whileHover={{ scale: 1.15, y: -1 }}
                whileTap={{ scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 15 }}
                className={`relative z-10 flex items-center justify-center transition-colors ${
                  isActive
                    ? "text-[var(--bg)]"
                    : "text-[var(--text-muted)] hover:text-[var(--text)]"
                }`}
              >
                <Icon size={17} strokeWidth={1.75} />
              </motion.span>
            </a>
          );
        })}

        <span className="mx-1 h-5 w-px bg-[var(--line-soft)]" aria-hidden="true" />

        <a
          href={site.links.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="LinkedIn"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
        >
          <motion.span
            whileHover={{ scale: 1.15, y: -1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex items-center justify-center"
          >
            <LinkedinIcon size={17} />
          </motion.span>
        </a>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="GitHub"
          className="flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
        >
          <motion.span
            whileHover={{ scale: 1.15, y: -1 }}
            whileTap={{ scale: 0.9 }}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="flex items-center justify-center"
          >
            <GithubIcon size={17} />
          </motion.span>
        </a>

        <span className="mx-1 h-5 w-px bg-[var(--line-soft)]" aria-hidden="true" />

        <button
          type="button"
          onClick={toggleTheme}
          aria-label={isDark ? "Switch to light mode" : "Switch to dark mode"}
          aria-pressed={!isDark}
          className="relative z-10 flex h-9 w-9 items-center justify-center rounded-full text-[var(--text-muted)] transition-colors hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
        >
          <AnimatePresence mode="wait" initial={false}>
            <motion.span
              key={isDark ? "sun" : "moon"}
              initial={{ opacity: 0, rotate: -90, scale: 0.6 }}
              animate={{ opacity: 1, rotate: 0, scale: 1 }}
              exit={{ opacity: 0, rotate: 90, scale: 0.6 }}
              transition={{ duration: 0.25 }}
              className="flex items-center justify-center"
            >
              {isDark ? (
                <Sun size={17} strokeWidth={1.75} />
              ) : (
                <Moon size={17} strokeWidth={1.75} />
              )}
            </motion.span>
          </AnimatePresence>
        </button>
      </div>
    </nav>
  );
}
