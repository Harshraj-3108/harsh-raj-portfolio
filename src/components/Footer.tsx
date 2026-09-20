import { Code2 } from "lucide-react";
import { site } from "@/config/site";

export default function Footer() {
  return (
    <footer className="border-t border-white/10 px-6 py-8">
      <div className="mx-auto flex max-w-5xl flex-col items-center justify-between gap-3 text-sm text-[var(--text-muted)] sm:flex-row">
        <p>
          © {new Date().getFullYear()} {site.name}. All rights reserved.
        </p>
        <a
          href={site.links.github}
          target="_blank"
          rel="noopener noreferrer"
          className="flex items-center gap-1.5 transition-colors hover:text-[var(--text)]"
        >
          <Code2 size={14} strokeWidth={1.75} />
          Download Code
        </a>
      </div>
    </footer>
  );
}
