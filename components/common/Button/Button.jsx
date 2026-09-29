import Link from "next/link";
import "./Button.css";
export default function Button({
  href,
  variant = "primary",
  children,
  className = "",
  onClick,
  type = "button",
}) {
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
