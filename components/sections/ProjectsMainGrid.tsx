"use client";

import { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useTranslations } from "next-intl";
import { Sparkles, Filter, FolderSearch } from "lucide-react";
import { EnhancedProjectCard, ProjectType } from "../ui/project-card-new";
import { ProjectFilterBar } from "../ui/project-filter-bar";

interface ProjectGridProps {
  projects: ProjectType[];
}

export function ProjectGrid({ projects }: ProjectGridProps) {
  const t = useTranslations("projects");
  const [filteredProjects, setFilteredProjects] =
    useState<ProjectType[]>(projects);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedYear, setSelectedYear] = useState("all");
  const [selectedSort, setSelectedSort] = useState("newest");

  // Extract unique categories from projects
  const categories = Array.from(
    new Set(projects.map((project) => project.category))
  );

  // Extract unique years from projects
  const years = Array.from(
    new Set(
      projects.map((project) => {
        // Extract year from the date string
        const date = new Date(project.date);
        return date.getFullYear().toString();
      })
    )
  ).sort((a, b) => parseInt(b) - parseInt(a)); // Sort years in descending order

  // Filter and sort projects whenever filter criteria change
  useEffect(() => {
    let result = [...projects];

    // Apply category filter
    if (selectedCategory !== "all") {
      result = result.filter(
        (project) =>
          project.category.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Apply year filter
    if (selectedYear !== "all") {
      result = result.filter((project) => {
        const projectYear = new Date(project.date).getFullYear().toString();
        return projectYear === selectedYear;
      });
    }

    // Apply search filter
    if (searchQuery.trim() !== "") {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (project) =>
          project.title.toLowerCase().includes(query) ||
          project.description.toLowerCase().includes(query) ||
          project.technologies.some((tech) =>
            tech.toLowerCase().includes(query)
          )
      );
    }

    // Apply sorting
    result = result.sort((a, b) => {
      const dateA = new Date(a.date).getTime();
      const dateB = new Date(b.date).getTime();
      return selectedSort === "newest" ? dateB - dateA : dateA - dateB;
    });

    setFilteredProjects(result);
  }, [projects, selectedCategory, selectedYear, selectedSort, searchQuery]);

  // Reset all filters
  const handleClearFilters = () => {
    setSelectedCategory("all");
    setSelectedYear("all");
    setSearchQuery("");
    setSelectedSort("newest");
  };

  return (
    <section className="py-16">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Heading */}
        <div className="mb-12 text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-full text-primary mb-4">
            <Filter className="w-4 h-4" />
            <span className="text-sm font-medium">{t("browseProjects")}</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            {t("exploreTitle")}
          </h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            {t("exploreDescription")}
          </p>
        </div>

        {/* Filter Bar */}
        <ProjectFilterBar
          categories={categories}
          years={years}
          selectedCategory={selectedCategory}
          selectedYear={selectedYear}
          selectedSort={selectedSort}
          searchQuery={searchQuery}
          onCategoryChange={setSelectedCategory}
          onYearChange={setSelectedYear}
          onSortChange={setSelectedSort}
          onSearchChange={setSearchQuery}
          onClearFilters={handleClearFilters}
        />

        {/* Results Count */}
        <div className="mb-8 flex items-center justify-between">
          <div className="text-sm text-muted-foreground">
            {t("showingResults", {
              count: filteredProjects.length,
              total: projects.length,
            })}
          </div>

          {filteredProjects.length > 0 && (
            <div className="text-sm">
              <span className="text-muted-foreground mr-2">
                {t("sortedBy")}:
              </span>
              <span className="font-medium">
                {selectedSort === "newest"
                  ? t("filters.newest")
                  : t("filters.oldest")}
              </span>
            </div>
          )}
        </div>

        {/* Projects Grid */}
        {filteredProjects.length > 0 ? (
          <motion.div
            layout
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8"
          >
            <AnimatePresence>
              {filteredProjects.map((project) => (
                <EnhancedProjectCard
                  key={project.id}
                  project={project}
                  featured={project.featured}
                />
              ))}
            </AnimatePresence>
          </motion.div>
        ) : (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="py-16 text-center"
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
            <button
              onClick={handleClearFilters}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors"
            >
              <Sparkles className="w-4 h-4" />
              {t("noResults.resetButton")}
            </button>
          </motion.div>
        )}
      </div>
    </section>
  );
}
