export interface Division {
  id: string;
  icon: string;
  title: string;
  description: string;
  link: string;
}

export const divisions: Division[] = [
  {
    id: 'learning',
    icon: 'fa-book-open',
    title: 'AI Learning',
    description: 'Workshops, certifications, bootcamps, and enterprise training for students, professionals, and businesses.',
    link: '/learning'
  },
  {
    id: 'solutions',
    icon: 'fa-puzzle-piece',
    title: 'AI Solutions',
    description: 'Automation, chatbots, workflow AI, sales & support systems, integrations and analytics for businesses.',
    link: '/solutions'
  },
  // {
  //   id: 'marketplace',
  //   icon: 'fa-store',
  //   title: 'Agent Marketplace',
  //   description: 'Buy, deploy & customize AI agents — HR AI, Sales AI, Support AI, Marketing AI — plug-and-play for any business.',
  //   link: '/marketplace'
  // },
  {
    id: 'saas',
    icon: 'fa-layer-group',
    title: 'AI SaaS Products',
    description: 'AI CRM, marketing platform, content engine, analytics tools, assistant platform, and workflow builder.',
    link: '/saas-products'
  },
  // {
  //   id: 'cloud',
  //   icon: 'fa-cloud',
  //   title: 'AI Cloud Workspace',
  //   description: 'Unified dashboard to manage employees, AI agents, workflows, automations, and business data in one place.',
  //   link: '#'
  // },
  // {
  //   id: 'talent',
  //   icon: 'fa-users',
  //   title: 'AI Talent Network',
  //   description: 'Connecting companies with certified AI talent. Freelancers offer AI services. Certified users get hired.',
  //   link: '#'
  // },
  // {
  //   id: 'research',
  //   icon: 'fa-flask',
  //   title: 'AI Research & Innovation',
  //   description: 'Fine-tuned models, local AI systems, enterprise AI, voice AI, and multilingual AI — long-term R&D.',
  //   link: '#'
  // },
  {
    id: 'data',
    icon: 'fa-database',
    title: 'AI Data & Intelligence',
    description: 'Workflow patterns, user behavior, and industry intelligence — the data layer that powers the ecosystem moat.',
    link: '/ai-data-intelligence'
  }
];
