import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import SkillsSection from '@/components/skillsSection';
import MarqueeSection from '@/components/sections/home/MarqueeSection';
import BlogTeaser from '@/components/sections/home/BlogTeaser';
import ContactCTA from '@/components/sections/home/ContactCTA';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork />
      <SkillsSection />
      <BlogTeaser />
      <ContactCTA />
    </div>
  );
}