"use client";

import { useState, useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { useLocale } from "next-intl";
import { cn } from "@/lib/utils";
import {
  Calendar,
  Clock,
  ArrowRight,
  Bookmark,
  MessageCircle,
  Share,
  Eye,
} from "lucide-react";

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content?: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  author: {
    name: string;
    avatar: string;
    role?: string;
  };
  category: string;
  tags: string[];
  views?: number;
  comments?: number;
  featured?: boolean;
}

interface BlogCardProps {
  post: BlogPost;
  variant?: "default" | "featured" | "compact";
  index?: number;
  className?: string;
}

export function BlogCard({
  post,
  variant = "default",
  index = 0,
  className,
}: BlogCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(cardRef, { once: true, amount: 0.2 });
  const [isBookmarked, setIsBookmarked] = useState(false);
  const locale = useLocale();

  // Get CSS classes based on variant
  const getVariantClasses = () => {
    switch (variant) {
      case "featured":
        return "md:grid md:grid-cols-2 gap-6";
      case "compact":
        return "";
      default:
        return "";
    }
  };

  // Get image size based on variant
  const getImageHeight = () => {
    switch (variant) {
      case "featured":
        return "h-64 md:h-full";
      case "compact":
        return "h-40";
      default:
        return "h-52";
    }
  };

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 30 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className={cn(
        "group bg-card/80 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-md hover:shadow-xl transition-all duration-300",
        getVariantClasses(),
        className
      )}
    >
      {/* Image Container */}
      <div className={cn("relative overflow-hidden", getImageHeight())}>
        {/* Category Badge */}
        <div className="absolute top-4 left-4 z-20 px-3 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {post.category}
        </div>

        {/* Featured Badge */}
        {post.featured && (
          <div className="absolute top-4 right-4 z-20 px-3 py-1 bg-primary backdrop-blur-sm rounded-full text-white text-xs font-medium">
            Featured
          </div>
        )}

        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />

        {/* Bottom metadata */}
        <div className="absolute bottom-0 left-0 right-0 p-4 flex justify-between items-center z-10">
          <div className="flex items-center gap-3">
            <Image
              src={post.author.avatar}
              alt={post.author.name}
              width={32}
              height={32}
              className="rounded-full border-2 border-white/30"
            />
            <span className="text-white/90 text-sm font-medium">
              {post.author.name}
            </span>
          </div>
          <div className="flex items-center gap-2 text-white/80 text-xs">
            <Calendar className="w-3 h-3" />
            <span>{post.publishDate}</span>
          </div>
        </div>
      </div>

      {/* Content */}
      <div className="p-6">
        <h3 className="text-xl font-semibold mb-3 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>

        <p className="text-muted-foreground mb-4 line-clamp-3">
          {post.excerpt}
        </p>

        {/* Tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {post.tags.slice(0, 3).map((tag) => (
            <span
              key={tag}
              className="px-2 py-1 bg-secondary/40 rounded-md text-xs font-medium"
            >
              {tag}
            </span>
          ))}
          {post.tags.length > 3 && (
            <span className="px-2 py-1 bg-secondary/20 rounded-md text-xs text-muted-foreground">
              +{post.tags.length - 3}
            </span>
          )}
        </div>

        {/* Bottom actions */}
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-4 text-sm text-muted-foreground">
            <div className="flex items-center gap-1">
              <Clock className="w-4 h-4" />
              <span>{post.readTime} min</span>
            </div>
            {post.views !== undefined && (
              <div className="flex items-center gap-1">
                <Eye className="w-4 h-4" />
                <span>{post.views}</span>
              </div>
            )}
            {post.comments !== undefined && (
              <div className="flex items-center gap-1">
                <MessageCircle className="w-4 h-4" />
                <span>{post.comments}</span>
              </div>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setIsBookmarked(!isBookmarked)}
              className={cn(
                "p-2 rounded-full transition-colors",
                isBookmarked
                  ? "text-primary bg-primary/10"
                  : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
              )}
              aria-label="Bookmark post"
            >
              <Bookmark className="w-4 h-4" />
            </button>
            <button
              className="p-2 rounded-full text-muted-foreground hover:text-primary hover:bg-secondary/40 transition-colors"
              aria-label="Share post"
            >
              <Share className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Read more link */}
        <div className="mt-5 pt-5 border-t border-border/30">
          <Link
            href={`/${locale}/blog/${post.slug}`}
            className="inline-flex items-center gap-2 text-primary font-medium group/link"
          >
            <span className="group-hover/link:underline">Read more</span>
            <ArrowRight className="w-4 h-4 transition-transform group-hover/link:translate-x-1" />
          </Link>
        </div>
      </div>
    </motion.div>
  );
}
