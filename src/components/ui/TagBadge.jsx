import React from 'react';
import { cn } from "@/lib/utils";

export default function TagBadge({ children, variant = "default", className }) {
  const variants = {
    default: "bg-zinc-800 text-zinc-300 border-zinc-700",
    genre: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20",
    vibe: "bg-purple-500/10 text-purple-400 border-purple-500/20",
    location: "bg-blue-500/10 text-blue-400 border-blue-500/20",
  };

  return (
    <span 
      className={cn(
        "inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border",
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  );
}