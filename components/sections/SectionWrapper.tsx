"use client";

import { motion, useScroll, useTransform, useInView } from "framer-motion";
import { ReactNode, useRef } from "react";
import { cn } from "@/lib/utils";

interface SectionWrapperProps {
  children: ReactNode;
  index: number;
  id: string;
  background?: string;
  className?: string;
}

export function SectionWrapper({
  children,
  index,
  id,
  background = "bg-background",
  className,
}: SectionWrapperProps) {
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { amount: 0.1 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });

  // Create smooth slide transitions
  const slideDirection = index % 2 === 0 ? 100 : -100;

  const x = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [slideDirection, 0, 0, -slideDirection]
  );

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

  const scale = useTransform(
    scrollYProgress,
    [0, 0.3, 0.7, 1],
    [0.9, 1, 1, 0.9]
  );

  // Parallax effect for background
  const backgroundY = useTransform(scrollYProgress, [0, 1], ["0%", "30%"]);

  return (
    <section
      ref={sectionRef}
      id={id}
      className={cn("relative min-h-screen overflow-hidden", className)}
    >
      {/* Animated background */}
      <motion.div
        className={cn("absolute inset-0", background)}
        style={{ y: backgroundY }}
      />

      {/* Content with slide animation */}
      <motion.div
        style={{
          x,
          opacity,
          scale,
        }}
        initial={{ opacity: 0, x: slideDirection }}
        animate={{
          opacity: isInView ? 1 : 0,
          x: isInView ? 0 : slideDirection,
        }}
        transition={{
          duration: 0.8,
          ease: "easeOut",
        }}
        className="relative z-10"
      >
        {children}
      </motion.div>

      {/* Optional: Add entrance animation for first view */}
      {index === 0 && (
        <motion.div
          className="absolute inset-0 bg-gradient-to-b from-transparent to-background/20 pointer-events-none"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 1.5, delay: 0.5 }}
        />
      )}
    </section>
  );
}
