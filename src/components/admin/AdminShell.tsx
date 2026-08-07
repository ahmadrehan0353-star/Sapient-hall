"use client";

import * as React from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { GraduationCap, LayoutDashboard, LogOut, ExternalLink, Menu, X } from "lucide-react";
import { useAuth } from "@/components/admin/AuthProvider";
import { collectionDefs } from "@/components/admin/collection-config";
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { cn } from "@/lib/utils";

export function AdminShell({ children }: { children: React.ReactNode }) {
  const { user, role, loading, configured, logout } = useAuth();
  const router = useRouter();
  const pathname = usePathname();
  const [navOpen, setNavOpen] = React.useState(false);

  React.useEffect(() => {
    if (configured && !loading && !user) router.replace("/admin/login");
  }, [configured, loading, user, router]);

  if (!configured) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-muted p-6">
        <div className="w-full max-w-lg">
          <Alert variant="warning" title="Firebase not configured">
            The admin panel needs Firebase. Add <code>NEXT_PUBLIC_FIREBASE_*</code> variables to{" "}
            <code>.env.local</code>, create an Email/Password user in Firebase Auth, and add a role
            document in <code>admin_users</code>. Full steps are in the README.
          </Alert>
          <div className="mt-4 text-center">
            <Button href="/" variant="outline" size="md">Back to Website</Button>
          </div>
        </div>
      </main>
    );
  }

  if (loading || !user) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-muted" aria-busy="true">
        <p className="text-body-md text-navy-500">Loading admin…</p>
      </main>
    );
  }

  if (!role) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-surface-muted p-6">
        <div className="w-full max-w-lg">
          <Alert variant="error" title="No role assigned">
            Your account is signed in but has no role. Ask an administrator to create a document at{" "}
            <code>admin_users/{user.uid}</code> with <code>{`{ role: "admin" }`}</code> or{" "}
            <code>{`{ role: "editor" }`}</code>.
          </Alert>
          <div className="mt-4 text-center">
            <Button variant="outline" size="md" onClick={() => void logout()}>Sign Out</Button>
          </div>
        </div>
      </main>
    );
  }

  const nav = [{ slug: "", label: "Overview" }, ...collectionDefs.map((c) => ({ slug: c.slug, label: c.label }))];

  return (
    <div className="flex min-h-screen bg-surface-muted">
      <button
        className="fixed left-4 top-4 z-40 rounded-sm bg-navy-900 p-2.5 text-white shadow-lifted lg:hidden"
        onClick={() => setNavOpen((v) => !v)}
        aria-label={navOpen ? "Close admin menu" : "Open admin menu"}
        aria-expanded={navOpen}
      >
        {navOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      <aside className={cn(
        "fixed inset-y-0 left-0 z-30 flex w-64 flex-col bg-navy-900 text-white transition-transform lg:static lg:translate-x-0",
        navOpen ? "translate-x-0" : "-translate-x-full"
      )}>
        <div className="flex items-center gap-2.5 px-5 py-5">
          <span className="flex size-9 items-center justify-center rounded-sm bg-white/10 text-gold-400">
            <GraduationCap className="size-5" />
          </span>
          <div>
            <p className="font-display text-sm font-bold">Sapient Hall</p>
            <p className="text-[0.7rem] text-navy-300">Admin · {role}</p>
          </div>
        </div>
        <nav className="flex-1 overflow-y-auto px-3 py-2" aria-label="Admin">
          {nav.map((item) => {
            const href = item.slug ? `/admin/dashboard/${item.slug}` : "/admin/dashboard";
            const active = pathname === href;
            return (
              <Link
                key={href}
                href={href}
                onClick={() => setNavOpen(false)}
                className={cn(
                  "mb-0.5 flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm transition-colors",
                  active ? "bg-white/10 font-semibold text-gold-400" : "text-navy-200 hover:bg-white/5 hover:text-white"
                )}
              >
                {item.slug === "" && <LayoutDashboard className="size-4" />}
                {item.label}
              </Link>
            );
          })}
        </nav>
        <div className="space-y-1 border-t border-white/10 p-3">
          <Link href="/" className="flex items-center gap-2.5 rounded-sm px-3 py-2 text-sm text-navy-200 hover:bg-white/5 hover:text-white">
            <ExternalLink className="size-4" /> View Website
          </Link>
          <button onClick={() => void logout()} className="flex w-full items-center gap-2.5 rounded-sm px-3 py-2 text-left text-sm text-navy-200 hover:bg-white/5 hover:text-white">
            <LogOut className="size-4" /> Sign Out
          </button>
        </div>
      </aside>

      {navOpen && <div className="fixed inset-0 z-20 bg-navy-950/50 lg:hidden" onClick={() => setNavOpen(false)} aria-hidden />}

      <main className="flex-1 px-5 py-8 pt-16 lg:px-10 lg:pt-8">{children}</main>
    </div>
  );
}
