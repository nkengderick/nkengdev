"use client";

import { useSearchParams } from "next/navigation";
import { BlogHero } from "@/components/sections/BlogHero";
import { BlogGrid } from "@/components/sections/BlogGrid";
import { motion } from "framer-motion";
import { CurvedDivider } from "@/components/ui/curved-divider";
import { NewsletterForm } from "../ui/news-letter-form";
import blogPosts, {
  getAllCategories,
  getAllTags,
} from "../../data/blogs";


export default function BlogPage() {
  const searchParams = useSearchParams();
  const category = searchParams.get("category") || "all";
  const tag = searchParams.get("tag") || "all";
  const search = searchParams.get("search") || "";

  const categories = getAllCategories();

  const tags = getAllTags();

  return (
    <main className="min-h-screen relative">
      {/* Hero Section */}
      <BlogHero />

      {/* Curved Divider */}
      <CurvedDivider fromColor="background" toColor="background" />

      {/* Blog Grid */}
      <BlogGrid
        posts={blogPosts}
        categories={categories}
        tags={tags}
        initialCategory={category}
        initialTag={tag}
        initialSearch={search}
      />

      {/* Newsletter Section */}
      <section className="py-16 bg-gradient-to-b from-background via-secondary/5 to-background relative overflow-hidden">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Stay Updated
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Subscribe to receive notifications about new articles, tips, and
              tutorials.
            </p>
          </motion.div>

          <div className="max-w-lg mx-auto">
            <NewsletterForm />
          </div>
        </div>
      </section>
    </main>
  );
}
