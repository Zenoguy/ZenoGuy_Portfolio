import { getDevtoBlogs } from '@/lib/devto';
import BlogHero from '@/components/sections/blog/BlogHero';
import FeaturedArticle from '@/components/sections/blog/FeaturedArticle';
import AnimatedHeading from '@/components/sections/blog/AnimatedHeading';
import BlogCTA from '@/components/sections/blog/BlogCTA';
import MagicBento from '@/components/sections/blog/MagicBento';

export default async function BlogsPage() {
  const blogs = await getDevtoBlogs();
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="relative min-h-screen">
      <BlogHero />

      {/* Featured article - full screen */}
      <FeaturedArticle blog={featuredBlog} />

      {/* Section divider with animated heading */}
      <AnimatedHeading />

      {/* Magic Bento grid - shows up to 6 articles */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32 flex justify-center">
        <MagicBento
          blogs={remainingBlogs}
          textAutoHide={true}
          enableStars={false}
          enableSpotlight={true}
          enableBorderGlow={true}
          enableTilt={true}
          enableMagnetism={true}
          clickEffect={false}
          spotlightRadius={400}
          particleCount={12}
          glowColor="132, 0, 255"
          disableAnimations={false}
        />
      </div>

      {/* CTA Section */}
      <BlogCTA />
    </div>
  );
}