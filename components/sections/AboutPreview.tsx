"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Code,
  Server,
  Database,
  Users,
  Calendar,
  GraduationCap,
  Rocket,
  Heart,
} from "lucide-react";

export function AboutPreview() {
  const t = useTranslations("aboutPreview");
  const locale = useLocale();

  const highlights = [
    {
      icon: <Calendar className="w-5 h-5" />,
      text: t("highlights.experience"),
      color: "text-blue-500",
    },
    {
      icon: <Code className="w-5 h-5" />,
      text: t("highlights.technologies"),
      color: "text-green-500",
    },
    {
      icon: <GraduationCap className="w-5 h-5" />,
      text: t("highlights.education"),
      color: "text-purple-500",
    },
    {
      icon: <Server className="w-5 h-5" />,
      text: t("highlights.passion"),
      color: "text-orange-500",
    },
  ];

  const stats = [
    { value: "3+", label: t("stats.yearsExperience") },
    { value: "20+", label: t("stats.projects") },
    { value: "15+", label: t("stats.technologies") },
    { value: "100%", label: t("stats.satisfaction") },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        ease: "easeOut",
      },
    },
  };

  return (
    <section className="relative py-20 md:py-32 overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="max-w-7xl mx-auto"
        >
          {/* Section Header */}
          <motion.div variants={itemVariants} className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-4">
              {t("title")}
            </h2>
            <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
              {t("description")}
            </p>
          </motion.div>

          {/* Main Content Grid */}
          <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
            {/* Left Content */}
            <motion.div variants={itemVariants}>
              <div className="space-y-6">
                <div className="prose prose-lg dark:prose-invert">
                  <p className="text-muted-foreground leading-relaxed">
                    {t("content.intro")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("content.expertise")}
                  </p>
                  <p className="text-muted-foreground leading-relaxed">
                    {t("content.approach")}
                  </p>
                </div>

                {/* Highlights Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mt-8">
                  {highlights.map((highlight, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-3 rounded-lg bg-card/50 backdrop-blur-sm border border-border/50"
                      whileHover={{
                        scale: 1.05,
                        backgroundColor: "hsl(var(--card))",
                      }}
                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <div className={`${highlight.color}`}>
                        {highlight.icon}
                      </div>
                      <span className="text-sm font-medium">
                        {highlight.text}
                      </span>
                    </motion.div>
                  ))}
                </div>

                <motion.div variants={itemVariants} className="flex gap-4 pt-4">
                  <Button asChild size="lg" variant="default">
                    <Link
                      href={`/${locale}/about`}
                      className="flex items-center gap-2"
                    >
                      <Rocket className="w-4 h-4" />
                      {t("cta")}
                    </Link>
                  </Button>
                  <Button asChild size="lg" variant="outline">
                    <Link
                      href={`/${locale}/experience`}
                      className="flex items-center gap-2"
                    >
                      <Users className="w-4 h-4" />
                      {t("viewExperience")}
                    </Link>
                  </Button>
                </motion.div>
              </div>
            </motion.div>

            {/* Right Content - Interactive Stats & Skills */}
            <motion.div variants={itemVariants} className="relative">
              {/* Stats Grid */}
              <div className="grid grid-cols-2 gap-6 mb-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center p-6 rounded-2xl bg-card/50 backdrop-blur-sm border border-border/50"
                    whileHover={{
                      scale: 1.05,
                      boxShadow: "0 10px 30px -10px rgba(0,0,0,0.3)",
                    }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <motion.div
                      className="text-3xl md:text-4xl font-bold text-primary mb-2"
                      initial={{ scale: 0 }}
                      whileInView={{ scale: 1 }}
                      transition={{
                        delay: index * 0.1,
                        type: "spring",
                        stiffness: 200,
                      }}
                      viewport={{ once: true }}
                    >
                      {stat.value}
                    </motion.div>
                    <div className="text-sm text-muted-foreground">
                      {stat.label}
                    </div>
                  </motion.div>
                ))}
              </div>

              {/* Visual Elements */}
              <motion.div
                className="relative h-64 rounded-2xl overflow-hidden"
                whileHover={{ scale: 1.02 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-accent/20 to-secondary/20" />
                <div className="absolute inset-0 backdrop-blur-sm">
                  <div className="h-full flex items-center justify-center">
                    <div className="text-center">
                      <motion.div
                        animate={{
                          rotate: [0, 10, -10, 0],
                        }}
                        transition={{
                          duration: 4,
                          repeat: Infinity,
                          ease: "easeInOut",
                        }}
                        className="inline-flex items-center justify-center p-6 bg-card/80 rounded-full mb-4"
                      >
                        <Heart className="w-12 h-12 text-primary" />
                      </motion.div>
                      <p className="text-lg font-semibold">
                        {t("passionStatement")}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Floating Icons */}
                <motion.div
                  className="absolute top-4 left-4"
                  animate={{
                    y: [-5, 5, -5],
                    rotate: [-5, 5, -5],
                  }}
                  transition={{
                    duration: 3,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Code className="w-8 h-8 text-primary/70" />
                </motion.div>
                <motion.div
                  className="absolute bottom-4 right-4"
                  animate={{
                    y: [5, -5, 5],
                    rotate: [5, -5, 5],
                  }}
                  transition={{
                    duration: 4,
                    repeat: Infinity,
                    ease: "easeInOut",
                  }}
                >
                  <Database className="w-8 h-8 text-accent/70" />
                </motion.div>
              </motion.div>
            </motion.div>
          </div>

          {/* Tech Stack Preview */}
          <motion.div variants={itemVariants} className="text-center">
            <p className="text-muted-foreground mb-6">
              {t("techStackPreview")}
            </p>
            <div className="flex flex-wrap gap-3 justify-center">
              {[
                "React",
                "Next.js",
                "TypeScript",
                "Tailwind CSS",
                "Node.js",
                "Nest js",
                "MongoDB",
                "SQL",
              ].map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "hsl(var(--primary) / 0.2)",
                  }}
                >
                  {tech}
                </motion.span>
              ))}
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
