"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { useTranslations } from "next-intl";
import {
  ExternalLink,
  Github,
  ArrowRight,
  Calendar,
  Layers,
  Code,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectCategoryBadge } from "./project-category-badge";

export interface ProjectType {
  id: string | number;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  date: string;
  featured?: boolean;
  gradient?: string;
  icon?: React.ReactNode;
}

interface ProjectCardProps {
  project: ProjectType;
  featured?: boolean;
  className?: string;
}

export function EnhancedProjectCard({
  project,
  featured = false,
  className,
}: ProjectCardProps) {
  const t = useTranslations("projects");
  const locale = useLocale();
  const [isHovered, setIsHovered] = useState(false);

  // Determine gradient based on category or use default
  const getGradient = () => {
    if (project.gradient) return project.gradient;

    switch (project.category.toLowerCase()) {
      case "web":
      case "frontend":
        return "from-blue-600 to-cyan-600";
      case "mobile":
        return "from-green-600 to-teal-600";
      case "backend":
      case "server":
        return "from-purple-600 to-pink-600";
      case "full-stack":
        return "from-orange-600 to-amber-600";
      default:
        return "from-primary to-blue-600";
    }
  };

  const getCategoryIcon = () => {
    if (project.icon) return project.icon;

    switch (project.category.toLowerCase()) {
      case "web":
      case "frontend":
        return <Code className="w-3 h-3" />;
      case "mobile":
        return <Layers className="w-3 h-3" />;
      case "backend":
      case "server":
        return <Layers className="w-3 h-3" />;
      default:
        return <Code className="w-3 h-3" />;
    }
  };

  return (
    <motion.div
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 20 }}
      transition={{ duration: 0.4 }}
      className={cn("group", featured ? "md:col-span-2" : "", className)}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div
        className={cn(
          "relative h-full bg-card rounded-xl overflow-hidden border border-border/50 shadow-md hover:shadow-xl transition-all duration-300",
          featured ? "grid md:grid-cols-2 gap-0" : ""
        )}
      >
        {/* Featured Label */}
        {project.featured && (
          <div className="absolute top-4 right-4 z-20">
            <div className="px-3 py-1 bg-primary/80 backdrop-blur-sm rounded-full text-xs font-medium text-primary-foreground">
              {t("featuredTitle")}
            </div>
          </div>
        )}

        {/* Category Badge */}
        <div
          className={cn(
            "absolute z-20",
            featured ? "top-4 left-4" : "top-3 left-3"
          )}
        >
          <ProjectCategoryBadge
            name={project.category}
            icon={getCategoryIcon()}
            color={getGradient()}
          />
        </div>

        {/* Image Container */}
        <div
          className={cn(
            "relative overflow-hidden",
            featured ? "h-full" : "h-48"
          )}
        >
          <div
            className={`absolute inset-0 bg-gradient-to-br ${getGradient()} opacity-80 z-10`}
          />

          <Image
            src={project.image}
            alt={project.title}
            fill
            className="object-cover transition-transform duration-700 group-hover:scale-110"
          />

          {/* Date Overlay */}
          <div className="absolute bottom-3 right-3 z-20">
            <div className="flex items-center gap-1 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-xs text-white">
              <Calendar className="w-3 h-3" />
              <span>{project.date}</span>
            </div>
          </div>

          {/* Hover Actions */}
          <AnimatePresence>
            {isHovered && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/70 flex items-center justify-center gap-4 z-30"
              >
                {project.githubUrl && (
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
                )}
                {project.liveUrl && (
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

                <motion.div
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link
                    href={`/${locale}/projects/${project.id}`}
                    className="p-3 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors"
                  >
                    <ArrowRight className="w-5 h-5" />
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Content */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors">
            {project.title}
          </h3>

          <p
            className={cn(
              "text-muted-foreground mb-4",
              featured ? "line-clamp-4" : "line-clamp-2"
            )}
          >
            {project.description}
          </p>

          {/* Tech Stack */}
          <div className="flex flex-wrap gap-2 mb-4">
            {project.technologies
              .slice(0, featured ? 6 : 3)
              .map((tech, index) => (
                <motion.span
                  key={tech}
                  className="px-2 py-1 bg-secondary/50 rounded-md text-xs font-medium"
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: index * 0.05 }}
                >
                  {tech}
                </motion.span>
              ))}
            {project.technologies.length > (featured ? 6 : 3) && (
              <span className="px-2 py-1 bg-secondary/30 rounded-md text-xs font-medium text-muted-foreground">
                +{project.technologies.length - (featured ? 6 : 3)} more
              </span>
            )}
          </div>

          {/* View Details Link */}
          <Link
            href={`/${locale}/projects/${project.id}`}
            className="inline-flex items-center gap-2 text-primary font-medium group/link"
          >
            <span className="group-hover/link:underline">
              {t("viewDetails")}
            </span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>

        {/* Decorative Corner */}
        <div
          className={`absolute bottom-0 right-0 w-24 h-24 bg-gradient-to-br ${getGradient()} opacity-10 blur-2xl`}
        />
      </div>
    </motion.div>
  );
}
