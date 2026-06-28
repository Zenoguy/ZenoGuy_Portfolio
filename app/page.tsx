"use client";

import HeroSection from '@/components/HeroSection';
import FeaturedWork from '@/components/FeaturedWork';
import SkillsSection from '@/components/skillsSection';
import MarqueeSection from '@/components/sections/home/MarqueeSection';
import BlogTeaser from '@/components/sections/home/BlogTeaser';
import ContactCTA from '@/components/sections/home/ContactCTA';

export default function HomePage() {
  return (
    <div className="relative min-h-screen">
      <style jsx global>{`
        @keyframes gradient {
          0%, 100% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
        }
        .animate-gradient {
          background-size: 200% 200%;
          animation: gradient 3s ease infinite;
        }
      `}</style>
      
      <HeroSection />
      <MarqueeSection />
      <FeaturedWork />
      <SkillsSection />
      <BlogTeaser />
      <ContactCTA />
    </div>
  );
}