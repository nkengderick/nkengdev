"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Sparkles, Code, ArrowDown } from "lucide-react";

export function ProjectsHero() {
  const t = useTranslations("projects");

  return (
    <section className="relative min-h-[50vh] flex items-center py-24 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/10 to-secondary/20" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center max-w-4xl mx-auto"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t("heroSubtitle")}</span>
          </motion.div>

          <motion.h1
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
          >
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
              {t("heroTitle")}
            </span>
          </motion.h1>

          <motion.p
            initial={{ y: 50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto mb-12"
          >
            {t("heroDescription")}
          </motion.p>

          {/* Animated Code Elements */}
          <div className="relative max-w-md mx-auto mb-16">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="relative"
            >
              <div className="bg-card p-4 rounded-lg border border-border/50 shadow-lg text-left font-mono text-sm overflow-hidden">
                <div className="flex items-center gap-2 mb-4">
                  <div className="w-3 h-3 rounded-full bg-red-500" />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                  <span className="ml-2 text-xs text-muted-foreground">
                    portfolio.tsx
                  </span>
                </div>

                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                >
                  <p className="text-muted-foreground">
                    <span className="text-blue-500">const</span>{" "}
                    <span className="text-green-500">MyProjects</span> = ()
                    =&gt; {"{"}
                  </p>
                  <p className="ml-4 text-muted-foreground">
                    <span className="text-blue-500">return</span> (
                  </p>
                  <p className="ml-8 text-muted-foreground">
                    <motion.span
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1.0 }}
                      className="text-primary"
                    >
                      &lt;<span className="text-accent">ProjectGallery</span>
                      <span className="text-yellow-500"> creativity</span>=
                      <span className="text-green-500">&ldquo;unlimited&ldquo;</span> /&gt;
                    </motion.span>
                  </p>
                  <p className="ml-4 text-muted-foreground">);</p>
                  <p className="text-muted-foreground">{"}"}</p>
                </motion.div>
              </div>

              {/* Floating elements */}
              <motion.div
                className="absolute -top-6 -right-6 p-3 bg-card/80 backdrop-blur-sm rounded-lg text-xs shadow-lg border border-border/50 transform rotate-6"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.2 }}
              >
                <Code className="w-4 h-4 text-primary inline mr-2" />
                <span>React + Next.js</span>
              </motion.div>

              <motion.div
                className="absolute -bottom-4 -left-4 p-3 bg-card/80 backdrop-blur-sm rounded-lg text-xs shadow-lg border border-border/50 transform -rotate-3"
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 1.4 }}
              >
                <span>Crafted with ❤️</span>
              </motion.div>
            </motion.div>
          </div>

          {/* Scroll Indicator */}
          <motion.div
            className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
            animate={{
              y: [0, 10, 0],
            }}
            transition={{
              duration: 2,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <ArrowDown className="w-6 h-6 text-muted-foreground" />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
