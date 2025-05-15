"use client";

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

interface CurvedDividerProps {
  fromColor?: string;
  toColor?: string;
  flip?: boolean;
  className?: string;
  height?: number;
  animate?: boolean;
}

export function CurvedDivider({
  fromColor = "background",
  toColor = "background",
  flip = false,
  className,
  height = 150,
  animate = true,
}: CurvedDividerProps) {
  const gradientId = `gradient-${fromColor}-${toColor}-${flip}`;

  return (
    <div
      className={cn(
        "absolute left-0 right-0 overflow-hidden pointer-events-none z-10",
        flip ? "top-0" : "bottom-0",
        className
      )}
      style={{ height: `${height}px` }}
    >
      <svg
        viewBox="0 0 1440 150"
        className={cn(
          "absolute w-[110%] h-full -left-[5%]",
          flip && "rotate-180"
        )}
        preserveAspectRatio="none"
      >
        <defs>
          <linearGradient id={gradientId} x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor={`hsl(var(--${fromColor}))`} />
            <stop offset="100%" stopColor={`hsl(var(--${toColor}))`} />
          </linearGradient>
        </defs>

        {/* Main wave path */}
        <motion.path
          fill={`url(#${gradientId})`}
          initial={{ d: "M0,150 L1440,150 L1440,0 L0,0 Z" }}
          animate={
            animate
              ? {
                  d: [
                    "M0,150 C240,80 480,100 720,85 C960,70 1200,90 1440,85 L1440,0 L0,0 Z",
                    "M0,150 C240,100 480,80 720,95 C960,110 1200,85 1440,90 L1440,0 L0,0 Z",
                    "M0,150 C240,90 480,110 720,90 C960,70 1200,95 1440,85 L1440,0 L0,0 Z",
                    "M0,150 C240,80 480,100 720,85 C960,70 1200,90 1440,85 L1440,0 L0,0 Z",
                  ],
                }
              : {
                  d: "M0,150 C240,80 480,100 720,85 C960,70 1200,90 1440,85 L1440,0 L0,0 Z",
                }
          }
          transition={{
            duration: 20,
            ease: "easeInOut",
            repeat: Infinity,
          }}
        />

        {/* Secondary wave for depth */}
        <motion.path
          fill={`url(#${gradientId})`}
          fillOpacity={0.6}
          initial={{ d: "M0,150 L1440,150 L1440,50 L0,50 Z" }}
          animate={
            animate
              ? {
                  d: [
                    "M0,150 C360,120 720,90 1080,105 C1260,115 1440,100 1440,100 L1440,50 L0,50 Z",
                    "M0,150 C360,100 720,110 1080,95 C1260,85 1440,105 1440,100 L1440,50 L0,50 Z",
                    "M0,150 C360,110 720,95 1080,110 C1260,125 1440,95 1440,100 L1440,50 L0,50 Z",
                    "M0,150 C360,120 720,90 1080,105 C1260,115 1440,100 1440,100 L1440,50 L0,50 Z",
                  ],
                }
              : {
                  d: "M0,150 C360,120 720,90 1080,105 C1260,115 1440,100 1440,100 L1440,50 L0,50 Z",
                }
          }
          transition={{
            duration: 15,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 0.5,
          }}
        />

        {/* Subtle third layer */}
        <motion.path
          fill={`url(#${gradientId})`}
          fillOpacity={0.3}
          initial={{ d: "M0,150 L1440,150 L1440,80 L0,80 Z" }}
          animate={
            animate
              ? {
                  d: [
                    "M0,150 C480,130 960,110 1440,120 L1440,80 L0,80 Z",
                    "M0,150 C480,110 960,130 1440,115 L1440,80 L0,80 Z",
                    "M0,150 C480,125 960,115 1440,125 L1440,80 L0,80 Z",
                    "M0,150 C480,130 960,110 1440,120 L1440,80 L0,80 Z",
                  ],
                }
              : { d: "M0,150 C480,130 960,110 1440,120 L1440,80 L0,80 Z" }
          }
          transition={{
            duration: 25,
            ease: "easeInOut",
            repeat: Infinity,
            delay: 1,
          }}
        />
      </svg>
    </div>
  );
}
