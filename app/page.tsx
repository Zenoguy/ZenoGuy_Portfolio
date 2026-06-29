import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import SkillsSection from '@/components/skillsSection';
import MarqueeSection from '@/components/sections/home/MarqueeSection';
import BlogTeaser from '@/components/sections/home/BlogTeaser';
import ContactCTA from '@/components/sections/home/ContactCTA';
import { getGitHubData } from '@/lib/github';

export default async function HomePage() {
  const githubData = await getGitHubData();
  const pinnedRepos = githubData?.pinnedRepos || null;
  const publicRepos = githubData?.publicRepos || null;

  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork initialProjects={pinnedRepos} />
      <SkillsSection initialProjects={publicRepos} />
      <BlogTeaser />
      <ContactCTA />
    </div>
  );
}