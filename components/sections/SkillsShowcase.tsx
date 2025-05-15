"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Code2,
  Server,
  Wrench,
  Sparkles,
} from "lucide-react";

const skillCategories = [
  {
    title: "Frontend Development",
    icon: <Code2 className="w-6 h-6" />,
    color: "from-blue-500 to-cyan-500",
    skills: [
      { name: "React.js", level: 90, icon: "⚛️" },
      { name: "Next.js", level: 85, icon: "▲" },
      { name: "TypeScript", level: 80, icon: "📘" },
      { name: "HTML/CSS", level: 95, icon: "🎨" },
      { name: "Tailwind CSS", level: 85, icon: "🎯" },
      { name: "Redux", level: 75, icon: "🔄" },
    ],
  },
  {
    title: "Backend Development",
    icon: <Server className="w-6 h-6" />,
    color: "from-green-500 to-emerald-500",
    skills: [
      { name: "Node.js", level: 85, icon: "🟢" },
      { name: "Express.js", level: 85, icon: "🚂" },
      { name: "MongoDB", level: 80, icon: "🍃" },
      { name: "SQL", level: 75, icon: "🗄️" },
      { name: "REST APIs", level: 85, icon: "🔌" },
      { name: "Nest.js", level: 70, icon: "🦅" },
    ],
  },
  {
    title: "Tools & Platforms",
    icon: <Wrench className="w-6 h-6" />,
    color: "from-purple-500 to-pink-500",
    skills: [
      { name: "Git/GitHub", level: 90, icon: "🐙" },
      { name: "VS Code", level: 95, icon: "💻" },
      { name: "Linux", level: 70, icon: "🐧" },
      { name: "Docker", level: 60, icon: "🐋" },
      { name: "AWS", level: 55, icon: "☁️" },
      { name: "Agile/Scrum", level: 80, icon: "🏃" },
    ],
  },
];

export function SkillsShowcase() {
  const t = useTranslations("skills");
  const containerRef = useRef(null);
  const isInView = useInView(containerRef, { once: true, amount: 0.2 });

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
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut",
      },
    },
  };

  return (
    <section
      className="relative py-20 md:py-32 overflow-hidden"
      ref={containerRef}
    >
      {/* Background Effects */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
        <motion.div
          className="absolute top-20 right-20 w-72 h-72 bg-blue-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.2, 1],
            rotate: [0, 90, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 left-20 w-96 h-96 bg-purple-500/10 rounded-full blur-3xl"
          animate={{
            scale: [1, 1.3, 1],
            rotate: [0, -90, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6"
          >
            <Sparkles className="w-4 h-4" />
            <span className="text-sm font-medium">Technical Expertise</span>
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
          animate={isInView ? "visible" : "hidden"}
          className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        >
          {skillCategories.map((category, categoryIndex) => (
            <motion.div
              key={categoryIndex}
              variants={itemVariants}
              className="group"
            >
              <div className="relative h-full bg-card rounded-2xl p-6 border border-border/50 shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden">
                {/* Gradient Background */}
                <div
                  className={`absolute top-0 right-0 w-40 h-40 bg-gradient-to-br ${category.color} opacity-10 blur-3xl`}
                />

                {/* Header */}
                <div className="flex items-center gap-3 mb-6">
                  <div
                    className={`p-3 rounded-xl bg-gradient-to-br ${category.color} text-white`}
                  >
                    {category.icon}
                  </div>
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>

                {/* Skills */}
                <div className="space-y-4">
                  {category.skills.map((skill, skillIndex) => (
                    <SkillBar
                      key={skillIndex}
                      skill={skill}
                      index={skillIndex}
                      categoryIndex={categoryIndex}
                      gradientColor={category.color}
                      isInView={isInView}
                    />
                  ))}
                </div>

                {/* Decorative Elements */}
                <motion.div
                  className="absolute -bottom-4 -right-4 w-24 h-24 opacity-20"
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
                    className={`w-full h-full rounded-full bg-gradient-to-br ${category.color}`}
                  />
                </motion.div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Additional Skills Summary */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: isInView ? 1 : 0, y: isInView ? 0 : 30 }}
          transition={{ delay: 0.8 }}
          className="mt-16 text-center"
        >
          <p className="text-muted-foreground mb-6">
            And more technologies I&lsquo;m exploring...
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            {[
              "GraphQL",
              "Redis",
              "Kubernetes",
              "Python",
              "WebSockets",
              "CI/CD",
            ].map((tech, index) => (
              <motion.span
                key={tech}
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: isInView ? 1 : 0, scale: isInView ? 1 : 0 }}
                transition={{ delay: 1 + index * 0.1 }}
                whileHover={{ scale: 1.1 }}
                className="px-4 py-2 bg-secondary/50 rounded-full text-sm font-medium"
              >
                {tech}
              </motion.span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

// Skill Bar Component
function SkillBar({
  skill,
  index,
  categoryIndex,
  gradientColor,
  isInView,
}: {
  skill: { name: string; level: number; icon: string };
  index: number;
  categoryIndex: number;
  gradientColor: string;
  isInView: boolean;
}) {
  const progressRef = useRef(null);
  const progressInView = useInView(progressRef, { once: true });

  return (
    <motion.div
      ref={progressRef}
      initial={{ opacity: 0, x: -20 }}
      animate={{
        opacity: isInView ? 1 : 0,
        x: isInView ? 0 : -20,
      }}
      transition={{
        delay: categoryIndex * 0.1 + index * 0.05,
        duration: 0.5,
      }}
    >
      <div className="flex items-center justify-between mb-2">
        <div className="flex items-center gap-2">
          <span className="text-lg">{skill.icon}</span>
          <span className="font-medium">{skill.name}</span>
        </div>
        <motion.span
          className="text-sm text-muted-foreground font-medium"
          initial={{ opacity: 0 }}
          animate={{ opacity: isInView ? 1 : 0 }}
          transition={{ delay: categoryIndex * 0.1 + index * 0.05 + 0.3 }}
        >
          {skill.level}%
        </motion.span>
      </div>

      <div className="relative h-3 bg-secondary/30 rounded-full overflow-hidden">
        <motion.div
          className={`absolute inset-y-0 left-0 bg-gradient-to-r ${gradientColor} rounded-full`}
          initial={{ width: 0 }}
          animate={{
            width: progressInView ? `${skill.level}%` : 0,
          }}
          transition={{
            delay: categoryIndex * 0.1 + index * 0.05 + 0.2,
            duration: 1,
            ease: "easeOut",
          }}
        >
          <div className="absolute inset-0 bg-white/20 animate-pulse" />
        </motion.div>
      </div>
    </motion.div>
  );
}
