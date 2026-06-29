import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import SkillsSection from '@/components/skillsSection';
import MarqueeSection from '@/components/sections/home/MarqueeSection';
import BlogTeaser from '@/components/sections/home/BlogTeaser';
import ContactCTA from '@/components/sections/home/ContactCTA';
import { getGitHubData } from '@/lib/github';
import { getDevtoBlogs } from '@/lib/devto';

export default async function HomePage() {
  const githubData = await getGitHubData();
  const pinnedRepos = githubData?.pinnedRepos || null;
  const publicRepos = githubData?.publicRepos || null;

  const blogs = await getDevtoBlogs();
  const topBlog = blogs.reduce((prev, current) => {
    return (current.reactionsCount || 0) > (prev.reactionsCount || 0) ? current : prev;
  }, blogs[0]);

  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork initialProjects={pinnedRepos} />
      <SkillsSection initialProjects={publicRepos} />
      <BlogTeaser topBlog={topBlog} />
      <ContactCTA />
    </div>
  );
}