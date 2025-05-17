"use client";

import { motion } from "framer-motion";
import { MapPin, Mail, Phone, Calendar, Clock } from "lucide-react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ContactInfoProps {
  className?: string;
}

export function ContactInfo({ className }: ContactInfoProps) {
  const t = useTranslations("contact.info");

  const contactDetails = [
    {
      icon: <Mail className="w-5 h-5" />,
      label: t("email.label"),
      value: "nkengbderick@gmail.com",
      href: "mailto:nkengbderick@gmail.com",
      color: "from-blue-500 to-blue-600",
    },
    {
      icon: <Phone className="w-5 h-5" />,
      label: t("phone.label"),
      value: "+237 681 390 155",
      href: "tel:+237681390155",
      color: "from-green-500 to-green-600",
    },
    {
      icon: <MapPin className="w-5 h-5" />,
      label: t("location.label"),
      value: t("location.value"),
      href: "https://maps.google.com/?q=Molyko, Buea, Cameroon",
      color: "from-red-500 to-red-600",
    },
    {
      icon: <Calendar className="w-5 h-5" />,
      label: t("availability.label"),
      value: t("availability.value"),
      color: "from-amber-500 to-amber-600",
    },
    {
      icon: <Clock className="w-5 h-5" />,
      label: t("response.label"),
      value: t("response.value"),
      color: "from-purple-500 to-purple-600",
    },
  ];

  return (
    <div className={cn("space-y-8", className)}>
      <div>
        <h3 className="text-2xl font-bold mb-4">{t("title")}</h3>
        <p className="text-muted-foreground">{t("description")}</p>
      </div>

      <div className="space-y-6">
        {contactDetails.map((item, index) => (
          <motion.div
            key={item.label}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="flex gap-4"
          >
            <div
              className={cn(
                "flex-shrink-0 w-12 h-12 rounded-lg bg-gradient-to-br text-white flex items-center justify-center",
                item.color
              )}
            >
              {item.icon}
            </div>

            <div>
              <p className="text-sm text-muted-foreground">{item.label}</p>
              {item.href ? (
                <Link
                  href={item.href}
                  className="font-medium hover:text-primary transition-colors"
                >
                  {item.value}
                </Link>
              ) : (
                <p className="font-medium">{item.value}</p>
              )}
            </div>
          </motion.div>
        ))}
      </div>

      <div className="pt-4">
        <h4 className="font-semibold mb-2">{t("social.title")}</h4>
        <div className="flex gap-4">
          <motion.a
            href="https://github.com/nkengderick"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-card rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
            </svg>
          </motion.a>
          <motion.a
            href="https://linkedin.com/in/nkengbezaderick"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-card rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
            </svg>
          </motion.a>
          <motion.a
            href="https://portfolio-117q.onrender.com/"
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-card rounded-lg text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
            whileHover={{ y: -3 }}
            whileTap={{ scale: 0.97 }}
          >
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 0c-6.627 0-12 5.373-12 12s5.373 12 12 12 12-5.373 12-12-5.373-12-12-12zm10 12c0 .685-.07 1.354-.202 2h-3.853c.121-1.283.129-2.717 0-4h3.853c.132.646.202 1.315.202 2zm-.841-4h-3.5c-.363-1.878-1.058-3.555-1.998-4.888 2.246.908 4.137 2.666 5.498 4.888zm-5.498 12.888c.94-1.333 1.635-3.01 1.999-4.888h3.499c-1.361 2.222-3.252 3.98-5.498 4.888zm-6.661-4.888h5c.498 2.017.998 3.517 2 4.888-2.246-.908-4.137-2.666-5.498-4.888h-1.502zm0-8h1.502c1.361-2.222 3.252-3.98 5.498-4.888-1.002 1.371-1.502 2.871-2 4.888h-5zm11.995 4c.129 1.283.129 2.717 0 4h-5.993c-.125-1.289-.125-2.711 0-4h5.993zm-1.502-8.888c-.94 1.333-1.635 3.01-1.998 4.888h-3.5c1.361-2.222 3.252-3.98 5.498-4.888zm-9.992 0c2.246.908 4.137 2.666 5.498 4.888h-3.5c-.363-1.878-1.058-3.555-1.998-4.888zm3.659 17.776c-1.002-1.371-1.502-2.871-2-4.888h-5c1.361 2.222 3.252 3.98 5.498 4.888h1.502zm-9.659-12.888c0-.685.07-1.354.202-2h3.853c-.121 1.283-.129 2.717 0 4h-3.853c-.132-.646-.202-1.315-.202-2zm.841 4h3.5c.363 1.878 1.058 3.555 1.998 4.888-2.246-.908-4.137-2.666-5.498-4.888z" />
            </svg>
          </motion.a>
        </div>
      </div>
    </div>
  );
}
