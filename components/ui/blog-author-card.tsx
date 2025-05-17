"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale, useTranslations } from "next-intl";
import { Github, Linkedin, Twitter, Globe, Mail } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "../ui/button";

interface AuthorProps {
  name: string;
  avatar: string;
  role?: string;
  bio?: string;
  social?: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
    email?: string;
  };
  className?: string;
}

export function BlogAuthorCard({
  name,
  avatar,
  role,
  bio,
  social,
  className,
}: AuthorProps) {
  const t = useTranslations("blog.author");
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn(
        "bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-6 shadow-md relative overflow-hidden",
        className
      )}
    >
      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary/10 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-0 left-0 w-32 h-32 bg-accent/10 rounded-full blur-3xl -z-10" />

      <div className="flex flex-col sm:flex-row items-center sm:items-start gap-4 sm:gap-6">
        {/* Avatar */}
        <div className="relative">
          <div className="w-24 h-24 sm:w-28 sm:h-28 overflow-hidden rounded-full border-4 border-border/30 shadow-lg">
            <Image
              src={avatar}
              alt={name}
              width={112}
              height={112}
              className="object-cover"
            />
          </div>
        </div>

        <div className="flex-1 text-center sm:text-left">
          <h3 className="text-xl font-bold">{name}</h3>
          {role && <p className="text-primary text-sm mb-2">{role}</p>}

          {bio && <p className="text-muted-foreground text-sm mb-4">{bio}</p>}

          {/* Social Links */}
          {social && (
            <div className="flex flex-wrap justify-center sm:justify-start gap-3 mt-3">
              {social.github && (
                <SocialLink
                  href={social.github}
                  icon={<Github className="w-4 h-4" />}
                  label="GitHub"
                />
              )}
              {social.twitter && (
                <SocialLink
                  href={social.twitter}
                  icon={<Twitter className="w-4 h-4" />}
                  label="Twitter"
                />
              )}
              {social.linkedin && (
                <SocialLink
                  href={social.linkedin}
                  icon={<Linkedin className="w-4 h-4" />}
                  label="LinkedIn"
                />
              )}
              {social.website && (
                <SocialLink
                  href={social.website}
                  icon={<Globe className="w-4 h-4" />}
                  label="Website"
                />
              )}
              {social.email && (
                <SocialLink
                  href={`mailto:${social.email}`}
                  icon={<Mail className="w-4 h-4" />}
                  label="Email"
                />
              )}
            </div>
          )}
        </div>
      </div>

      {/* More Articles Button */}
      <div className="mt-6 text-center sm:text-right">
        <Button variant="outline" asChild>
          <Link
            href={`/${locale}/blog/author/${name.toLowerCase().replace(/\s+/g, "-")}`}
          >
            {t("moreFromAuthor")}
          </Link>
        </Button>
      </div>
    </motion.div>
  );
}

function SocialLink({
  href,
  icon,
  label,
}: {
  href: string;
  icon: React.ReactNode;
  label: string;
}) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      className="p-2 bg-secondary/40 hover:bg-primary/10 text-muted-foreground hover:text-primary rounded-full transition-colors"
      aria-label={label}
    >
      {icon}
    </motion.a>
  );
}
