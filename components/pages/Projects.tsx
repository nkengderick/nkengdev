"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { ArrowUpRight, Rocket, Github } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ProjectsHero } from "@/components/sections/ProjectHero";
import { ProjectStats } from "@/components/sections/ProjectStats";
import { ProjectGrid } from "@/components/sections/ProjectsMainGrid";
import { projectsData } from "@/data/projects";

export default function ProjectsPage() {
  const t = useTranslations("projects");

  return (
    <main className="pt-16 overflow-hidden relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <ProjectsHero />

      {/* Stats Section */}
      <section className="py-12 md:py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-6">
              {t("statsTitle")}
            </h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("statsDescription")}
            </p>
          </motion.div>

          <ProjectStats />
        </div>
      </section>

      {/* Projects Grid Section */}
      <ProjectGrid projects={projectsData} />

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-r from-primary/10 via-accent/5 to-secondary/10 -z-10" />

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-card/80 backdrop-blur-sm rounded-2xl p-8 md:p-12 border border-border/50 relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />

            <div className="flex flex-col md:flex-row gap-8 items-center">
              <div className="flex-1">
                <motion.h2
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6 }}
                  className="text-3xl font-bold mb-4"
                >
                  {t("cta.title")}
                </motion.h2>

                <motion.p
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.1 }}
                  className="text-muted-foreground mb-6"
                >
                  {t("cta.description")}
                </motion.p>

                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: 0.2 }}
                  className="flex flex-wrap gap-4"
                >
                  <Button className="group" size="lg" asChild>
                    <a
                      href="mailto:nkengbderick@gmail.com"
                      className="flex items-center gap-2"
                    >
                      <Rocket className="w-4 h-4" />
                      {t("cta.buttons.discuss")}
                      <ArrowUpRight className="w-4 h-4 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1" />
                    </a>
                  </Button>

                  <Button variant="outline" size="lg" asChild>
                    <a
                      href="https://github.com/nkengderick"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2"
                    >
                      <Github className="w-4 h-4" />
                      {t("cta.buttons.github")}
                    </a>
                  </Button>
                </motion.div>
              </div>

              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="relative w-full max-w-xs aspect-square hidden md:block"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20 rounded-full">
                  <motion.div
                    animate={{
                      background: [
                        "radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
                        "radial-gradient(circle at 70% 70%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
                        "radial-gradient(circle at 30% 70%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
                        "radial-gradient(circle at 70% 30%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
                        "radial-gradient(circle at 30% 30%, rgba(147, 51, 234, 0.3) 0%, rgba(0, 0, 0, 0) 70%)",
                      ],
                    }}
                    transition={{
                      duration: 10,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="absolute inset-0 rounded-full"
                  />
                </div>

                <div className="absolute inset-0 flex items-center justify-center">
                  <motion.div
                    initial={{ scale: 0 }}
                    animate={{ scale: [1, 1.1, 1] }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="text-center"
                  >
                    <div className="text-6xl mb-2">💻</div>
                    <div className="font-bold text-lg">
                      {t("cta.letsCollaborate")}
                    </div>
                  </motion.div>
                </div>

                {/* Spinning Technology Icons */}
                <motion.div
                  animate={{
                    rotate: 360,
                  }}
                  transition={{
                    duration: 20,
                    repeat: Infinity,
                    ease: "linear",
                  }}
                  className="absolute inset-0"
                >
                  {[0, 45, 90, 135, 180, 225, 270, 315].map((angle, index) => (
                    <div
                      key={angle}
                      className="absolute top-1/2 left-1/2 w-8 h-8 -ml-4 -mt-4"
                      style={{
                        transform: `rotate(${angle}deg) translateX(120px) rotate(-${angle}deg)`,
                      }}
                    >
                      <div className="w-full h-full bg-background rounded-full flex items-center justify-center shadow-md border border-border/50">
                        <div className="text-sm">
                          {
                            ["⚛️", "🚀", "🔷", "🌐", "📱", "🖥️", "🔄", "🛠️"][
                              index
                            ]
                          }
                        </div>
                      </div>
                    </div>
                  ))}
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
