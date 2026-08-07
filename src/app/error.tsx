"use client";

import * as React from "react";
import { RotateCcw, Home } from "lucide-react";
import { Button } from "@/components/ui/Button";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  React.useEffect(() => {
    console.error("App error:", error);
  }, [error]);

  return (
    <section className="flex min-h-[60vh] items-center justify-center bg-surface-soft px-4 py-24">
      <div className="text-center">
        <p className="font-mono text-sm uppercase tracking-widest text-crimson-500">Something went wrong</p>
        <h1 className="mt-3 max-w-lg text-display-md text-navy-900">
          That didn&apos;t work — let&apos;s try again.
        </h1>
        <p className="mx-auto mt-3 max-w-md text-body-md text-navy-500">
          The error has been logged. If it keeps happening, please let us know via the contact page.
        </p>
        <div className="mt-8 flex flex-wrap justify-center gap-3">
          <Button onClick={reset} variant="primary" size="lg" icon={<RotateCcw className="size-4" />} iconPosition="left">
            Try Again
          </Button>
          <Button href="/" variant="outline" size="lg" icon={<Home className="size-4" />} iconPosition="left">
            Back to Home
          </Button>
        </div>
      </div>
    </section>
  );
}
