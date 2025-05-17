"use client";

import { useRef } from "react";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import {
  Briefcase,
  Download,
  Sparkles,
  Clock,
  Users,
  Building,
  GraduationCap,
  Mail,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { ExperienceTimelineSection } from "@/components/sections/ExperienceTimelineSection";

export default function ExperiencePage() {
  const t = useTranslations("experience");
  const locale = useLocale();
  const heroRef = useRef<HTMLDivElement>(null);
  const isHeroInView = useInView(heroRef, { once: true });

  // Experience stats for cards
  const experienceStats = [
    {
      value: "3+",
      label: t("stats.years"),
      icon: <Clock className="w-5 h-5" />,
      color: "from-blue-500 to-blue-600",
    },
    {
      value: "5+",
      label: t("stats.projects"),
      icon: <Briefcase className="w-5 h-5" />,
      color: "from-purple-500 to-purple-600",
    },
    {
      value: "4+",
      label: t("stats.companies"),
      icon: <Building className="w-5 h-5" />,
      color: "from-green-500 to-green-600",
    },
    {
      value: "10+",
      label: t("stats.clients"),
      icon: <Users className="w-5 h-5" />,
      color: "from-amber-500 to-amber-600",
    },
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
                    <Mail className="w-4 h-4" />
                    {t("hero.buttons.contact")}
                  </Link>
                </Button>
              </div>
            </motion.div>

            {/* Stats Cards */}
            <div className="grid grid-cols-2 gap-4">
              {experienceStats.map((stat, index) => (
                <motion.div
                  key={stat.label}
                  initial={{ opacity: 0, y: 20 }}
                  animate={
                    isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
                  }
                  transition={{ duration: 0.5, delay: 0.3 + index * 0.1 }}
                  className="bg-card/70 backdrop-blur-sm rounded-xl p-5 border border-border/50 shadow-md hover:shadow-lg transition-all duration-300 relative overflow-hidden"
                >
                  {/* Background gradient */}
                  <div
                    className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${stat.color} opacity-10 blur-2xl -z-10`}
                  />

                  <div
                    className={`p-3 rounded-lg bg-gradient-to-br ${stat.color} text-white mb-3`}
                  >
                    {stat.icon}
                  </div>

                  <h3 className="text-3xl font-bold mb-1">{stat.value}</h3>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Education & Professional Highlights */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={
              isHeroInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }
            }
            transition={{ duration: 0.6, delay: 0.7 }}
            className="mt-16 grid md:grid-cols-2 gap-8"
          >
            <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-md relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-blue-500 to-blue-600 opacity-10 blur-2xl -z-10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-blue-500 to-blue-600 text-white">
                  <GraduationCap className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">
                  {t("highlights.education.title")}
                </h3>
              </div>

              <ul className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-blue-500 mt-2" />
                    <span>{t(`highlights.education.items.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="bg-card/70 backdrop-blur-sm rounded-xl p-6 border border-border/50 shadow-md relative overflow-hidden">
              {/* Background gradient */}
              <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-br from-purple-500 to-purple-600 opacity-10 blur-2xl -z-10" />

              <div className="flex items-center gap-3 mb-4">
                <div className="p-3 rounded-lg bg-gradient-to-br from-purple-500 to-purple-600 text-white">
                  <Briefcase className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-bold">
                  {t("highlights.professional.title")}
                </h3>
              </div>

              <ul className="space-y-3">
                {[1, 2, 3].map((item) => (
                  <li key={item} className="flex items-start gap-3">
                    <div className="w-1.5 h-1.5 rounded-full bg-purple-500 mt-2" />
                    <span>{t(`highlights.professional.items.${item}`)}</span>
                  </li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Experience Timeline Section */}
      <ExperienceTimelineSection />

      {/* Call to Action Section */}
      <section className="py-16 md:py-24 relative overflow-hidden">
        <div className="absolute inset-0 -z-10 overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        </div>

        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto bg-card/60 backdrop-blur-md rounded-2xl p-8 md:p-12 border border-border/50 shadow-lg relative overflow-hidden">
            {/* Background Elements */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />

            <div className="text-center">
              <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
              <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
                {t("cta.description")}
              </p>

              <div className="flex flex-wrap gap-4 justify-center">
                <Button asChild size="lg" className="group">
                  <Link
                    href={`/${locale}/projects`}
                    className="flex items-center gap-2"
                  >
                    <Briefcase className="w-4 h-4" />
                    {t("cta.buttons.projects")}
                  </Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link
                    href={`/${locale}/contact`}
                    className="flex items-center gap-2"
                  >
                    <Mail className="w-4 h-4" />
                    {t("cta.buttons.contact")}
                  </Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
