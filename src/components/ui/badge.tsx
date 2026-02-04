import * as React from "react";
import { cn } from "@/lib/utils";

export type BadgeVariant = "default" | "secondary" | "outline";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: BadgeVariant;
}

const baseClasses =
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-medium transition-colors";

const variantClasses: Record<BadgeVariant, string> = {
  default: "bg-primary text-primary-foreground border-transparent",
  secondary: "bg-secondary text-secondary-foreground border-transparent",
  outline: "bg-transparent text-foreground border-border",
};

export const Badge = ({ className, variant = "default", ...props }: BadgeProps) => (
  <span className={cn(baseClasses, variantClasses[variant], className)} {...props} />
);
