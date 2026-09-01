import type { AnchorHTMLAttributes, ReactNode } from "react";
import "./Action.css";

export function Arrow({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="16"
      height="10"
      viewBox="0 0 16 10"
      fill="none"
      aria-hidden="true"
    >
      <path
        d="M0 5h14M10 1l4 4-4 4"
        stroke="currentColor"
        strokeWidth="1.4"
        strokeLinecap="square"
      />
    </svg>
  );
}

interface ActionProps extends AnchorHTMLAttributes<HTMLAnchorElement> {
  children: string;
  tone?: "accent" | "ink";
  size?: "md" | "sm";
  wide?: boolean;
}

/** Primary CTA. The label rolls on hover — same motion as the hero word. */
export function Action({
  children,
  tone = "accent",
  size = "md",
  wide = false,
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
      <span className="action__roll">
        <span>{children}</span>
        <span aria-hidden="true">{children}</span>
      </span>
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
