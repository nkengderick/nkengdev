export interface Author {
  name: string;
  avatar: string;
  role: string;
  bio: string;
  social: {
    twitter?: string;
    github?: string;
    linkedin?: string;
    website?: string;
  };
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  coverImage: string;
  publishDate: string;
  readTime: number;
  author: Author;
  category: string;
  tags: string[];
  views: number;
  comments: number;
  featured?: boolean;
  content?: string;
}

export interface BlogCategory {
  name: string;
  slug: string;
  count: number;
}

export interface BlogTag {
  name: string;
  slug: string;
  count: number;
}

export interface BlogStats {
  totalPosts: number;
  totalCategories: number;
  totalTags: number;
  totalViews: number;
  totalComments: number;
}
