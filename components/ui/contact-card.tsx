"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { PanInfo, useMotionValue } from "framer-motion";
import { Github, Linkedin, Mail, Globe, MapPin } from "lucide-react";
import { useTranslations } from "next-intl";
import { cn } from "@/lib/utils";

interface ContactCardProps {
  name: string;
  title: string;
  email: string;
  location: string;
  image: string;
  links: {
    github?: string;
    linkedin?: string;
    website?: string;
  };
  className?: string;
}

export function ContactCard({
  name,
  title,
  email,
  location,
  image,
  links,
  className,
}: ContactCardProps) {
  const t = useTranslations("contact.card");
  const [flipped, setFlipped] = useState(false);
  const rotateX = useMotionValue(0);
  const rotateY = useMotionValue(0);

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleDrag = (_: any, info: PanInfo) => {
    const { offset } = info;
    rotateY.set(offset.x * 0.3);
    rotateX.set(-offset.y * 0.3);
  };

  const handleDragEnd = () => {
    rotateY.set(0);
    rotateX.set(0);
  };

  return (
    <div className={cn("perspective-1000 w-full max-w-md mx-auto", className)}>
      <motion.div
        className="relative w-full aspect-[4/5] preserve-3d cursor-grab active:cursor-grabbing touch-none"
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
        drag
        dragConstraints={{ top: 0, left: 0, right: 0, bottom: 0 }}
        dragElastic={0.2}
        onDrag={handleDrag}
        onDragEnd={handleDragEnd}
        onClick={() => setFlipped(!flipped)}
        style={{
          rotateX,
          rotateY,
        }}
      >
        {/* Front Side */}
        <motion.div
          className="absolute inset-0 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl overflow-hidden backface-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom right, hsla(var(--primary) / 0.05), hsla(var(--accent) / 0.05))`,
          }}
        >
          {/* Background pattern */}
          <div className="absolute inset-0 opacity-10 pointer-events-none">
            <div className="absolute top-0 right-0 w-full h-full bg-[radial-gradient(circle_at_30%_30%,hsl(var(--primary)/20%),transparent_70%)]" />
          </div>

          <div className="p-8 flex flex-col h-full">
            {/* Profile Image */}
            <div className="relative w-40 h-40 mx-auto mb-6">
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-primary/20 to-accent/20 blur-md" />
              <div className="absolute inset-0 rounded-full overflow-hidden border-4 border-primary/10">
                <div
                  className="w-full h-full bg-cover bg-center"
                  style={{ backgroundImage: `url(${image})` }}
                ></div>
              </div>
            </div>

            {/* Content */}
            <div className="text-center flex-1">
              <h2 className="text-2xl font-bold mb-1">{name}</h2>
              <p className="text-gradient bg-clip-text text-transparent bg-gradient-to-r from-primary to-accent mb-4">
                {title}
              </p>

              <div className="space-y-3 mb-6">
                <div className="flex items-center justify-center gap-2">
                  <Mail className="w-4 h-4 text-primary" />
                  <span className="text-sm">{email}</span>
                </div>
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 text-primary" />
                  <span className="text-sm">{location}</span>
                </div>
              </div>

              {/* Social Links */}
              <div className="flex justify-center gap-3">
                {links.github && (
                  <motion.a
                    href={links.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Github className="w-5 h-5" />
                  </motion.a>
                )}
                {links.linkedin && (
                  <motion.a
                    href={links.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Linkedin className="w-5 h-5" />
                  </motion.a>
                )}
                {links.website && (
                  <motion.a
                    href={links.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded-full bg-secondary/50 text-muted-foreground hover:text-primary hover:bg-primary/10 transition-colors"
                    whileHover={{ y: -3 }}
                    whileTap={{ scale: 0.97 }}
                  >
                    <Globe className="w-5 h-5" />
                  </motion.a>
                )}
              </div>
            </div>

            {/* Tap to flip hint */}
            <div className="text-xs text-muted-foreground text-center mt-4 animate-pulse">
              {t("flip")}
            </div>
          </div>
        </motion.div>

        {/* Back Side */}
        <motion.div
          className="absolute inset-0 bg-card/90 backdrop-blur-sm rounded-2xl border border-border/50 shadow-xl p-8 backface-hidden"
          style={{
            backgroundImage: `linear-gradient(to bottom right, hsla(var(--accent) / 0.05), hsla(var(--primary) / 0.05))`,
            transform: "rotateY(180deg)",
          }}
        >
          <div className="h-full flex flex-col justify-center">
            <h3 className="text-xl font-bold mb-4 text-center">{t("about")}</h3>
            <p className="text-muted-foreground mb-6">{t("description")}</p>

            <div className="space-y-3 mb-6">
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>{t("skills.1")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>{t("skills.2")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>{t("skills.3")}</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-primary"></div>
                <span>{t("skills.4")}</span>
              </div>
            </div>

            <div className="text-center mt-auto">
              <a
                href={`mailto:${email}`}
                className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
              >
                <Mail className="w-4 h-4" />
                <span>{t("contact")}</span>
              </a>
            </div>

            {/* Tap to flip hint */}
            <div className="text-xs text-muted-foreground text-center mt-4 animate-pulse">
              {t("flip")}
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  );
}
