"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Code,
  Database,
  GitBranch,
  AirVent,
  Globe,
  Layers,
  Wrench,
  ChevronLeft,
} from "lucide-react";
import { SkillMeterCircular } from "@/components/ui/skill-meter-circular";

export function SkillMeterSection() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Frontend skills for the meter
  const frontendSkills = [
    { name: "React", level: 90, icon: <Code className="w-5 h-5" /> },
    { name: "Next.js", level: 85, color: "from-black to-gray-700" },
    { name: "TypeScript", level: 80, color: "from-blue-600 to-blue-700" },
    { name: "HTML/CSS", level: 90, color: "from-orange-500 to-red-500" },
    { name: "Tailwind", level: 90, color: "from-cyan-500 to-blue-500" },
    { name: "Redux", level: 75, color: "from-purple-500 to-purple-600" },
  ];

  // Backend skills for the meter
  const backendSkills = [
    { name: "Node.js", level: 85, color: "from-green-500 to-green-600" },
    { name: "Express", level: 85, color: "from-gray-600 to-gray-700" },
    { name: "MongoDB", level: 80, icon: <Database className="w-5 h-5" /> },
    { name: "REST API", level: 85, icon: <Globe className="w-5 h-5" /> },
    { name: "SQL", level: 75, color: "from-blue-400 to-blue-500" },
    { name: "Nest.js", level: 70, color: "from-red-500 to-red-600" },
  ];

  // Development tools skills
  const devTools = [
    { name: "Git", level: 85, icon: <GitBranch className="w-5 h-5" /> },
    { name: "VSCode", level: 90, color: "from-blue-500 to-blue-600" },
    { name: "Docker", level: 60, color: "from-blue-600 to-blue-700" },
    { name: "Linux", level: 70, icon: <AirVent className="w-5 h-5" /> },
    { name: "CI/CD", level: 65, color: "from-green-500 to-teal-500" },
    { name: "DevOps", level: 60, icon: <Wrench className="w-5 h-5" /> },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.3, 0.15, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.4, 0.2, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/5 rounded-full blur-3xl"
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-secondary/30 rounded-full text-primary mb-6"
          >
            <Layers className="w-4 h-4" />
            <span className="text-sm font-medium">
              {t("visualize.subtitle")}
            </span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("visualize.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("visualize.description")}
          </p>
        </motion.div>

        {/* Skill Meters */}
        <div className="grid lg:grid-cols-3 gap-12 md:gap-16">
          <SkillMeterCircular
            skills={frontendSkills}
            title={t("categories.frontend.title")}
            subtitle={t("visualize.frontend")}
          />

          <SkillMeterCircular
            skills={backendSkills}
            title={t("categories.backend.title")}
            subtitle={t("visualize.backend")}
          />

          <SkillMeterCircular
            skills={devTools}
            title={t("categories.tools.title")}
            subtitle={t("visualize.tools")}
          />
        </div>

        {/* Skill Level Legend */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 max-w-lg mx-auto"
        >
          <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-md">
            <h3 className="font-bold mb-4 text-center">
              {t("visualize.legend.title")}
            </h3>
            <div className="grid grid-cols-2 gap-4">
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-green-500"></div>
                <span className="text-sm">
                  {t("visualize.legend.expert")} (90-100%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-blue-500"></div>
                <span className="text-sm">
                  {t("visualize.legend.advanced")} (75-89%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-amber-500"></div>
                <span className="text-sm">
                  {t("visualize.legend.intermediate")} (60-74%)
                </span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-4 h-4 rounded-full bg-gray-500"></div>
                <span className="text-sm">
                  {t("visualize.legend.beginner")} (<ChevronLeft /> 60%)
                </span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}