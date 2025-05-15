"use client";

import { motion } from "framer-motion";

interface Skill {
  name: string;
  level: number;
  icon?: string;
}

interface SkillCategoryProps {
  title: string;
  skills: Skill[];
  icon?: React.ReactNode;
  color?: string;
  index?: number;
}

export function SkillCategory({
  title,
  skills,
  icon,
  color = "from-primary to-primary/50",
  index = 0,
}: SkillCategoryProps) {
  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.5,
        delay: index * 0.1,
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.5,
      },
    },
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.3 }}
      className="relative group"
    >
      <div className="relative bg-card rounded-2xl p-6 border border-border/50 shadow-md hover:shadow-xl transition-all duration-300 h-full overflow-hidden">
        {/* Background Gradient */}
        <div
          className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-br ${color} opacity-10 blur-2xl group-hover:opacity-20 transition-opacity`}
        />

        {/* Header */}
        <div className="flex items-center gap-3 mb-6">
          {icon && (
            <div
              className={`p-3 rounded-xl bg-gradient-to-br ${color} text-white shadow-lg`}
            >
              {icon}
            </div>
          )}
          <h3 className="text-xl font-semibold">{title}</h3>
        </div>

        {/* Skills List */}
        <div className="space-y-4">
          {skills.map((skill, skillIndex) => (
            <motion.div
              key={skill.name}
              variants={itemVariants}
              className="relative"
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                  {skill.icon && <span className="text-lg">{skill.icon}</span>}
                  <span className="font-medium text-sm">{skill.name}</span>
                </div>
                <span className="text-sm text-muted-foreground font-semibold">
                  {skill.level}%
                </span>
              </div>

              {/* Progress Bar */}
              <div className="relative h-2.5 bg-secondary/20 rounded-full overflow-hidden">
                <motion.div
                  className={`absolute inset-y-0 left-0 bg-gradient-to-r ${color} rounded-full`}
                  initial={{ width: 0 }}
                  whileInView={{ width: `${skill.level}%` }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 1,
                    delay: index * 0.1 + skillIndex * 0.05,
                    ease: "easeOut",
                  }}
                >
                  {/* Shimmer Effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-shimmer" />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Hover Effect - Corner decoration */}
        <motion.div
          className="absolute -bottom-4 -right-4 w-20 h-20 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
          animate={{
            rotate: [0, 360],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "linear",
          }}
        >
          <div
            className={`w-full h-full bg-gradient-to-br ${color} opacity-20 blur-xl`}
          />
        </motion.div>
      </div>
    </motion.div>
  );
}
