import { blogs } from '@/lib/data/blogs';
import BlogHero from '@/components/sections/blog/BlogHero';
import FeaturedArticle from '@/components/sections/blog/FeaturedArticle';
import ArticleCard from '@/components/sections/blog/ArticleCard';
import AnimatedHeading from '@/components/sections/blog/AnimatedHeading';
import BlogCTA from '@/components/sections/blog/BlogCTA';

export default function BlogsPage() {
  const featuredBlog = blogs[0];
  const remainingBlogs = blogs.slice(1);

  return (
    <div className="relative min-h-screen">
      <BlogHero />
      
      {/* Featured article - full screen */}
      <FeaturedArticle blog={featuredBlog} />

      {/* Section divider with animated heading */}
      <AnimatedHeading />

      {/* Grid of remaining articles */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 pb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
          {remainingBlogs.map((blog, index) => (
            <ArticleCard key={blog.id} blog={blog} index={index} />
          ))}
        </div>
      </div>

      {/* CTA Section */}
      <BlogCTA />
    </div>
  );
}