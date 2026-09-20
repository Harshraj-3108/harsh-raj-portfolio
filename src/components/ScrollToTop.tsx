"use client";

import { useEffect } from "react";

/**
 * The browser's default "scroll restoration" tries to put you back where
 * you were before a refresh or back/forward navigation. For a single-page
 * portfolio that's the wrong behavior — refreshing while on the Contact
 * section, for example, should still open at Home. This disables that
 * restoration and forces the page to the top on first load.
 */
export default function ScrollToTop() {
  useEffect(() => {
    if (typeof window === "undefined") return;

    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "manual";
    }

    // only force-to-top on a plain load (no #hash in the URL) so a shared
    // link like yoursite.com/#projects still lands where it's supposed to
    if (!window.location.hash) {
      window.scrollTo(0, 0);
    }
  }, []);

  return null;
}
