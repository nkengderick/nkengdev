"use client";

import { useTranslations } from "next-intl";
import Link from "next/link";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { TypeAnimation } from "@/components/ui/type-animation";
import { useLocale } from "next-intl";
import { motion } from "framer-motion";
import { ArrowRight, Download, Mail, Code, Server } from "lucide-react";

export function Hero() {
  const t = useTranslations("hero");
  const locale = useLocale();

  const roles = [
    "Full-Stack Developer",
    "React Specialist",
    "Node.js Expert",
    "System Administrator",
  ];

  const socialLinks = [
    {
      name: "GitHub",
      href: "https://github.com/nkengderick",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
        </svg>
      ),
    },
    {
      name: "LinkedIn",
      href: "https://linkedin.com/in/nkengbezaderick",
      icon: (
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
        </svg>
      ),
    },
    {
      name: "Portfolio",
      href: "https://portfolio-117q.onrender.com/",
      icon: <Code className="w-5 h-5" />,
    },
  ];

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
  };

  return (
    <section className="relative min-h-screen flex items-center py-20 md:py-0 overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-accent/5 to-secondary/5" />
        <motion.div
          className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-20 right-10 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text Content */}
          <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="text-center lg:text-left"
          >
            <motion.div variants={item} className="mb-6">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
                {t("greeting")}{" "}
                <span className="text-gradient">{t("name")}</span>
              </h1>
            </motion.div>

            <motion.div variants={item} className="mb-6">
              <div className="text-xl md:text-2xl lg:text-3xl font-semibold h-12 flex items-center justify-center lg:justify-start">
                <span className="mr-2">{t("iam")}</span>
                <TypeAnimation texts={roles} />
              </div>
            </motion.div>

            <motion.p
              variants={item}
              className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto lg:mx-0"
            >
              {t("subtitle")}
            </motion.p>

            <motion.div
              variants={item}
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start mb-8"
            >
              <Button asChild size="lg" className="group">
                <Link
                  href={`/${locale}/projects`}
                  className="flex items-center gap-2"
                >
                  {t("cta.projects")}
                  <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </Button>
              <Button asChild size="lg" variant="outline" className="group">
                <Link
                  href={`/${locale}/contact`}
                  className="flex items-center gap-2"
                >
                  <Mail className="w-4 h-4" />
                  {t("cta.contact")}
                </Link>
              </Button>
              <Button asChild size="lg" variant="ghost" className="group">
                <a
                  href="/resume.pdf"
                  download
                  className="flex items-center gap-2"
                >
                  <Download className="w-4 h-4" />
                  {t("cta.download")}
                </a>
              </Button>
            </motion.div>

            <motion.div
              variants={item}
              className="flex gap-4 justify-center lg:justify-start"
            >
              {socialLinks.map((link, index) => (
                <motion.a
                  key={link.name}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:bg-primary hover:text-primary-foreground transition-all duration-300 hover:scale-110 hover:shadow-lg"
                  whileHover={{ y: -3 }}
                  initial={{ opacity: 0, scale: 0 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.5 + index * 0.1 }}
                  aria-label={link.name}
                >
                  {link.icon}
                </motion.a>
              ))}
            </motion.div>

            {/* Tech Stack Icons */}
            <motion.div
              variants={item}
              className="mt-12 flex flex-wrap gap-3 justify-center lg:justify-start"
            >
              <motion.span
                className="px-3 py-1 bg-secondary/50 rounded-full text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Code className="w-4 h-4" />
                React & Next.js
              </motion.span>
              <motion.span
                className="px-3 py-1 bg-secondary/50 rounded-full text-sm flex items-center gap-2"
                whileHover={{ scale: 1.05 }}
              >
                <Server className="w-4 h-4" />
                Node.js
              </motion.span>
              <motion.span
                className="px-3 py-1 bg-secondary/50 rounded-full text-sm"
                whileHover={{ scale: 1.05 }}
              >
                MongoDB & SQL
              </motion.span>
            </motion.div>
          </motion.div>

          {/* Image Section */}
          <motion.div
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="relative"
          >
            <div className="relative w-full max-w-md mx-auto">
              {/* Decorative Elements */}
              <motion.div
                className="absolute -top-4 -left-4 w-24 h-24 bg-primary/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.2, 1],
                  rotate: [0, 90, 0],
                }}
                transition={{
                  duration: 10,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />
              <motion.div
                className="absolute -bottom-4 -right-4 w-32 h-32 bg-accent/20 rounded-full blur-xl"
                animate={{
                  scale: [1, 1.3, 1],
                  rotate: [0, -90, 0],
                }}
                transition={{
                  duration: 12,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              />

              {/* Main Image Container */}
              <motion.div
                className="relative overflow-hidden rounded-full border-4 border-primary/20 shadow-2xl"
                whileHover={{ scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <div className="relative aspect-square">
                  <Image
                    src="/images/profile.png"
                    alt="Nkengbeza Derick"
                    fill
                    className="object-cover"
                    priority
                  />
                  {/* Overlay Gradient */}
                  <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 hover:opacity-100 transition-opacity duration-300" />
                </div>
              </motion.div>

              {/* Floating Code Elements */}
              <motion.div
                className="absolute top-10 -right-10 bg-card p-3 rounded-lg shadow-lg"
                animate={{
                  y: [-10, 10, -10],
                  rotate: [-5, 5, -5],
                }}
                transition={{
                  duration: 6,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <code className="text-sm text-primary">{"<Developer />"}</code>
              </motion.div>

              <motion.div
                className="absolute bottom-10 -left-10 bg-accent p-3 rounded-lg shadow-lg"
                animate={{
                  y: [10, -10, 10],
                  rotate: [5, -5, 5],
                }}
                transition={{
                  duration: 7,
                  repeat: Infinity,
                  ease: "easeInOut",
                }}
              >
                <code className="text-sm text-accent-foregroun">
                  const skills = [&lsquo;React&lsquo;, &lsquo;Node.js&lsquo;];
                </code>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        animate={{
          y: [0, 10, 0],
        }}
        transition={{
          duration: 2,
          repeat: Infinity,
          ease: "easeInOut",
        }}
      >
        <div className="w-6 h-10 border-2 border-primary/50 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-primary rounded-full mt-2" />
        </div>
      </motion.div>
    </section>
  );
}
