"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface BlogCategoryBadgeProps {
  name: string;
  count?: number;
  isActive?: boolean;
  onClick?: () => void;
}

export function BlogCategoryBadge({
  name,
  count,
  isActive = false,
  onClick,
}: BlogCategoryBadgeProps) {
  return (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-4 py-2 rounded-full text-sm font-medium transition-colors flex items-center gap-2",
        isActive
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80"
      )}
    >
      {isActive && (
        <motion.span
          layoutId="activeCategoryIndicator"
          className="absolute inset-0 bg-primary rounded-full -z-10"
          initial={false}
          transition={{ type: "spring", duration: 0.6 }}
        />
      )}
      <span>{name}</span>
      {count !== undefined && (
        <span
          className={cn(
            "px-2 py-0.5 rounded-full text-xs",
            isActive
              ? "bg-primary-foreground/20 text-primary-foreground"
              : "bg-background/40 text-foreground/70"
          )}
        >
          {count}
        </span>
      )}
    </motion.button>
  );
}
