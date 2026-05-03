import * as React from "react";
import { cn } from "@/lib/utils";

type Props = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "default" | "outline" | "ghost";
};

export const Button = React.forwardRef<HTMLButtonElement, Props>(
  ({ className, variant = "default", ...props }, ref) => (
    <button
      ref={ref}
      className={cn(
        "inline-flex items-center justify-center rounded-xl px-4 py-2 text-sm font-semibold transition disabled:opacity-60",
        variant === "default" && "bg-indigo-600 text-white hover:bg-indigo-700",
        variant === "outline" && "border border-slate-300 bg-white hover:bg-slate-50",
        variant === "ghost" && "hover:bg-slate-100",
        className,
      )}
      {...props}
    />
  ),
);
Button.displayName = "Button";
