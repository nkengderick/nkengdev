"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Minus } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface FaqItem {
  question: string;
  answer: string;
}

interface ContactFaqProps {
  className?: string;
  faqs?: FaqItem[];
}

export function ContactFaq({ className, faqs: providedFaqs }: ContactFaqProps) {
  const t = useTranslations("contact.faq");
  const [expandedIndex, setExpandedIndex] = useState<number | null>(null);

  // Use provided FAQs or translation-based FAQs
  const faqs = providedFaqs || [
    {
      question: t("items.1.question"),
      answer: t("items.1.answer"),
    },
    {
      question: t("items.2.question"),
      answer: t("items.2.answer"),
    },
    {
      question: t("items.3.question"),
      answer: t("items.3.answer"),
    },
    {
      question: t("items.4.question"),
      answer: t("items.4.answer"),
    },
    {
      question: t("items.5.question"),
      answer: t("items.5.answer"),
    },
  ];

  const toggleFaq = (index: number) => {
    setExpandedIndex(expandedIndex === index ? null : index);
  };

  return (
    <div className={cn("space-y-4", className)}>
      <h3 className="text-2xl font-bold mb-6">{t("title")}</h3>

      <div className="space-y-3">
        {faqs.map((faq, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={cn(
              "bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden",
              expandedIndex === index ? "shadow-md" : ""
            )}
          >
            <button
              className="w-full p-5 text-left flex items-center justify-between gap-4"
              onClick={() => toggleFaq(index)}
            >
              <span className="font-medium">{faq.question}</span>
              <div className="flex-shrink-0 p-2 rounded-full bg-secondary/50">
                {expandedIndex === index ? (
                  <Minus className="w-4 h-4" />
                ) : (
                  <Plus className="w-4 h-4" />
                )}
              </div>
            </button>

            <AnimatePresence>
              {expandedIndex === index && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-5 pt-0 text-muted-foreground">
                    {faq.answer}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        ))}
      </div>

      <div className="pt-4 text-center">
        <p className="text-muted-foreground">
          {t("more")}
          <a
            href="mailto:nkengbderick@gmail.com"
            className="ml-1 text-primary hover:underline"
          >
            {t("contact")}
          </a>
        </p>
      </div>
    </div>
  );
}
