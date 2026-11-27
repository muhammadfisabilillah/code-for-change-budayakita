import * as React from "react";
import { cn } from "@/lib/utils";

type TypographyVariant =
  | "h1"
  | "h2"
  | "h3"
  | "h4"
  | "lead"
  | "body"
  | "small"
  | "caption"
  | "blockquote"
  | "code";

const variantClasses: Record<TypographyVariant, string> = {
  h1: "text-4xl font-extrabold tracking-tight text-balance sm:text-5xl lg:text-6xl",
  h2: "text-3xl font-bold tracking-tight text-balance sm:text-4xl",
  h3: "text-2xl font-semibold tracking-tight text-balance",
  h4: "text-xl font-semibold tracking-tight",
  lead: "text-lg text-muted-foreground text-pretty",
  body: "text-base leading-7",
  small: "text-sm leading-6",
  caption: "text-xs uppercase tracking-wide text-muted-foreground",
  blockquote: "border-l-4 border-primary pl-4 text-lg italic text-foreground",
  code: "rounded bg-muted px-1.5 py-0.5 font-mono text-sm",
};

const variantTag: Record<TypographyVariant, keyof JSX.IntrinsicElements> = {
  h1: "h1",
  h2: "h2",
  h3: "h3",
  h4: "h4",
  lead: "p",
  body: "p",
  small: "p",
  caption: "p",
  blockquote: "blockquote",
  code: "code",
};

export interface TypographyProps
  extends React.HTMLAttributes<HTMLElement> {
  variant?: TypographyVariant;
  /** Render as a different element while keeping the visual style. */
  as?: keyof JSX.IntrinsicElements;
}

export function Typography({
  variant = "body",
  as,
  className,
  ...props
}: TypographyProps) {
  const Tag = (as ?? variantTag[variant]) as React.ElementType;
  return (
    <Tag className={cn(variantClasses[variant], className)} {...props} />
  );
}