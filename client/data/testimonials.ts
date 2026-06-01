export interface Testimonial {
  id: string;
  name: string;
  role: string;
  image: string;
  content: string;
  rating: number;
}

export const testimonials: Testimonial[] = [
  {
    id: '1',
    name: 'Rahul Mehta',
    role: 'AI Consultant, Freelancer',
    image: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=80&q=80',
    content: "Avatar's AI bootcamp completely changed my career trajectory. Within 3 months, I went from knowing nothing about AI to deploying chatbots for clients.",
    rating: 5
  },
  {
    id: '2',
    name: 'Sarah Chen',
    role: 'VP Sales, TechScale Inc.',
    image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=80&q=80',
    content: "We deployed Avatar's Sales AI agent and saw a 40% increase in qualified leads within the first month. The marketplace is incredible for plug-and-play AI.",
    rating: 5
  },
  {
    id: '3',
    name: 'Marcus Reynolds',
    role: 'CTO, FinServe Global',
    image: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=80&q=80',
    content: "Avatar's enterprise training transformed how our team approaches AI. 200+ employees certified in under 6 weeks. The structured curriculum is unmatched.",
    rating: 5
  },
  {
    id: '4',
    name: 'Priya Sharma',
    role: 'COO, NexGen Retail',
    image: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=80&q=80',
    content: "The AI Cloud Workspace brought all our tools, agents, and data into one dashboard. It's like having a command center for our entire AI operations.",
    rating: 5
  },
  {
    id: '5',
    name: 'David Kim',
    role: 'AI Developer, Freelancer',
    image: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=80&q=80',
    content: "I earned my Avatar AI certification, listed myself on the Talent Network, and got hired within two weeks. The ecosystem truly connects learning with opportunity.",
    rating: 5
  },
  {
    id: '6',
    name: 'Elena Torres',
    role: 'Marketing Director, BrightPath',
    image: 'https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=80&q=80',
    content: "Avatar's AI SaaS platform replaced three separate tools for us. The AI CRM alone paid for itself in the first quarter with improved conversion rates.",
    rating: 5
  }
];
