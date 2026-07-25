import Link from "next/link";
import { type ReactNode } from "react";

type ButtonProps = {
  href?: string;
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost";
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

const variants = {
  primary:
    "bg-[#ffbe00] text-[#24182e] font-extrabold shadow-lg shadow-[#ffbe00]/20 hover:bg-[#ffbe00]/90 hover:shadow-[#ffbe00]/30 active:scale-98 transition-all duration-300",
  secondary:
    "border border-card-border bg-card/50 text-foreground hover:bg-card hover:border-[#ffbe00]/30 active:scale-98 transition-all duration-300 font-medium",
  ghost: "text-muted hover:text-foreground transition-colors",
};

export function Button({
  href,
  children,
  variant = "primary",
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const base =
    "inline-flex items-center justify-center gap-2 rounded-full px-6 py-3 text-sm transition-all duration-300 cursor-pointer";

  if (href) {
    const isExternal = href.startsWith("http");
    if (isExternal) {
      return (
        <a
          href={href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${base} ${variants[variant]} ${className}`}
        >
          {children}
        </a>
      );
    }
    return (
      <Link href={href} className={`${base} ${variants[variant]} ${className}`}>
        {children}
      </Link>
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`${base} ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}
