import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";
import { FeaturedPosts } from "../sections/FeaturedPosts";

// Main HomePage component
export default function HomePage() {
  return (
    <div>
      <Hero />

      <AboutPreview />

      <ProjectsGrid />

      <SkillsShowcase />

      <FeaturedPosts />
    </div>
  );
}
