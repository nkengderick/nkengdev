"use client";

import { Code, Star, Heart } from "lucide-react";
import { motion } from "framer-motion";

export const FloatingIcons: React.FC = () => {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {Array.from({ length: 15 }).map((_, i) => {
        const icons = [<Code key={i} />, <Star key={i} />, <Heart key={i} />];
        const randomIcon = icons[Math.floor(Math.random() * icons.length)];
        const size = Math.random() * 1.5 + 0.5;
        const duration = Math.random() * 20 + 10;
        const delay = Math.random() * 5;
        const rotateRange = Math.random() * 360;
        const leftPos = `${Math.random() * 100}%`;

        return (
          <motion.div
            key={i}
            className="text-primary absolute"
            style={{
              left: leftPos,
              top: -50,
              width: `${size}rem`,
              height: `${size}rem`,
            }}
            animate={{
              y: ["0vh", "100vh"],
              rotate: [0, rotateRange],
              opacity: [0, 0.7, 0],
            }}
            transition={{
              duration,
              delay,
              repeat: Infinity,
              ease: "linear",
            }}
          >
            {randomIcon}
          </motion.div>
        );
      })}
    </div>
  );
};
