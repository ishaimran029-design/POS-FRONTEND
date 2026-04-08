import * as React from "react"
import { cn } from "@/lib/utils"

export interface BadgeProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'default' | 'secondary' | 'destructive' | 'outline' | 'success'
}

function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  const variants = {
    default: "border-transparent bg-slate-900 text-white shadow hover:bg-slate-900/80",
    secondary: "border-transparent bg-slate-100 text-slate-900 hover:bg-slate-100/80",
    destructive: "border-transparent bg-red-500 text-white shadow hover:bg-red-500/80",
    outline: "text-slate-950 border-slate-200",
    success: "border-transparent bg-emerald-50 text-emerald-700 font-bold",
  }

  return (
    <div
      className={cn(
        "inline-flex items-center rounded-md border px-2.5 py-0.5 text-xs font-semibold theme-transition",
        variants[variant],
        className
      )}
      {...props}
    />
  )
}

export { Badge }
