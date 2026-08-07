"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { GraduationCap, LockKeyhole } from "lucide-react";
import { useAuth } from "@/components/admin/AuthProvider";
import { Button } from "@/components/ui/Button";
import { Input, Label } from "@/components/ui/Input";
import { Alert } from "@/components/ui/Alert";

export default function AdminLoginPage() {
  const { login, user, loading, configured } = useAuth();
  const router = useRouter();
  const [email, setEmail] = React.useState("");
  const [password, setPassword] = React.useState("");
  const [error, setError] = React.useState<string | null>(null);
  const [submitting, setSubmitting] = React.useState(false);

  React.useEffect(() => {
    if (!loading && user) router.replace("/admin/dashboard");
  }, [loading, user, router]);

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      await login(email, password);
      router.replace("/admin/dashboard");
    } catch {
      setError("Invalid email or password.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="relative flex min-h-screen items-center justify-center overflow-hidden bg-navy-900 p-4">
      <div className="absolute inset-0 bg-mesh-navy" aria-hidden />
      <div className="relative w-full max-w-md rounded-lg border border-white/10 bg-white p-8 shadow-lifted sm:p-10">
        <div className="flex items-center gap-3">
          <span className="flex size-11 items-center justify-center rounded-sm bg-navy-900 text-gold-400">
            <GraduationCap className="size-6" />
          </span>
          <div>
            <p className="font-display text-lg font-bold text-navy-900">Sapient Hall</p>
            <p className="text-caption text-navy-400">Admin Panel</p>
          </div>
        </div>

        {!configured ? (
          <Alert variant="warning" title="Firebase not configured" className="mt-8">
            Add your <code>NEXT_PUBLIC_FIREBASE_*</code> variables to <code>.env.local</code> to
            enable the admin panel. See the README for full setup steps.
          </Alert>
        ) : (
          <form onSubmit={handleSubmit} className="mt-8 space-y-5">
            {error && <Alert variant="error">{error}</Alert>}
            <div>
              <Label htmlFor="admin-email" required>Email</Label>
              <Input id="admin-email" type="email" autoComplete="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
            </div>
            <div>
              <Label htmlFor="admin-password" required>Password</Label>
              <Input id="admin-password" type="password" autoComplete="current-password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            </div>
            <Button type="submit" variant="primary" size="lg" loading={submitting} className="w-full" icon={<LockKeyhole className="size-4" />} iconPosition="left">
              Sign In
            </Button>
          </form>
        )}
      </div>
    </main>
  );
}
