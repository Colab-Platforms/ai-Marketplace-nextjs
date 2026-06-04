const heroStats = [
  { value: "6", label: "Integrated SaaS products" },
  { value: "100+", label: "Platform integrations" },
  { value: "14-day", label: "Free trial, no card needed" },
  { value: "99.99%", label: "Enterprise SLA uptime" },
];

const products = [
  {
    title: "Avatar CRM — AI Customer Relationship Manager",
    desc: "A fully AI-native CRM that automatically scores leads, predicts deal outcomes, and surfaces next-best actions.",
    tags: ["Lead Scoring", "Pipeline AI", "Email Intelligence", "Deal Prediction"],
    badge: "coming soon",
  },
  {
    title: "Avatar Marketing — AI Marketing Platform",
    desc: "AI-generated campaigns, audience segmentation, A/B testing, and automated multi-channel sequences.",
    tags: ["Campaign AI", "Audience Segmentation", "Multi-Channel", "Attribution"],
    badge: "coming soon",
  },
  {
    title: "Avatar Content — AI Content Engine",
    desc: "Generate blogs, social posts, ad copy, product descriptions, and more at scale.",
    tags: ["Brand Voice AI", "SEO Optimized", "Multi-Format", "Auto-Publish"],
    badge: "coming soon",
  },
  {
    title: "Avatar Analytics — AI Business Intelligence",
    desc: "Natural-language analytics with auto-generated reports, anomaly detection, and forecasting.",
    tags: ["NL Queries", "Anomaly Detection", "Auto Reports", "Predictive"],
    badge: "coming soon",
  },
  {
    title: "Avatar Assistant — AI Assistant Platform",
    desc: "Build and deploy custom assistants trained on your knowledge base and company procedures.",
    tags: ["Custom Knowledge", "No-Code Builder", "Multi-Channel", "Voice Support"],
    badge: "coming soon",
  },
  {
    title: "Avatar Flow — AI Workflow Builder",
    desc: "Design end-to-end workflows with triggers, conditions, AI actions, and API integrations.",
    tags: ["Visual Canvas", "No-Code Automation", "API Connectors", "Real-Time Logs"],
    badge: "coming soon",
  },
];

const useCases = [
  { num: "01", title: "Growth-Stage Startups", desc: "Run go-to-market, content, CRM, and analytics from one connected platform." },
  { num: "02", title: "Mid-Size B2B Companies", desc: "Replace patchwork tools with a unified AI-native suite that lowers cost and complexity." },
  { num: "03", title: "Agencies & Service Businesses", desc: "Deliver client work faster with content, analytics, and AI automation in one place." },
  { num: "04", title: "Enterprise Teams", desc: "Deploy the full suite with governance and private cloud options for complex organizations." },
];

const steps = [
  { n: 1, title: "Create your Avatar account", desc: "Sign up once and unlock all six products with a full trial and no card required." },
  { n: 2, title: "Connect your data sources", desc: "Link CRM, email, website, social, and databases using pre-built integrations." },
  { n: 3, title: "Activate the products you need", desc: "Turn on the tools that matter most and get guided onboarding to first value." },
  { n: 4, title: "Scale across your team", desc: "Invite teammates, assign permissions, and let shared intelligence improve outcomes." },
];

const productStatus = [
  { name: "Avatar CRM", status: "coming soon", live: true },
  { name: "Avatar Marketing", status: "coming soon", live: true },
  { name: "Avatar Content", status: "coming soon", live: true },
  { name: "Avatar Analytics", status: "coming soon", live: true },
  { name: "Avatar Assistant", status: "coming soon", live: false },
  { name: "Avatar Flow", status: "coming soon", live: true },
];

export default function AISaaSProductsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-white border-b border-slate-200 px-6 md:px-10 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <a href="/" className="text-slate-700 hover:text-slate-900 hover:underline">Home</a>
          <span>›</span>
          <a href="/solutions" className="text-slate-700 hover:text-slate-900 hover:underline">Solutions</a>
          <span>›</span>
          <span className="font-medium text-slate-900">AI SaaS Products</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-slate-950 px-6 md:px-10 py-16 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950/90 to-transparent" />
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.35fr_0.65fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Six products. One premium platform.</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-5">AI SaaS Products for modern teams</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 mb-8">
              Replace a patchwork stack with one elegant platform that delivers CRM, marketing, content, analytics, automation, and assistants together.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#products" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">View products</a>
              <a href="#trial" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Start free trial</a>
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
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Products</span>
          {['AI CRM', 'AI Marketing', 'AI Content', 'AI Analytics', 'AI Assistant', 'AI Workflow'].map((item) => (
            <span key={item} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{item}</span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid gap-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Product suite</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">Six AI products in one premium platform.</h2>
            <p className="text-sm leading-7 text-slate-600 max-w-3xl">Everything your team needs to manage growth, campaigns, operations, and customer experience from a single unified platform.</p>
          </div>

          <div id="products" className="grid gap-5 sm:grid-cols-2 md:grid-cols-2">
            {products.map((product) => (
              <div key={product.title} className="rounded-[1.75rem] border border-slate-300 bg-slate-50 p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="mb-4 h-2 w-11 rounded-2xl bg-slate-100" />
                <div className="flex items-start justify-between gap-4 mb-4">
                  <h3 className="text-lg font-semibold text-slate-950">{product.title}</h3>
                  <span className={`rounded-full px-2 text-xs font-semibold ${product.badge === 'Live' ? 'bg-emerald-100 text-emerald-700' : 'bg-amber-100 text-amber-700'}`}>{product.badge}</span>
                </div>
                <p className="text-sm leading-6 text-slate-600 mb-4">{product.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {product.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-white px-2.5 py-1 text-xs text-slate-600 border border-slate-200">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="mt-12">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Use cases</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-5">Who uses the Avatar SaaS suite?</h2>
            <div className="space-y-4">
              {useCases.map((item) => (
                <div key={item.num} className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.num}</div>
                  <h3 className="text-xl font-semibold text-slate-950 mb-2">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mt-12" id="trial">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Getting started</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-5">From sign-up to live in four steps.</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.n} className="flex gap-4 items-start rounded-[1.75rem] border border-slate-300 bg-white p-5 shadow-md hover:shadow-xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-950 text-white font-semibold">{step.n}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 mb-2">{step.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <section className="bg-slate-100 px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm text-center">
          <h2 className="text-3xl font-semibold text-slate-950 mb-4">Ready to replace your software stack?</h2>
          <p className="text-sm leading-7 text-slate-600 max-w-2xl mx-auto mb-8">Start your free trial and get full access to all six AI products without a credit card.</p>
          <div className="flex flex-wrap justify-center gap-3">
            <a href="#" className="rounded-2xl bg-slate-950 px-7 py-3.5 text-sm font-semibold text-white hover:bg-slate-800 transition">Start Free Trial</a>
            <a href="#" className="rounded-2xl border border-slate-900 px-7 py-3.5 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">Talk to Sales</a>
          </div>
        </div>
      </section>
    </div>
  );
}
