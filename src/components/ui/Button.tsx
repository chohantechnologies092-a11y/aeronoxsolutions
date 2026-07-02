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
    "bg-gradient-to-r from-[#00c2ff] to-[#9b5cff] text-white shadow-lg shadow-[#00c2ff]/10 hover:shadow-[#00c2ff]/20 hover:brightness-105 active:scale-98 transition-all duration-300 font-medium",
  secondary:
    "border border-white/10 bg-white/5 text-foreground hover:bg-white/10 hover:border-white/20 active:scale-98 transition-all duration-300 font-medium",
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
