import * as React from "react";
import { CheckCircle2, AlertTriangle, XCircle, Info } from "lucide-react";
import { cn } from "@/lib/utils";

const config = {
  success: { icon: CheckCircle2, classes: "bg-emerald-50 text-emerald-600 border-emerald-500/20" },
  warning: { icon: AlertTriangle, classes: "bg-amber-50 text-amber-600 border-amber-500/20" },
  error: { icon: XCircle, classes: "bg-crimson-50 text-crimson-600 border-crimson-500/20" },
  info: { icon: Info, classes: "bg-royal-500/8 text-royal-700 border-royal-500/20" },
} as const;

export function Alert({
  variant = "info",
  title,
  children,
  className,
}: {
  variant?: keyof typeof config;
  title?: string;
  children?: React.ReactNode;
  className?: string;
}) {
  const { icon: Icon, classes } = config[variant];
  return (
    <div role="alert" className={cn("flex gap-3 rounded-sm border p-4", classes, className)}>
      <Icon className="mt-0.5 size-5 shrink-0" aria-hidden />
      <div className="text-body-sm">
        {title && <p className="mb-0.5 font-semibold">{title}</p>}
        {children && <div className="text-navy-700/90">{children}</div>}
      </div>
    </div>
  );
}
