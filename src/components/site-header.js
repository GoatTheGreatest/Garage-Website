"use client";

import Link from "next/link";
import { useState, useSyncExternalStore } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ArrowUpRight, Menu, Moon, Sun, X } from "lucide-react";

const links = [
  { href: "/#explore", label: "Explore" },
  { href: "/#categories", label: "Categories" },
  { href: "/#about", label: "Our approach" },
];

function subscribeToTheme(onChange) {
  window.addEventListener("motor-atlas-theme-change", onChange);
  return () => window.removeEventListener("motor-atlas-theme-change", onChange);
}

function getThemeSnapshot() {
  return document.documentElement.dataset.theme === "dark";
}

function getServerThemeSnapshot() {
  return false;
}

export default function SiteHeader() {
  const [open, setOpen] = useState(false);
  const dark = useSyncExternalStore(
    subscribeToTheme,
    getThemeSnapshot,
    getServerThemeSnapshot,
  );
  const reduceMotion = useReducedMotion();

  function toggleTheme() {
    const nextTheme = dark ? "light" : "dark";
    document.documentElement.dataset.theme = nextTheme;
    try {
      window.localStorage.setItem("motor-atlas-theme", nextTheme);
    } catch {
      // Keep the current tab's theme if storage is unavailable.
    }
    window.dispatchEvent(new Event("motor-atlas-theme-change"));
  }

  return (
    <header className="site-header">
      <div className="header-inner">
        <Link
          className="brand"
          href="/"
          aria-label="Motor Atlas home"
          onClick={() => setOpen(false)}
        >
          <span className="brand-mark">
            <span />
          </span>
          <span>
            motor<span className="brand-light">atlas</span>
            <small>THE OPEN ROAD, EXPLAINED</small>
          </span>
        </Link>

        <nav className="desktop-nav" aria-label="Main navigation">
          {links.map((link) => (
            <Link href={link.href} key={link.label}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="header-actions">
          <Link className="header-cta" href="/#explore">
            Find your ride <ArrowUpRight size={15} />
          </Link>
          <button
            className="theme-toggle"
            type="button"
            onClick={toggleTheme}
            aria-label={`Switch to ${dark ? "light" : "dark"} drive mode`}
            aria-pressed={dark}
            title={`Switch to ${dark ? "light" : "dark"} drive mode`}
          >
            <span className="theme-toggle-track" aria-hidden="true">
              <motion.span
                className="theme-toggle-knob"
                animate={{ x: dark ? 62 : 0 }}
                transition={
                  reduceMotion
                    ? { duration: 0 }
                    : { type: "spring", stiffness: 420, damping: 28 }
                }
              >
                <AnimatePresence mode="wait" initial={false}>
                  <motion.span
                    key={dark ? "moon" : "sun"}
                    className="theme-toggle-icon"
                    initial={{ opacity: 0, scale: 0.65, rotate: -30 }}
                    animate={{ opacity: 1, scale: 1, rotate: 0 }}
                    exit={{ opacity: 0, scale: 0.65, rotate: 30 }}
                    transition={{ duration: reduceMotion ? 0 : 0.16 }}
                  >
                    {dark ? <Moon size={14} /> : <Sun size={14} />}
                  </motion.span>
                </AnimatePresence>
              </motion.span>
              <span
                className={`theme-toggle-label ${dark ? "is-night" : "is-day"}`}
              >
                {dark ? "NIGHT" : "DAY"}
              </span>
            </span>
          </button>
        </div>
        <button
          className="mobile-menu-button"
          aria-label={open ? "Close menu" : "Open menu"}
          aria-expanded={open}
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={21} /> : <Menu size={21} />}
        </button>
      </div>

      <AnimatePresence>
        {open && (
          <motion.nav
            className="mobile-nav"
            aria-label="Mobile navigation"
            initial={reduceMotion ? false : { opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={reduceMotion ? undefined : { opacity: 0, height: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.2 }}
          >
            {links.map((link) => (
              <Link
                href={link.href}
                key={link.label}
                onClick={() => setOpen(false)}
              >
                {link.label}
                <ArrowUpRight size={16} />
              </Link>
            ))}
          </motion.nav>
        )}
      </AnimatePresence>
      <span className="sr-only" aria-live="polite">
        {dark ? "Night drive mode enabled" : "Day drive mode enabled"}
      </span>
    </header>
  );
}
