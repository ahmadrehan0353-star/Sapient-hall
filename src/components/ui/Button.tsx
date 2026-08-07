import * as React from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const variantClasses = {
  primary:
    "bg-navy-900 text-white hover:bg-navy-700 active:bg-navy-800 shadow-soft",
  gold:
    "bg-gold-500 text-navy-900 hover:bg-gold-400 active:bg-gold-600 shadow-soft font-semibold",
  outline:
    "border border-navy-900/15 text-navy-900 hover:bg-navy-900/5 active:bg-navy-900/10",
  ghost: "text-navy-900 hover:bg-navy-900/5 active:bg-navy-900/10",
  white: "bg-white text-navy-900 hover:bg-white/90 shadow-soft",
} as const;

const sizeClasses = {
  sm: "h-9 px-4 text-sm rounded-sm gap-1.5",
  md: "h-11 px-5 text-[0.95rem] rounded-sm gap-2",
  lg: "h-13 px-7 text-base rounded gap-2.5",
} as const;

type CommonProps = {
  variant?: keyof typeof variantClasses;
  size?: keyof typeof sizeClasses;
  loading?: boolean;
  icon?: React.ReactNode;
  iconPosition?: "left" | "right";
  className?: string;
  children: React.ReactNode;
};

type ButtonAsButton = CommonProps &
  Omit<React.ButtonHTMLAttributes<HTMLButtonElement>, keyof CommonProps> & {
    href?: undefined;
  };

type ButtonAsLink = CommonProps & {
  href: string;
  external?: boolean;
};

export type ButtonProps = ButtonAsButton | ButtonAsLink;

/**
 * Button — renders as <button> or, when given `href`, as a Next.js <Link>.
 * Always keyboard-focusable with a visible focus ring (see globals.css).
 */
export function Button(props: ButtonProps) {
  const {
    variant = "primary",
    size = "md",
    loading = false,
    icon,
    iconPosition = "right",
    className,
    children,
  } = props;

  const classes = cn(
    "inline-flex items-center justify-center font-medium transition-all duration-200",
    "disabled:opacity-50 disabled:pointer-events-none",
    "active:scale-[0.98]",
    variantClasses[variant],
    sizeClasses[size],
    className
  );

  const content = (
    <>
      {loading && <Loader2 className="size-4 animate-spin" aria-hidden />}
      {!loading && icon && iconPosition === "left" && icon}
      <span>{children}</span>
      {!loading && icon && iconPosition === "right" && icon}
    </>
  );

  if ("href" in props && props.href) {
    const { href, external } = props;
    if (external) {
      return (
        <a href={href} className={classes} target="_blank" rel="noopener noreferrer">
          {content}
        </a>
      );
    }
    return (
      <Link href={href} className={classes}>
        {content}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      className={classes}
      disabled={buttonProps.disabled || loading}
      aria-busy={loading || undefined}
      {...buttonProps}
    >
      {content}
    </button>
  );
}
