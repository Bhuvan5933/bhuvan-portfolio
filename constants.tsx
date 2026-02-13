
import { Project, SkillGroup } from './types';

export interface JourneyItem {
  id: string;
  year: string;
  title: string;
  location: string;
  description: string;
  phase: string;
}

export interface EnhancedProject extends Project {
  tools: string[];
}

export const PROJECTS: EnhancedProject[] = [
  {
    id: 'social-campaign-canva',
    title: 'Seasonal Festival Ads',
    category: 'Social Media',
    description: 'Culturally resonant campaign designs created for diverse client portfolios using modern aesthetics.',
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?q=80&w=1000&auto=format&fit=crop',
    color: '#00C4CC',
    tools: ['Canva']
  },
  {
    id: 'brand-identity-ps',
    title: 'Nexus Branding',
    category: 'Brand Identity',
    description: 'Cohesive identity systems including custom color palettes and typography frameworks.',
    image: 'https://images.unsplash.com/photo-1572044162444-ad60f128bdea?q=80&w=1000&auto=format&fit=crop',
    color: '#31A8FF',
    tools: ['Photoshop']
  },
  {
    id: 'menu-layout-canva',
    title: 'Gourmet Menu Layouts',
    category: 'Layout Design',
    description: 'High-end promotional materials and menu layouts for premium culinary brands.',
    image: 'https://images.unsplash.com/photo-1509343256512-d77a5cb3791b?q=80&w=1000&auto=format&fit=crop',
    color: '#FF6B6B',
    tools: ['Canva']
  },
  {
    id: 'vector-illustration-ai',
    title: 'Aether Vectors',
    category: 'Illustration',
    description: 'Precision vector assets and visual templates for modern digital interfaces.',
    image: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=1000&auto=format&fit=crop',
    color: '#FF9A00',
    tools: ['Illustrator']
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    title: 'CORE EXPERTISE',
    skills: ['Social Media', 'Branding', 'Typography', 'Layout Design', 'Color Theory', 'Ad Creatives']
  },
  {
    title: 'SOFTWARE TOOLS',
    skills: ['Canva', 'Adobe Photoshop', 'Adobe Illustrator', 'Adobe Premiere Pro', 'Figma']
  },
  {
    title: 'MANAGEMENT',
    skills: ['Team Management', 'Marketing', 'Client Interaction', 'Brand Consistency']
  },
  {
    title: 'CERTIFICATIONS',
    skills: ['Canva Graphic Design Specialization', 'Photoshop Essentials', 'Digital Design Basics']
  }
];

export const JOURNEY_ITEMS: JourneyItem[] = [
  {
    id: 'education',
    year: '2018 - 2021',
    title: 'B.Sc. Computer Science',
    location: 'Andhra University',
    phase: 'ACADEMIC FOUNDATION',
    description: 'Gained a strong technical foundation in computing which now informs my logical approach to layout and digital design structures.'
  },
  {
    id: 'freelance-start',
    year: '2024 - PRESENT',
    title: 'Freelance Graphic Designer',
    location: 'Visakhapatnam, Andhra Pradesh',
    phase: 'PROFESSIONAL CREATIVE',
    description: 'Delivering high-impact social media content, brand identity systems, and seasonal campaign designs for a diverse range of clients, ensuring brand consistency and satisfaction.'
  }
];
