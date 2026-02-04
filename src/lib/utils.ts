/**
 * Utility function for merging classNames (shadows clsx pattern used by shadcn)
 * Used primarily for conditional Tailwind CSS classes
 */
export function cn(...classes: (string | undefined | null | false)[]): string {
  return classes
    .filter((cls) => typeof cls === "string" && cls.length > 0)
    .join(" ");
}

/**
 * Type-safe className merger for Tailwind CSS
 * Prevents duplicate/conflicting classes
 */
export function clsx(...args: any[]): string {
  let str = "";
  const len = args.length;
  let idx = 0;
  let arg;

  for (; idx < len; idx++) {
    if ((arg = args[idx]) && typeof arg === "string") {
      str && (str += " ");
      str += arg;
    }
  }

  return str;
}
