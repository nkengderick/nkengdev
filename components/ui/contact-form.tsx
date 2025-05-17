"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { motion } from "framer-motion";
import { Send, AlertTriangle, CheckCircle2, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useTranslations } from "next-intl";
import { sendEmail } from "@/actions/sendemail";

// Define the contact form schema
const contactFormSchema = z.object({
  name: z.string().min(2, { message: "Name must be at least 2 characters" }),
  email: z.string().email({ message: "Please enter a valid email address" }),
  subject: z
    .string()
    .min(5, { message: "Subject must be at least 5 characters" }),
  message: z
    .string()
    .min(10, { message: "Message must be at least 10 characters" }),
});

type ContactFormValues = z.infer<typeof contactFormSchema>;

interface ContactFormProps {
  className?: string;
}

export function ContactForm({ className }: ContactFormProps) {
  const t = useTranslations("contact.form");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formStatus, setFormStatus] = useState<"idle" | "success" | "error">(
    "idle"
  );
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<ContactFormValues>({
    resolver: zodResolver(contactFormSchema),
    defaultValues: {
      name: "",
      email: "",
      subject: "",
      message: "",
    },
  });

  const onSubmit = async (data: ContactFormValues) => {
    setIsSubmitting(true);
    setFormStatus("idle");
    setErrorMessage("");

    try {
      await sendEmail(data);
      setFormStatus("success");
      reset();
    } catch (error) {
      setFormStatus("error");
      setErrorMessage(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={className}>
      {formStatus === "success" ? (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="bg-green-500/10 border border-green-500/30 rounded-lg p-6 text-center"
        >
          <div className="inline-flex items-center justify-center w-12 h-12 rounded-full bg-green-500/20 mb-4">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
          </div>
          <h3 className="text-xl font-bold mb-2">{t("success.title")}</h3>
          <p className="text-muted-foreground mb-4">{t("success.message")}</p>
          <Button onClick={() => setFormStatus("idle")}>
            {t("success.button")}
          </Button>
        </motion.div>
      ) : (
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
          {formStatus === "error" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="bg-destructive/10 border border-destructive/30 rounded-lg p-4 mb-4 flex items-start gap-3"
            >
              <AlertTriangle className="w-5 h-5 text-destructive mt-0.5 flex-shrink-0" />
              <div>
                <p className="font-medium text-destructive">
                  {t("error.title")}
                </p>
                <p className="text-sm text-muted-foreground">
                  {errorMessage || t("error.message")}
                </p>
              </div>
            </motion.div>
          )}

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label htmlFor="name" className="text-sm font-medium">
                {t("name.label")} <span className="text-destructive">*</span>
              </label>
              <Input
                id="name"
                placeholder={t("name.placeholder")}
                className="bg-card/50"
                {...register("name")}
              />
              {errors.name && (
                <p className="text-sm text-destructive">
                  {errors.name.message}
                </p>
              )}
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label htmlFor="email" className="text-sm font-medium">
                {t("email.label")} <span className="text-destructive">*</span>
              </label>
              <Input
                id="email"
                type="email"
                placeholder={t("email.placeholder")}
                className="bg-card/50"
                {...register("email")}
              />
              {errors.email && (
                <p className="text-sm text-destructive">
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>

          {/* Subject Field */}
          <div className="space-y-2">
            <label htmlFor="subject" className="text-sm font-medium">
              {t("subject.label")} <span className="text-destructive">*</span>
            </label>
            <Input
              id="subject"
              placeholder={t("subject.placeholder")}
              className="bg-card/50"
              {...register("subject")}
            />
            {errors.subject && (
              <p className="text-sm text-destructive">
                {errors.subject.message}
              </p>
            )}
          </div>

          {/* Message Field */}
          <div className="space-y-2">
            <label htmlFor="message" className="text-sm font-medium">
              {t("message.label")} <span className="text-destructive">*</span>
            </label>
            <Textarea
              id="message"
              placeholder={t("message.placeholder")}
              className="min-h-32 bg-card/50"
              {...register("message")}
            />
            {errors.message && (
              <p className="text-sm text-destructive">
                {errors.message.message}
              </p>
            )}
          </div>

          {/* Submit Button */}
          <motion.div whileHover={{ scale: 1.01 }} whileTap={{ scale: 0.99 }}>
            <Button
              type="submit"
              size="lg"
              className="w-full"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  {t("button.submitting")}
                </>
              ) : (
                <>
                  <Send className="w-4 h-4 mr-2" />
                  {t("button.send")}
                </>
              )}
            </Button>
          </motion.div>

          <p className="text-xs text-muted-foreground text-center">
            {t("privacy")}
          </p>
        </form>
      )}
    </div>
  );
}
