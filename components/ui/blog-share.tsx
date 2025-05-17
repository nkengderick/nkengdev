"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Share2,
  Twitter,
  Linkedin,
  Facebook,
  Link,
  Check,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface BlogShareProps {
  title: string;
  slug: string;
  vertical?: boolean;
  className?: string;
}

export function BlogShare({
  title,
  slug,
  vertical = false,
  className,
}: BlogShareProps) {
  const t = useTranslations("blog.detail");
  const [copied, setCopied] = useState(false);

  // Construct the full URL for sharing
  const baseUrl = typeof window !== "undefined" ? window.location.origin : "";
  const url = `${baseUrl}/blog/${slug}`;

  // Encoded values for share links
  const encodedTitle = encodeURIComponent(title);
  const encodedUrl = encodeURIComponent(url);

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <div
      className={cn(
        "flex items-center gap-3",
        vertical ? "flex-col" : "flex-row",
        className
      )}
    >
      {vertical && (
        <div className="text-sm font-medium text-muted-foreground mb-1">
          {t("share")}
        </div>
      )}

      {!vertical && (
        <div className="flex items-center gap-2 text-muted-foreground">
          <Share2 className="w-4 h-4" />
          <span className="text-sm font-medium">{t("share")}</span>
        </div>
      )}

      <div
        className={cn(
          "flex gap-2",
          vertical ? "flex-col" : "flex-row",
          "items-center"
        )}
      >
        {/* Twitter/X */}
        <motion.a
          href={`https://twitter.com/intent/tweet?text=${encodedTitle}&url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-secondary/40 hover:bg-[#1DA1F2]/20 text-muted-foreground hover:text-[#1DA1F2] rounded-full transition-colors"
          aria-label="Share on Twitter"
        >
          <Twitter className="w-4 h-4" />
        </motion.a>

        {/* LinkedIn */}
        <motion.a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-secondary/40 hover:bg-[#0077B5]/20 text-muted-foreground hover:text-[#0077B5] rounded-full transition-colors"
          aria-label="Share on LinkedIn"
        >
          <Linkedin className="w-4 h-4" />
        </motion.a>

        {/* Facebook */}
        <motion.a
          href={`https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`}
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="p-2 bg-secondary/40 hover:bg-[#1877F2]/20 text-muted-foreground hover:text-[#1877F2] rounded-full transition-colors"
          aria-label="Share on Facebook"
        >
          <Facebook className="w-4 h-4" />
        </motion.a>

        {/* Copy Link */}
        <motion.button
          onClick={handleCopyLink}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className={cn(
            "p-2 bg-secondary/40 rounded-full transition-colors relative",
            copied
              ? "text-green-500 hover:text-green-600 hover:bg-green-100/20"
              : "text-muted-foreground hover:text-primary hover:bg-primary/10"
          )}
          aria-label="Copy link"
        >
          <AnimatePresence mode="wait">
            {copied ? (
              <motion.div
                key="check"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Check className="w-4 h-4" />
              </motion.div>
            ) : (
              <motion.div
                key="link"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                exit={{ scale: 0 }}
                transition={{ duration: 0.2 }}
              >
                <Link className="w-4 h-4" />
              </motion.div>
            )}
          </AnimatePresence>

          {/* Tooltip */}
          <AnimatePresence>
            {copied && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="absolute -bottom-8 left-1/2 transform -translate-x-1/2 px-2 py-1 bg-card rounded text-xs shadow-md whitespace-nowrap z-10"
              >
                {t("linkCopied")}
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>
    </div>
  );
}
