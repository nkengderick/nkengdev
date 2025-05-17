"use client";

import { JSX, useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useLocale, useTranslations } from "next-intl";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import {
  ArrowLeft,
  Calendar,
  Clock,
  Eye,
  MessageCircle,
  Bookmark,
  Tag,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { TableOfContents } from "@/components/ui/table-of-content";
import { BlogShare } from "@/components/ui/blog-share";
import { BlogAuthorCard } from "@/components/ui/blog-author-card";
import { RelatedPosts } from "@/components/ui/related-post";
import { cn } from "@/lib/utils";
import {
  getBlogPostBySlug,
  getRelatedBlogPosts,
  getBlogPostsByDate,
} from "@/data/blogs";
import { BlogPost } from "@/data/types";
import { CodeBlock } from "@/components/ui/code-block";

export default function BlogDetailPage() {
  const params = useParams();
  const locale = useLocale();
  const t = useTranslations("blog.detail");

  const [post, setPost] = useState<BlogPost | null>(null);
  const [isBookmarked, setIsBookmarked] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [headings, setHeadings] = useState<
    Array<{ id: string; text: string; level: number }>
  >([]);
  const [relatedPosts, setRelatedPosts] = useState<BlogPost[]>([]);
  const [nextPost, setNextPost] = useState<BlogPost | null>(null);
  const [prevPost, setPrevPost] = useState<BlogPost | null>(null);

  // Extract headings from content for table of contents
  const extractHeadings = (content: string) => {
    const headingRegex = /^(#{1,6})\s+(.+)$/gm;
    const extractedHeadings = [];
    let match;

    while ((match = headingRegex.exec(content)) !== null) {
      const level = match[1].length;
      const text = match[2].trim();
      const id = text
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");

      extractedHeadings.push({ level, text, id });
    }

    return extractedHeadings;
  };

  // Parse markdown content to HTML, preserving code blocks
  const parseMarkdown = (markdown: string) => {
    const codeBlocks: { language: string; code: string }[] = [];
    let content = markdown;

    // Replace code blocks with unique placeholders
    content = content.replace(
      /```([\w]*)\n([\s\S]*?)```/g,
      (_, language, code) => {
        const placeholder = `__CODE_BLOCK_${codeBlocks.length}__`;
        codeBlocks.push({
          language: language || "plaintext",
          code: code.trim(),
        });
        return placeholder;
      }
    );

    // Process all markdown elements, including headings
    content = content.replace(/^(#{1,6})\s+(.+)$/gm, (match, hashes, title) => {
      const level = hashes.length;
      const id = title
        .toLowerCase()
        .replace(/[^\w\s-]/g, "")
        .replace(/\s+/g, "-");
      return `<h${level} id="${id}">${title}</h${level}>`;
    });

    content = content.replace(/\*\*(.*?)\*\*/g, "<strong>$1</strong>");
    content = content.replace(/\*(.*?)\*/g, "<em>$1</em>");
    content = content.replace(
      /\[(.*?)\]\((.*?)\)/g,
      '<a href="$2" target="_blank" rel="noopener noreferrer" class="text-primary hover:underline">$1</a>'
    );
    content = content.replace(/^-\s+(.+)$/gm, "<li>$1</li>");
    content = content.replace(
      /(<li>.*<\/li>\n)+/g,
      '<ul class="list-disc pl-6 my-4">$&</ul>'
    );
    content = content.replace(/^(?!<[h|u]|$)(.+)$/gm, "<p>$1</p>");

    // Split content by placeholders and intersperse code blocks
    const parts = content.split(/(__CODE_BLOCK_\d+__)/);
    const processedContent: (string | JSX.Element)[] = [];

    let codeBlockIndex = 0;
    for (const part of parts) {
      if (codeBlocks.some((_, idx) => part === `__CODE_BLOCK_${idx}__`)) {
        const { language, code } = codeBlocks[codeBlockIndex];
        processedContent.push(
          <CodeBlock
            key={`code-block-${codeBlockIndex}`}
            code={code}
            language={language}
            showLineNumbers={true}
          />
        );
        codeBlockIndex++;
      } else if (part.trim()) {
        processedContent.push(part);
      }
    }

    return processedContent;
  };

  // Find the blog post based on the slug
  useEffect(() => {
    if (!params.slug) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
    const foundPost = getBlogPostBySlug(slug);

    if (!foundPost) {
      setError("Blog post not found");
      setLoading(false);
      return;
    }

    setPost(foundPost);

    // Extract headings for the table of contents
    if (foundPost.content) {
      setHeadings(extractHeadings(foundPost.content));
    }

    // Get related posts
    setRelatedPosts(getRelatedBlogPosts(foundPost, 3));

    // Get all posts sorted by date
    const sortedPosts = getBlogPostsByDate();

    // Find current post index
    const currentIndex = sortedPosts.findIndex((p) => p.id === foundPost.id);

    // Set next and previous posts
    if (currentIndex > 0) {
      setNextPost(sortedPosts[currentIndex - 1]);
    }

    if (currentIndex < sortedPosts.length - 1) {
      setPrevPost(sortedPosts[currentIndex + 1]);
    }

    setLoading(false);
  }, [params.slug]);

  // Handle bookmark toggling
  const handleBookmark = () => {
    setIsBookmarked(!isBookmarked);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  if (error || !post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-3xl font-bold mb-4">Blog Post Not Found</h1>
        <p className="text-muted-foreground mb-8">
          The blog post you&lsquo;re looking for doesn&lsquo;t exist or has been
          removed.
        </p>
        <Button asChild>
          <Link href={`/${locale}/blog`} className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Blog
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <main className="pt-24 pb-16 min-h-screen relative">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10 pointer-events-none">
        <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
        <div className="absolute top-1/4 -left-20 w-96 h-96 bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 -right-20 w-96 h-96 bg-accent/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Back to blog link */}
        <div className="mb-8">
          <Button variant="ghost" asChild>
            <Link href={`/${locale}/blog`} className="flex items-center gap-2">
              <ArrowLeft className="w-4 h-4" />
              {t("backToBlog")}
            </Link>
          </Button>
        </div>

        {/* Article Header */}
        <div className="max-w-4xl mx-auto mb-12">
          {/* Category & Date */}
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <Link
              href={`/${locale}/blog?category=${post.category}`}
              className="px-3 py-1 bg-secondary/50 rounded-full text-xs font-medium hover:bg-secondary/70 transition-colors"
            >
              {post.category}
            </Link>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Calendar className="w-3 h-3" />
              <span>{post.publishDate}</span>
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Clock className="w-3 h-3" />
              <span>{post.readTime} min read</span>
            </div>
          </div>

          {/* Title */}
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6"
          >
            {post.title}
          </motion.h1>

          {/* Author & Actions */}
          <div className="flex flex-wrap justify-between items-center mb-8 gap-4">
            {/* Author Info */}
            <div className="flex items-center gap-3">
              <Image
                src={post.author.avatar}
                alt={post.author.name}
                width={40}
                height={40}
                className="rounded-full border-2 border-border/30"
              />
              <div>
                <div className="font-medium">{post.author.name}</div>
                <div className="text-xs text-muted-foreground">
                  {post.author.role}
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex items-center gap-4">
              {/* Stats */}
              <div className="flex items-center gap-3 text-sm text-muted-foreground">
                <div className="flex items-center gap-1">
                  <Eye className="w-4 h-4" />
                  <span>{post.views}</span>
                </div>
                <div className="flex items-center gap-1">
                  <MessageCircle className="w-4 h-4" />
                  <span>{post.comments}</span>
                </div>
              </div>

              {/* Share & Bookmark */}
              <div className="flex items-center gap-3">
                <BlogShare title={post.title} slug={post.slug} />
                <button
                  onClick={handleBookmark}
                  className={cn(
                    "p-2 rounded-full transition-colors",
                    isBookmarked
                      ? "text-primary bg-primary/10"
                      : "text-muted-foreground hover:text-primary hover:bg-secondary/40"
                  )}
                  aria-label={
                    isBookmarked ? "Remove bookmark" : "Bookmark post"
                  }
                >
                  <Bookmark className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Featured Image */}
        <div className="max-w-5xl mx-auto mb-12 relative">
          <div className="rounded-xl overflow-hidden shadow-xl">
            <Image
              src={post.coverImage}
              alt={post.title}
              width={1200}
              height={600}
              className="w-full object-cover"
              priority
            />
          </div>
        </div>

        {/* Main Content with Sidebar */}
        <div className="grid lg:grid-cols-12 gap-8 max-w-7xl mx-auto">
          {/* Sidebar - Table of Contents */}
          <div className="lg:col-span-3 order-2 lg:order-1">
            <div className="lg:sticky lg:top-24 space-y-8">
              <TableOfContents headings={headings} />

              {/* Tags Section */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-4 shadow-md">
                <h3 className="flex items-center gap-2 font-semibold mb-3">
                  <Tag className="w-4 h-4" />
                  {t("tags")}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Link
                      key={tag}
                      href={`/${locale}/blog?tag=${tag}`}
                      className="px-3 py-1 bg-secondary/40 rounded-full text-xs hover:bg-secondary/60 transition-colors"
                    >
                      {tag}
                    </Link>
                  ))}
                </div>
              </div>

              {/* Side Share Links */}
              <div className="bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-4 shadow-md">
                <h3 className="font-semibold mb-3">{t("share")}</h3>
                <BlogShare title={post.title} slug={post.slug} vertical />
              </div>
            </div>
          </div>

          {/* Main Article Content */}
          <div className="lg:col-span-9 order-1 lg:order-2">
            <article className="bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-6 md:p-8 shadow-lg">
              <div className="prose prose-lg dark:prose-invert max-w-none">
                {/* Render the processed content with CodeBlock components */}
                {post.content &&
                  parseMarkdown(post.content).map((element, index) =>
                    typeof element === "string" ? (
                      <div
                        key={`content-${index}`}
                        dangerouslySetInnerHTML={{ __html: element }}
                      />
                    ) : (
                      <div key={`content-${index}`}>{element}</div>
                    )
                  )}
              </div>
            </article>

            {/* Author Card */}
            <div className="mt-12">
              <BlogAuthorCard
                name={post.author.name}
                avatar={post.author.avatar}
                role={post.author.role}
                bio={post.author.bio}
                social={post.author.social}
              />
            </div>

            {/* Related Posts */}
            <div className="mt-16">
              <RelatedPosts posts={relatedPosts} currentPostId={post.id} />
            </div>

            {/* Next/Previous Navigation */}
            <div className="mt-12 border-t border-border/50 pt-8">
              <div className="grid grid-cols-2 gap-4">
                {/* Previous Post */}
                {prevPost && (
                  <Link
                    href={`/${locale}/blog/${prevPost.slug}`}
                    className="bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-4 flex items-center gap-3 hover:border-primary/50 transition-colors"
                  >
                    <ChevronLeft className="w-5 h-5" />
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("previousPost")}
                      </div>
                      <div className="font-medium truncate">
                        {prevPost.title}
                      </div>
                    </div>
                  </Link>
                )}

                {/* Next Post */}
                {nextPost && (
                  <Link
                    href={`/${locale}/blog/${nextPost.slug}`}
                    className="bg-card/70 backdrop-blur-sm rounded-xl border border-border/50 p-4 flex items-center justify-end gap-3 hover:border-primary/50 transition-colors text-right ml-auto"
                  >
                    <div>
                      <div className="text-sm text-muted-foreground">
                        {t("nextPost")}
                      </div>
                      <div className="font-medium truncate">
                        {nextPost.title}
                      </div>
                    </div>
                    <ChevronRight className="w-5 h-5" />
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
