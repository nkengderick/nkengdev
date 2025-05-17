"use client";

import { motion } from "framer-motion";
import { useState } from "react";
import { useTranslations } from "next-intl";
import {
  Search,
  Filter,
  Code,
  Smartphone,
  Server,
  Star,
  Calendar,
  X,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ProjectFilterButton } from "./project-filter-button";

interface ProjectFilterBarProps {
  categories: string[];
  years: string[];
  selectedCategory: string;
  selectedYear: string;
  selectedSort: string;
  searchQuery: string;
  onCategoryChange: (category: string) => void;
  onYearChange: (year: string) => void;
  onSortChange: (sort: string) => void;
  onSearchChange: (search: string) => void;
  onClearFilters: () => void;
}

export function ProjectFilterBar({
  categories,
  years,
  selectedCategory,
  selectedYear,
  selectedSort,
  searchQuery,
  onCategoryChange,
  onYearChange,
  onSortChange,
  onSearchChange,
  onClearFilters,
}: ProjectFilterBarProps) {
  const t = useTranslations("projects.filters");
  const [isSearchActive, setIsSearchActive] = useState(false);

  // Get category icon based on name
  const getCategoryIcon = (category: string) => {
    switch (category.toLowerCase()) {
      case "web":
      case "frontend":
        return <Code className="w-4 h-4" />;
      case "mobile":
        return <Smartphone className="w-4 h-4" />;
      case "backend":
      case "server":
        return <Server className="w-4 h-4" />;
      case "featured":
        return <Star className="w-4 h-4" />;
      default:
        return null;
    }
  };

  // Determine if any filters are active
  const hasActiveFilters =
    selectedCategory !== "all" ||
    selectedYear !== "all" ||
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
              <ProjectFilterButton
                active={selectedCategory === "all"}
                onClick={() => onCategoryChange("all")}
              >
                {t("all")}
              </ProjectFilterButton>

              {categories.map((category) => (
                <ProjectFilterButton
                  key={category}
                  active={selectedCategory === category}
                  onClick={() => onCategoryChange(category)}
                  icon={getCategoryIcon(category)}
                >
                  {category}
                </ProjectFilterButton>
              ))}
            </div>
          </div>

          {/* Year Filters */}
          <div className="flex items-center gap-2 mr-4">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t("year")}:
            </span>
            <div className="flex gap-2">
              <ProjectFilterButton
                active={selectedYear === "all"}
                onClick={() => onYearChange("all")}
              >
                {t("all")}
              </ProjectFilterButton>

              {years.map((year) => (
                <ProjectFilterButton
                  key={year}
                  active={selectedYear === year}
                  onClick={() => onYearChange(year)}
                  icon={<Calendar className="w-4 h-4" />}
                >
                  {year}
                </ProjectFilterButton>
              ))}
            </div>
          </div>

          {/* Sort Options */}
          <div className="flex items-center gap-2">
            <span className="text-xs text-muted-foreground whitespace-nowrap">
              {t("sortBy")}:
            </span>
            <div className="flex gap-2">
              <ProjectFilterButton
                active={selectedSort === "newest"}
                onClick={() => onSortChange("newest")}
              >
                {t("newest")}
              </ProjectFilterButton>
              <ProjectFilterButton
                active={selectedSort === "oldest"}
                onClick={() => onSortChange("oldest")}
              >
                {t("oldest")}
              </ProjectFilterButton>
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
          <div className="flex gap-2">
            <ProjectFilterButton
              active={selectedCategory !== "all"}
              onClick={() => {}}
              icon={<Filter className="w-4 h-4" />}
            >
              {t("category")}:{" "}
              {selectedCategory !== "all" ? selectedCategory : t("all")}
            </ProjectFilterButton>

            <ProjectFilterButton
              active={selectedYear !== "all"}
              onClick={() => {}}
              icon={<Calendar className="w-4 h-4" />}
            >
              {selectedYear !== "all" ? selectedYear : t("allYears")}
            </ProjectFilterButton>
          </div>

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

      {/* Mobile Filters (Expandable) */}
      <motion.div className="md:hidden mt-4 grid grid-cols-2 gap-2">
        {/* Category Filters */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">
            {t("category")}:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <ProjectFilterButton
              active={selectedCategory === "all"}
              onClick={() => onCategoryChange("all")}
            >
              {t("all")}
            </ProjectFilterButton>

            {categories.map((category) => (
              <ProjectFilterButton
                key={category}
                active={selectedCategory === category}
                onClick={() => onCategoryChange(category)}
                icon={getCategoryIcon(category)}
              >
                {category}
              </ProjectFilterButton>
            ))}
          </div>
        </div>

        {/* Year + Sort Filters */}
        <div className="space-y-2">
          <span className="text-xs text-muted-foreground">
            {t("yearAndSort")}:
          </span>
          <div className="grid grid-cols-2 gap-2">
            <div className="space-y-2">
              <ProjectFilterButton
                active={selectedYear === "all"}
                onClick={() => onYearChange("all")}
              >
                {t("allYears")}
              </ProjectFilterButton>

              {years.map((year) => (
                <ProjectFilterButton
                  key={year}
                  active={selectedYear === year}
                  onClick={() => onYearChange(year)}
                >
                  {year}
                </ProjectFilterButton>
              ))}
            </div>

            <div className="space-y-2">
              <ProjectFilterButton
                active={selectedSort === "newest"}
                onClick={() => onSortChange("newest")}
              >
                {t("newest")}
              </ProjectFilterButton>
              <ProjectFilterButton
                active={selectedSort === "oldest"}
                onClick={() => onSortChange("oldest")}
              >
                {t("oldest")}
              </ProjectFilterButton>
            </div>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
