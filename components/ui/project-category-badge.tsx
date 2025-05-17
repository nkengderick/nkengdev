"use client";

import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface ProjectCategoryBadgeProps {
  name: string;
  icon?: React.ReactNode;
  color?: string;
  className?: string;
}

export function ProjectCategoryBadge({
  name,
  icon,
  color = "from-primary to-blue-600",
  className,
}: ProjectCategoryBadgeProps) {
  return (
    <motion.div
      className={cn(
        "inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium",
        `bg-gradient-to-r ${color} text-white`,
        className
      )}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {icon && <span className="text-white">{icon}</span>}
      {name}
    </motion.div>
  );
}
