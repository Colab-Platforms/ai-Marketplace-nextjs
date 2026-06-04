const heroStats = [
  { value: "80%", label: "Reduction in manual tasks" },
  { value: "3×", label: "Faster customer response time" },
  { value: "500+", label: "Businesses powered" },
  { value: "99.9%", label: "Platform uptime SLA" },
];

const capabilities = ["Automation", "Chatbots", "Workflow AI", "Sales Systems", "Support AI", "Integrations", "Analytics"];

const features = [
  { title: "Workflow Automation", desc: "Eliminate repetitive tasks with drag-and-drop AI workflow builders that run 24/7." },
  { title: "Intelligent Chatbots", desc: "Deploy conversational AI across web and messaging channels with your own content." },
  { title: "Sales AI", desc: "Score leads, automate follow-up, and personalize outreach at scale." },
  { title: "Support Systems", desc: "Reduce ticket volume while routing higher-value issues to humans." },
  { title: "Integrations", desc: "Connect 150+ tools with pre-built connectors and flexible APIs." },
  { title: "Analytics & Intelligence", desc: "Real-time dashboards and predictive insights show what to do next." },
];

const solutionDetails = [
  {
    label: "AI Chatbot & Support",
    title: "Intelligent Chatbot Platform",
    desc: "Deploy AI chatbots trained on docs, FAQs, and SOPs to answer customer questions instantly.",
    tags: ["NLP-Powered", "Multi-Channel", "Live Handoff", "Analytics"],
    stat: "70% ticket deflection rate",
  },
  {
    label: "Workflow & Automation",
    title: "End-to-End Workflow AI",
    desc: "Map, automate, and optimize business processes using a visual canvas with AI decision nodes.",
    tags: ["Visual Builder", "Trigger-Based", "Exception Alerts", "API-Ready"],
    stat: "10× faster process deployment",
  },
  {
    label: "Sales & CRM AI",
    title: "AI-Powered Sales Engine",
    desc: "Score leads automatically, personalize outreach, and predict deal outcomes with CRM intelligence.",
    tags: ["Lead Scoring", "Predictive Forecasting", "Auto Follow-Up", "CRM Sync"],
    stat: "40% more qualified leads",
  },
];

const useCases = [
  { num: "01", title: "E-commerce & Retail", desc: "Deploy recommendation chatbots, automate order queries, and run personalized campaigns." },
  { num: "02", title: "Financial Services", desc: "Automate onboarding, compliance workflows, and customer communications." },
  { num: "03", title: "Healthcare & Clinics", desc: "Reduce no-shows with AI scheduling, patient FAQs, and automated reminders." },
  { num: "04", title: "SaaS & Tech Companies", desc: "Accelerate conversion with onboarding flows, usage scoring, and retention triggers." },
];

const relatedDivisions = [
  { title: "Agent Marketplace", desc: "Browse pre-built AI agents for HR, sales, support, and marketing.", href: "/marketplace" },
  { title: "AI SaaS Products", desc: "Six integrated tools including CRM, marketing, content, analytics, and automation.", href: "/saas-products" },
  { title: "AI Data & Intelligence", desc: "The intelligence layer powering smarter decisions across every product.", href: "/ai-data-intelligence" },
];

export default function AISolutionsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-white border-b border-slate-200 px-6 md:px-10 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <a href="/" className="text-slate-700 hover:text-slate-900 hover:underline">Home</a>
          <span>›</span>
          <a href="/solutions" className="text-slate-700 hover:text-slate-900 hover:underline">Solutions</a>
          <span>›</span>
          <span className="font-medium text-slate-900">AI Solutions</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-slate-950 px-6 md:px-10 py-16 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950/90 to-transparent" />
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.35fr_0.65fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Enterprise AI Suite</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-5">AI solutions to accelerate modern business.</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 mb-8">
              A premium suite of AI products designed to automate customer experience, optimize workflows, and unlock measurable ROI across teams.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#details" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">See details</a>
              <a href="#demo" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Watch demo</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {heroStats.map((stat) => (
                <div key={stat.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5">
                  <div className="text-3xl font-semibold text-sky-300">{stat.value}</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-t border-b border-slate-200 px-6 md:px-10 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Capabilities</span>
          {capabilities.map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{item}</span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid gap-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm" id="details">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Overview</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">What is Avatar AI Solutions?</h2>
            <p className="text-sm leading-7 text-slate-600 max-w-3xl">Avatar AI Solutions is a comprehensive suite of intelligent tools built to automate, optimize, and scale every facet of your business operations.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-2 mb-10">
            {features.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-300 bg-slate-50 p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="mb-3 h-10 w-10 rounded-2xl bg-slate-100" />
                <h3 className="font-semibold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Core solutions</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-5">Built for every business function.</h2>
            <div className="space-y-4">
              {solutionDetails.map((item) => (
                <div key={item.title} className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-2">{item.label}</p>
                  <h3 className="text-xl font-semibold text-slate-950 mb-3">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600 mb-4">{item.desc}</p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {item.tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-2.5 py-1 text-xs text-slate-600">{tag}</span>
                    ))}
                  </div>
                  <div className="inline-flex rounded-full bg-sky-50 px-3 py-1 text-xs font-semibold text-sky-700">{item.stat}</div>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Industry use cases</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-5">Who uses Avatar AI Solutions?</h2>
            <div className="space-y-4">
              {useCases.map((item) => (
                <div key={item.num} className="rounded-[1.75rem] border border-slate-300 bg-slate-50 p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.num}</div>
                  <h3 className="text-xl font-semibold text-slate-950 mb-2">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="bg-slate-100 px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm text-center" id="demo">
          <h2 className="text-3xl font-semibold text-slate-950 mb-4">Ready to transform your business with AI?</h2>
          <p className="text-sm leading-7 text-slate-600 max-w-2xl mx-auto mb-8">Automate operations, delight customers, and scale intelligently with Avatar AI Solutions.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition">Request a Demo</a>
            <a href="#" className="rounded-2xl border border-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">Talk to Sales</a>
          </div>
        </div>
      </section>

      <section className="bg-slate-100 px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="mb-8 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Explore more</p>
              <h2 className="text-3xl font-semibold text-slate-950">See other Avatar divisions</h2>
            </div>
            <div className="grid gap-5 sm:grid-cols-2 md:grid-cols-3">
              {relatedDivisions.map((item) => (
                <a key={item.title} href={item.href} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-6 transition hover:border-slate-300 hover:bg-white">
                  <p className="text-sm font-semibold text-slate-900 mb-3">{item.title}</p>
                  <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
                  <p className="mt-5 text-sm font-semibold text-sky-600">Explore</p>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
