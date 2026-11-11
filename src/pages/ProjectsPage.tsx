import Projects from "../components/sections/Projects";
import Architecture from "../components/sections/Architecture";
import GitHubSection from "../components/sections/GitHubSection";

export default function ProjectsPage() {
  return (
    <div className="pt-24 bg-white min-h-screen">
      <Projects />
      <Architecture />
      <GitHubSection />
    </div>
  );
}