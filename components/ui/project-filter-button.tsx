"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectFilterButtonProps {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}

export function ProjectFilterButton({
  children,
  active,
  onClick,
  icon,
}: ProjectFilterButtonProps) {
  return (
    <motion.button
      onClick={onClick}
      className={cn(
        "relative px-4 py-2 rounded-full text-sm font-medium transition-all duration-300",
        "flex items-center gap-2",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/50 text-muted-foreground hover:bg-secondary/80"
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {active && (
        <motion.span
          layoutId="activeFilterIndicator"
          className="absolute inset-0 bg-primary rounded-full -z-10"
          initial={false}
          transition={{ type: "spring", duration: 0.6 }}
        />
      )}
      {icon && (
        <span className={active ? "text-primary-foreground" : "text-primary"}>
          {icon}
        </span>
      )}
      {children}
    </motion.button>
  );
}
