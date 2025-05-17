import { BlogPost, Author, BlogCategory } from "./types";
import blogData from "./blogs.json";

// Author information
export const authorInfo: Author = {
  name: "Nkengbeza Derick",
  avatar: "/images/profile.png",
  role: "Full-Stack Developer",
  bio: "Full-stack developer with expertise in MERN stack, Next.js, and modern web technologies. Passionate about creating efficient, scalable, and user-friendly applications.",
  social: {
    twitter: "https://twitter.com/nkengderick",
    github: "https://github.com/nkengderick",
    linkedin: "https://linkedin.com/in/nkengbezaderick",
    website: "https://portfolio-117q.onrender.com/",
  },
};

// Export blog posts from the imported JSON file
export const blogPosts: BlogPost[] = blogData.posts;

// Helper function to get a blog post by slug
export function getBlogPostBySlug(slug: string): BlogPost | undefined {
  return blogPosts.find((post) => post.slug === slug);
}

// Helper function to get featured blog posts
export function getFeaturedBlogPosts(): BlogPost[] {
  return blogPosts.filter((post) => post.featured);
}

// Helper function to get blog posts by category
export function getBlogPostsByCategory(category: string): BlogPost[] {
  return blogPosts.filter(
    (post) => post.category.toLowerCase() === category.toLowerCase()
  );
}

// Helper function to get blog posts by tag
export function getBlogPostsByTag(tag: string): BlogPost[] {
  return blogPosts.filter((post) =>
    post.tags.some((t) => t.toLowerCase() === tag.toLowerCase())
  );
}

// Helper function to get related blog posts (by category and tags)
export function getRelatedBlogPosts(
  currentPost: BlogPost,
  limit: number = 3
): BlogPost[] {
  return blogPosts
    .filter(
      (post) =>
        post.id !== currentPost.id &&
        (post.category === currentPost.category ||
          post.tags.some((tag) => currentPost.tags.includes(tag)))
    )
    .sort((a, b) => {
      // Count matching tags to sort by relevance
      const aMatchingTags = a.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      ).length;
      const bMatchingTags = b.tags.filter((tag) =>
        currentPost.tags.includes(tag)
      ).length;

      return bMatchingTags - aMatchingTags;
    })
    .slice(0, limit);
}

// Helper function to search blog posts
export function searchBlogPosts(query: string): BlogPost[] {
  const searchTerm = query.toLowerCase();
  return blogPosts.filter(
    (post) =>
      post.title.toLowerCase().includes(searchTerm) ||
      post.excerpt.toLowerCase().includes(searchTerm) ||
      post.content?.toLowerCase().includes(searchTerm) ||
      post.category.toLowerCase().includes(searchTerm) ||
      post.tags.some((tag) => tag.toLowerCase().includes(searchTerm))
  );
}

// Helper function to get blog posts sorted by date (newest first)
export function getBlogPostsByDate(count?: number): BlogPost[] {
  const sortedPosts = [...blogPosts].sort(
    (a, b) =>
      new Date(b.publishDate).getTime() - new Date(a.publishDate).getTime()
  );

  return count ? sortedPosts.slice(0, count) : sortedPosts;
}

// Helper function to get all unique categories
// Helper function to get all categories with post counts
export function getAllCategories(): BlogCategory[] {
    const categories: Record<string, number> = {};
    
    // Count posts in each category
    blogPosts.forEach(post => {
      const category = post.category;
      categories[category] = (categories[category] || 0) + 1;
    });
    
    // Convert to array of objects with name and count
    return Object.entries(categories).map(([name, count]) => ({
      name,
      slug: name.toLowerCase().replace(/\s+/g, '-'),
      count
    }));
  }

// Helper function to get all unique tags
export function getAllTags(): string[] {
  const allTags = blogPosts.flatMap((post) => post.tags);
  return Array.from(new Set(allTags));
}

// Helper function to get statistics about the blog
export function getBlogStats() {
  return {
    totalPosts: blogPosts.length,
    totalCategories: getAllCategories().length,
    totalTags: getAllTags().length,
    totalViews: blogPosts.reduce((sum, post) => sum + post.views, 0),
    totalComments: blogPosts.reduce((sum, post) => sum + post.comments, 0),
  };
}

export default blogPosts;
