"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { useTranslations, useLocale } from "next-intl";
import { ArrowRight, Calendar, Clock } from "lucide-react";
import { cn } from "@/lib/utils";
import { getFeaturedBlogPosts } from "../../data/blogs";
import { BlogPost } from "../ui/blog-card";

interface FeaturedPostsProps {
  className?: string;
}

export function FeaturedPosts({ className }: FeaturedPostsProps) {
  const t = useTranslations("blog.detail");
  const featuredPosts = getFeaturedBlogPosts().slice(0, 3); // Limit to 3 posts

  if (featuredPosts.length === 0) {
    return null;
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className={cn("space-y-6", className)}
    >
      <h3 className="text-2xl font-bold">{t("featuredPosts")}</h3>

      <div className="grid md:grid-cols-3 gap-6">
        {featuredPosts.map((post, index) => (
          <FeaturedPostCard key={post.id} post={post} index={index} />
        ))}
      </div>
    </motion.div>
  );
}

function FeaturedPostCard({ post, index }: { post: BlogPost; index: number }) {
  const locale = useLocale();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -5 }}
      className="group bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 overflow-hidden shadow-md hover:shadow-lg transition-all duration-300"
    >
      {/* Image */}
      <div className="relative h-40 overflow-hidden">
        <Image
          src={post.coverImage}
          alt={post.title}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-110"
        />

        {/* Category Badge */}
        <div className="absolute top-3 left-3 z-20 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-full text-white text-xs font-medium">
          {post.category}
        </div>

        {/* Gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
      </div>

      {/* Content */}
      <div className="p-4">
        <h4 className="font-semibold mb-2 group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h4>

        <div className="flex items-center justify-between text-xs text-muted-foreground mb-3">
          <div className="flex items-center gap-1">
            <Calendar className="w-3 h-3" />
            <span>{post.publishDate}</span>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="w-3 h-3" />
            <span>{post.readTime} min</span>
          </div>
        </div>

        <Link
          href={`/${locale}/blog/${post.slug}`}
          className="inline-flex items-center gap-1 text-sm text-primary font-medium group/link"
        >
          <span className="group-hover/link:underline">Read more</span>
          <ArrowRight className="w-3 h-3 transition-transform group-hover/link:translate-x-1" />
        </Link>
      </div>
    </motion.div>
  );
}
