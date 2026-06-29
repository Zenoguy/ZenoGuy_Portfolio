import { getGitHubData } from '@/lib/github';
import { projects as staticProjects } from '@/lib/data/projects';
import ProjectsHero from '@/components/sections/projects/ProjectsHero';
import ProjectCard from '@/components/sections/projects/ProjectCard';
import ProjectsCTA from '@/components/sections/projects/ProjectsCTA';

export default async function ProjectsPage() {
  const githubData = await getGitHubData();

  let displayProjects = staticProjects;

  if (githubData && githubData.pinnedRepos && githubData.pinnedRepos.length > 0) {
    const gradients = [
      "#4F46E5", // indigo-600
      "#EC4899", // pink-500
      "#10B981", // emerald-500
      "#F59E0B", // amber-500
      "#8B5CF6", // purple-500
      "#EF4444", // red-500
    ];

    const images = [
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=1920&q=80",
      "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=1920&q=80",
      "https://images.unsplash.com/photo-1530836369250-ef72a3f5cda8?w=1920&q=80",
      "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1920&q=80",
      "https://images.unsplash.com/photo-1526374965328-7f61d4dc18c5?w=1920&q=80",
      "https://images.unsplash.com/photo-1607799279861-4dd421887fb3?w=1920&q=80",
    ];

    displayProjects = githubData.pinnedRepos.slice(0, 6).map((repo, idx) => {
      const languages = repo.languages?.nodes?.map(l => l.name) || [];
      const topics = repo.repositoryTopics?.nodes?.map(t => t.topic.name.toLowerCase()) || [];
      const desc = repo.description || "No description provided.";
      
      // Use topics as tags (services), fall back to languages
      const displayServices = topics.length > 0
        ? topics.slice(0, 4).map(t => t.toUpperCase())
        : languages.slice(0, 3).map(l => l.toUpperCase());

      return {
        id: idx + 1,
        title: repo.name,
        category: languages[0] || "Software Development",
        year: new Date().getFullYear().toString(),
        description: desc,
        services: displayServices,
        image: images[idx % images.length],
        color: gradients[idx % gradients.length],
        github: repo.url,
        live: repo.homepageUrl || ""
      };
    });
  }

  return (
    <div className="relative min-h-screen">
      <ProjectsHero />

      {displayProjects.map((project, index) => (
        <ProjectCard key={project.id} project={project} index={index} />
      ))}

      {/* Redirect to GitHub for more */}
      <div className="flex flex-col items-center justify-center pt-10 pb-20 relative z-10">
        <p className="text-muted-foreground mb-4 font-medium">Want to see more of my repositories?</p>
        <a
          href="https://github.com/Zenoguy"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-8 py-4 border-2 border-foreground text-foreground text-base font-black rounded-full hover:bg-foreground hover:text-background transition-all duration-300"
        >
          <span>VIEW ALL ON GITHUB</span>
          <span>→</span>
        </a>
      </div>

      <ProjectsCTA />
    </div>
  );
}