"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Code, Server, Database, Layers } from "lucide-react";

interface ProjectStatistic {
  value: string;
  label: string;
  icon: React.ReactNode;
  color: string;
}

export function ProjectStats() {
  const t = useTranslations("projects.stats");

  const statistics: ProjectStatistic[] = [
    {
      value: "15+",
      label: t("totalProjects"),
      icon: <Layers className="w-6 h-6" />,
      color: "bg-gradient-to-br from-blue-600 to-cyan-600",
    },
    {
      value: "6+",
      label: t("frontendProjects"),
      icon: <Code className="w-6 h-6" />,
      color: "bg-gradient-to-br from-green-600 to-teal-600",
    },
    {
      value: "5+",
      label: t("backendProjects"),
      icon: <Server className="w-6 h-6" />,
      color: "bg-gradient-to-br from-purple-600 to-pink-600",
    },
    {
      value: "4+",
      label: t("databaseProjects"),
      icon: <Database className="w-6 h-6" />,
      color: "bg-gradient-to-br from-orange-600 to-amber-600",
    },
  ];

  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-16">
      {statistics.map((stat, index) => (
        <motion.div
          key={stat.label}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4, delay: index * 0.1 }}
          className="bg-card/60 backdrop-blur-sm rounded-xl border border-border/50 p-6 text-center relative overflow-hidden group"
        >
          {/* Background Gradient */}
          <div className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-300">
            <div className={`absolute inset-0 ${stat.color}`} />
          </div>

          {/* Icon */}
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{
              type: "spring",
              stiffness: 260,
              damping: 20,
              delay: 0.1 + index * 0.1,
            }}
            className="flex justify-center mb-3"
          >
            <div className={`p-3 rounded-xl text-white ${stat.color}`}>
              {stat.icon}
            </div>
          </motion.div>

          {/* Value */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.2 + index * 0.1 }}
            className="text-3xl font-bold mb-1"
          >
            {stat.value}
          </motion.div>

          {/* Label */}
          <motion.div
            initial={{ y: 20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.3, delay: 0.3 + index * 0.1 }}
            className="text-sm text-muted-foreground"
          >
            {stat.label}
          </motion.div>

          {/* Decorative elements */}
          <div className="absolute -bottom-4 -right-4 w-16 h-16 rounded-full bg-gradient-to-br from-primary/10 to-transparent blur-xl" />
          <div className="absolute -top-4 -left-4 w-12 h-12 rounded-full bg-gradient-to-br from-accent/10 to-transparent blur-xl" />
        </motion.div>
      ))}
    </div>
  );
}
