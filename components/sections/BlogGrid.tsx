"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import { BlogCard, BlogPost } from "@/components/ui/blog-card";
import { BlogFilterBar } from "@/components/ui/blog-filter-bar";
import { Button } from "@/components/ui/button";
import { FolderSearch, RefreshCw } from "lucide-react";

interface BlogGridProps {
  posts: BlogPost[];
  categories?: { name: string; count: number }[];
  tags?: string[];
  initialCategory?: string;
  initialTag?: string;
  initialSearch?: string;
}

export function BlogGrid({
  posts,
  categories = [],
  tags = [],
  initialCategory = "all",
  initialTag = "all",
  initialSearch = "",
}: BlogGridProps) {
  const t = useTranslations("blog");

  // Filter states
  const [selectedCategory, setSelectedCategory] = useState(initialCategory);
  const [selectedTag, setSelectedTag] = useState(initialTag);
  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [sortBy, setSortBy] = useState<"latest" | "popular">("latest");

  // Pagination
  const [visiblePosts, setVisiblePosts] = useState(6);
  const [filteredPosts, setFilteredPosts] = useState<BlogPost[]>(posts);
  const [isLoading, setIsLoading] = useState(false);

  // Apply filters when any filter criteria changes
  useEffect(() => {
    setIsLoading(true);

    // Reset visible posts when filters change
    setVisiblePosts(6);

    // Filter posts based on criteria
    let result = [...posts];

    // Category filter
    if (selectedCategory !== "all") {
      result = result.filter((post) => post.category === selectedCategory);
    }

    // Tag filter
    if (selectedTag !== "all") {
      result = result.filter((post) => post.tags.includes(selectedTag));
    }

    // Search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (post) =>
          post.title.toLowerCase().includes(query) ||
          post.excerpt.toLowerCase().includes(query) ||
          post.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    // Sort filter
    if (sortBy === "latest") {
      result = result.sort((a, b) => {
        return (
          new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
        );
      });
    } else if (sortBy === "popular") {
      result = result.sort((a, b) => {
        const aPopularity = (a.views || 0) + (a.comments || 0) * 2;
        const bPopularity = (b.views || 0) + (b.comments || 0) * 2;
        return bPopularity - aPopularity;
      });
    }

    // Simulate loading delay for better UX
    setTimeout(() => {
      setFilteredPosts(result);
      setIsLoading(false);
    }, 400);
  }, [posts, selectedCategory, selectedTag, searchQuery, sortBy]);

  // Handle "Load More" button click
  const handleLoadMore = () => {
    setVisiblePosts((prev) => prev + 6);
  };

  // Handle filter reset
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedTag("all");
    setSearchQuery("");
    setSortBy("latest");
  };

  return (
    <section id="blog-content" className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Filter Bar */}
        <BlogFilterBar
          categories={categories}
          tags={tags}
          selectedCategory={selectedCategory}
          selectedTag={selectedTag}
          selectedSort={sortBy}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onTagChange={setSelectedTag}
          onSortChange={() => setSortBy}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />

        {/* Posts Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("showing", {
              count: Math.min(visiblePosts, filteredPosts.length),
              total: filteredPosts.length,
            })}
          </div>
          {filteredPosts.length > 0 && (
            <div className="text-sm flex items-center gap-2 text-muted-foreground">
              <span>{t("sortedBy")}:</span>
              <span className="font-medium">
                {sortBy === "latest"
                  ? t("filters.latest")
                  : t("filters.popular")}
              </span>
            </div>
          )}
        </div>

        {/* Loading indicator */}
        {isLoading && (
          <div className="flex justify-center py-12">
            <RefreshCw className="w-8 h-8 text-primary animate-spin" />
          </div>
        )}

        {/* Error state - no posts found */}
        {!isLoading && filteredPosts.length === 0 && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-center py-16"
          >
            <div className="inline-block p-6 bg-secondary/20 rounded-full mb-6">
              <FolderSearch className="w-12 h-12 text-muted-foreground" />
            </div>
            <h3 className="text-2xl font-semibold mb-2">
              {t("noResults.title")}
            </h3>
            <p className="text-muted-foreground mb-8 max-w-md mx-auto">
              {t("noResults.description")}
            </p>
            <Button onClick={handleClearFilters}>
              {t("noResults.resetButton")}
            </Button>
          </motion.div>
        )}

        {/* Blog Posts Grid */}
        {!isLoading && filteredPosts.length > 0 && (
          <motion.div layout className="grid gap-8">
            {/* Featured Post (first post with featured flag, if any) */}
            {filteredPosts.some((post) => post.featured) &&
              visiblePosts >= 1 && (
                <AnimatePresence>
                  {filteredPosts
                    .filter((post) => post.featured)
                    .slice(0, 1)
                    .map((post) => (
                      <BlogCard key={post.id} post={post} variant="featured" />
                    ))}
                </AnimatePresence>
              )}

            {/* Regular Posts Grid */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              <AnimatePresence>
                {filteredPosts
                  .filter(
                    (post) => !post.featured || filteredPosts.indexOf(post) > 0
                  )
                  .slice(0, visiblePosts)
                  .map((post, index) => (
                    <BlogCard
                      key={post.id}
                      post={post}
                      variant="default"
                      index={index}
                    />
                  ))}
              </AnimatePresence>
            </div>
          </motion.div>
        )}

        {/* Load More Button */}
        {!isLoading && filteredPosts.length > visiblePosts && (
          <div className="mt-12 text-center">
            <Button
              variant="outline"
              size="lg"
              onClick={handleLoadMore}
              className="px-8"
            >
              {t("loadMore")}
            </Button>
          </div>
        )}
      </div>
    </section>
  );
}
