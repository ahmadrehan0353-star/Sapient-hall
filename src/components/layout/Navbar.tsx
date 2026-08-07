"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, Menu, X, GraduationCap } from "lucide-react";
import { cn } from "@/lib/utils";
import { siteConfig, navItems } from "@/lib/site-config";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = React.useState(false);
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [openDesktopMenu, setOpenDesktopMenu] = React.useState<string | null>(null);
  const pathname = usePathname();

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  React.useEffect(() => {
    setMobileOpen(false);
    setOpenDesktopMenu(null);
  }, [pathname]);

  return (
    <header
      className={cn(
        "sticky top-0 z-50 w-full transition-all duration-300",
        scrolled
          ? "border-b border-surface-border bg-white/85 backdrop-blur-md shadow-soft"
          : "border-b border-transparent bg-transparent"
      )}
    >
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      <div className="container-page flex h-20 items-center justify-between">
        <Link href="/" className="flex items-center gap-2.5" aria-label={`${siteConfig.name} — home`}>
          <span className="flex size-10 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
            <GraduationCap className="size-5" />
          </span>
          <span className="font-display text-lg font-semibold leading-none text-navy-900">
            {siteConfig.name}
          </span>
        </Link>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="hidden items-center gap-1 lg:flex">
          {navItems.map((item) => {
            const isOpen = openDesktopMenu === item.label;
            const isActive = pathname.startsWith(item.href) && item.href !== "/";
            return (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => item.children && setOpenDesktopMenu(item.label)}
                onMouseLeave={() => item.children && setOpenDesktopMenu(null)}
              >
                <Link
                  href={item.href}
                  className={cn(
                    "flex items-center gap-1 rounded-sm px-3.5 py-2.5 text-sm font-medium text-navy-700 transition-colors hover:bg-navy-900/5 hover:text-navy-900",
                    isActive && "text-navy-900"
                  )}
                  aria-expanded={item.children ? isOpen : undefined}
                  aria-haspopup={item.children ? "true" : undefined}
                >
                  {item.label}
                  {item.children && <ChevronDown className={cn("size-3.5 transition-transform", isOpen && "rotate-180")} />}
                </Link>

                <AnimatePresence>
                  {item.children && isOpen && (
                    <motion.div
                      initial={{ opacity: 0, y: 8 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: 8 }}
                      transition={{ duration: 0.16 }}
                      className="absolute left-0 top-full pt-2"
                    >
                      <div className="w-72 rounded-sm border border-surface-border bg-white p-2 shadow-lifted">
                        {item.children.map((child) => (
                          <Link
                            key={child.href}
                            href={child.href}
                            className="block rounded-xs px-3.5 py-2.5 transition-colors hover:bg-surface-muted"
                          >
                            <p className="text-sm font-medium text-navy-900">{child.label}</p>
                            {child.description && (
                              <p className="mt-0.5 text-caption text-navy-500">{child.description}</p>
                            )}
                          </Link>
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            );
          })}
        </nav>

        <div className="hidden items-center gap-3 lg:flex">
          <Button href="/admissions" size="md" variant="gold">
            Apply Now
          </Button>
        </div>

        {/* Mobile toggle */}
        <button
          className="flex size-11 items-center justify-center rounded-sm text-navy-900 lg:hidden"
          aria-label={mobileOpen ? "Close menu" : "Open menu"}
          aria-expanded={mobileOpen}
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X className="size-6" /> : <Menu className="size-6" />}
        </button>
      </div>

      {/* Mobile drawer */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.nav
            aria-label="Mobile"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.16, 1, 0.3, 1] }}
            className="overflow-hidden border-t border-surface-border bg-white lg:hidden"
          >
            <div className="container-page flex flex-col gap-1 py-4">
              {navItems.map((item) => (
                <MobileNavGroup key={item.label} item={item} />
              ))}
              <Button href="/admissions" size="lg" variant="gold" className="mt-3 w-full">
                Apply Now
              </Button>
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function MobileNavGroup({ item }: { item: (typeof navItems)[number] }) {
  const [open, setOpen] = React.useState(false);

  if (!item.children) {
    return (
      <Link href={item.href} className="rounded-sm px-3 py-3 text-base font-medium text-navy-800 hover:bg-surface-muted">
        {item.label}
      </Link>
    );
  }

  return (
    <div>
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between rounded-sm px-3 py-3 text-base font-medium text-navy-800 hover:bg-surface-muted"
        aria-expanded={open}
      >
        {item.label}
        <ChevronDown className={cn("size-4 transition-transform", open && "rotate-180")} />
      </button>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden pl-3"
          >
            {item.children.map((child) => (
              <Link key={child.href} href={child.href} className="block rounded-sm px-3 py-2.5 text-sm text-navy-600 hover:bg-surface-muted">
                {child.label}
              </Link>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
