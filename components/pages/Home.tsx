"use client";

import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import { useRef } from "react";

// Custom hook for section animations
function useSectionAnimation() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
  });

  const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
  const scale = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [0.8, 1, 1, 0.8]
  );
  const y = useTransform(scrollYProgress, [0, 1], [100, -100]);

  return { ref, opacity, scale, y };
}

// Different section animations
const sectionVariants = {
  slideUp: {
    hidden: {
      opacity: 0,
      y: 100,
      scale: 0.95,
      rotateX: -5,
    },
    visible: {
      opacity: 1,
      y: 0,
      scale: 1,
      rotateX: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  slideRight: {
    hidden: {
      opacity: 0,
      x: -100,
      scale: 0.95,
      rotateY: 5,
    },
    visible: {
      opacity: 1,
      x: 0,
      scale: 1,
      rotateY: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  scaleUp: {
    hidden: {
      opacity: 0,
      scale: 0.8,
      rotateZ: -2,
    },
    visible: {
      opacity: 1,
      scale: 1,
      rotateZ: 0,
      transition: {
        duration: 0.8,
        ease: [0.16, 1, 0.3, 1],
      },
    },
  },
  fadeIn: {
    hidden: {
      opacity: 0,
      filter: "blur(10px)",
    },
    visible: {
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        duration: 1,
        ease: "easeOut",
      },
    },
  },
};

// Enhanced section wrapper
function AnimatedSection({
  children,
  variant = "slideUp",
  className = "",
  parallax = true,
  delay = 0,
}: {
  children: React.ReactNode;
  variant?: keyof typeof sectionVariants;
  className?: string;
  parallax?: boolean;
  delay?: number;
}) {
  const { ref, opacity, scale, y } = useSectionAnimation();

  return (
    <motion.section
      ref={ref}
      className={`relative ${className}`}
      style={parallax ? { y } : undefined}
      initial="hidden"
      whileInView="visible"
      viewport={{
        once: false,
        amount: 0.2,
      }}
      variants={sectionVariants[variant]}
      custom={delay}
    >
      <motion.div
        style={parallax ? { opacity, scale } : undefined}
        className="relative"
      >
        {children}
      </motion.div>
    </motion.section>
  );
}

// Main HomePage component
export default function HomePage() {
  const { scrollYProgress } = useScroll();

  // Progress bar scale
  const scaleX = useTransform(scrollYProgress, [0, 1], [0, 1]);

  // Background opacity based on scroll
  const bgOpacity = useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 1]);

  return (
    <AnimatePresence mode="wait">
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="relative"
      >
        {/* Scroll Progress Bar */}
        <motion.div
          className="fixed top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary to-accent z-50 origin-left"
          style={{ scaleX }}
        />

        {/* Dynamic Background */}
        <motion.div
          className="fixed inset-0 bg-gradient-to-b from-background via-primary/5 to-background -z-10"
          style={{ opacity: bgOpacity }}
        />

        {/* Hero Section - Fade in */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{
            duration: 0.8,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <Hero />
        </motion.div>

        {/* About Section - Slide from right */}
        <AnimatedSection
          variant="slideRight"
          delay={0.1}
          className="relative z-10"
        >
          <AboutPreview />
        </AnimatedSection>

        {/* Projects Section - Scale up */}
        <AnimatedSection
          variant="scaleUp"
          delay={0.2}
          className="relative z-20"
        >
          <ProjectsGrid />
        </AnimatedSection>

        {/* Skills Section - Slide up */}
        <AnimatedSection
          variant="slideUp"
          delay={0.3}
          className="relative z-30"
        >
          <SkillsShowcase />
        </AnimatedSection>

        {/* Page transition overlay */}
        <motion.div
          className="fixed inset-0 bg-background pointer-events-none z-40"
          initial={{ opacity: 1 }}
          animate={{ opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </motion.div>
    </AnimatePresence>
  );
}
