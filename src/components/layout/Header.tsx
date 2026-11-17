"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { ChevronDown, Menu, X, Phone } from "lucide-react";
import { Logo } from "@/components/brand/Logo";
import { ButtonLink } from "@/components/ui/Button";
import { mainNav, site } from "@/content/site";
import { divisions } from "@/content/divisions";

export function Header() {
  const pathname = usePathname();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [servicesOpen, setServicesOpen] = useState(false);
  const reduce = useReducedMotion();
  const menuBtnRef = useRef<HTMLButtonElement>(null);
  const panelRef = useRef<HTMLLIElement>(null);
  const closeTimer = useRef<number | undefined>(undefined);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close menus on route change (state adjustment during render)
  const [prevPath, setPrevPath] = useState(pathname);
  if (prevPath !== pathname) {
    setPrevPath(pathname);
    setMenuOpen(false);
    setServicesOpen(false);
  }

  // Mobile menu: lock scroll, Escape to close, focus first link
  useEffect(() => {
    if (!menuOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setMenuOpen(false);
        menuBtnRef.current?.focus();
      }
    };
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener("keydown", onKey);
    };
  }, [menuOpen]);

  useEffect(() => {
    if (!servicesOpen) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setServicesOpen(false);
    const onClick = (e: MouseEvent) => {
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) setServicesOpen(false);
    };
    window.addEventListener("keydown", onKey);
    window.addEventListener("mousedown", onClick);
    return () => {
      window.removeEventListener("keydown", onKey);
      window.removeEventListener("mousedown", onClick);
    };
  }, [servicesOpen]);

  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");
  const solid = scrolled || menuOpen || servicesOpen;
  // Pages whose hero is dark get a light-on-dark header until scrolled
  const onDark = !solid && /^\/services\/.+/.test(pathname);

  const openServices = () => {
    window.clearTimeout(closeTimer.current);
    setServicesOpen(true);
  };
  const closeServicesSoon = () => {
    closeTimer.current = window.setTimeout(() => setServicesOpen(false), 160);
  };

  return (
    <>
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,box-shadow] duration-500 ${
        solid ? "border-b border-line bg-paper/95 backdrop-blur-md" : "border-b border-transparent bg-transparent"
      }`}
    >
      <div className="container-x flex h-18 items-center justify-between gap-6 md:h-20">
        <Logo priority variant={onDark ? "dark" : "light"} className="h-9 w-auto md:h-10" />

        <nav aria-label="Primary" className="hidden lg:block">
          <ul className="flex items-center gap-1">
            {mainNav.map((item) =>
              item.href === "/services" ? (
                <li key={item.href} ref={panelRef} className="relative" onMouseEnter={openServices} onMouseLeave={closeServicesSoon}>
                  <div className="flex items-center">
                    <NavLink href={item.href} active={isActive(item.href)} onDark={onDark}>
                      {item.label}
                    </NavLink>
                    <button
                      type="button"
                      aria-expanded={servicesOpen}
                      aria-controls="services-panel"
                      aria-label="Show service divisions"
                      onClick={(e) => {
                        // Mouse users already opened it on hover; keyboard (detail 0) and touch toggle.
                        if (e.detail === 0) setServicesOpen((v) => !v);
                        else setServicesOpen(true);
                      }}
                      className={`-ml-2 grid size-8 place-items-center ${onDark ? "text-mist hover:text-white" : "text-slate hover:text-ink"}`}
                    >
                      <ChevronDown className={`size-4 transition-transform duration-300 ${servicesOpen ? "rotate-180" : ""}`} />
                    </button>
                  </div>
                  <AnimatePresence>
                    {servicesOpen && (
                      <motion.div
                        id="services-panel"
                        initial={reduce ? false : { opacity: 0, y: -6 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={reduce ? undefined : { opacity: 0, y: -6 }}
                        transition={{ duration: 0.25, ease: [0.22, 1, 0.36, 1] }}
                        className="absolute top-full left-1/2 w-[38rem] -translate-x-1/2 pt-4"
                      >
                        <div className="border border-line bg-paper shadow-[0_30px_60px_-30px_rgb(7_21_48/0.35)]">
                          <ul className="grid grid-cols-2">
                            {divisions.map((d, i) => (
                              <li key={d.slug} className={`${i % 2 === 0 ? "border-r" : ""} ${i < 2 ? "border-b" : ""} border-line`}>
                                <Link href={`/services/${d.slug}`} className="group flex h-full flex-col gap-2 p-5 transition-colors hover:bg-white">
                                  <span className="eyebrow text-brand-red-700">{d.index} · {d.kicker}</span>
                                  <span className="font-medium leading-snug group-hover:text-brand-blue-600">{d.shortName}</span>
                                  <span className="text-sm leading-relaxed text-slate line-clamp-2">{d.summary}</span>
                                </Link>
                              </li>
                            ))}
                          </ul>
                          <Link href="/services" className="eyebrow flex items-center justify-between border-t border-line bg-paper-2 px-5 py-3 text-ink hover:text-brand-blue-600">
                            All services overview <span aria-hidden>→</span>
                          </Link>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </li>
              ) : (
                <li key={item.href}>
                  <NavLink href={item.href} active={isActive(item.href)} onDark={onDark}>
                    {item.label}
                  </NavLink>
                </li>
              ),
            )}
          </ul>
        </nav>

        <div className="flex items-center gap-3">
          <a href={site.contact.phoneHref} className={`hidden items-center gap-2 text-sm xl:flex ${onDark ? "text-mist hover:text-white" : "text-slate hover:text-ink"}`}>
            <Phone className="size-4" aria-hidden />
            {site.contact.phoneDisplay}
          </a>
          <div className="hidden md:block">
            <ButtonLink href="/contact#enquiry" className="!py-3">
              Start a project
            </ButtonLink>
          </div>
          <button
            ref={menuBtnRef}
            type="button"
            className={`grid size-11 place-items-center border lg:hidden ${onDark ? "border-white/30 text-white" : "border-ink/15"}`}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            onClick={() => setMenuOpen((v) => !v)}
          >
            {menuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
        </div>
      </div>

    </header>
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            initial={reduce ? false : { clipPath: "inset(0 0 100% 0)" }}
            animate={{ clipPath: "inset(0 0 0% 0)" }}
            exit={reduce ? undefined : { clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
            className="on-dark bg-blueprint-dark fixed inset-x-0 top-18 bottom-0 z-40 overflow-y-auto bg-navy-950 text-white md:top-20 lg:hidden"
          >
            <nav aria-label="Mobile" className="container-x flex min-h-full flex-col py-8">
              <ul className="border-t border-line-dark">
                {[{ label: "Home", href: "/" }, ...mainNav].map((item, i) => (
                  <li key={item.href} className="border-b border-line-dark">
                    <Link
                      href={item.href}
                      autoFocus={i === 0}
                      aria-current={pathname === item.href ? "page" : undefined}
                      className="flex items-baseline gap-4 py-5 text-3xl font-medium tracking-tight sm:text-4xl"
                    >
                      <span className="eyebrow text-mist">0{i + 1}</span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
              <ul className="mt-6 grid gap-1">
                {divisions.map((d) => (
                  <li key={d.slug}>
                    <Link href={`/services/${d.slug}`} className="flex items-center gap-3 py-2 text-mist hover:text-white">
                      <span className="size-1.5 bg-brand-red" aria-hidden /> {d.shortName}
                    </Link>
                  </li>
                ))}
              </ul>
              <div className="mt-auto grid gap-3 pt-10">
                <ButtonLink href="/contact#enquiry" variant="red" className="w-full">
                  Start a project
                </ButtonLink>
                <a href={site.contact.phoneHref} className="eyebrow py-2 text-mist">
                  {site.contact.phoneDisplay}
                </a>
                <a href={`mailto:${site.contact.email}`} className="eyebrow break-all text-mist">
                  {site.contact.email}
                </a>
              </div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

function NavLink({ href, active, onDark, children }: { href: string; active: boolean; onDark?: boolean; children: React.ReactNode }) {
  return (
    <Link
      href={href}
      aria-current={active ? "page" : undefined}
      className={`relative inline-flex items-center gap-2 px-3.5 py-2 text-[0.95rem] transition-colors ${onDark ? (active ? "text-white" : "text-mist hover:text-white") : active ? "text-ink" : "text-slate hover:text-ink"}`}
    >
      <span aria-hidden className={`size-1.5 bg-brand-red transition-transform duration-300 ${active ? "scale-100" : "scale-0"}`} />
      {children}
    </Link>
  );
}
