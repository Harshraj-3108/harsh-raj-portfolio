"use client";

import { useState, useCallback } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import Reveal from "@/components/Reveal";

// ─────────────────────────────────────────────────────────────────────────────
// ACHIEVEMENT DATA
// Edit this array to update or add achievements. Each entry renders as a
// separate timeline row. All text fields are intentionally editable.
// ─────────────────────────────────────────────────────────────────────────────
type Achievement = {
  index: string;
  category: string;
  title: string;
  organization: string;
  /** Program or specialization track */
  program?: string;
  /** Duration / period of the achievement */
  period: string;
  /** Primary project contributed to */
  project?: string;
  /** Summary of the experience and accomplishments */
  description: string;
  /**
   * Certificate image path inside /public (e.g. "/certificates/cert.png").
   * Clicking the button opens a preview modal + link to full-size image.
   * Set to null to show a "Certificate coming soon" placeholder instead.
   */
  certificateUrl: string | null;
};

const achievements: Achievement[] = [
  {
    index: "01",
    category: "Internship Experience",
    title: "MERN Stack Internship",
    organization: "Euphoria GenX",
    program: "Cloud-Based MERN Stack Development with AI Integration",
    period: "April 25, 2026 – September 8, 2026",
    project: "CiviCLens",
    description:
      "Successfully completed the Cloud-Based MERN Stack Development with AI Integration internship program, gaining practical experience in full-stack development and contributing to the CiviCLens project.",
    // ── Certificate ──────────────────────────────────────────────────────────
    // File is stored at: public/certificates/euphoria-genx-internship-certificate.png
    // To update: replace the file and keep the same filename, or change the path below.
    certificateUrl: "/certificates/euphoria-genx-internship-certificate.png",
  },
];

// ─────────────────────────────────────────────────────────────────────────────
// CERTIFICATE MODAL
// Lightweight lightbox — no extra packages, uses framer-motion (already installed).
// ─────────────────────────────────────────────────────────────────────────────
function CertificateModal({
  src,
  title,
  organization,
  onClose,
}: {
  src: string;
  title: string;
  organization: string;
  onClose: () => void;
}) {
  // Close on backdrop click
  const handleBackdrop = useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      if (e.target === e.currentTarget) onClose();
    },
    [onClose]
  );

  // Close on Escape key
  const handleKey = useCallback(
    (e: React.KeyboardEvent<HTMLDivElement>) => {
      if (e.key === "Escape") onClose();
    },
    [onClose]
  );

  return (
    <motion.div
      role="dialog"
      aria-modal="true"
      aria-label={`Certificate: ${title} at ${organization}`}
      tabIndex={-1}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
      onClick={handleBackdrop}
      onKeyDown={handleKey}
      className="fixed inset-0 z-[9999] flex items-center justify-center bg-black/80 px-4 py-8 backdrop-blur-sm"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.94, y: 16 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.94, y: 16 }}
        transition={{ duration: 0.28, ease: [0.16, 1, 0.3, 1] }}
        className="relative flex w-full max-w-3xl flex-col gap-4 rounded-2xl border border-[var(--line-soft)] bg-[var(--surface)] p-4 shadow-2xl"
      >
        {/* Header row */}
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
              {organization}
            </p>
            <p className="mt-0.5 text-sm font-medium text-[var(--text)]">
              {title}
            </p>
          </div>

          {/* Action buttons */}
          <div className="flex shrink-0 items-center gap-2">
            <a
              href={src}
              target="_blank"
              rel="noopener noreferrer"
              aria-label="Open certificate in new tab"
              className="inline-flex items-center gap-1 rounded-full border border-[var(--line-soft)] px-3 py-1 text-[11px] font-medium text-[var(--text)] transition-colors hover:border-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
            >
              Open full size
              <ArrowUpRight size={11} strokeWidth={2} aria-hidden="true" />
            </a>

            <button
              onClick={onClose}
              aria-label="Close certificate preview"
              className="flex h-7 w-7 items-center justify-center rounded-full border border-[var(--line-soft)] text-[var(--text-muted)] transition-colors hover:border-[var(--text-muted)] hover:bg-[var(--surface-hover)] hover:text-[var(--text)]"
            >
              <X size={13} strokeWidth={2} aria-hidden="true" />
            </button>
          </div>
        </div>

        {/* Certificate image */}
        <div className="relative w-full overflow-hidden rounded-lg border border-[var(--line-soft)] bg-black/20">
          <Image
            src={src}
            alt={`${title} certificate from ${organization}`}
            width={1200}
            height={850}
            className="h-auto w-full object-contain"
            priority
            unoptimized
          />
        </div>

        {/* Dismiss hint */}
        <p className="text-center text-[10px] text-[var(--text-muted)]/50">
          Press Esc or click outside to close
        </p>
      </motion.div>
    </motion.div>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SECTION
