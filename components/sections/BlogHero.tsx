"use client";

import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Button } from "../ui/button";
import { Search, ArrowRight } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { useLocale } from "next-intl";

export function BlogHero() {
  const t = useTranslations("blog.hero");
  const locale = useLocale();
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState("");

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/${locale}/blog?search=${encodeURIComponent(searchQuery)}`);
    }
  };

  return (
    <section className="relative min-h-[50vh] flex items-center justify-center py-20 md:py-32 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-background to-accent/20" />

        <motion.div
          className="absolute top-20 -left-20 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 40, 0],
            y: [0, -40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />

        <motion.div
          className="absolute bottom-10 -right-20 w-80 h-80 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          {/* Subtitle */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium text-primary mb-6"
          >
            <div className="relative w-3 h-3">
              <motion.div
                className="absolute inset-0 bg-primary rounded-full"
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              />
            </div>
            <span>{t("subtitle")}</span>
          </motion.div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-500 to-accent">
              {t("title")}
            </span>
          </motion.h1>

          {/* Description */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
          >
            {t("description")}
          </motion.p>

          {/* Search Bar */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="max-w-lg mx-auto mb-8"
          >
            <form onSubmit={handleSearch} className="relative">
              <input
                type="text"
                placeholder={t("searchPlaceholder")}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className={cn(
                  "w-full py-3 pl-12 pr-4 rounded-full",
                  "bg-card/70 backdrop-blur-sm border border-border/50",
                  "focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                )}
              />
              <div className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground">
                <Search className="w-5 h-5" />
              </div>
              <Button
                type="submit"
                size="sm"
                className="absolute right-2 top-1/2 transform -translate-y-1/2"
              >
                {t("search")}
              </Button>
            </form>
          </motion.div>

          {/* Category Pills */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="flex flex-wrap justify-center gap-2 mb-8"
          >
            {[
              "Development",
              "Web",
              "Backend",
              "DevOps",
              "Mobile",
              "Design",
            ].map((category, index) => (
              <motion.div
                key={category}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
                whileHover={{ y: -3 }}
                className="px-4 py-2 bg-card/70 backdrop-blur-sm rounded-full text-sm border border-border/40 hover:border-primary/50 transition-colors cursor-pointer"
                onClick={() =>
                  router.push(`/${locale}/blog?category=${category}`)
                }
              >
                {category}
              </motion.div>
            ))}
          </motion.div>

          {/* Explore Button */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
          >
            <Button
              size="lg"
              variant="outline"
              className="group"
              onClick={() => {
                // Smooth scroll to content
                document.getElementById("blog-content")?.scrollIntoView({
                  behavior: "smooth",
                });
              }}
            >
              {t("explore")}
              <ArrowRight className="ml-2 w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Button>
          </motion.div>
        </div>

        {/* Down Indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-muted-foreground/20 flex justify-center pt-2">
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                ease: "easeInOut",
                delay: 0.2,
              }}
              className="w-1.5 h-1.5 rounded-full bg-muted-foreground/60"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
