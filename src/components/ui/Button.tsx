import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Button.css";

type Variant = "primary" | "outline" | "ghost";
type Size = "sm" | "md" | "lg";

interface ButtonProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  variant?: Variant;
  size?: Size;
  block?: boolean;
  withArrow?: boolean;
}

export function ArrowIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="15"
      height="12"
      viewBox="0 0 15 12"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M1 6h12M8.5 1.5 13 6l-4.5 4.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

/** Primary call to action. Renders as an anchor — this landing has no backend. */
export function Button({
  children,
  variant = "primary",
  size = "md",
  block = false,
  withArrow = false,
  className = "",
  href = "#",
  ...rest
}: ButtonProps) {
  const classes = [
    "btn",
    `btn--${variant}`,
    size !== "md" ? `btn--${size}` : "",
    block ? "btn--block" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={href} {...rest}>
      {children}
      {withArrow && <ArrowIcon className="btn__arrow" />}
    </a>
  );
}

interface LinkActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  light?: boolean;
}

/** Secondary action — underlined editorial text link. */
export function LinkAction({
  children,
  light = false,
  className = "",
  href = "#",
  ...rest
}: LinkActionProps) {
  const classes = ["link-action", light ? "link-action--light" : "", className]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={classes} href={href} {...rest}>
      {children}
      <ArrowIcon className="link-action__arrow" />
    </a>
  );
}