// ─────────────────────────────────────────────────────────────────────────────
export default function Achievements() {
  return (
    <section id="achievements" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-3xl">

        {/* Section heading */}
        <Reveal className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Achievements &amp; Milestones
          </p>
          <h2 className="font-display mt-3 text-5xl font-medium text-[var(--text)] sm:text-6xl">
            A little progress,{" "}
            <span className="italic">a meaningful milestone.</span>
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-[15px] leading-relaxed text-[var(--text-muted)]">
            Experiences and milestones shaping my journey as a developer.
          </p>
        </Reveal>

        {/* Timeline entries */}
        <div className="mt-16 flex flex-col gap-0">
          {achievements.map((item, i) => (
            <AchievementEntry
              key={item.index}
              item={item}
              delay={0.1 + i * 0.08}
            />
          ))}
        </div>

      </div>
    </section>
  );
}

// ─────────────────────────────────────────────────────────────────────────────
// SINGLE ENTRY — editorial timeline row
// ─────────────────────────────────────────────────────────────────────────────
function AchievementEntry({
  item,
  delay,
}: {
  item: Achievement;
  delay: number;
}) {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Reveal delay={delay}>
        <motion.div
          whileHover={{ y: -2 }}
          transition={{ type: "spring", stiffness: 300, damping: 24 }}
          className="group relative border-t border-[var(--line-soft)] py-8 transition-colors first:border-t-0 hover:bg-[var(--surface-soft)] sm:py-10"
          style={{ borderRadius: "0.75rem" }}
        >
          {/* Accent rule — fades in on hover */}
          <span
            aria-hidden="true"
            className="absolute left-0 top-8 h-6 w-[1.5px] rounded-full bg-[var(--accent)] opacity-0 transition-all duration-300 ease-out group-hover:opacity-100 sm:top-10"
          />

          {/* Outer flex row */}
          <div className="flex flex-col gap-5 px-4 sm:flex-row sm:items-start sm:gap-8 sm:px-6">

            {/* Left column — index + category pill */}
            <div className="flex shrink-0 flex-row items-center gap-3 sm:w-40 sm:flex-col sm:items-start sm:gap-2">
              <span className="font-display text-4xl font-medium leading-none text-[var(--text-muted)]/30 sm:text-5xl">
                {item.index}
              </span>
              <span className="inline-block rounded-full border border-[var(--line-soft)] px-3 py-1 text-[10px] font-semibold uppercase tracking-[0.15em] text-[var(--text-muted)]">
                {item.category}
              </span>
            </div>

            {/* Right column — main content */}
            <div className="flex flex-1 flex-col gap-2">

              {/* Org + period */}
              <div className="flex flex-wrap items-baseline justify-between gap-2">
                <p className="text-xs font-semibold uppercase tracking-[0.18em] text-[var(--accent)]">
                  {item.organization}
                </p>
                <p className="text-xs text-[var(--text-muted)]">{item.period}</p>
              </div>

              {/* Title */}
              <h3 className="font-display text-2xl font-medium text-[var(--text)] sm:text-3xl">
                {item.title}
              </h3>

              {/* Program + Project meta — subtle secondary line */}
              {(item.program || item.project) && (
                <div className="mt-0.5 flex flex-wrap gap-x-4 gap-y-1">
                  {item.program && (
                    <p className="text-[12px] text-[var(--text-muted)]/70 leading-relaxed">
                      <span className="font-medium text-[var(--text-muted)]">Program:</span>{" "}
                      {item.program}
                    </p>
                  )}
                  {item.project && (
                    <p className="text-[12px] text-[var(--text-muted)]/70 leading-relaxed">
                      <span className="font-medium text-[var(--text-muted)]">Project:</span>{" "}
                      {item.project}
                    </p>
                  )}
                </div>
              )}

              {/* Description */}
              <p className="mt-1 text-[15px] leading-relaxed text-[var(--text-muted)]">
                {item.description}
              </p>

              {/* Certificate button */}
              <div className="mt-4">
                {item.certificateUrl ? (
                  <motion.button
                    type="button"
                    onClick={() => setModalOpen(true)}
                    aria-label={`View certificate for ${item.title} at ${item.organization}`}
                    whileHover={{ y: -1 }}
                    whileTap={{ scale: 0.97 }}
                    transition={{ type: "spring", stiffness: 400, damping: 20 }}
                    className="group/cert inline-flex items-center gap-1.5 rounded-full border border-[var(--line-soft)] px-4 py-1.5 text-xs font-medium text-[var(--text)] transition-colors duration-200 hover:border-[var(--text-muted)] hover:bg-[var(--surface-hover)]"
                  >
                    View Certificate
                    <ArrowUpRight
                      size={13}
                      strokeWidth={2}
                      className="transition-transform duration-200 group-hover/cert:translate-x-0.5 group-hover/cert:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </motion.button>
                ) : (
                  <span
                    aria-label="Certificate not yet available"
                    className="inline-flex cursor-default select-none items-center gap-1.5 rounded-full border border-[var(--line-soft)] px-4 py-1.5 text-xs font-medium text-[var(--text-muted)]/50"
                  >
                    Certificate coming soon
                  </span>
                )}
              </div>

            </div>
          </div>
        </motion.div>
      </Reveal>

      {/* ── Certificate modal ─────────────────────────────────────────────── */}
      <AnimatePresence>
        {modalOpen && item.certificateUrl && (
          <CertificateModal
            src={item.certificateUrl}
            title={item.title}
            organization={item.organization}
            onClose={() => setModalOpen(false)}
          />
        )}
      </AnimatePresence>
    </>
  );
}
