import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Action.css";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="17"
      height="10"
      viewBox="0 0 17 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 5h15M11 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="square"
      />
    </svg>
  );
}

interface ActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
  tone?: "primary" | "ink";
  size?: "md" | "sm";
  wide?: boolean;
  arrow?: boolean;
}

/** Primary CTA — a plain rectangle in the brand colour. */
export function Action({
  children,
  tone = "primary",
  size = "md",
  wide = false,
  arrow = true,
  className = "",
  href = "#trial",
  ...rest
}: ActionProps) {
  const cls = [
    "action",
    tone === "ink" ? "action--ink" : "",
    size === "sm" ? "action--sm" : "",
    wide ? "action--wide" : "",
    className,
  ]
    .filter(Boolean)
    .join(" ");

  return (
    <a className={cls} href={href} {...rest}>
      {children}
      {arrow && <Arrow className="action__arrow" />}
    </a>
  );
}

interface TextLinkProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: ReactNode;
}

export function TextLink({
  children,
  className = "",
  href = "#",
  ...rest
}: TextLinkProps) {
  return (
    <a className={`tlink ${className}`.trim()} href={href} {...rest}>
      {children}
      <Arrow className="tlink__arrow" />
    </a>
  );
}
