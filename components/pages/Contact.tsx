"use client";

import { motion } from "framer-motion";
import { ContactHeroSection } from "@/components/sections/ContactHeroSection";
import { ContactMapSection } from "@/components/sections/ContactMapSection";
import { ContactFaqSection } from "@/components/sections/ContactFaqSection";
import { ScrollbarController } from "@/components/ui/scrollbar-controller";

export default function Contact() {
  return (
    <main className="pt-16 overflow-hidden relative min-h-screen">
      {/* Scrollbar controller for custom scrollbar effects */}
      <ScrollbarController />

      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section with Contact Form */}
      <ContactHeroSection />

      {/* Map and Contact Card Section */}
      <ContactMapSection />

      {/* FAQ and Newsletter Section */}
      <ContactFaqSection />

      {/* Bottom Wave Decoration */}
      <div className="relative h-24 md:h-32 mt-16">
        <svg
          className="absolute bottom-0 left-0 w-full h-full"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1440 320"
          preserveAspectRatio="none"
        >
          <motion.path
            fill="hsl(var(--background))"
            initial={{ d: "M0,320L1440,320L1440,320L0,320Z" }}
            animate={{
              d: "M0,320L48,288C96,256,192,192,288,181.3C384,171,480,213,576,234.7C672,256,768,256,864,234.7C960,213,1056,171,1152,170.7C1248,171,1344,213,1392,234.7L1440,256L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z",
            }}
            transition={{
              repeat: Infinity,
              repeatType: "mirror",
              duration: 20,
              ease: "easeInOut",
            }}
          />
        </svg>
      </div>
    </main>
  );
}
