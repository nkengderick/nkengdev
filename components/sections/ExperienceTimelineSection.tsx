"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Briefcase,
  GraduationCap,
  Building,
  User,
  MapPin,
  Award,
  Clock,
} from "lucide-react";
import { ExperienceCard } from "../ui/experience-card";

export function ExperienceTimelineSection() {
  const t = useTranslations("experience");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.1 });

  // Work experience data
  const workExperience = [
    {
      title: "Web Developer",
      company: "Freelancer",
      period: "Apr 2023 - Present",
      description: t("work.freelancer.description"),
      skills: ["React", "Node.js", "Next.js", "Responsive Design"],
      color: "from-blue-500 to-blue-600",
    },
    {
      title: "Web Developer",
      company: "Combi universe",
      period: "Jun 2023 - Present",
      description: t("work.combi.description"),
      skills: ["MERN Stack", "UX/UI", "API Development", "Maintenance"],
      color: "from-purple-500 to-purple-600",
    },
    {
      title: "Backend Developer",
      company: "Tenant's Sphere",
      period: "2023",
      description: t("work.tenants.description"),
      skills: ["Node.js", "Testing", "Security", "Database Design"],
      color: "from-green-500 to-green-600",
    },
    {
      title: "Frontend Developer",
      company: "Student Proguide",
      period: "2023",
      description: t("work.proguide.description"),
      skills: ["Next.js", "TypeScript", "CSS", "UI Design"],
      color: "from-cyan-500 to-cyan-600",
    },
    {
      title: "Frontend Developer",
      company: "Kings Digital",
      period: "2022",
      description: t("work.kings.description"),
      skills: ["Web Development", "Payment Systems", "Mobile Dev", "SEO"],
      color: "from-amber-500 to-amber-600",
    },
  ];

  // Education data
  const education = [
    {
      title: "Bachelor's in Engineering",
      company: "University of Buea",
      period: "2021 - Present",
      description: t("education.bachelors.description"),
      skills: [
        "Software Engineering",
        "Web Development",
        "System Administration",
      ],
      color: "from-red-500 to-red-600",
    },
    {
      title: "GCE Advanced Level",
      company: "Catholic Bilingual Grammar College Bishop Andre Wouking",
      period: "2019 - 2021",
      description: t("education.gce.description"),
      skills: ["Mathematics", "Physics", "Computer Science"],
      color: "from-indigo-500 to-indigo-600",
    },
  ];

  return (
    <section
      ref={sectionRef}
      className="py-16 md:py-24 relative overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.3, 0.15, 0.3],
            scale: [1, 1.1, 1],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
        />
        <motion.div
          initial={{ opacity: 0.5 }}
          animate={{
            opacity: [0.4, 0.2, 0.4],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute bottom-1/4 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
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
            {t("time_line.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto">
            {t("time_line.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Professional Experience */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl font-bold mb-8 flex items-center gap-2"
            >
              <Briefcase className="text-primary" />
              {t("categories.work")}
            </motion.h3>

            <div className="space-y-8">
              {workExperience.map((job, index) => (
                <ExperienceCard
                  key={`${job.company}-${job.period}`}
                  title={job.title}
                  company={job.company}
                  period={job.period}
                  description={job.description}
                  skills={job.skills}
                  index={index}
                  icon={<Briefcase className="w-5 h-5" />}
                  isLast={index === workExperience.length - 1}
                  color={job.color}
                />
              ))}
            </div>
          </div>

          {/* Education */}
          <div>
            <motion.h3
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-2xl font-bold mb-8 flex items-center gap-2"
            >
              <GraduationCap className="text-primary" />
              {t("categories.education")}
            </motion.h3>

            <div className="space-y-8">
              {education.map((edu, index) => (
                <ExperienceCard
                  key={`${edu.company}-${edu.period}`}
                  title={edu.title}
                  company={edu.company}
                  period={edu.period}
                  description={edu.description}
                  skills={edu.skills}
                  index={index}
                  icon={<GraduationCap className="w-5 h-5" />}
                  isLast={index === education.length - 1}
                  color={edu.color}
                />
              ))}
            </div>

            {/* Achievements and Certifications */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
              transition={{ duration: 0.6, delay: 0.7 }}
              className="mt-16"
            >
              <h3 className="text-2xl font-bold mb-6 flex items-center gap-2">
                <Award className="text-primary" />
                {t("categories.achievements")}
              </h3>

              <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-md">
                <ul className="space-y-4">
                  {/* List of achievements */}
                  {[1, 2, 3].map((item) => (
                    <motion.li
                      key={item}
                      initial={{ opacity: 0, x: -20 }}
                      animate={
                        isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }
                      }
                      transition={{ delay: 0.8 + item * 0.1 }}
                      className="flex items-start gap-3"
                    >
                      <Award className="w-5 h-5 text-amber-500 mt-1 flex-shrink-0" />
                      <span>{t(`achievements.item${item}`)}</span>
                    </motion.li>
                  ))}
                </ul>
              </div>
            </motion.div>
          </div>
        </div>

        {/* Key Information */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6, delay: 0.9 }}
          className="mt-16"
        >
          <div className="bg-card/60 backdrop-blur-md rounded-xl border border-border/50 p-8 shadow-lg relative overflow-hidden">
            {/* Background gradients */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />

            <h3 className="text-2xl font-bold mb-6 text-center">
              {t("keyInfo.title")}
            </h3>

            <div className="grid md:grid-cols-4 gap-6">
              <InfoCard
                icon={<User className="w-5 h-5" />}
                title={t("keyInfo.totalExperience.title")}
                value={t("keyInfo.totalExperience.value")}
                color="bg-blue-500"
                delay={1.0}
                isInView={isInView}
              />
              <InfoCard
                icon={<Building className="w-5 h-5" />}
                title={t("keyInfo.companiesWorked.title")}
                value={t("keyInfo.companiesWorked.value")}
                color="bg-purple-500"
                delay={1.1}
                isInView={isInView}
              />
              <InfoCard
                icon={<MapPin className="w-5 h-5" />}
                title={t("keyInfo.location.title")}
                value={t("keyInfo.location.value")}
                color="bg-green-500"
                delay={1.2}
                isInView={isInView}
              />
              <InfoCard
                icon={<Clock className="w-5 h-5" />}
                title={t("keyInfo.availability.title")}
                value={t("keyInfo.availability.value")}
                color="bg-amber-500"
                delay={1.3}
                isInView={isInView}
              />
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Helper component for key information cards
function InfoCard({
  icon,
  title,
  value,
  color,
  delay,
  isInView,
}: {
  icon: React.ReactNode;
  title: string;
  value: string;
  color: string;
  delay: number;
  isInView: boolean;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.5, delay }}
      className="bg-card/80 backdrop-blur-sm rounded-lg p-4 border border-border/50 shadow-sm relative overflow-hidden text-center"
    >
      <div className="flex justify-center mb-3">
        <div className={`p-3 rounded-full ${color} text-white`}>{icon}</div>
      </div>
      <h4 className="font-medium text-sm text-muted-foreground mb-1">
        {title}
      </h4>
      <p className="font-bold text-lg">{value}</p>
    </motion.div>
  );
}
