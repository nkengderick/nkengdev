"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Search,
  Filter,
  X,
  SortDesc,
  Clock,
  Star,
  Hash,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { BlogCategoryBadge } from "./blog-category-badge";

interface BlogFilterBarProps {
  categories: { name: string; count: number }[];
  tags: string[];
  selectedCategory: string;
  selectedTag: string;
  selectedSort: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onTagChange: (tag: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export function BlogFilterBar({
  categories,
  tags,
  selectedCategory,
  selectedTag,
  selectedSort,
  searchQuery,
  onCategoryChange,
  onTagChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
}: BlogFilterBarProps) {
  const t = useTranslations("blog.filters");
  const [isSearchActive, setIsSearchActive] = useState(false);
  const [isTagsExpanded, setIsTagsExpanded] = useState(false);
  const [isMobileFiltersOpen, setIsMobileFiltersOpen] = useState(false);

  // Determine if any filters are active
  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedTag !== "all" ||
    searchQuery.trim() !== "";

  return (
    <div className="bg-card/60 backdrop-blur-md rounded-xl border border-border/50 p-4 mb-8 sticky top-20 z-30">
      <div className="flex flex-col md:flex-row gap-4">
        {/* Search Input */}
        <motion.div
          layout
          className={cn(
            "relative rounded-lg overflow-hidden",
            isSearchActive || searchQuery ? "flex-grow" : "w-full md:w-48"
          )}
        >
          <input
            type="text"
            placeholder={t("searchPlaceholder")}
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={() => setIsSearchActive(true)}
            onBlur={() => setIsSearchActive(false)}
            className="w-full h-10 pl-10 pr-4 bg-background/60 border-border/50 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/50"
          />
          <div className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground">
            <Search className="w-4 h-4" />
          </div>
          {searchQuery && (
            <button
              onClick={() => onSearchChange("")}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </motion.div>

        {/* Desktop Filters */}
        <div className="hidden md:flex flex-wrap gap-2 items-center">
          {/* Category Filters */}
          <div className="flex items-center gap-2 mr-4">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t("category")}:
            </span>
            <div className="flex gap-2">
              <BlogCategoryBadge
                name={t("all")}
                isActive={selectedCategory === "all"}
                onClick={() => onCategoryChange("all")}
              />

              {categories.slice(0, 3).map((category) => (
                <BlogCategoryBadge
                  key={category.name}
                  name={category.name}
                  count={category.count}
                  isActive={selectedCategory === category.name}
                  onClick={() => onCategoryChange(category.name)}
                />
              ))}

              {categories.length > 3 && (
                <button
                  onClick={() => setIsMobileFiltersOpen(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                >
                  +{categories.length - 3}
                </button>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t("sortBy")}:
            </span>
            <div className="flex gap-2">
              <SortButton
                active={selectedSort === "latest"}
                onClick={() => onSortChange("latest")}
                icon={<Clock className="w-4 h-4" />}
              >
                {t("latest")}
              </SortButton>
              <SortButton
                active={selectedSort === "popular"}
                onClick={() => onSortChange("popular")}
                icon={<Star className="w-4 h-4" />}
              >
                {t("popular")}
              </SortButton>
            </div>
          </div>

          {/* Clear Filters */}
          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="ml-2 px-3 py-1.5 text-xs text-primary hover:text-primary-foreground hover:bg-primary rounded-md transition-colors"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>

        {/* Mobile Filter Toggle */}
        <div className="md:hidden flex justify-between items-center">
          <button
            onClick={() => setIsMobileFiltersOpen(!isMobileFiltersOpen)}
            className="flex items-center gap-2 px-4 py-2 bg-secondary/40 rounded-lg text-muted-foreground hover:bg-secondary/60 transition-colors"
          >
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">Filters</span>
          </button>

          {hasActiveFilters && (
            <button
              onClick={onClearFilters}
              className="px-3 py-1.5 text-xs text-primary hover:text-primary-foreground hover:bg-primary rounded-md transition-colors"
            >
              {t("clearFilters")}
            </button>
          )}
        </div>
      </div>

      {/* Mobile Filters */}
      {isMobileFiltersOpen && (
        <motion.div
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="md:hidden mt-4 space-y-4"
        >
          {/* Categories */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Categories</h4>
            <div className="flex flex-wrap gap-2">
              <BlogCategoryBadge
                name={t("all")}
                isActive={selectedCategory === "all"}
                onClick={() => onCategoryChange("all")}
              />
              {categories.map((category) => (
                <BlogCategoryBadge
                  key={category.name}
                  name={category.name}
                  count={category.count}
                  isActive={selectedCategory === category.name}
                  onClick={() => onCategoryChange(category.name)}
                />
              ))}
            </div>
          </div>

          {/* Tags */}
          <div className="space-y-2">
            <div className="flex justify-between">
              <h4 className="text-sm font-medium">Tags</h4>
              <button
                onClick={() => setIsTagsExpanded(!isTagsExpanded)}
                className="text-xs text-primary hover:underline"
              >
                {isTagsExpanded ? "Show less" : "Show all"}
              </button>
            </div>
            <div className="flex flex-wrap gap-2">
              <button
                onClick={() => onTagChange("all")}
                className={cn(
                  "px-3 py-1.5 rounded-full text-xs font-medium transition-colors",
                  selectedTag === "all"
                    ? "bg-primary text-primary-foreground"
                    : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
                )}
              >
                {t("all")}
              </button>
              {(isTagsExpanded ? tags : tags.slice(0, 10)).map((tag) => (
                <button
                  key={tag}
                  onClick={() => onTagChange(tag)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-xs font-medium transition-colors flex items-center gap-1",
                    selectedTag === tag
                      ? "bg-primary text-primary-foreground"
                      : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
                  )}
                >
                  <Hash className="w-3 h-3" />
                  {tag}
                </button>
              ))}
              {!isTagsExpanded && tags.length > 10 && (
                <button
                  onClick={() => setIsTagsExpanded(true)}
                  className="px-3 py-1.5 rounded-full text-xs font-medium bg-secondary/30 text-muted-foreground hover:bg-secondary/50"
                >
                  +{tags.length - 10}
                </button>
              )}
            </div>
          </div>

          {/* Sort Options */}
          <div className="space-y-2">
            <h4 className="text-sm font-medium">Sort By</h4>
            <div className="flex gap-2">
              <SortButton
                active={selectedSort === "latest"}
                onClick={() => onSortChange("latest")}
                icon={<SortDesc className="w-4 h-4" />}
              >
                {t("latest")}
              </SortButton>
              <SortButton
                active={selectedSort === "popular"}
                onClick={() => onSortChange("popular")}
                icon={<Star className="w-4 h-4" />}
              >
                {t("popular")}
              </SortButton>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  );
}

// Helper component for sort buttons
function SortButton({
  children,
  active,
  onClick,
  icon,
}: {
  children: React.ReactNode;
  active: boolean;
  onClick: () => void;
  icon?: React.ReactNode;
}) {
  return (
    <motion.button
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={cn(
        "px-3 py-1.5 rounded-lg text-xs font-medium transition-colors flex items-center gap-2",
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary/40 text-muted-foreground hover:bg-secondary/60"
      )}
    >
      {icon}
      {children}
    </motion.button>
  );
}
