
const heroStats = [
  { value: "80%", label: "Reduction in manual tasks" },
  { value: "3×", label: "Faster customer response time" },
  { value: "500+", label: "Businesses powered" },
  { value: "99.9%", label: "Platform uptime SLA" },
];

const capabilities = ["Automation", "Chatbots", "Workflow AI", "Sales Systems", "Support AI", "Integrations", "Analytics"];

const features = [
  { icon: "⚡", title: "Workflow Automation", desc: "Eliminate repetitive tasks with drag-and-drop AI workflow builders. Connect tools, trigger actions, and ship processes 10× faster." },
  { icon: "💬", title: "Intelligent Chatbots", desc: "Deploy conversational AI on your website, WhatsApp, or app. Train on your own data for context-aware, always-on support." },
  { icon: "📈", title: "Sales AI", desc: "Qualify leads, follow up automatically, and guide prospects through the funnel with AI-driven personalization at scale." },
  { icon: "🎯", title: "Support Systems", desc: "Deflect 70% of support tickets with AI resolution while routing complex issues to the right human agent instantly." },
  { icon: "🔗", title: "Integrations", desc: "Connect 150+ tools — CRMs, ERPs, marketing platforms, and more — with pre-built connectors and a flexible API layer." },
  { icon: "📊", title: "Analytics & Intelligence", desc: "Real-time dashboards and predictive insights that surface what's working, what's not, and what to do next." },
];

const solutionDetails = [
  {
    label: "AI Chatbot & Support", icon: "💬",
    title: "Intelligent Chatbot Platform",
    desc: "Deploy AI-powered chatbots on your website, WhatsApp, and mobile app. Our chatbots train on your product docs, FAQs, and SOPs — giving customers accurate, instant answers 24/7 while dramatically reducing your support overhead.",
    tags: ["NLP-Powered", "Multi-Channel", "Live Handoff", "Analytics"],
    stat: "70% ticket deflection rate"
  },
  {
    label: "Workflow & Automation", icon: "⚡",
    title: "End-to-End Workflow AI",
    desc: "Map, automate, and optimize every business process — from lead routing to invoice processing — using a visual canvas with AI decision nodes. Deploy automations that run around the clock and report exceptions in real time.",
    tags: ["Visual Builder", "Trigger-Based", "Exception Alerts", "API-Ready"],
    stat: "10× faster process deployment"
  },
  {
    label: "Sales & CRM AI", icon: "📈",
    title: "AI-Powered Sales Engine",
    desc: "Score leads automatically, personalize outreach at scale, and predict deal closure probability with our Sales AI layer. Integrates natively with your existing CRM or replaces it entirely with Avatar CRM.",
    tags: ["Lead Scoring", "Predictive Forecasting", "Auto Follow-Up", "CRM Sync"],
    stat: "40% more qualified leads"
  },
];

const useCases = [
  { num: "01", title: "E-commerce & Retail", desc: "Deploy product recommendation chatbots, automate order queries, and run personalized email campaigns at scale." },
  { num: "02", title: "Financial Services", desc: "Automate KYC documentation, compliance workflows, and customer onboarding while maintaining full audit trails." },
  { num: "03", title: "Healthcare & Clinics", desc: "AI appointment scheduling, patient FAQ bots, and automated follow-up reminders that reduce no-shows by 30%." },
  { num: "04", title: "SaaS & Tech Companies", desc: "Accelerate trial-to-paid conversion with AI onboarding flows, usage-based health scoring, and proactive retention triggers." },
];

const relatedDivisions = [
  { icon: "🤖", title: "Agent Marketplace", desc: "Browse pre-built AI agents for HR, Sales, Support, and Marketing — deploy in minutes without engineering resources.", href: "/marketplace" },
  { icon: "📦", title: "AI SaaS Products", desc: "Six integrated SaaS tools including AI CRM, marketing platform, content engine, and workflow builder.", href: "/saas-products" },
  { icon: "📊", title: "AI Data & Intelligence", desc: "The data intelligence layer powering smarter decisions across every Avatar product and customer touchpoint.", href: "/ai-data-intelligence" },
];

