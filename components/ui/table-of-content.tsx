"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { List, ChevronDown, ChevronUp } from "lucide-react";
import { cn } from "@/lib/utils";

interface TableOfContentsProps {
  headings: Array<{
    id: string;
    text: string;
    level: number;
  }>;
}

export function TableOfContents({ headings }: TableOfContentsProps) {
  const t = useTranslations("blog.detail");
  const [activeId, setActiveId] = useState<string>("");
  const [isCollapsed, setIsCollapsed] = useState(false);

  // Track scroll position and update active heading
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY;

      // Find the heading closest to the top of the viewport
      const currentHeading = headings
        .map((heading) => {
          const element = document.getElementById(heading.id);
          if (!element) return { id: heading.id, position: -Infinity };
          // Get the position of the element relative to the top of the page
          const position = element.getBoundingClientRect().top + window.scrollY;
          return { id: heading.id, position };
        })
        .filter((item) => item.position <= scrollPosition + 200) // Add some offset
        .sort((a, b) => b.position - a.position)[0];

      if (currentHeading) {
        setActiveId(currentHeading.id);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Call it once to set the initial active heading
    handleScroll();

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [headings]);

  // Handle clicking on a heading link
  const handleClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      // Scroll to the element with smooth behavior
      element.scrollIntoView({ behavior: "smooth" });
      // Update active id manually
      setActiveId(id);
    }
  };

  if (headings.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-4 shadow-md sticky top-24 overflow-y-auto max-h-[70vh]"
    >
      <div
        onClick={() => setIsCollapsed(!isCollapsed)}
        className="sticky top-0 flex items-center justify-between cursor-pointer mb-2"
      >
        <div className="flex items-center gap-2 font-semibold">
          <List className="w-4 h-4" />
          <h3>{t("tableOfContents")}</h3>
        </div>
        <button className="p-1 rounded-full hover:bg-secondary/50 transition-colors">
          {isCollapsed ? (
            <ChevronDown className="w-4 h-4" />
          ) : (
            <ChevronUp className="w-4 h-4" />
          )}
        </button>
      </div>

      {!isCollapsed && (
        <motion.nav
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="mt-3"
        >
          <ul className="space-y-1 text-sm">
            {headings.map((heading) => (
              <li
                key={heading.id}
                className={cn(
                  "transition-colors",
                  heading.level === 2 ? "ml-0" : "ml-3",
                  heading.level === 4 ? "ml-6" : ""
                )}
              >
                <a
                  href={`#${heading.id}`}
                  onClick={(e) => {
                    e.preventDefault();
                    handleClick(heading.id);
                  }}
                  className={cn(
                    "block py-1 px-2 rounded hover:bg-secondary/50 transition-colors",
                    heading.id === activeId
                      ? "text-primary bg-primary/10 font-medium"
                      : "text-muted-foreground"
                  )}
                >
                  {heading.text}
                </a>
              </li>
            ))}
          </ul>
        </motion.nav>
      )}
    </motion.div>
  );
}
