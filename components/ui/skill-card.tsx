"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillCardProps {
  title: string;
  level: number;
  icon?: React.ReactNode;
  description?: string;
  color?: string;
  index?: number;
  className?: string;
}

export function SkillCard({
  title,
  level,
  icon,
  description,
  color = "from-primary to-blue-600",
  index = 0,
  className,
}: SkillCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  // Function to determine appropriate label based on level
  const getSkillLevel = () => {
    if (level >= 90) return "Expert";
    if (level >= 75) return "Advanced";
    if (level >= 60) return "Intermediate";
    if (level >= 40) return "Competent";
    return "Beginner";
  };

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-5 relative overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        className
      )}
    >
      {/* Background Gradient */}
      <div
        className={cn(
          "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br",
          color,
          "opacity-10 blur-2xl"
        )}
      />

      <div className="relative z-10">
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-3">
            {icon && (
              <div
                className={cn(
                  "p-2.5 rounded-lg bg-gradient-to-br",
                  color,
                  "text-white"
                )}
              >
                {icon}
              </div>
            )}
            <h3 className="font-bold text-lg">{title}</h3>
          </div>
          <div
            className={cn(
              "px-2 py-1 rounded-full text-xs font-semibold",
              level >= 90
                ? "bg-green-500/20 text-green-500"
                : level >= 75
                ? "bg-blue-500/20 text-blue-500"
                : level >= 60
                ? "bg-amber-500/20 text-amber-500"
                : "bg-gray-500/20 text-gray-500"
            )}
          >
            {getSkillLevel()}
          </div>
        </div>

        {/* Description */}
        {description && (
          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : { opacity: 0 }}
            transition={{ delay: index * 0.1 + 0.3 }}
            className="text-muted-foreground text-sm mb-4"
          >
            {description}
          </motion.p>
        )}

        {/* Progress Bar */}
        <div className="h-2 bg-secondary/20 rounded-full overflow-hidden">
          <motion.div
            className={cn("h-full rounded-full bg-gradient-to-r", color)}
            initial={{ width: 0 }}
            animate={isInView ? { width: `${level}%` } : { width: 0 }}
            transition={{
              duration: 1,
              delay: index * 0.1 + 0.2,
              ease: "easeOut",
            }}
          >
            {/* Shimmer Effect */}
            <div className="h-full w-full bg-gradient-to-r from-transparent via-white/30 to-transparent absolute animate-shimmer" />
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
