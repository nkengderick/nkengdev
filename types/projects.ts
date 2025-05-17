import { ReactNode } from "react";

export interface Testimonial {
  quote: string;
  author: string;
  role: string;
}

export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  technologies: string[];
  githubUrl?: string;
  liveUrl?: string;
  category: string;
  date: string;
  featured?: boolean;
  gradient?: string;
  icon?: ReactNode;
  overview?: string;
  challenge?: string;
  solution?: string;
  features?: string[];
  testimonial?: Testimonial;
}
