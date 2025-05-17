"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillMeterProps {
  skills: {
    name: string;
    level: number;
    color?: string;
    icon?: React.ReactNode;
  }[];
  title?: string;
  subtitle?: string;
  className?: string;
}

export function SkillMeterCircular({
  skills,
  title,
  subtitle,
  className,
}: SkillMeterProps) {
  const ref = useRef<HTMLDivElement>(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);

  // Calculate positions around the circle
  const getPosition = (index: number, total: number) => {
    const angle = (index / total) * Math.PI * 2 - Math.PI / 2;
    const radius = 150; // Circle radius
    const x = radius * Math.cos(angle);
    const y = radius * Math.sin(angle);
    return { x, y };
  };

  return (
    <div
      ref={ref}
      className={cn(
        "relative flex flex-col items-center justify-center",
        className
      )}
    >
      {/* Optional title */}
      {title && (
        <motion.h3
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -20 }}
          transition={{ duration: 0.5 }}
          className="text-xl font-bold mb-2 text-center"
        >
          {title}
        </motion.h3>
      )}

      {/* Optional subtitle */}
      {subtitle && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="text-sm text-muted-foreground mb-8 text-center max-w-sm"
        >
          {subtitle}
        </motion.p>
      )}

      <div className="relative h-[350px] w-[350px]">
        {/* Center circle */}
        <motion.div
          initial={{ scale: 0 }}
          animate={isInView ? { scale: 1 } : { scale: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-24 h-24 bg-card/80 backdrop-blur-sm rounded-full shadow-lg border border-border/50 flex items-center justify-center z-10"
        >
          <div className="text-center">
            <div className="text-xl font-bold">
              {hoveredSkill !== null
                ? `${skills[hoveredSkill].level}%`
                : `${skills.length}`}
            </div>
            <div className="text-xs text-muted-foreground">
              {hoveredSkill !== null ? "Proficiency" : "Skills"}
            </div>
          </div>
        </motion.div>

        {/* Skills positioned around the circle */}
        {skills.map((skill, index) => {
          const position = getPosition(index, skills.length);
          const delay = 0.3 + index * 0.1;
          const defaultColor =
            index % 2 === 0
              ? "from-primary to-blue-600"
              : "from-accent to-purple-600";

          return (
            <motion.div
              key={skill.name}
              initial={{ opacity: 0, scale: 0 }}
              animate={
                isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
              }
              transition={{
                duration: 0.5,
                delay,
                type: "spring",
                stiffness: 200,
              }}
              style={{
                left: `calc(50% + ${position.x}px)`,
                top: `calc(50% + ${position.y}px)`,
              }}
              className="absolute transform -translate-x-1/2 -translate-y-1/2"
              onMouseEnter={() => setHoveredSkill(index)}
              onMouseLeave={() => setHoveredSkill(null)}
            >
              <motion.div
                whileHover={{ scale: 1.1 }}
                className={cn(
                  "flex flex-col items-center justify-center p-4 rounded-full bg-gradient-to-br shadow-lg cursor-pointer",
                  "w-16 h-16 text-white font-medium",
                  skill.color || defaultColor
                )}
              >
                {skill.icon || skill.name.substring(0, 2)}

                {/* Skill name tooltip */}
                <div className="absolute top-full mt-2 bg-card/90 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
                  {skill.name}
                </div>
              </motion.div>

              {/* Connecting line to center */}
              <motion.div
                initial={{ pathLength: 0, opacity: 0 }}
                animate={
                  isInView
                    ? {
                        pathLength: 1,
                        opacity: hoveredSkill === index ? 0.8 : 0.3,
                      }
                    : { pathLength: 0, opacity: 0 }
                }
                transition={{ duration: 1, delay: delay + 0.2 }}
                style={{
                  position: "absolute",
                  top: "50%",
                  left: "50%",
                  width: Math.abs(position.x * 2),
                  height: Math.abs(position.y * 2),
                  transform: "translate(-50%, -50%)",
                }}
                className="pointer-events-none"
              >
                <svg width="100%" height="100%" className="absolute inset-0">
                  <line
                    x1="50%"
                    y1="50%"
                    x2={position.x > 0 ? "100%" : "0%"}
                    y2={position.y > 0 ? "100%" : "0%"}
                    stroke={
                      hoveredSkill === index
                        ? "hsl(var(--primary))"
                        : "hsl(var(--primary) / 0.3)"
                    }
                    strokeWidth="2"
                    strokeDasharray="5,5"
                  />
                </svg>
              </motion.div>
            </motion.div>
          );
        })}

        {/* Background circle */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 0.1 } : { opacity: 0 }}
          transition={{ duration: 0.5 }}
          className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] rounded-full border border-dashed border-primary/30 -z-10"
        />
      </div>
    </div>
  );
}
