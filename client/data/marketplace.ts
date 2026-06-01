export interface Tool {
  id: number;
  name: string;
  category: string;
  description: string;
  price: string;
  rating: number;
  reviews: number;
  icon: string;
  badge?: string;
  tags: string[];
  image: string;
}

export interface Category {
  name: string;
  icon: string;
}

export const categories: Category[] = [
  { name: 'All Tools', icon: 'fa-table-cells-large' },
  { name: 'Customer Support', icon: 'fa-headset' },
  { name: 'Sales & CRM', icon: 'fa-chart-line' },
  { name: 'Marketing', icon: 'fa-bullhorn' },
  { name: 'HR & Recruitment', icon: 'fa-users' },
  { name: 'Analytics', icon: 'fa-chart-bar' },
  { name: 'Content Creation', icon: 'fa-pen-nib' },
  { name: 'Finance', icon: 'fa-coins' },
  { name: 'Productivity', icon: 'fa-bolt' },
];

export const tools: Tool[] = [
  {
    id: 1,
    name: 'SupportBot Pro',
    category: 'Customer Support',
    description: 'Resolve 80% of support tickets automatically with AI-powered responses and smart escalation.',
    price: 'Free',
    rating: 4.8,
    reviews: 124,
    icon: 'fa-headset',
    badge: 'Popular',
    tags: ['chatbot', 'ticketing', 'automation'],
    image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 2,
    name: 'SalesGenius',
    category: 'Sales & CRM',
    description: 'Automate lead scoring, follow-ups, and pipeline management with intelligent AI workflows.',
    price: 'Free',
    rating: 4.7,
    reviews: 89,
    icon: 'fa-chart-line',
    badge: 'New',
    tags: ['crm', 'leads', 'pipeline'],
    image: 'https://images.unsplash.com/photo-1552664730-d307ca884978?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 3,
    name: 'ContentForge',
    category: 'Content Creation',
    description: 'Generate blog posts, social content, and ad copy in seconds with brand-consistent AI.',
    price: 'Free',
    rating: 4.6,
    reviews: 203,
    icon: 'fa-pen-nib',
    tags: ['writing', 'blog', 'social media'],
    image: 'https://images.unsplash.com/photo-1455390582262-044cdead277a?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 4,
    name: 'HireBot AI',
    category: 'HR & Recruitment',
    description: 'Screen resumes, schedule interviews, and rank candidates automatically to hire faster.',
    price: 'Free',
    rating: 4.9,
    reviews: 67,
    icon: 'fa-users',
    badge: 'Top Rated',
    tags: ['hiring', 'screening', 'interviews'],
    image: 'https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 5,
    name: 'InsightIQ',
    category: 'Analytics',
    description: 'Transform raw data into actionable business insights with natural language queries.',
    price: 'Free',
    rating: 4.5,
    reviews: 45,
    icon: 'fa-chart-bar',
    tags: ['data', 'reports', 'bi'],
    image: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 6,
    name: 'MarketingPilot',
    category: 'Marketing',
    description: 'AI campaign optimization, A/B testing, and precision audience targeting at scale.',
    price: 'Free',
    rating: 4.7,
    reviews: 156,
    icon: 'fa-bullhorn',
    badge: 'Popular',
    tags: ['campaigns', 'advertising', 'targeting'],
    image: 'https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 7,
    name: 'FinanceBot',
    category: 'Finance',
    description: 'Automate invoicing, expense tracking, and financial forecasting with AI precision.',
    price: 'Free',
    rating: 4.8,
    reviews: 38,
    icon: 'fa-coins',
    tags: ['invoicing', 'expenses', 'forecasting'],
    image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 8,
    name: 'RecruitAI',
    category: 'HR & Recruitment',
    description: 'Source top talent from LinkedIn, Naukri, and job boards with automated outreach.',
    price: 'Free',
    rating: 4.6,
    reviews: 72,
    icon: 'fa-user-tie',
    tags: ['sourcing', 'talent', 'linkedin'],
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 9,
    name: 'SocialAI',
    category: 'Marketing',
    description: 'Schedule, publish, and analyze social media performance with AI-driven recommendations.',
    price: 'Free',
    rating: 4.4,
    reviews: 189,
    icon: 'fa-share-nodes',
    tags: ['social', 'scheduling', 'analytics'],
    image: 'https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 10,
    name: 'DataSync AI',
    category: 'Analytics',
    description: 'Connect and unify data from 50+ sources for real-time dashboards and reporting.',
    price: 'Free',
    rating: 4.7,
    reviews: 29,
    icon: 'fa-database',
    badge: 'Enterprise',
    tags: ['integration', 'etl', 'dashboard'],
    image: 'https://images.unsplash.com/photo-1518186285589-2f7649de83e0?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 11,
    name: 'DocAssist',
    category: 'Productivity',
    description: 'Extract, summarize, and query documents with natural language — no more manual reading.',
    price: 'Free',
    rating: 4.5,
    reviews: 234,
    icon: 'fa-file-lines',
    tags: ['documents', 'summarize', 'search'],
    image: 'https://images.unsplash.com/photo-1568602471122-7832951cc4c5?w=600&h=280&fit=crop&auto=format',
  },
  {
    id: 12,
    name: 'LeadGenius',
    category: 'Sales & CRM',
    description: 'Identify, enrich, and engage high-intent leads from across the web automatically.',
    price: 'Free',
    rating: 4.8,
    reviews: 61,
    icon: 'fa-crosshairs',
    badge: 'New',
    tags: ['leads', 'enrichment', 'outreach'],
    image: 'https://images.unsplash.com/photo-1560472355-536de3962603?w=600&h=280&fit=crop&auto=format',
  },
];
