"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Code,
  Server,
  Database,
  Layers,
  Braces,
  Globe,
  FileCode2,
  Cpu,
} from "lucide-react";
import { SkillCard } from "../ui/skill-card";
import { SkillOrbit } from "../ui/skill-orbit";

export function SkillsShowcaseSection() {
  const t = useTranslations("skills");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Frontend skills
  const frontendSkills = [
    {
      title: "React.js",
      level: 90,
      icon: <Code className="w-5 h-5" />,
      description: t("skills.frontend.react"),
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Next.js",
      level: 85,
      icon: <Braces className="w-5 h-5" />,
      description: t("skills.frontend.next"),
      color: "from-black to-gray-800",
    },
    {
      title: "TypeScript",
      level: 80,
      icon: <FileCode2 className="w-5 h-5" />,
      description: t("skills.frontend.typescript"),
      color: "from-blue-600 to-blue-700",
    },
    {
      title: "HTML/CSS",
      level: 90,
      icon: <Globe className="w-5 h-5" />,
      description: t("skills.frontend.html"),
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Tailwind CSS",
      level: 90,
      icon: <Code className="w-5 h-5" />,
      description: t("skills.frontend.tailwind"),
      color: "from-cyan-500 to-blue-500",
    },
    {
      title: "Redux",
      level: 75,
      icon: <Layers className="w-5 h-5" />,
      description: t("skills.frontend.redux"),
      color: "from-purple-500 to-purple-600",
    },
  ];

  // Backend skills
  const backendSkills = [
    {
      title: "Node.js",
      level: 85,
      icon: <Server className="w-5 h-5" />,
      description: t("skills.backend.node"),
      color: "from-green-500 to-green-600",
    },
    {
      title: "Express.js",
      level: 85,
      icon: <Server className="w-5 h-5" />,
      description: t("skills.backend.express"),
      color: "from-gray-600 to-gray-700",
    },
    {
      title: "MongoDB",
      level: 80,
      icon: <Database className="w-5 h-5" />,
      description: t("skills.backend.mongodb"),
      color: "from-green-600 to-green-700",
    },
    {
      title: "REST APIs",
      level: 85,
      icon: <Globe className="w-5 h-5" />,
      description: t("skills.backend.restapi"),
      color: "from-blue-500 to-indigo-500",
    },
    {
      title: "SQL",
      level: 75,
      icon: <Database className="w-5 h-5" />,
      description: t("skills.backend.sql"),
      color: "from-blue-400 to-blue-500",
    },
    {
      title: "Nest.js",
      level: 70,
      icon: <Cpu className="w-5 h-5" />,
      description: t("skills.backend.nest"),
      color: "from-red-500 to-red-600",
    },
  ];

  // For skill orbit visualization
  const orbitalSkills = [
    { name: "React", icon: "⚛️" },
    { name: "Node.js", icon: "🟢" },
    { name: "TypeScript", icon: "📘" },
    { name: "Next.js", icon: "▲" },
    { name: "Tailwind", icon: "🎨" },
    { name: "MongoDB", icon: "🍃" },
    { name: "SQL", icon: "🗄️" },
    { name: "REST API", icon: "🔌" },
    { name: "Redux", icon: "🔄" },
    { name: "Express", icon: "🚂" },
    { name: "Git", icon: "🐙" },
    { name: "HTML/CSS", icon: "🌐" },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.4, 0.2, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.3, 0.15, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
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
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("showcase.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("showcase.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Frontend Skills */}
          <div className="lg:col-span-2">
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl font-bold mb-6 flex items-center gap-2"
            >
              <Code className="text-blue-500" />
              {t("categories.frontend.title")}
            </motion.h3>

            <div className="grid md:grid-cols-2 gap-4">
              {frontendSkills.map((skill, index) => (
                <SkillCard
                  key={skill.title}
                  title={skill.title}
                  level={skill.level}
                  icon={skill.icon}
                  description={skill.description}
                  color={skill.color}
                  index={index}
                />
              ))}
            </div>
          </div>

          {/* Skill Orbit Visualization */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={
              isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0.8 }
            }
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex justify-center items-center pt-10"
          >
            <SkillOrbit
              skills={orbitalSkills}
              centerIcon={<Layers className="w-8 h-8 text-primary" />}
              size="lg"
            />
          </motion.div>
        </div>

        {/* Backend Skills */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.5 }}
          className="mt-16"
        >
          <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
            <Server className="text-green-500" />
            {t("categories.backend.title")}
          </h3>

          <div className="grid md:grid-cols-3 gap-4">
            {backendSkills.map((skill, index) => (
              <SkillCard
                key={skill.title}
                title={skill.title}
                level={skill.level}
                icon={skill.icon}
                description={skill.description}
                color={skill.color}
                index={index}
              />
            ))}
          </div>
        </motion.div>

        {/* Tools & Technologies */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.7 }}
          className="mt-16 text-center"
        >
          <h3 className="text-2xl font-bold mb-6">
            {t("categories.tools.title")}
          </h3>

          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "Git",
              "GitHub",
              "VS Code",
              "Docker",
              "Linux",
              "RESTful APIs",
              "WebSockets",
              "JSON",
              "JWT",
              "OAuth",
              "CI/CD",
              "Agile/Scrum",
            ].map((tool, index) => (
              <motion.span
                key={tool}
                initial={{ opacity: 0, scale: 0 }}
                animate={
                  isInView ? { opacity: 1, scale: 1 } : { opacity: 0, scale: 0 }
                }
                transition={{ delay: 0.8 + index * 0.05 }}
                whileHover={{
                  scale: 1.1,
                  backgroundColor: "hsl(var(--primary) / 0.2)",
                }}
                className="px-4 py-2 bg-card/80 backdrop-blur-sm rounded-full text-sm font-medium border border-border/50 shadow-sm"
              >
                {tool}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
