import { Blog, blogs as fallbackBlogs } from './data/blogs';

export interface DevtoArticle {
  id: number;
  title: string;
  description: string;
  published_at: string;
  cover_image: string | null;
  social_image: string | null;
  tag_list: string[];
  url: string;
  reading_time_minutes: number;
  public_reactions_count: number;
}

export async function getDevtoBlogs(): Promise<Blog[]> {
  try {
    const response = await fetch('https://dev.to/api/articles?username=zenoguy', {
      next: { revalidate: 3600 }, // Cache for 1 hour
    });

    if (!response.ok) {
      console.warn(`Failed to fetch dev.to articles: ${response.statusText}. Using fallback static blogs.`);
      return fallbackBlogs;
    }

    const articles: DevtoArticle[] = await response.json();
    
    if (!articles || !Array.isArray(articles) || articles.length === 0) {
      console.warn('Empty or invalid dev.to response. Using fallback static blogs.');
      return fallbackBlogs;
    }

    return articles.map((article) => {
      const dateObj = new Date(article.published_at);
      const formattedDate = dateObj.toLocaleDateString('en-US', {
        month: 'short',
        day: '2-digit',
        year: 'numeric',
      });

      // Capitalize the first tag for category, or default to 'Article'
      const rawCategory = article.tag_list && article.tag_list[0] ? article.tag_list[0] : 'Article';
      const category = rawCategory.charAt(0).toUpperCase() + rawCategory.slice(1);

      // Use cover_image or social_image, or fallback to a standard unsplash image
      const image = article.cover_image || article.social_image || 'https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1200&q=80';

      return {
        id: article.id,
        title: article.title,
        excerpt: article.description || '',
        category,
        readTime: `${article.reading_time_minutes} min read`,
        date: formattedDate,
        image,
        tags: article.tag_list || [],
        url: article.url,
        reactionsCount: article.public_reactions_count || 0,
      };
    });
  } catch (error) {
    console.error('Error fetching blogs from dev.to API:', error);
    return fallbackBlogs;
  }
}
