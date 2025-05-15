"use client";

import { useTranslations } from "next-intl";
import { useLocale } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  ArrowRight,
  Code2,
  Sparkles,
  Monitor,
  Smartphone,
  Globe,
} from "lucide-react";
import { useState } from "react";

// This would typically come from your data/projects.json file
const featuredProjects = [
  {
    id: 1,
    title: "Tenant's Sphere",
    description:
      "A comprehensive property management software with features like tenancy agreements, maintenance requests, and online rent payments.",
    image: "/projects/tenants-sphere.jpg",
    technologies: ["React", "Node.js", "MongoDB", "Express"],
    githubUrl: "#",
    liveUrl: "#",
    type: "Full-Stack Web App",
    icon: <Monitor className="w-5 h-5" />,
    gradient: "from-blue-600 to-cyan-600",
  },
  {
    id: 2,
    title: "Student ProGuide",
    description:
      "Document delivery web application built with Next.js and TypeScript for efficient student information management.",
    image: "/projects/student-proguide.jpg",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS"],
    githubUrl: "#",
    liveUrl: "https://studentproguide.site",
    type: "Frontend Application",
    icon: <Globe className="w-5 h-5" />,
    gradient: "from-purple-600 to-pink-600",
  },
  {
    id: 3,
    title: "Biometric Attendance App",
    description:
      "Cross-platform mobile application for institutions to record and manage student attendance with biometric verification.",
    image: "/projects/biometric-app.jpg",
    technologies: ["React Native", "Node.js", "MongoDB"],
    githubUrl: "#",
    liveUrl: "#",
    type: "Mobile Application",
    icon: <Smartphone className="w-5 h-5" />,
    gradient: "from-green-600 to-teal-600",
  },
];

export function ProjectsGrid() {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 30 },
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
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-background" />
        <motion.div
          className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
          animate={{
            x: [0, 50, 0],
            y: [0, -50, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/4 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl"
          animate={{
            x: [0, -50, 0],
            y: [0, 50, 0],
          }}
          transition={{
            duration: 25,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">{t("badge")}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6">
            {t("title")}
          </h2>
          <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
            {t("subtitle")}
          </p>
        </motion.div>

        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16"
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              variants={itemVariants}
              onHoverStart={() => setHoveredId(project.id)}
              onHoverEnd={() => setHoveredId(null)}
              className="group relative"
            >
              <div className="relative h-full bg-card rounded-xl overflow-hidden border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300">
                {/* Project Type Badge */}
                <div className="absolute top-4 left-4 z-10">
                  <div
                    className={`inline-flex items-center gap-2 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium`}
                  >
                    {project.icon}
                    <span>{project.type}</span>
                  </div>
                </div>

                {/* Image Container */}
                <div className="relative h-48 overflow-hidden">
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${project.gradient} opacity-90`}
                  />
                  <Image
                    src={project.image}
                    alt={project.title}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />

                  {/* Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 bg-black/60 flex items-center justify-center gap-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: hoveredId === project.id ? 1 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <motion.a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      <Github className="w-5 h-5" />
                    </motion.a>
                    {project.liveUrl !== "#" && (
                      <motion.a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-3 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink className="w-5 h-5" />
                      </motion.a>
                    )}
                  </motion.div>
                </div>

                {/* Content */}
                <div className="p-6">
                  <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
                    {project.title}
                  </h3>
                  <p className="text-muted-foreground mb-4 line-clamp-3">
                    {project.description}
                  </p>

                  {/* Tech Stack */}
                  <div className="flex flex-wrap gap-2 mb-6">
                    {project.technologies.map((tech, index) => (
                      <motion.span
                        key={tech}
                        className="px-3 py-1 bg-secondary/50 rounded-full text-xs font-medium"
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.05 }}
                        viewport={{ once: true }}
                      >
                        {tech}
                      </motion.span>
                    ))}
                  </div>

                  {/* View Project Link */}
                  <Link
                    href={`/${locale}/projects/${project.id}`}
                    className="inline-flex items-center gap-2 text-primary font-medium group/link"
                  >
                    <span className="group-hover/link:underline">
                      {t("viewProject")}
                    </span>
                    <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
                  </Link>
                </div>

                {/* Decorative Corner */}
                <div
                  className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${project.gradient} opacity-10 blur-2xl`}
                />
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View All Projects */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.3 }}
          className="text-center"
        >
          <Button asChild size="lg" className="group">
            <Link
              href={`/${locale}/projects`}
              className="flex items-center gap-2"
            >
              <Code2 className="w-4 h-4" />
              {t("viewAll")}
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
