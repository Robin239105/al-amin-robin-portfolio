export interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  category: string | string[];
  tech: string[];
  liveUrl?: string;
  githubUrl?: string;
  featured: boolean;
}

export interface Testimonial {
  id: string;
  author: string;
  role: string;
  company: string;
  platform: string;
  rating: number;
  avatar: string;
  text: string;
}

export interface Experience {
  id: string;
  title: string;
  company: string;
  period: string;
  description: string[];
  tech: string[];
  type: 'work' | 'education';
}

export interface TechItem {
  name: string;
  icon: string;
  category: string;
}

export interface TechCategory {
  name: string;
  icon: string;
  items: TechItem[];
}

export interface Education {
  id: string;
  degree: string;
  institution: string;
  year: string;
  gpa?: string;
  description?: string;
}

export interface Service {
  title: string;
  description: string;
  icon: string;
  size: 'normal' | 'large';
}

export interface Stat {
  value: number;
  label: string;
  suffix: string;
}