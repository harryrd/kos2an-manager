
import React from "react";
import { cn } from "@/lib/utils";

interface DashboardCardProps {
  children: React.ReactNode;
  className?: string;
}

export function DashboardCard({ children, className }: DashboardCardProps) {
  return (
    <div 
      className={cn(
        "rounded-xl p-5 animate-scale-in",
        "glass border border-white/20 shadow-smooth",
        "transition-all duration-300 hover:shadow-lg hover:translate-y-[-2px]",
        className
      )}
    >
      {children}
    </div>
  );
}
