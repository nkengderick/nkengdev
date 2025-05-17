"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Github,
  ExternalLink,
  Calendar,
  CheckCircle2,
  TagIcon,
  Layers,
  Quote,
  Users,
  MessagesSquare,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { projectsData } from "@/data/projects";
import { ProjectCategoryBadge } from "@/components/ui/project-category-badge";
import { Project } from "../../types/projects";

export default function ProjectDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("projects.detail");

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [nextProject, setNextProject] = useState<Project | null>(null);
  const [prevProject, setPrevProject] = useState<Project | null>(null);

  useEffect(() => {
    if (params.id) {
      const foundProject = projectsData.find((p) => p.id === params.id);

      if (foundProject) {
        setProject(foundProject);

        // Find next and previous projects
        const currentIndex = projectsData.findIndex((p) => p.id === params.id);

        if (currentIndex > 0) {
          setPrevProject(projectsData[currentIndex - 1]);
        } else {
          setPrevProject(null);
        }

        if (currentIndex < projectsData.length - 1) {
          setNextProject(projectsData[currentIndex + 1]);
        } else {
          setNextProject(null);
        }
      }
    }

    setLoading(false);
  }, [params.id]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!project) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Project Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The project you&lsquo;re looking for doesn&lsquo;t exist or has been removed.
        </p>
        <Button asChild>
          <Link
            href={`/${locale}/projects`}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Projects
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 relative min-h-screen">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/10 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back button */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link
              href={`/${locale}/projects`}
              className="flex items-center gap-2"
            >
              <ArrowLeft className="w-4 h-4" />
              {t("backToProjects")}
            </Link>
          </Button>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-2xl overflow-hidden mb-12">
          {/* Project Category */}
          <div className="absolute top-4 left-4 z-20">
            <ProjectCategoryBadge name={project.category} icon={project.icon} />
          </div>

          {/* Image Container */}
          <div className="relative h-[40vh] md:h-[60vh] overflow-hidden">
            <div
              className={`absolute inset-0 bg-gradient-to-br ${
                project.gradient || "from-primary/80 to-accent/80"
              } opacity-90 z-10`}
            />

            <Image
              src={project.image}
              alt={project.title}
              fill
              className="object-cover"
            />

            {/* Content Overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col justify-end p-8">
              <motion.h1
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="text-3xl md:text-5xl font-bold text-white mb-4"
              >
                {project.title}
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="text-white/90 text-lg md:text-xl max-w-3xl mb-6"
              >
                {project.description}
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="flex flex-wrap items-center gap-6"
              >
                <div className="flex items-center gap-2 text-white/80">
                  <Calendar className="w-4 h-4" />
                  <span>{project.date}</span>
                </div>

                <div className="flex gap-3">
                  {project.githubUrl && (
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-white/10 backdrop-blur-sm rounded-full text-white hover:bg-white/20 transition-colors"
                    >
                      <Github className="w-5 h-5" />
                    </a>
                  )}

                  {project.liveUrl && project.liveUrl !== "#" && (
                    <a
                      href={project.liveUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 bg-primary rounded-full text-white hover:bg-primary/80 transition-colors"
                    >
                      <ExternalLink className="w-5 h-5" />
                    </a>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid md:grid-cols-3 gap-8 mb-16">
          {/* Left Content - Overview */}
          <div className="md:col-span-2">
            {/* Overview */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8"
            >
              <h2 className="text-2xl font-bold mb-4">{t("overview")}</h2>
              <p className="text-muted-foreground">
                {project.overview || project.description}
              </p>
            </motion.div>

            {/* Challenge & Solution */}
            {(project.challenge || project.solution) && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="grid md:grid-cols-2 gap-6 mb-8"
              >
                {project.challenge && (
                  <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                    <h2 className="text-2xl font-bold mb-4">
                      {t("challenge")}
                    </h2>
                    <p className="text-muted-foreground">{project.challenge}</p>
                  </div>
                )}

                {project.solution && (
                  <div className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6">
                    <h2 className="text-2xl font-bold mb-4">{t("solution")}</h2>
                    <p className="text-muted-foreground">{project.solution}</p>
                  </div>
                )}
              </motion.div>
            )}

            {/* Key Features */}
            {project.features && project.features.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.2 }}
                className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8"
              >
                <h2 className="text-2xl font-bold mb-4">{t("keyFeatures")}</h2>
                <div className="grid sm:grid-cols-2 gap-4">
                  {project.features.map((feature: string, index: number) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: 0.3 + index * 0.05 }}
                      className="flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-primary mt-0.5 flex-shrink-0" />
                      <span>{feature}</span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Testimonial */}
            {project.testimonial && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8 relative overflow-hidden"
              >
                <div className="absolute top-4 right-4 text-primary/30">
                  <Quote className="w-16 h-16" />
                </div>

                <h2 className="text-2xl font-bold mb-4">{t("testimonial")}</h2>
                <blockquote className="pl-4 border-l-4 border-primary/30 italic text-lg mb-4">
                  &ldquo;{project.testimonial.quote}&ldquo;
                </blockquote>
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-secondary/50 rounded-full">
                    <Users className="w-5 h-5 text-primary" />
                  </div>
                  <div>
                    <div className="font-semibold">
                      {project.testimonial.author}
                    </div>
                    <div className="text-sm text-muted-foreground">
                      {project.testimonial.role}
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </div>

          {/* Right Sidebar - Project Details */}
          <div>
            <div className="sticky top-24">
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
                className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 mb-8"
              >
                <h2 className="text-xl font-bold mb-4">
                  {t("projectDetails")}
                </h2>

                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/50 rounded-full">
                      <Calendar className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("completionDate")}
                      </div>
                      <div className="font-medium">{project.date}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/50 rounded-full">
                      <TagIcon className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("category")}
                      </div>
                      <div className="font-medium">{project.category}</div>
                    </div>
                  </div>

                  <div className="flex items-start gap-3">
                    <div className="p-2 bg-secondary/50 rounded-full">
                      <Layers className="w-4 h-4 text-primary" />
                    </div>
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("technologies")}
                      </div>
                      <div className="flex flex-wrap gap-2 mt-2">
                        {project.technologies.map((tech: string) => (
                          <span
                            key={tech}
                            className="px-2 py-1 bg-secondary/50 rounded-md text-xs font-medium"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </motion.div>

              {/* Call to Discuss */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5, delay: 0.1 }}
                className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 overflow-hidden relative"
              >
                <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-xl -z-10" />
                <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-xl -z-10" />

                <h2 className="text-xl font-bold mb-4">
                  {t("interestedInProject")}
                </h2>
                <p className="text-muted-foreground mb-6">
                  {t("discussDetails")}
                </p>

                <Button asChild className="w-full">
                  <a
                    href="mailto:nkengbderick@gmail.com"
                    className="flex items-center justify-center gap-2"
                  >
                    <MessagesSquare className="w-4 h-4" />
                    {t("getInTouch")}
                  </a>
                </Button>
              </motion.div>
            </div>
          </div>
        </div>

        {/* Navigation between projects */}
        <div className="border-t border-border/50 pt-8">
          <h2 className="text-2xl font-bold mb-6 text-center">
            {t("exploreMore")}
          </h2>

          <div className="grid grid-cols-2 gap-4">
            {prevProject ? (
              <Link
                href={`/${locale}/projects/${prevProject.id}`}
                className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
                <div>
                  <div className="text-sm text-muted-foreground">
                    {t("previousProject")}
                  </div>
                  <div className="font-medium truncate">
                    {prevProject.title}
                  </div>
                </div>
              </Link>
            ) : (
              <div></div>
            )}

            {nextProject ? (
              <Link
                href={`/${locale}/projects/${nextProject.id}`}
                className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-4 flex items-center justify-end gap-3 hover:border-primary/50 transition-colors text-right"
              >
                <div>
                  <div className="text-sm text-muted-foreground">
                    {t("nextProject")}
                  </div>
                  <div className="font-medium truncate">
                    {nextProject.title}
                  </div>
                </div>
                <ChevronRight className="w-5 h-5" />
              </Link>
            ) : (
              <div></div>
            )}
          </div>
        </div>
      </div>
    </main>
  );
}
