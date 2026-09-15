"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";

import { Container } from "@/components/layout/container";
import { Button } from "@/components/ui/button";
import { NavLink } from "@/components/ui/nav-link";
import { siteConfig } from "@/data/site";
import { motionDuration, motionEase } from "@/lib/motion";
import { cn } from "@/lib/utils";

const SCROLL_THRESHOLD = 12;
const MOBILE_MEDIA = "(max-width: 767px)";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const reduceMotion = useReducedMotion();
  const headerRef = useRef<HTMLElement>(null);
  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const wasOpen = useRef(false);
  const menuId = "mobile-navigation";

  useEffect(() => {
    const updateScrolled = () => {
      setScrolled(window.scrollY > SCROLL_THRESHOLD);
    };

    updateScrolled();
    window.addEventListener("scroll", updateScrolled, { passive: true });

    return () => {
      window.removeEventListener("scroll", updateScrolled);
    };
  }, []);

  useEffect(() => {
    const media = window.matchMedia("(min-width: 768px)");

    const closeOnDesktop = () => {
      if (media.matches) {
        setOpen(false);
      }
    };

    media.addEventListener("change", closeOnDesktop);

    return () => {
      media.removeEventListener("change", closeOnDesktop);
    };
  }, []);

  useEffect(() => {
    if (!open) {
      return;
    }

    const header = headerRef.current;
    const main = document.getElementById("main-content");
    const scrollbarWidth =
      window.innerWidth - document.documentElement.clientWidth;
    const previousBodyOverflow = document.body.style.overflow;
    const previousBodyPadding = document.body.style.paddingRight;
    const previousHtmlOverflow = document.documentElement.style.overflow;

    document.body.style.overflow = "hidden";
    document.body.style.paddingRight = `${scrollbarWidth}px`;
    document.documentElement.style.overflow = "hidden";
    main?.setAttribute("inert", "");

    if (header) {
      header.style.paddingRight = `${scrollbarWidth}px`;
    }

    const getFocusable = () => {
      if (!header) {
        return [];
      }

      return Array.from(
        header.querySelectorAll<HTMLElement>("a[href], button:not([disabled])"),
      ).filter((element) => element.tabIndex !== -1);
    };

    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        event.preventDefault();
        setOpen(false);
        return;
      }

      if (event.key !== "Tab") {
        return;
      }

      const focusable = getFocusable();
      if (focusable.length === 0) {
        return;
      }

      const first = focusable[0];
      const last = focusable[focusable.length - 1];

      if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
      } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
      }
    };

    window.addEventListener("keydown", onKeyDown);

    return () => {
      document.body.style.overflow = previousBodyOverflow;
      document.body.style.paddingRight = previousBodyPadding;
      document.documentElement.style.overflow = previousHtmlOverflow;
      main?.removeAttribute("inert");

      if (header) {
        header.style.paddingRight = "";
      }

      window.removeEventListener("keydown", onKeyDown);
    };
  }, [open]);

  useEffect(() => {
    if (wasOpen.current && !open && window.matchMedia(MOBILE_MEDIA).matches) {
      menuButtonRef.current?.focus();
    }

    wasOpen.current = open;
  }, [open]);

  const closeMenu = () => setOpen(false);
  const solid = open || scrolled;
  const duration = reduceMotion ? 0 : motionDuration.fast;

  return (
    <header ref={headerRef} className="fixed inset-x-0 top-0 z-50">
      <a
        href="#main-content"
        tabIndex={open ? -1 : undefined}
        className="bg-card text-foreground sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:px-3 focus:py-2 focus:text-sm"
      >
        Skip to content
      </a>

      <div
        className={cn(
          "relative z-10 border-b transition-[background-color,border-color,backdrop-filter] duration-200",
          solid
            ? "border-border/80 bg-background/85 backdrop-blur-sm"
            : "border-transparent bg-transparent",
          "motion-reduce:transition-none",
        )}
      >
        <Container>
          <div className="flex h-(--header-height) items-center justify-between gap-6">
            <Link
              href="/"
              className="text-foreground shrink-0 text-sm font-semibold tracking-[0.22em]"
              onClick={closeMenu}
            >
              {siteConfig.name}
            </Link>

            <nav className="hidden md:block" aria-label="Primary">
              <ul className="flex items-center gap-8">
                {siteConfig.navigation.map((item) => (
                  <li key={item.href}>
                    <NavLink href={item.href}>{item.label}</NavLink>
                  </li>
                ))}
              </ul>
            </nav>

            <div className="hidden md:block">
              <Button href={siteConfig.cta.href}>{siteConfig.cta.label}</Button>
            </div>

            <button
              ref={menuButtonRef}
              type="button"
              className="text-muted hover:text-foreground -mr-2 inline-flex size-10 items-center justify-center rounded-md transition-colors duration-200 md:hidden"
              aria-expanded={open}
              aria-controls={menuId}
              aria-label={open ? "Close menu" : "Open menu"}
              onClick={() => setOpen((current) => !current)}
            >
              {open ? (
                <X aria-hidden="true" size={20} strokeWidth={1.75} />
              ) : (
                <Menu aria-hidden="true" size={20} strokeWidth={1.75} />
              )}
            </button>
          </div>
        </Container>
      </div>

      <AnimatePresence>
        {open ? (
          <motion.nav
            id={menuId}
            aria-label="Mobile"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={reduceMotion ? { opacity: 1 } : { opacity: 0 }}
            transition={{ duration, ease: motionEase }}
            className="bg-background fixed inset-x-0 top-(--header-height) flex h-[calc(100dvh-var(--header-height))] flex-col overflow-y-auto md:hidden"
          >
            <Container className="flex flex-1 flex-col py-8">
              <ul className="flex flex-col gap-6">
                {siteConfig.navigation.map((item, index) => (
                  <li key={item.href}>
                    <motion.div
                      initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{
                        duration: reduceMotion ? 0 : motionDuration.base,
                        delay: reduceMotion ? 0 : 0.05 + index * 0.05,
                        ease: motionEase,
                      }}
                    >
                      <NavLink
                        href={item.href}
                        onClick={closeMenu}
                        className="text-foreground text-2xl tracking-tight after:hidden"
                      >
                        {item.label}
                      </NavLink>
                    </motion.div>
                  </li>
                ))}
              </ul>

              <motion.div
                className="mt-10"
                initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: reduceMotion ? 0 : motionDuration.base,
                  delay: reduceMotion ? 0 : 0.22,
                  ease: motionEase,
                }}
              >
                <Button href={siteConfig.cta.href} onClick={closeMenu}>
                  {siteConfig.cta.label}
                </Button>
              </motion.div>
            </Container>
          </motion.nav>
        ) : null}
      </AnimatePresence>
    </header>
  );
}
