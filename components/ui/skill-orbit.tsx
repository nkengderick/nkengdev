"use client";

import { useState, useRef } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface SkillProps {
  name: string;
  icon: string;
  color?: string;
}

interface SkillOrbitProps {
  skills: SkillProps[];
  centerIcon?: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
  speed?: "slow" | "medium" | "fast";
}

export function SkillOrbit({
  skills,
  centerIcon,
  className,
  size = "md",
  speed = "medium",
}: SkillOrbitProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isHovered, setIsHovered] = useState(false);

  // Determine appropriate dimensions based on size prop
  const getSize = () => {
    switch (size) {
      case "sm":
        return {
          container: "w-64 h-64",
          orbit: "w-56 h-56",
          item: "w-10 h-10",
          centerItem: "w-16 h-16",
        };
      case "lg":
        return {
          container: "w-96 h-96",
          orbit: "w-80 h-80",
          item: "w-14 h-14",
          centerItem: "w-24 h-24",
        };
      default:
        return {
          container: "w-80 h-80",
          orbit: "w-64 h-64",
          item: "w-12 h-12",
          centerItem: "w-20 h-20",
        };
    }
  };

  // Determine animation duration based on speed prop
  const getDuration = () => {
    switch (speed) {
      case "slow":
        return 40;
      case "fast":
        return 20;
      default:
        return 30;
    }
  };

  const sizeClasses = getSize();
  const duration = getDuration();

  return (
    <div
      ref={containerRef}
      className={cn(
        "relative flex items-center justify-center",
        sizeClasses.container,
        className
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Center icon */}
      <motion.div
        className={cn(
          "absolute z-10 rounded-full bg-card shadow-lg border border-border flex items-center justify-center",
          sizeClasses.centerItem
        )}
        animate={
          isHovered
            ? { scale: 1.1, boxShadow: "0 0 30px rgba(59, 130, 246, 0.5)" }
            : { scale: 1, boxShadow: "0 0 0px rgba(59, 130, 246, 0)" }
        }
        transition={{ duration: 0.5 }}
      >
        {centerIcon || (
          <div className="text-2xl">
            {/* Default icon if none provided */}
            <span role="img" aria-label="skills">
              🚀
            </span>
          </div>
        )}
      </motion.div>

      {/* Orbit */}
      <motion.div
        className={cn(
          "absolute rounded-full border border-border/20 flex items-center justify-center",
          sizeClasses.orbit
        )}
        animate={{ rotate: 360 }}
        transition={{
          duration: duration,
          repeat: Infinity,
          ease: "linear",
        }}
        style={{
          transform: isHovered ? "rotate(0deg)" : "rotate(360deg)",
        }}
      >
        {skills.map((skill, index) => {
          const angle = (index * 360) / skills.length;
          const radians = (angle * Math.PI) / 180;
          const radius = parseInt(sizeClasses.orbit.split("w-")[1]) / 2;

          return (
            <motion.div
              key={skill.name}
              className={cn(
                "absolute rounded-full bg-card shadow-md border border-border flex items-center justify-center cursor-pointer group",
                sizeClasses.item
              )}
              style={{
                left: `calc(50% + ${Math.cos(radians) * radius}px - ${
                  parseInt(sizeClasses.item.split("w-")[1]) / 2
                }px)`,
                top: `calc(50% + ${Math.sin(radians) * radius}px - ${
                  parseInt(sizeClasses.item.split("w-")[1]) / 2
                }px)`,
              }}
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: -360 }}
              transition={{
                scale: { delay: index * 0.05, duration: 0.5 },
                rotate: {
                  duration: duration,
                  repeat: Infinity,
                  ease: "linear",
                },
              }}
              whileHover={{ scale: 1.2, zIndex: 20 }}
            >
              <div className="text-lg group-hover:scale-125 transition-transform">
                <span role="img" aria-label={skill.name}>
                  {skill.icon}
                </span>
              </div>

              {/* Tooltip on hover */}
              <div className="absolute opacity-0 group-hover:opacity-100 -bottom-8 bg-card/70 backdrop-blur-sm px-2 py-1 rounded text-xs font-medium whitespace-nowrap transition-opacity">
                {skill.name}
              </div>
            </motion.div>
          );
        })}
      </motion.div>
    </div>
  );
}
