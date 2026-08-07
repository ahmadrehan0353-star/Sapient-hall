"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { AdminShell } from "@/components/admin/AdminShell";
import { collectionDefs } from "@/components/admin/collection-config";
import { useAuth } from "@/components/admin/AuthProvider";

export default function AdminDashboardPage() {
  return (
    <AdminShell>
      <Overview />
    </AdminShell>
  );
}

function Overview() {
  const { user, role } = useAuth();
  return (
    <div>
      <h1 className="text-display-md">Dashboard</h1>
      <p className="mt-1 text-body-sm text-navy-500">
        Signed in as {user?.email} · role: <span className="font-medium text-navy-900">{role}</span>
      </p>
      <div className="mt-8 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
        {collectionDefs.map((c) => (
          <Link
            key={c.slug}
            href={`/admin/dashboard/${c.slug}`}
            className="group rounded-lg border border-surface-border bg-surface-card p-6 shadow-card transition-all hover:-translate-y-0.5 hover:shadow-lifted"
          >
            <h2 className="font-display text-lg font-semibold text-navy-900">{c.label}</h2>
            <p className="mt-1.5 line-clamp-2 text-body-sm text-navy-500">{c.description}</p>
            <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-900 group-hover:text-royal-600">
              Manage <ArrowRight className="size-3.5 transition-transform group-hover:translate-x-0.5" />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
