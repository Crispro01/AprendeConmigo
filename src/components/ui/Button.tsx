import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

type Variant = "primary" | "secondary" | "ghost";

type CommonProps = {
  children: ReactNode;
  variant?: Variant;
  className?: string;
  fullWidth?: boolean;
};

type ButtonAsButton = CommonProps & {
  href?: undefined;
  onClick?: () => void;
  type?: "button" | "submit";
  disabled?: boolean;
};

type ButtonAsLink = CommonProps & {
  href: string;
};

type ButtonProps = ButtonAsButton | ButtonAsLink;

const variantClasses: Record<Variant, string> = {
  primary:
    "bg-brand text-white hover:bg-brand-dark active:bg-brand-dark border-2 border-brand",
  secondary:
    "bg-white text-brand border-2 border-brand hover:bg-brand-soft active:bg-brand-soft",
  ghost:
    "bg-transparent text-ink border-2 border-border hover:bg-brand-soft active:bg-brand-soft",
};

const baseClasses =
  "inline-flex items-center justify-center gap-3 min-h-16 rounded-2xl px-8 py-3 text-xl font-bold transition-colors disabled:opacity-50 disabled:pointer-events-none";

export function Button(props: ButtonProps) {
  const { children, variant = "primary", className, fullWidth } = props;
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    fullWidth && "w-full",
    className,
  );

  if ("href" in props && props.href) {
    return (
      <Link href={props.href} className={classes}>
        {children}
      </Link>
    );
  }

  const buttonProps = props as ButtonAsButton;
  return (
    <button
      type={buttonProps.type ?? "button"}
      onClick={buttonProps.onClick}
      disabled={buttonProps.disabled}
      className={classes}
    >
      {children}
    </button>
  );
}
