import Link from "next/link";
import type { ReactNode } from "react";
import clsx from "clsx";

type CardProps = {
  children: ReactNode;
  href?: string;
  className?: string;
};

const cardClasses =
  "block rounded-3xl border-2 border-border bg-white p-6 shadow-sm";

export function Card({ children, href, className }: CardProps) {
  if (href) {
    return (
      <Link
        href={href}
        className={clsx(
          cardClasses,
          "transition-transform hover:-translate-y-0.5 hover:shadow-md",
          className,
        )}
      >
        {children}
      </Link>
    );
  }

  return <div className={clsx(cardClasses, className)}>{children}</div>;
}
