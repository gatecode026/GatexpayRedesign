import Link from "next/link";
import { ReactNode } from "react";
import "./Button.css";

type ButtonProps = {
  href?: string;
  variant?: "primary" | "secondary" | "ghost";
  children: ReactNode;
  className?: string;
  onClick?: () => void;
  type?: "button" | "submit";
};

export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
}: ButtonProps) {
  const classes = `btn btn-${variant} ${className}`.trim();

  if (href) {
    return (
      <Link href={href} className={classes}>
        {children}
      </Link>
    );
  }

  return (
    <button type={type} className={classes} onClick={onClick}>
      {children}
    </button>
  );
}
