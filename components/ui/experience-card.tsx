"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface ExperienceCardProps {
  title: string;
  company: string;
  period: string;
  description: string;
  icon?: React.ReactNode;
  skills?: string[];
  index?: number;
  isLast?: boolean;
  color?: string;
}

export function ExperienceCard({
  title,
  company,
  period,
  description,
  icon,
  skills = [],
  index = 0,
  isLast = false,
  color = "from-blue-500 to-blue-600",
}: ExperienceCardProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Timeline connector */}
      {!isLast && (
        <div className="absolute left-6 top-16 bottom-0 w-0.5 bg-gradient-to-b from-primary/50 to-transparent -z-10" />
      )}

      <div className="flex gap-6">
        {/* Icon Circle */}
        <div className="relative">
          <motion.div
            className={cn(
              "flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br",
              color,
              "text-white z-10 shadow-lg border-2 border-white/20"
            )}
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: index * 0.1 + 0.2,
            }}
            whileHover={{ scale: 1.1 }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Content */}
        <div className="flex-1">
          <motion.div
            className={cn(
              "bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 relative overflow-hidden transition-all duration-300",
              isHovered ? "shadow-xl" : "shadow-md"
            )}
            whileHover={{ y: -5 }}
          >
            {/* Background Gradients */}
            <div
              className={cn(
                "absolute top-0 right-0 w-32 h-32 bg-gradient-to-br",
                color,
                "opacity-10 blur-2xl transition-opacity duration-300",
                isHovered ? "opacity-20" : "opacity-10"
              )}
            />

            {/* Period Badge */}
            <motion.div
              className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-secondary/50 mb-3"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ delay: index * 0.1 + 0.3 }}
            >
              {period}
            </motion.div>

            <motion.h3
              className="text-xl font-bold mb-1"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.4 }}
            >
              {title}
            </motion.h3>

            <motion.h4
              className={cn(
                "text-lg mb-3",
                `text-gradient bg-gradient-to-r ${color}`
              )}
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.5 }}
            >
              {company}
            </motion.h4>

            <motion.p
              className="text-muted-foreground mb-4"
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ delay: index * 0.1 + 0.6 }}
            >
              {description}
            </motion.p>

            {/* Skills */}
            {skills.length > 0 && (
              <motion.div
                className="flex flex-wrap gap-2"
                initial={{ opacity: 0, y: 20 }}
                animate={
                  isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                }
                transition={{ delay: index * 0.1 + 0.7 }}
              >
                {skills.map((skill, idx) => (
                  <motion.span
                    key={skill}
                    className="px-2 py-1 bg-primary/10 rounded-md text-xs font-medium text-primary"
                    initial={{ opacity: 0, scale: 0 }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1 }
                        : { opacity: 0, scale: 0 }
                    }
                    transition={{ delay: index * 0.1 + 0.7 + idx * 0.05 }}
                    whileHover={{ scale: 1.1 }}
                  >
                    {skill}
                  </motion.span>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </div>
    </motion.div>
  );
}
