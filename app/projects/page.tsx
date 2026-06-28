import { projects } from '@/lib/data/projects';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectCard from '@/components/sections/projects/ProjectCard';
import ProjectsCTA from '@/components/sections/projects/ProjectsCTA';

export default function ProjectsPage() {
  return (
    <div className="relative min-h-screen">
      <ProjectsHero />

      {projects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}

      <ProjectsCTA />
    </div>
  );
}