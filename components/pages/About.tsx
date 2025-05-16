"use client";

import { useState, useRef } from "react";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  AnimatePresence,
} from "framer-motion";
import {
  Download,
  Calendar,
  GraduationCap,
  Code,
  Heart,
  FileText,
  User,
  Layers,
  Coffee,
  Lightbulb,
  Briefcase,
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  MapPin,
  TerminalSquare,
  ArrowRight,
  Sparkles,
  Server,
  Wrench,
} from "lucide-react";
import { FloatingIcons } from "../ui/floating-icons";
import { InteractiveTerminal } from "../sections/Terminal";
import { TiltCard } from "../ui/tilt-card";
import { SkillBar } from "../sections/SkillBar";
import { TimelineItem } from "../ui/time-line-item";

export default function AboutPage() {
  const locale = useLocale();
  const t = useTranslations("about"); // Main namespace for about page
  const tSkills = useTranslations("skills"); // For skills section
  const containerRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [expandedTimeline, setExpandedTimeline] = useState<number | null>(null);
  const [activeTab, setActiveTab] = useState("story");

  const education = [
    {
      date: "2021 - Present",
      title: t("education.bachelor.title"), // Translated dynamically if added to JSON
      institution: "University of Buea, Faculty of Engineering and Technology",
      description:
        t("education.bachelor.description") || // Fallback if not translated
        "Specializing in Software Engineering with a focus on web technologies and system administration. Expected graduation in 2025.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
    {
      date: "2019 - 2021",
      title: t("education.gce.title") || "GCE Advanced Level",
      institution: "Catholic Bilingual Grammar College Bishop Andre Wouking",
      description:
        t("education.gce.description") ||
        "Completed A-Levels with excellent grades (GPA 4.0), focusing on Mathematics, Physics, and Computer Science.",
      icon: <GraduationCap className="w-5 h-5" />,
    },
  ];

  const experience = [
    {
      date: "Apr 2023 - Present",
      title: t("experience.timeline.[0].role"),
      company: t("experience.timeline.[0].company"),
      description: t("experience.timeline.[0].description"),
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      date: "Jun 2023 - Present",
      title: t("experience.timeline.[1].role"),
      company: t("experience.timeline.[1].company"),
      description: t("experience.timeline.[1].description"),
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      date: "2023",
      title: t("experience.timeline.[2].role"),
      company: t("experience.timeline.[2].company"),
      description: t("experience.timeline.[2].description"),
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      date: "2023",
      title: t("experience.timeline.[3].role"),
      company: t("experience.timeline.[3].company"),
      description: t("experience.timeline.[3].description"),
      icon: <Briefcase className="w-5 h-5" />,
    },
    {
      date: "2022",
      title: t("experience.timeline.[4].role"),
      company: t("experience.timeline.[4].company"),
      description: t("experience.timeline.[4].description"),
      icon: <Briefcase className="w-5 h-5" />,
    },
  ];

  // Parallax movement based on scroll
  const y1 = useTransform(scrollYProgress, [0, 1], [0, -100]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, -200]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, -150]);

  const opacity = useTransform(
    scrollYProgress,
    [0, 0.2, 0.8, 1],
    [1, 1, 0.8, 0]
  );

  return (
    <main
      ref={containerRef}
      className="relative min-h-screen pt-32 pb-20 overflow-hidden"
    >
      {/* Dynamic Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/5 to-background" />

        <motion.div
          style={{ y: y1 }}
          className="absolute top-20 -left-32 w-96 h-96 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y2 }}
          className="absolute bottom-20 -right-32 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          style={{ y: y3 }}
          className="absolute top-1/2 left-1/3 w-64 h-64 bg-secondary/10 rounded-full blur-3xl"
        />
      </div>

      {/* Floating coding/tech icons in background */}
      <FloatingIcons />

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="mb-24"
        >
          <motion.div style={{ opacity }} className="text-center mb-16">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6"
            >
              <User className="w-4 h-4" />
              <span className="text-sm font-medium">{t("heading.title")}</span>
            </motion.div>

            <motion.h1
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            >
              <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent">
                {t("heading.name")}
              </span>
            </motion.h1>

            <motion.p
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.3 }}
              className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8"
            >
              {t("heading.subtitle")}
            </motion.p>

            <motion.div
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-wrap gap-4 justify-center mb-8"
            >
              <Button asChild size="lg" className="group">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t("buttons.downloadResume")}
                </a>
              </Button>
              <Button asChild size="lg" variant="outline">
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {t("buttons.contactMe")}
                </Link>
              </Button>
            </motion.div>

            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ type: "spring", stiffness: 100, delay: 0.5 }}
              className="flex gap-4 justify-center"
            >
              <motion.a
                href="https://github.com/nkengderick"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-card rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                <Github className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://linkedin.com/in/nkengbezaderick"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-card rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="mailto:nkengbderick@gmail.com"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-card rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                <Mail className="w-5 h-5" />
              </motion.a>
              <motion.a
                href="https://portfolio-117q.onrender.com/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -5, scale: 1.1 }}
                className="p-3 bg-card rounded-full text-muted-foreground hover:text-primary transition-colors"
              >
                <ExternalLink className="w-5 h-5" />
              </motion.a>
            </motion.div>
          </motion.div>

          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Interactive Terminal on left */}
            <div className="order-2 lg:order-1">
              <InteractiveTerminal />
            </div>

            {/* Profile Image with Effects */}
            <div className="order-1 lg:order-2 block">
              <TiltCard className="relative max-w-md mb-8 lg:mb-0">
                <div className="relative overflow-hidden rounded-2xl border-4 border-primary/20 shadow-2xl bg-gradient-to-b from-background to-primary/10">
                  <div className="relative aspect-[4/5]">
                    <Image
                      src="/images/profile.png"
                      alt={t("heading.name")}
                      fill
                      className="object-cover"
                      priority
                    />

                    {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/30 to-transparent" />

                    {/* Info Card at Bottom */}
                    <div className="absolute bottom-0 left-0 right-0 p-6 backdrop-blur-md bg-black/30">
                      <div className="flex items-center gap-2 mb-2">
                        <MapPin className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">
                          {t("location.city")}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <TerminalSquare className="w-4 h-4 text-white" />
                        <span className="text-white text-sm">
                          {t("location.role")}
                        </span>
                      </div>
                    </div>

                    {/* Decorative Elements */}
                    <div className="absolute top-4 right-4 flex gap-2">
                      <motion.div
                        className="w-3 h-3 rounded-full bg-green-400"
                        animate={{ scale: [1, 1.2, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                      />
                      <div className="w-3 h-3 rounded-full bg-yellow-400" />
                      <div className="w-3 h-3 rounded-full bg-red-400" />
                    </div>
                  </div>
                </div>

                {/* Code Snippet Badges */}
                <motion.div
                  initial={{ x: 50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.4 }}
                  className="absolute -right-10 top-1/4 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-primary/20"
                >
                  <code className="text-xs text-primary font-mono">
                    const passion = &ldquo;coding&ldquo; ❤️
                  </code>
                </motion.div>

                <motion.div
                  initial={{ x: -50, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: 0.6 }}
                  className="absolute -left-10 bottom-1/4 bg-card/80 backdrop-blur-sm p-3 rounded-lg shadow-lg border border-primary/20"
                >
                  <code className="text-xs text-accent-foreground font-mono">
                    skills.push(&ldquo;React&ldquo;, &ldquo;Node&ldquo;)
                  </code>
                </motion.div>

                {/* Glowing Effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none" />
              </TiltCard>
            </div>
          </div>
        </motion.section>

        {/* Content Tabs Section */}
        <section className="mb-24">
          <div className="grid lg:grid-cols-3 gap-8">
            <div className="lg:col-span-1">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="sticky top-32"
              >
                <h2 className="text-3xl font-bold mb-6">
                  {t("journey.title")}
                </h2>
                <p className="text-muted-foreground mb-8">
                  {t("journey.description")}
                </p>

                <div className="space-y-2">
                  <button
                    onClick={() => setActiveTab("story")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "story"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-primary/10"
                    }`}
                  >
                    <FileText className="w-5 h-5" />
                    <span className="font-medium">{t("tabs.story")}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("skills")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "skills"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-primary/10"
                    }`}
                  >
                    <Layers className="w-5 h-5" />
                    <span className="font-medium">{t("tabs.skills")}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("experience")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "experience"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-primary/10"
                    }`}
                  >
                    <Briefcase className="w-5 h-5" />
                    <span className="font-medium">{t("tabs.experience")}</span>
                  </button>

                  <button
                    onClick={() => setActiveTab("education")}
                    className={`w-full text-left px-4 py-3 rounded-lg flex items-center gap-3 transition-colors ${
                      activeTab === "education"
                        ? "bg-primary text-primary-foreground"
                        : "bg-card hover:bg-primary/10"
                    }`}
                  >
                    <GraduationCap className="w-5 h-5" />
                    <span className="font-medium">{t("tabs.education")}</span>
                  </button>
                </div>

                {/* MINI FACTS */}
                <div className="mt-8 space-y-4">
                  <h3 className="text-lg font-semibold">
                    {t("quickFacts.title")}
                  </h3>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFacts.born.label")}
                      </div>
                      <div className="font-medium">
                        {t("quickFacts.born.value")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <Coffee className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFacts.experience.label")}
                      </div>
                      <div className="font-medium">
                        {t("quickFacts.experience.value")}
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="p-2 bg-secondary/20 rounded-full">
                      <Lightbulb className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("quickFacts.projects.label")}
                      </div>
                      <div className="font-medium">
                        {t("quickFacts.projects.value")}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>
            </div>

            <div className="lg:col-span-2">
              <div className="bg-card/60 backdrop-blur-md rounded-2xl border border-border/50 overflow-hidden">
                {/* Tab Content */}
                <AnimatePresence mode="wait">
                  {activeTab === "story" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="p-8"
                    >
                      <h3 className="text-2xl font-bold mb-6 inline-flex items-center gap-2">
                        <FileText className="w-5 h-5" />
                        {t("tabs.story")}
                      </h3>

                      <div className="prose prose-lg dark:prose-invert max-w-none">
                        <p>{t("story.paragraph1")}</p>
                        <p>{t("story.paragraph2")}</p>
                        <p>{t("story.paragraph3")}</p>
                        <p>{t("story.paragraph4")}</p>
                        <p>{t("story.paragraph5")}</p>
                        <p>{t("story.paragraph6")}</p>
                      </div>

                      {/* Personal Interests */}
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold mb-4">
                          {t("personalInterests.title")}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {t("personalInterests.interests")
                            .split(", ")
                            .map((interest: string, index: number) => (
                              <motion.div
                                key={interest}
                                initial={{ opacity: 0, scale: 0 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ delay: index * 0.1 }}
                                className="px-4 py-2 bg-secondary/30 rounded-full text-sm flex items-center gap-2"
                              >
                                <Heart className="w-3 h-3 text-primary" />
                                {interest}
                              </motion.div>
                            ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "skills" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="p-8"
                    >
                      <h3 className="text-2xl font-bold mb-6 inline-flex items-center gap-2">
                        <Layers className="w-5 h-5" />
                        {t("tabs.skills")}
                      </h3>

                      <div className="grid md:grid-cols-2 gap-8">
                        {/* Frontend Skills */}
                        <div>
                          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Code className="w-5 h-5 text-blue-500" />
                            {tSkills("categories.frontend.title")}
                          </h4>

                          {Object.values(
                            t.raw("skills.frontend.skills") as Record<
                              string,
                              { name: string; percentage: number }
                            >
                          ).map(({ name, percentage }, index) => (
                            <SkillBar
                              key={name}
                              name={name}
                              percentage={percentage}
                              color="bg-blue-500"
                              delay={0.1 + index * 0.1}
                            />
                          ))}
                        </div>

                        {/* Backend Skills */}
                        <div>
                          <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                            <Server className="w-5 h-5 text-green-500" />
                            {tSkills("categories.backend.title")}
                          </h4>

                          {Object.values(
                            t.raw("skills.backend.skills") as Record<
                              string,
                              { name: string; percentage: number }
                            >
                          ).map(({ name, percentage }, index) => (
                            <SkillBar
                              key={name}
                              name={name}
                              percentage={percentage}
                              color="bg-green-500"
                              delay={0.1 + index * 0.1}
                            />
                          ))}
                        </div>
                      </div>

                      {/* Tools & Other Skills */}
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold mb-4 flex items-center gap-2">
                          <Wrench className="w-5 h-5 text-purple-500" />
                          {t("skills.tools.title")}
                        </h4>

                        <div className="flex flex-wrap gap-3">
                          {Object.values(
                            t.raw("skills.tools.tools") as Record<
                              string,
                              string
                            >
                          ).map((tool, index) => (
                            <motion.div
                              key={tool}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: index * 0.05 }}
                              whileHover={{
                                scale: 1.05,
                                backgroundColor: "hsl(var(--primary) / 0.2)",
                              }}
                              className="px-4 py-2 bg-secondary/20 rounded-full text-sm"
                            >
                              {tool}
                            </motion.div>
                          ))}
                        </div>
                      </div>

                      {/* Learning & Growth */}
                      <div className="mt-8">
                        <h4 className="text-xl font-semibold mb-4">
                          {t("skills.learning.title")}
                        </h4>
                        <div className="flex flex-wrap gap-3">
                          {Object.values(
                            t.raw("skills.learning.skills") as Record<
                              string,
                              string
                            >
                          ).map((skill, index) => (
                            <motion.div
                              key={skill}
                              initial={{ opacity: 0, scale: 0 }}
                              animate={{ opacity: 1, scale: 1 }}
                              transition={{ delay: 0.5 + index * 0.05 }}
                              className="px-4 py-2 bg-primary/20 rounded-full text-sm flex items-center gap-2"
                            >
                              <Sparkles className="w-3 h-3 text-primary" />
                              {skill}
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    </motion.div>
                  )}

                  {activeTab === "experience" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="p-8"
                    >
                      <h3 className="text-2xl font-bold mb-6 inline-flex items-center gap-2">
                        <Briefcase className="w-5 h-5" />
                        {t("tabs.experience")}
                      </h3>

                      <div className="mt-8">
                        {experience.map((item, index) => (
                          <TimelineItem
                            key={index}
                            date={item.date}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            index={index}
                            expanded={expandedTimeline}
                            toggleExpand={(idx) =>
                              setExpandedTimeline(
                                idx === expandedTimeline ? null : idx
                              )
                            }
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                  {activeTab === "education" && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -20 }}
                      transition={{ duration: 0.4 }}
                      className="p-8"
                    >
                      <h3 className="text-2xl font-bold mb-6 inline-flex items-center gap-2">
                        <GraduationCap className="w-5 h-5" />
                        {t("tabs.education")}
                      </h3>

                      <div className="mt-8">
                        {education.map((item, index) => (
                          <TimelineItem
                            key={index}
                            date={item.date}
                            title={item.title}
                            description={item.description}
                            icon={item.icon}
                            index={index}
                            expanded={expandedTimeline}
                            toggleExpand={(idx) =>
                              setExpandedTimeline(
                                idx === expandedTimeline ? null : idx
                              )
                            }
                          />
                        ))}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          </div>
        </section>

        {/* 3D Interactive Cards Section */}
        <section className="mb-24">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold mb-6">{t("services.title")}</h2>
            <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
              {t("services.subtitle")}
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {[
              {
                title: t("services.frontend.title"),
                description: t("services.frontend.description"),
                icon: <Code className="w-6 h-6" />,
                color: "bg-gradient-to-br from-blue-500/20 to-cyan-500/20",
                borderColor: "border-blue-500/30",
                items: t("services.frontend.items").split(","),
              },
              {
                title: t("services.backend.title"),
                description: t("services.backend.description"),
                icon: <Server className="w-6 h-6" />,
                color: "bg-gradient-to-br from-green-500/20 to-emerald-500/20",
                borderColor: "border-green-500/30",
                items: t("services.backend.items").split(","),
              },
              {
                title: t("services.fullstack.title"),
                description: t("services.fullstack.description"),
                icon: <Layers className="w-6 h-6" />,
                color: "bg-gradient-to-br from-purple-500/20 to-pink-500/20",
                borderColor: "border-purple-500/30",
                items: t("services.fullstack.items").split(","),
              },
            ].map((service, index) => (
              <TiltCard key={index} className="h-full">
                <motion.div
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`h-full p-6 rounded-2xl ${service.color} border ${service.borderColor}`}
                >
                  <div className="flex flex-col h-full">
                    <div className="p-3 bg-card w-fit rounded-xl mb-4">
                      {service.icon}
                    </div>

                    <h3 className="text-xl font-semibold mb-3">
                      {service.title}
                    </h3>
                    <p className="text-muted-foreground mb-6">
                      {service.description}
                    </p>

                    <div className="mt-auto">
                      <h4 className="text-sm font-medium mb-3">
                        {t("services.frontend.keyOfferings")}
                      </h4>
                      <ul className="space-y-2">
                        {service.items.map((item, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <motion.div
                              initial={{ scale: 0 }}
                              whileInView={{ scale: 1 }}
                              viewport={{ once: true }}
                              transition={{ delay: index * 0.1 + i * 0.1 }}
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                            <span className="text-sm">{item}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </motion.div>
              </TiltCard>
            ))}
          </div>
        </section>

        {/* Call to Action */}
        <motion.section
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="relative overflow-hidden rounded-2xl">
            <div className="absolute inset-0 bg-gradient-to-r from-primary/30 to-accent/30 blur-xl" />

            <div className="relative p-8 md:p-12 backdrop-blur-sm">
              <div className="grid md:grid-cols-2 gap-8 items-center">
                <div>
                  <h2 className="text-3xl font-bold mb-4">{t("cta.title")}</h2>
                  <p className="text-lg mb-6">{t("cta.description")}</p>

                  <div className="flex flex-wrap gap-4">
                    <Button asChild size="lg" className="group">
                      <Link
                        href={`/${locale}/contact`}
                        className="flex items-center gap-2"
                      >
                        <Mail className="w-4 h-4" />
                        {t("cta.buttons.contact")}
                      </Link>
                    </Button>
                    <Button asChild size="lg" variant="outline">
                      <Link
                        href={`/${locale}/projects`}
                        className="flex items-center gap-2"
                      >
                        {t("cta.buttons.seeWork")}
                        <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </Button>
                  </div>
                </div>

                <div className="hidden md:block">
                  <motion.div
                    animate={{
                      y: [10, -10, 10],
                      rotate: [0, 5, 0, -5, 0],
                    }}
                    transition={{
                      duration: 8,
                      repeat: Infinity,
                      ease: "easeInOut",
                    }}
                    className="relative"
                  >
                    <div className="aspect-square max-w-xs mx-auto bg-card/80 backdrop-blur-md rounded-full p-8 flex items-center justify-center">
                      <div className="text-center">
                        <div className="relative w-16 h-16 mx-auto mb-4">
                          <div
                            className="absolute inset-0 rounded-full bg-primary/20 animate-ping"
                            style={{ animationDuration: "3s" }}
                          />
                          <div className="relative flex items-center justify-center w-full h-full rounded-full bg-primary/30">
                            <Heart className="w-8 h-8 text-primary" />
                          </div>
                        </div>
                        <p className="text-lg font-semibold">
                          {t("cta.passion.title")}
                        </p>
                        <p className="text-muted-foreground">
                          {t("cta.passion.subtitle")}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>
            </div>
          </div>
        </motion.section>
      </div>
    </main>
  );
}
