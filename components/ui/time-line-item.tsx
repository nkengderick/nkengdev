"use client";

import { useRef, ReactNode } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { Calendar, ChevronDown, ChevronUp } from "lucide-react";
import { Button } from "@/components/ui/button";

interface TimelineItemProps {
  date: string;
  title: string;
  description: string;
  icon: ReactNode;
  index: number;
  expanded: number | null;
  toggleExpand: (index: number | null) => void;
}

export const TimelineItem: React.FC<TimelineItemProps> = ({
  date,
  title,
  description,
  icon,
  index,
  expanded,
  toggleExpand,
}) => {
  const itemRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(itemRef, { once: true, amount: 0.2 });

  return (
    <motion.div
      ref={itemRef}
      initial={{ opacity: 0, y: 50 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 50 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative mb-8 last:mb-0"
    >
      {/* Line connector */}
      {index < 5 && (
        <div className="absolute left-6 top-8 w-0.5 h-full bg-gradient-to-b from-primary/50 to-background -z-10" />
      )}

      <div className="flex gap-4">
        {/* Icon Circle */}
        <div className="relative">
          <motion.div
            className="flex items-center justify-center w-12 h-12 rounded-full bg-primary/20 border border-primary/30 text-primary z-10"
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{
              type: "spring",
              stiffness: 300,
              delay: index * 0.1 + 0.2,
            }}
          >
            {icon}
          </motion.div>
        </div>

        {/* Content */}
        <div
          className="flex-1 bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden relative"
          style={{
            boxShadow: "0 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <div
            className="p-5 cursor-pointer"
            onClick={() => toggleExpand(index)}
          >
            <div className="flex justify-between items-center mb-1">
              <h3 className="text-lg font-semibold text-primary">{title}</h3>
              <span className="text-sm text-muted-foreground flex items-center gap-1">
                <Calendar className="w-3 h-3" />
                {date}
              </span>
            </div>

            <AnimatePresence>
              {expanded === index ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="text-muted-foreground mt-2"
                >
                  <p className="mb-2">{description}</p>
                  <div className="flex justify-end">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="flex items-center gap-1 text-primary"
                      onClick={(e) => {
                        e.stopPropagation();
                        toggleExpand(null);
                      }}
                    >
                      <span>Less</span>
                      <ChevronUp className="w-4 h-4" />
                    </Button>
                  </div>
                </motion.div>
              ) : (
                <div className="flex justify-between items-center mt-2">
                  <p className="text-muted-foreground line-clamp-1">
                    {description}
                  </p>
                  <Button
                    size="sm"
                    variant="ghost"
                    className="flex items-center gap-1 text-primary"
                    onClick={(e) => {
                      e.stopPropagation();
                      toggleExpand(index);
                    }}
                  >
                    <span>More</span>
                    <ChevronDown className="w-4 h-4" />
                  </Button>
                </div>
              )}
            </AnimatePresence>
          </div>

          {/* Highlight gradients */}
          <div className="absolute top-0 right-0 w-40 h-40 bg-primary/5 rounded-full blur-xl -z-10" />
          <div className="absolute bottom-0 left-0 w-20 h-20 bg-accent/5 rounded-full blur-lg -z-10" />
        </div>
      </div>
    </motion.div>
  );
};
