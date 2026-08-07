"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ArrowRight, Loader2, CheckCircle2 } from "lucide-react";
import { cn } from "@/lib/utils";

const schema = z.object({
  email: z.string().min(1, "Email is required").email("Enter a valid email address"),
});
type FormValues = z.infer<typeof schema>;

export function NewsletterForm({ variant = "light" }: { variant?: "light" | "dark" }) {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting, isSubmitSuccessful },
  } = useForm<FormValues>({ resolver: zodResolver(schema) });

  const dark = variant === "dark";

  async function onSubmit(values: FormValues) {
    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(values),
    });
    if (!res.ok) throw new Error("Subscribe failed");
    reset();
  }

  if (isSubmitSuccessful) {
    return (
      <p className={cn("mt-4 flex items-center gap-2 text-sm", dark ? "text-emerald-500" : "text-emerald-600")}>
        <CheckCircle2 className="size-4" /> You&apos;re subscribed — thank you.
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} noValidate className="mt-4">
      <div className="flex items-stretch gap-2">
        <label htmlFor="newsletter-email" className="sr-only">
          Email address
        </label>
        <input
          id="newsletter-email"
          type="email"
          placeholder="you@example.com"
          aria-invalid={!!errors.email || undefined}
          aria-describedby={errors.email ? "newsletter-error" : undefined}
          className={cn(
            "w-full min-w-0 rounded-sm border px-3.5 py-2.5 text-sm outline-none transition-colors",
            dark
              ? "border-navy-700 bg-navy-800 text-white placeholder:text-navy-500 focus:border-gold-500"
              : "border-surface-border bg-white text-navy-900 focus:border-royal-500"
          )}
          {...register("email")}
        />
        <button
          type="submit"
          disabled={isSubmitting}
          aria-label="Subscribe"
          className="flex size-11 shrink-0 items-center justify-center rounded-sm bg-gold-500 text-navy-900 transition-colors hover:bg-gold-400 disabled:opacity-60"
        >
          {isSubmitting ? <Loader2 className="size-4 animate-spin" /> : <ArrowRight className="size-4" />}
        </button>
      </div>
      {errors.email && (
        <p id="newsletter-error" role="alert" className={cn("mt-1.5 text-sm", dark ? "text-crimson-500" : "text-crimson-500")}>
          {errors.email.message}
        </p>
      )}
    </form>
  );
}
