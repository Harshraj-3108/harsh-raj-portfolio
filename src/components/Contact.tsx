"use client";

import { useState } from "react";
import { Mail, CheckCircle2, AlertCircle } from "lucide-react";
import Reveal from "@/components/Reveal";
import { site } from "@/config/site";
import { isValidEmail } from "@/lib/emailValidation";

type Status = "idle" | "sending" | "sent" | "error";

export default function Contact() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [emailError, setEmailError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const normalizedEmail = email.trim();

    if (!isValidEmail(normalizedEmail)) {
      setEmailError("Please enter a valid email address.");
      setErrorMessage("");
      setStatus("idle");
      return;
    }

    setEmailError("");
    setStatus("sending");
    setErrorMessage("");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: normalizedEmail, message }),
      });

      const data = await res.json().catch(() => ({}));

      // only shown as a success once BOTH the Supabase save and the email
      // notification succeed server-side — see src/app/api/contact/route.ts
      if (!res.ok) {
        console.error("Contact submission failed:", data?.error);
        setErrorMessage(
          data?.error || "Something went wrong. Please try again."
        );
        setStatus("error");
        return;
      }

      setStatus("sent");
      setEmail("");
      setMessage("");
    } catch (err) {
      console.error("Contact submission network error:", err);
      setErrorMessage("Something went wrong. Please try again.");
      setStatus("error");
    }
  }

  const isSending = status === "sending";

  return (
    <section id="contact" className="relative px-6 py-28 sm:py-32">
      <div className="mx-auto max-w-xl">
        <Reveal className="text-center">
          <p className="text-xs font-semibold tracking-[0.2em] text-[var(--text-muted)] uppercase">
            Get in touch
          </p>
          <h2 className="font-display mt-3 text-5xl font-medium text-[var(--text)] sm:text-6xl">
            Let&apos;s{" "}
            <span className="italic bg-gradient-to-r from-[#f472b6] via-[#e879f9] to-[#c084fc] bg-clip-text text-transparent">
              Connect
            </span>
          </h2>
        </Reveal>

        <Reveal
          delay={0.15}
          className="mt-12 rounded-3xl border border-[var(--line-soft)] bg-[var(--surface-soft)] p-6 sm:p-8"
        >
          <a
            href={`mailto:${site.email}`}
            className="flex items-center justify-center gap-2 rounded-xl border border-[var(--line-soft)] px-4 py-3 text-sm text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)]"
          >
            <Mail size={16} strokeWidth={1.75} />
            {site.email}
          </a>

          <div className="my-6 flex items-center gap-4">
            <span className="h-px flex-1 bg-[var(--line-soft)]" />
            <span className="text-xs whitespace-nowrap text-[var(--text-muted)]">
              Or send a message
            </span>
            <span className="h-px flex-1 bg-[var(--line-soft)]" />
          </div>

          {status === "sent" ? (
            <div className="flex flex-col items-center gap-2 rounded-xl border border-emerald-400/20 bg-emerald-400/[0.06] px-4 py-8 text-center">
              <CheckCircle2 size={22} strokeWidth={1.75} className="text-emerald-300" />
              <p className="text-sm font-medium text-[var(--text)]">
                Message sent — thanks for reaching out!
              </p>
              <p className="text-xs text-[var(--text-muted)]">
                I&apos;ll get back to you soon.
              </p>
              <button
                type="button"
                onClick={() => setStatus("idle")}
                className="mt-2 text-xs text-[var(--text-muted)] underline underline-offset-2 hover:text-[var(--text)]"
              >
                Send another message
              </button>
            </div>
          ) : (
            <form
              onSubmit={handleSubmit}
              noValidate
              className="flex flex-col gap-4"
            >
              <input
                type="email"
                required
                value={email}
                onChange={(e) => {
                  const nextEmail = e.target.value;
                  setEmail(nextEmail);
                  if (isValidEmail(nextEmail)) {
                    setEmailError("");
                  }
                }}
                placeholder="Your Email"
                disabled={isSending}
                aria-invalid={emailError ? "true" : undefined}
                aria-describedby={emailError ? "contact-email-error" : undefined}
                className="rounded-xl border border-[var(--line-soft)] bg-transparent px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--text-muted)] disabled:opacity-60"
              />
              {emailError && (
                <p
                  id="contact-email-error"
                  className="-mt-2 text-xs text-rose-300"
                >
                  {emailError}
                </p>
              )}
              <textarea
                required
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Your Message"
                rows={5}
                disabled={isSending}
                className="resize-none rounded-xl border border-[var(--line-soft)] bg-[var(--surface-soft)] px-4 py-3 text-sm text-[var(--text)] placeholder:text-[var(--text-muted)] outline-none transition-colors focus:border-[var(--text-muted)] disabled:opacity-60"
              />
              <button
                type="submit"
                disabled={isSending}
                className="rounded-xl border border-[var(--line-soft)] px-4 py-3 text-sm font-medium text-[var(--text)] transition-colors hover:bg-[var(--surface-hover)] disabled:opacity-60"
              >
                {isSending ? "Sending..." : "Send Message"}
              </button>
              {status === "error" && (
                <p className="flex items-center justify-center gap-1.5 text-center text-xs text-rose-300">
                  <AlertCircle size={14} strokeWidth={1.75} />
                  {errorMessage ||
                    "Something went wrong. Please try again, or email me directly."}
                </p>
              )}
            </form>
          )}
        </Reveal>
      </div>
    </section>
  );
}
