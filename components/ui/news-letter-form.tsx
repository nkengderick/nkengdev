"use client";

import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CheckCircle, XCircle, MailOpen, Loader2 } from "lucide-react";
import { useTranslations } from "next-intl";
import { subscribeToNewsletter } from "@/actions/subscribe";

interface NewsletterFormProps {
  className?: string;
}

export function NewsletterForm({ className }: NewsletterFormProps) {
  const t = useTranslations("contact.newsletter");
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;

    setStatus("loading");

    try {
      await subscribeToNewsletter(email);
      setStatus("success");
      setEmail("");
    } catch (error) {
      setStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An error occurred"
      );
    }
  };

  return (
    <div className={className}>
      <div className="bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 p-6 md:p-8 shadow-lg relative overflow-hidden">
        {/* Background gradient */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-primary/10 rounded-full blur-3xl -z-10" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-accent/10 rounded-full blur-3xl -z-10" />

        <div className="max-w-md mx-auto">
          <div className="flex justify-center mb-4">
            <div className="p-3 bg-primary/10 rounded-full">
              <MailOpen className="w-6 h-6 text-primary" />
            </div>
          </div>

          <h3 className="text-xl font-bold text-center mb-2">{t("title")}</h3>
          <p className="text-muted-foreground text-center mb-6">
            {t("description")}
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="flex">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={t("placeholder")}
                className="flex-1 px-4 py-2 bg-background border border-border/50 rounded-l-md focus:outline-none focus:ring-2 focus:ring-primary/50"
                disabled={status === "loading" || status === "success"}
              />
              <button
                type="submit"
                className="px-4 py-2 bg-primary text-primary-foreground rounded-r-md hover:bg-primary/90 transition-colors disabled:opacity-70"
                disabled={status === "loading" || status === "success"}
              >
                {status === "loading" ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  t("button")
                )}
              </button>
            </div>

            <AnimatePresence mode="wait">
              {status === "success" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-sm text-green-600 bg-green-500/10 py-2 px-3 rounded-md"
                >
                  <CheckCircle className="w-4 h-4" />
                  <span>{t("success")}</span>
                </motion.div>
              )}

              {status === "error" && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.3 }}
                  className="flex items-center gap-2 text-sm text-red-600 bg-red-500/10 py-2 px-3 rounded-md"
                >
                  <XCircle className="w-4 h-4" />
                  <span>{errorMessage || t("error")}</span>
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="text-xs text-muted-foreground text-center mt-4">
            {t("privacy")}
          </p>
        </div>
      </div>
    </div>
  );
}
