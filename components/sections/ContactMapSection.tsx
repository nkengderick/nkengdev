"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { Map } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactMap } from "@/components/ui/contact-map";
import { ContactCard } from "@/components/ui/contact-card";

export function ContactMapSection() {
  const t = useTranslations("contact");
  const sectionRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

  return (
    <section
      ref={sectionRef}
      className="relative py-20 md:py-32 overflow-hidden"
    >
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-accent/5 to-background" />
        <motion.div
          className="absolute top-1/4 -right-20 w-96 h-96 bg-accent/10 rounded-full blur-3xl"
          animate={{
            x: [0, -40, 0],
            y: [0, 40, 0],
          }}
          transition={{
            duration: 20,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
        <motion.div
          className="absolute bottom-1/3 -left-20 w-80 h-80 bg-primary/10 rounded-full blur-3xl"
          animate={{
            x: [0, 30, 0],
            y: [0, -30, 0],
          }}
          transition={{
            duration: 15,
            repeat: Infinity,
            ease: "easeInOut",
          }}
        />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={isInView ? { scale: 1 } : { scale: 0 }}
            transition={{ type: "spring", stiffness: 200, delay: 0.1 }}
            className="inline-flex items-center gap-2 px-4 py-2 bg-accent/10 rounded-full text-accent mb-6"
          >
            <Map className="w-4 h-4" />
            <span className="text-sm font-medium">{t("map.subtitle")}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("map.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("map.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Interactive Map */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactMap />
          </motion.div>

          {/* Contact Card */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <ContactCard
              name="Nkengbeza Derick"
              title="Full-Stack Developer"
              email="nkengbderick@gmail.com"
              location="Molyko, Buea, Cameroon"
              image="/images/profile.png"
              links={{
                github: "https://github.com/nkengderick",
                linkedin: "https://linkedin.com/in/nkengbezaderick",
                website: "https://portfolio-117q.onrender.com/",
              }}
            />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