export default function AISolutionsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] font-sans">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <span>›</span>
          <a href="/solutions" className="text-blue-600 hover:underline">Solutions</a>
          <span>›</span>
          <span className="text-[#0f1f3d] font-medium">AI Solutions</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3260] to-[#0d3b7a] px-10 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,184,148,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              🤖 Enterprise AI Suite
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              AI Solutions for<br /><span className="text-teal-300">Modern Business</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              From intelligent chatbots to end-to-end workflow automation — Avatar's AI Solutions help businesses cut costs, accelerate growth, and deliver superior customer experiences.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#" className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 no-underline">Get Started Free →</a>
              <a href="#" className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all no-underline">▶ Watch Demo</a>
            </div>
          </div>
          <div className="bg-white/10 border border-white/15 backdrop-blur-sm rounded-2xl p-8">
            <div className="grid grid-cols-2 gap-7">
              {heroStats.map((s) => (
                <div key={s.label} className="text-center">
                  <div className="text-3xl font-bold text-teal-300">{s.value}</div>
                  <div className="text-xs text-white/55 mt-1.5 leading-snug">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Capabilities chips */}
      <div className="bg-white border-b border-gray-200 px-10 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mr-1">Capabilities</span>
          {capabilities.map((c) => (
            <span key={c} className="bg-indigo-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-full">{c}</span>
          ))}
        </div>
      </div>

      {/* Main content + Sidebar */}
      <div className="max-w-6xl mx-auto px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_320px] gap-10 items-start">
        <div>
          {/* Overview */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Overview</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-4">What is Avatar AI Solutions?</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-10">
            Avatar AI Solutions is a comprehensive suite of intelligent tools built to automate, optimize, and scale every facet of your business operations. Whether you're a startup deploying your first chatbot or an enterprise re-engineering entire workflows, Avatar provides the infrastructure, intelligence, and integrations to make it happen — fast.
          </p>

          {/* Feature grid */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Core Features</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">Everything Your Business Needs</h2>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl mb-3">{f.icon}</div>
                <h4 className="font-bold text-sm text-[#0f1f3d] mb-1.5">{f.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Solutions deep-dive */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Core Solutions</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">Built for Every Business Function</h2>
          <div className="space-y-4 mb-10">
            {solutionDetails.map((s) => (
              <div key={s.title} className="bg-white border border-gray-200 rounded-xl p-6 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl flex-shrink-0">{s.icon}</div>
                  <div className="flex-1">
                    <p className="text-xs font-semibold text-blue-600 mb-1">{s.label}</p>
                    <h4 className="font-bold text-[#0f1f3d] mb-2">{s.title}</h4>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{s.desc}</p>
                    <div className="flex flex-wrap gap-1.5 mb-3">
                      {s.tags.map((t) => (
                        <span key={t} className="bg-indigo-50 text-blue-600 border border-blue-100 text-xs font-semibold px-2.5 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                    <div className="text-xs text-teal-700 font-semibold bg-teal-50 border border-teal-100 inline-block px-3 py-1 rounded-full">📊 {s.stat}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Use Cases */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Industry Use Cases</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">Who Uses Avatar AI Solutions?</h2>
          <div className="space-y-3 mb-10">
            {useCases.map((u) => (
              <div key={u.num} className="bg-white border-l-4 border-blue-600 border-y border-r border-gray-200 rounded-r-xl p-5 flex gap-4 items-start">
                <div className="text-2xl font-bold text-blue-200 flex-shrink-0">{u.num}</div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f1f3d] mb-1">{u.title}</h4>
                  <p className="text-sm text-slate-600">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside className="space-y-5 lg:sticky lg:top-20">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] px-6 py-5 text-white">
              <h3 className="font-bold text-base mb-1">Request a Free Demo</h3>
              <p className="text-white/65 text-sm">See Avatar AI Solutions live — tailored to your industry.</p>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[["Implementation time", "2–4 weeks"], ["Trial period", "14 days free"], ["Integrations", "150+ platforms"], ["Support", "24/7 included"]].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-500">{label}</span>
                  <span className={`font-semibold ${val.includes("free") || val.includes("24/7") ? "text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full" : "text-[#0f1f3d]"}`}>{val}</span>
                </div>
              ))}
              <a href="#" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center py-3.5 rounded-xl transition-colors mt-2 no-underline">Request a Demo →</a>
              <a href="#" className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold text-center py-3 rounded-xl transition-colors no-underline">Talk to Sales</a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Trusted By</p>
            <p className="text-sm text-gray-500 mb-3">Businesses across India, UAE, and Southeast Asia use Avatar AI Solutions to transform operations.</p>
            <div className="flex flex-wrap gap-2">
              {["Startups", "Agencies", "E-commerce", "B2B SaaS", "Enterprise", "Healthcare"].map((t) => (
                <span key={t} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">{t}</span>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-1.5">ROI Calculator</h3>
            <p className="text-white/80 text-sm mb-3">Average Avatar customer saves 40+ hours/week. See what that means for your business.</p>
            <a href="#" className="block w-full bg-white text-blue-700 font-semibold text-sm text-center py-2.5 rounded-xl hover:bg-blue-50 transition-colors no-underline">Calculate Your ROI →</a>
          </div>
        </aside>
      </div>

      {/* Results strip */}
      <section className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3260] px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Results That Speak for Themselves</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[["80%", "Manual task reduction"], ["3×", "Faster response time"], ["500+", "Businesses powered"], ["99.9%", "Platform uptime"]].map(([val, lbl]) => (
              <div key={lbl} className="bg-white/10 border border-white/15 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-300">{val}</div>
                <div className="text-xs text-white/55 mt-2">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Related sections */}
      <section className="bg-white border-t border-gray-200 px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-[#0f1f3d] mb-6">Explore More Avatar Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {relatedDivisions.map((r) => (
              <a key={r.title} href={r.href} className="border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 hover:-translate-y-0.5 transition-all no-underline block">
                <div className="w-11 h-11 bg-indigo-50 rounded-xl flex items-center justify-center text-2xl mb-3">{r.icon}</div>
                <h4 className="font-bold text-sm text-[#0f1f3d] mb-1.5">{r.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed mb-3">{r.desc}</p>
                <span className="text-xs text-blue-600 font-semibold">Explore {r.title} →</span>
              </a>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#f7f9fc] border-t border-gray-200 px-10 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#0f1f3d] mb-3">Ready to Transform Your Business with AI?</h2>
        <p className="text-gray-500 mb-7 max-w-lg mx-auto">Automate operations, delight customers, and scale intelligently — Avatar AI Solutions is ready to deploy.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="#" className="bg-blue-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors no-underline">Request a Solution Demo →</a>
          <a href="#" className="border border-[#0f1f3d] text-[#0f1f3d] hover:bg-indigo-50 px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors no-underline">Talk to Sales</a>
        </div>
      </section>

    </div>
  );
}
