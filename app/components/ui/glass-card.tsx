"use client"

import type * as React from "react"
import { cn } from "@/lib/utils"

interface GlassCardProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode
  className?: string
  blur?: "sm" | "md" | "lg"
  opacity?: "light" | "medium" | "heavy"
}

export function GlassCard({ children, className, blur = "sm", opacity = "medium", ...props }: GlassCardProps) {
  const blurValues = {
    sm: "backdrop-blur-sm",
    md: "backdrop-blur-md",
    lg: "backdrop-blur-lg",
  }

  const opacityValues = {
    light: "bg-white/30 dark:bg-black/30",
    medium: "bg-white/40 dark:bg-black/40",
    heavy: "bg-white/50 dark:bg-black/50",
  }

  return (
    <div
      className={cn(
        "rounded-lg border border-white/20 dark:border-black/20 shadow-lg",
        blurValues[blur],
        opacityValues[opacity],
        "transition-all duration-500 ease-in-out hover:shadow-xl",
        "hover:border-white/30 dark:hover:border-black/30",
        "hover:bg-white/50 dark:hover:bg-black/50",
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}

