import {
  UtensilsCrossed,
  Music,
  Palette,
  Languages,
  type LucideIcon,
} from "lucide-react";
import type { CultureType } from "@/lib/types";
import { cn } from "@/lib/utils";

const TYPE_META: Record<
  CultureType,
  { icon: LucideIcon; label: string; className: string }
> = {
  Food: {
    icon: UtensilsCrossed,
    label: "Food",
    className: "bg-accent/15 text-accent-foreground dark:text-accent",
  },
  Dance: {
    icon: Music,
    label: "Dance",
    className: "bg-primary/10 text-primary",
  },
  Art: {
    icon: Palette,
    label: "Art",
    className: "bg-secondary text-secondary-foreground",
  },
  Language: {
    icon: Languages,
    label: "Language",
    className: "bg-success/15 text-success",
  },
};

/** Renders the Lucide icon for a culture type. */
export function CultureTypeIcon({
  type,
  className,
}: {
  type: CultureType;
  className?: string;
}) {
  const Icon = TYPE_META[type]?.icon ?? Palette;
  return <Icon className={className} aria-hidden="true" />;
}

/** A small, accessible badge describing the culture type. */
export function CultureTypeBadge({
  type,
  className,
}: {
  type: CultureType;
  className?: string;
}) {
  const meta = TYPE_META[type] ?? TYPE_META.Art;
  const Icon = meta.icon;
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-semibold",
        meta.className,
        className,
      )}
    >
      <Icon className="size-3.5" aria-hidden="true" />
      {meta.label}
    </span>
  );
}