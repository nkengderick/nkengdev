"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import { HelpCircle } from "lucide-react";
import { useTranslations } from "next-intl";
import { ContactFaq } from "@/components/ui/contact-faq";
import { NewsletterForm } from "@/components/ui/news-letter-form";

export function ContactFaqSection() {
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
        <div className="absolute inset-0 bg-gradient-to-b from-background via-primary/5 to-background" />
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
            className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-6"
          >
            <HelpCircle className="w-4 h-4" />
            <span className="text-sm font-medium">{t("faq.subtitle")}</span>
          </motion.div>

          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("faq.title")}
          </h2>
          <p className="text-lg text-muted-foreground max-w-3xl mx-auto mb-8">
            {t("faq.description")}
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* FAQ Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <ContactFaq />
          </motion.div>

          {/* Newsletter Section */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="flex flex-col justify-center"
          >
            <NewsletterForm />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
