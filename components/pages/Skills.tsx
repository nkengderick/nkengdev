"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import {
  Code,
  Server,
  Layers,
  Download,
  ArrowRight,
  Sparkles,
  Brain,
  Rocket,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SkillsShowcaseSection } from "@/components/sections/SkillsShowcaseMain";
import { SkillOrbit } from "@/components/ui/skill-orbit";
import { SkillMeterSection } from "../sections/SkillMeterSection";

export default function SkillsPage() {
  const t = useTranslations("skills");
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Highlighted technical skills for the hero orbit
  const coreSkills = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "Next.js", icon: "▲" },
    { name: "MongoDB", icon: "🍃" },
    { name: "TypeScript", icon: "📘" },
    { name: "Tailwind", icon: "🎨" },
    { name: "SQL", icon: "🗄️" },
    { name: "Express", icon: "🚂" },
  ];

  return (
    <main className="pt-24 pb-16 relative min-h-screen">
      {/* Floating Background Elements */}
      <div className="fixed inset-0 -z-10 pointer-events-none overflow-hidden">
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-secondary/10 rounded-full blur-3xl" />
        <div className="absolute top-3/4 left-1/3 w-64 h-64 bg-accent/10 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section
        ref={heroRef}
        className="py-16 md:py-24 relative overflow-hidden"
      >
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={
                isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
              }
              transition={{ duration: 0.6 }}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isHeroInView
                    ? { opacity: 1, scale: 1 }
                    : { opacity: 0, scale: 0 }
                }
                transition={{ duration: 0.5, delay: 0.1 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6"
              >
                <Sparkles className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {t("hero.subtitle")}
                </span>
              </motion.div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6">
                <span className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                  {t("hero.title")}
                </span>
              </h1>

              <p className="text-lg md:text-xl text-muted-foreground mb-8">
                {t("hero.description")}
              </p>

              <div className="flex flex-wrap gap-4">
                <Button asChild size="lg" className="group">
                  <a
                    href="/resume.pdf"
                    download
                    className="flex items-center gap-2"
                  >
                    <Download className="w-4 h-4" />
                    {t("hero.buttons.resume")}
                  </a>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center gap-2"
                  >
                    {t("hero.buttons.contact")}
                    <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
              </div>

              {/* Key Areas */}
              <div className="mt-12 grid sm:grid-cols-3 gap-4">
                <SkillArea
                  title={t("areas.frontend.title")}
                  description={t("areas.frontend.description")}
                  icon={<Code className="w-5 h-5" />}
                  color="from-blue-500 to-blue-600"
                  delay={0.3}
                  isInView={isHeroInView}
                />
                <SkillArea
                  title={t("areas.backend.title")}
                  description={t("areas.backend.description")}
                  icon={<Server className="w-5 h-5" />}
                  color="from-green-500 to-green-600"
                  delay={0.4}
                  isInView={isHeroInView}
                />
                <SkillArea
                  title={t("areas.fullstack.title")}
                  description={t("areas.fullstack.description")}
                  icon={<Layers className="w-5 h-5" />}
                  color="from-purple-500 to-purple-600"
                  delay={0.5}
                  isInView={isHeroInView}
                />
              </div>
            </motion.div>

            {/* Interactive Skill Orbit */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={
                isHeroInView
                  ? { opacity: 1, scale: 1 }
                  : { opacity: 0, scale: 0.8 }
              }
              transition={{ duration: 0.6, delay: 0.2 }}
              className="flex justify-center items-center"
            >
              <SkillOrbit
                skills={coreSkills}
                centerIcon={<Brain className="w-8 h-8 text-primary" />}
                size="lg"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Skills Showcase Section */}
      <SkillsShowcaseSection />

      {/* Skill Meter Visualization Section */}
      <SkillMeterSection />

      {/* Learning Journey Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />

            <div className="text-center mb-8">
              <motion.div
                initial={{ opacity: 0, scale: 0 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent mb-6"
              >
                <Rocket className="w-4 h-4" />
                <span className="text-sm font-medium">
                  {t("journey.subtitle")}
                </span>
              </motion.div>

              <h2 className="text-3xl font-bold mb-4">{t("journey.title")}</h2>
              <p className="text-lg text-muted-foreground mb-6">
                {t("journey.description")}
              </p>
            </div>

            <div className="space-y-6">
              {[1, 2, 3].map((item) => (
                <motion.div
                  key={item}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + item * 0.1 }}
                  className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-md"
                >
                  <h3 className="text-xl font-bold mb-2">
                    {t(`journey.items.${item}.title`)}
                  </h3>
                  <p className="text-muted-foreground">
                    {t(`journey.items.${item}.description`)}
                  </p>
                </motion.div>
              ))}
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 }}
              className="mt-8 text-center"
            >
              <Button asChild size="lg" className="group">
                <Link
                  href={`/${locale}/projects`}
                  className="flex items-center gap-2"
                >
                  {t("journey.buttons.projects")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>
    </main>
  );
}

// Helper component for skill areas
function SkillArea({
  title,
  description,
  icon,
  color,
  delay,
  isInView,
}: {
  title: string;
  description: string;
  icon: React.ReactNode;
  color: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card/70 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
    >
      {/* Background gradient */}
      <div
        className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 blur-2xl -z-10`}
      />

      <div
        className={`p-3 rounded-lg bg-gradient-to-br ${color} text-white mb-3`}
      >
        {icon}
      </div>

      <h3 className="font-bold mb-2">{title}</h3>
      <p className="text-sm text-muted-foreground">{description}</p>
    </motion.div>
  );
}
