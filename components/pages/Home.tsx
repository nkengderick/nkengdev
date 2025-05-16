import { Hero } from "@/components/sections/Hero";
import { AboutPreview } from "@/components/sections/AboutPreview";
import { ProjectsGrid } from "@/components/sections/ProjectsGrid";
import { SkillsShowcase } from "@/components/sections/SkillsShowcase";

// Main HomePage component
export default function HomePage() {
  return (
    <div>
      <Hero />

      <AboutPreview />

      <ProjectsGrid />

      <SkillsShowcase />
    </div>
  );
}
