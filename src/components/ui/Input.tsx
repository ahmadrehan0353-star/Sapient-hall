import * as React from "react";
import { cn } from "@/lib/utils";

const fieldBase =
  "w-full rounded-sm border bg-white px-4 py-2.5 text-body-sm text-navy-900 placeholder:text-navy-400 " +
  "transition-colors duration-150 outline-none disabled:cursor-not-allowed disabled:opacity-50";

const fieldState = (hasError?: boolean) =>
  hasError
    ? "border-crimson-500 focus:border-crimson-500 focus:ring-2 focus:ring-crimson-500/20"
    : "border-surface-border focus:border-royal-500 focus:ring-2 focus:ring-royal-500/15";

export function Label({ className, required, children, ...props }: React.LabelHTMLAttributes<HTMLLabelElement> & { required?: boolean }) {
  return (
    <label className={cn("mb-1.5 block text-sm font-medium text-navy-800", className)} {...props}>
      {children}
      {required && <span className="ml-0.5 text-crimson-500" aria-hidden> *</span>}
    </label>
  );
}

export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement> & { error?: string }
>(function Input({ className, error, ...props }, ref) {
  return (
    <input
      ref={ref}
      className={cn(fieldBase, fieldState(!!error), className)}
      aria-invalid={!!error || undefined}
      {...props}
    />
  );
});

export const Textarea = React.forwardRef<
  HTMLTextAreaElement,
  React.TextareaHTMLAttributes<HTMLTextAreaElement> & { error?: string }
>(function Textarea({ className, error, ...props }, ref) {
  return (
    <textarea
      ref={ref}
      className={cn(fieldBase, fieldState(!!error), "min-h-[120px] resize-y", className)}
      aria-invalid={!!error || undefined}
      {...props}
    />
  );
});

export const Select = React.forwardRef<
  HTMLSelectElement,
  React.SelectHTMLAttributes<HTMLSelectElement> & { error?: string }
>(function Select({ className, error, children, ...props }, ref) {
  return (
    <select
      ref={ref}
      className={cn(fieldBase, fieldState(!!error), "appearance-none bg-[url('data:image/svg+xml;utf8,<svg xmlns=%22http://www.w3.org/2000/svg%22 width=%2212%22 height=%228%22 fill=%22none%22><path d=%22M1 1l5 5 5-5%22 stroke=%22%23070E22%22 stroke-width=%221.5%22/></svg>')] bg-[right_1rem_center] bg-no-repeat pr-10", className)}
      aria-invalid={!!error || undefined}
      {...props}
    >
      {children}
    </select>
  );
});

export function FieldError({ children }: { children?: string }) {
  if (!children) return null;
  return (
    <p role="alert" className="mt-1.5 text-sm text-crimson-500">
      {children}
    </p>
  );
}
