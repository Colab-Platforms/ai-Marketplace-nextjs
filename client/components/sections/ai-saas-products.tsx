
const heroStats = [
  { value: "6", label: "Integrated SaaS products" },
  { value: "100+", label: "Platform integrations" },
  { value: "14-day", label: "Free trial, no card needed" },
  { value: "99.99%", label: "Enterprise SLA uptime" },
];

const products = [
  {
    icon: "🧠", iconBg: "bg-blue-50", badge: "Live", badgeStyle: "bg-emerald-100 text-emerald-700",
    title: "Avatar CRM — AI Customer Relationship Manager",
    desc: "A fully AI-native CRM that automatically scores leads, predicts deal outcomes, and surfaces next-best actions for every contact. Built-in email tracking, pipeline management, and conversation intelligence.",
    tags: ["Lead Scoring", "Pipeline AI", "Email Intelligence", "Deal Prediction"],
  },
  {
    icon: "📣", iconBg: "bg-purple-50", badge: "Live", badgeStyle: "bg-emerald-100 text-emerald-700",
    title: "Avatar Marketing — AI Marketing Platform",
    desc: "AI-generated campaigns, audience segmentation, A/B testing, and automated email/SMS/WhatsApp sequences. Connects to your CRM for closed-loop attribution and ROI tracking.",
    tags: ["Campaign AI", "Audience Segmentation", "Multi-Channel", "Attribution"],
  },
  {
    icon: "✍️", iconBg: "bg-orange-50", badge: "Live", badgeStyle: "bg-emerald-100 text-emerald-700",
    title: "Avatar Content — AI Content Engine",
    desc: "Generate blogs, social posts, ad copy, product descriptions, and sales emails at scale. Fine-tune on your brand voice and publish directly to WordPress, Shopify, LinkedIn, and more.",
    tags: ["Brand Voice AI", "SEO Optimized", "Multi-Format", "Auto-Publish"],
  },
  {
    icon: "📊", iconBg: "bg-teal-50", badge: "Live", badgeStyle: "bg-emerald-100 text-emerald-700",
    title: "Avatar Analytics — AI Business Intelligence",
    desc: "Natural-language business intelligence. Ask questions in plain English and get visualized answers instantly. Auto-generated reports, anomaly detection, and predictive forecasting baked in.",
    tags: ["NL Queries", "Anomaly Detection", "Auto-Reports", "Predictive"],
  },
  {
    icon: "🤖", iconBg: "bg-red-50", badge: "Beta", badgeStyle: "bg-amber-100 text-amber-700",
    title: "Avatar Assistant — AI Assistant Platform",
    desc: "Build and deploy custom AI assistants trained on your knowledge base, product docs, or internal SOPs. Embed on your website, app, or internal portal. No-code setup. Supports text, voice, and WhatsApp channels.",
    tags: ["Custom Knowledge Base", "No-Code Builder", "Multi-Channel", "Voice Support"],
  },
  {
    icon: "⚙️", iconBg: "bg-indigo-50", badge: "Live", badgeStyle: "bg-emerald-100 text-emerald-700",
    title: "Avatar Flow — AI Workflow Builder",
    desc: "Design end-to-end business workflows with a drag-and-drop canvas. Connect triggers, conditions, AI actions, and third-party APIs without writing code. Deploy automations that run 24/7 and report back in real time.",
    tags: ["Visual Canvas", "No-Code Automation", "API Connectors", "Real-Time Logs"],
  },
];

const compareFeatures = [
  { feature: "All 6 SaaS Products", starter: true, growth: true, enterprise: true },
  { feature: "AI CRM — up to 5,000 contacts", starter: true, growth: true, enterprise: true },
  { feature: "Unlimited content generation", starter: false, growth: true, enterprise: true },
  { feature: "Custom AI Assistant (branded)", starter: false, growth: true, enterprise: true },
  { feature: "Advanced Analytics & Reporting", starter: false, growth: true, enterprise: true },
  { feature: "Dedicated Account Manager", starter: false, growth: false, enterprise: true },
  { feature: "Private Cloud / On-Premise Deploy", starter: false, growth: false, enterprise: true },
  { feature: "SLA Guarantee", starter: "99.5%", growth: "99.9%", enterprise: "99.99%" },
];

const useCases = [
  { num: "01", title: "Growth-Stage Startups", desc: "Run your entire go-to-market — CRM, content, campaigns, and analytics — from one platform without hiring 5 separate specialists." },
  { num: "02", title: "Mid-Size B2B Companies", desc: "Replace a patchwork of tools like HubSpot, Mailchimp, Notion AI, and Zapier with a single, unified, AI-native platform at a fraction of the cost." },
  { num: "03", title: "Agency & Service Businesses", desc: "Deliver client work faster using the Content Engine and Analytics tools, while managing all client relationships through the AI CRM." },
  { num: "04", title: "Enterprise Teams", desc: "Deploy the full suite on a private cloud, connect internal data sources, and roll out custom AI Assistants to every department — with central governance." },
];

const steps = [
  { n: 1, title: "Create Your Avatar Account", desc: "One sign-up unlocks all six products. No credit card required — your 14-day trial starts immediately with full feature access." },
  { n: 2, title: "Connect Your Data Sources", desc: "Link your existing CRM, email, website, social accounts, and databases using our one-click integration library." },
  { n: 3, title: "Activate the Products You Need", desc: "Start with one product or all six. Each one has a guided onboarding flow that gets you to your first result in under an hour." },
  { n: 4, title: "Scale Across Your Team", desc: "Invite teammates, set permissions, and watch the shared data layer make every product smarter as your organization grows." },
];

const productStatus = [
  { name: "Avatar CRM", status: "Live", live: true },
  { name: "Avatar Marketing", status: "Live", live: true },
  { name: "Avatar Content", status: "Live", live: true },
  { name: "Avatar Analytics", status: "Live", live: true },
  { name: "Avatar Assistant", status: "Beta", live: false },
  { name: "Avatar Flow", status: "Live", live: true },
];

function CheckCell({ val }: { val: boolean | string }) {
  if (typeof val === "string") return <td className="px-4 py-3 text-center text-sm font-semibold text-[#0f1f3d]">{val}</td>;
  return (
    <td className="px-4 py-3 text-center">
      {val
        ? <span className="text-emerald-600 font-bold text-base">✓</span>
        : <span className="text-gray-300 font-bold">—</span>}
    </td>
  );
}

export default function AISaaSProductsPage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] font-sans">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <span>›</span>
          <a href="/solutions" className="text-blue-600 hover:underline">Solutions</a>
          <span>›</span>
          <span className="text-[#0f1f3d] font-medium">AI SaaS Products</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3260] to-[#0d3b7a] px-10 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,184,148,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              📦 Six Products. One Platform.
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              AI SaaS Products<br /><span className="text-teal-300">for Every Team</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              Replace your entire software stack. AI CRM, marketing platform, content engine, analytics, assistant builder, and workflow automation — all under one roof.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#trial" className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 no-underline">Start Free Trial →</a>
              <a href="#products" className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all no-underline">View All Products</a>
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

      {/* Chips */}
      <div className="bg-white border-b border-gray-200 px-10 py-4">
        <div className="max-w-6xl mx-auto flex items-center gap-2.5 flex-wrap">
          <span className="text-xs font-semibold text-gray-400 uppercase tracking-widest mr-1">Products</span>
          {["AI CRM", "AI Marketing", "AI Content", "AI Analytics", "AI Assistant", "AI Workflow"].map((c) => (
            <span key={c} className="bg-indigo-50 text-blue-700 border border-blue-100 text-xs font-semibold px-3 py-1 rounded-full">{c}</span>
          ))}
        </div>
      </div>

      {/* Main + Sidebar */}
      <div id="products" className="max-w-6xl mx-auto px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
        <div>
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Product Suite</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">Six AI-Native Products in One Platform</h2>

          <div className="space-y-4 mb-10">
            {products.map((p) => (
              <div key={p.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="flex items-start gap-4">
                  <div className={`w-11 h-11 ${p.iconBg} rounded-xl flex items-center justify-center text-2xl flex-shrink-0`}>{p.icon}</div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-3 mb-1.5">
                      <h4 className="font-bold text-[#0f1f3d] text-sm leading-snug">{p.title}</h4>
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full flex-shrink-0 ${p.badgeStyle}`}>
                        {p.badge === "Live" ? "● " : "◐ "}{p.badge}
                      </span>
                    </div>
                    <p className="text-sm text-slate-600 leading-relaxed mb-3">{p.desc}</p>
                    <div className="flex flex-wrap gap-1.5">
                      {p.tags.map((t) => (
                        <span key={t} className="bg-slate-100 text-slate-600 text-xs font-medium px-2.5 py-0.5 rounded-full">{t}</span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Comparison Table */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Feature Comparison</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">What's Included in Each Plan</h2>
          <div className="rounded-xl border border-gray-200 overflow-hidden mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f1f3d] text-white text-xs">
                  <th className="text-left px-4 py-3 font-semibold">Feature</th>
                  <th className="text-center px-4 py-3 font-semibold">Starter</th>
                  <th className="text-center px-4 py-3 font-semibold">Growth</th>
                  <th className="text-center px-4 py-3 font-semibold">Enterprise</th>
                </tr>
              </thead>
              <tbody>
                {compareFeatures.map((row, i) => (
                  <tr key={row.feature} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                    <td className="px-4 py-3 font-medium text-[#0f1f3d]">{row.feature}</td>
                    <CheckCell val={row.starter} />
                    <CheckCell val={row.growth} />
                    <CheckCell val={row.enterprise} />
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Use Cases */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Use Cases</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">Who Uses the Avatar SaaS Suite?</h2>
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

          {/* Getting Started Steps */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Getting Started</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">From Sign-Up to Live in 4 Steps</h2>
          <div className="space-y-4">
            {steps.map((s) => (
              <div key={s.n} className="flex gap-4 items-start">
                <div className="w-9 h-9 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{s.n}</div>
                <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1">
                  <h4 className="font-bold text-sm text-[#0f1f3d] mb-1">{s.title}</h4>
                  <p className="text-sm text-slate-600">{s.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Sidebar */}
        <aside id="trial" className="space-y-5 lg:sticky lg:top-20">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] px-6 py-5 text-white">
              <h3 className="font-bold text-base mb-1">Start Your Free Trial</h3>
              <p className="text-white/65 text-sm">14 days, all 6 products, full access — no credit card needed.</p>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[["Products included", "All 6"], ["Trial duration", "14 days free"], ["Setup time", "Under 1 hour"], ["Integrations", "100+ platforms"], ["Support", "24/7 Included"]].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-500">{label}</span>
                  <span className={`font-semibold ${(val as string).includes("free") || (val as string).includes("24/7") ? "text-emerald-700 bg-emerald-50 border border-emerald-200 text-xs px-2.5 py-0.5 rounded-full" : "text-[#0f1f3d]"}`}>{val}</span>
                </div>
              ))}
              <a href="#" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center py-3.5 rounded-xl transition-colors no-underline mt-2">Start Free Trial →</a>
              <a href="#" className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold text-center py-3 rounded-xl transition-colors no-underline">Book a Live Demo</a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Product Status</p>
            <div className="space-y-2.5">
              {productStatus.map((p) => (
                <div key={p.name} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-[#0f1f3d]">{p.name}</span>
                  <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${p.live ? "bg-emerald-100 text-emerald-700" : "bg-amber-100 text-amber-700"}`}>
                    {p.live ? "● " : "◐ "}{p.status}
                  </span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Trusted By</p>
            <p className="text-sm text-gray-500 mb-3">Teams across India, UAE, and Southeast Asia use Avatar SaaS to run their entire business on one platform.</p>
            <div className="flex flex-wrap gap-2">
              {["Startups", "Agencies", "B2B SaaS", "Enterprise"].map((t) => (
                <span key={t} className="bg-slate-100 text-slate-600 text-xs font-semibold px-2.5 py-1 rounded-md">{t}</span>
              ))}
            </div>
          </div>
        </aside>
      </div>

      {/* Results */}
      <section className="bg-gradient-to-r from-[#0f1f3d] to-[#1a3260] px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Built to Deliver Results From Day One</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-5">
            {[["6", "AI-native SaaS products"], ["100+", "Platform integrations"], ["14 days", "Full-access free trial"], ["99.99%", "Enterprise SLA"]].map(([val, lbl]) => (
              <div key={lbl} className="bg-white/10 border border-white/15 rounded-xl p-6 text-center">
                <div className="text-3xl font-bold text-teal-300">{val}</div>
                <div className="text-xs text-white/55 mt-2">{lbl}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer CTA */}
      <section className="bg-[#f7f9fc] border-t border-gray-200 px-10 py-16 text-center">
        <h2 className="text-3xl font-bold text-[#0f1f3d] mb-3">Ready to Replace Your Entire Software Stack?</h2>
        <p className="text-gray-500 mb-7 max-w-lg mx-auto">Start your free 14-day trial — all six products, full access, no credit card needed.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="#" className="bg-blue-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors no-underline">Start Free Trial →</a>
          <a href="#" className="border border-[#0f1f3d] text-[#0f1f3d] hover:bg-indigo-50 px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors no-underline">Talk to Sales</a>
        </div>
      </section>

    </div>
  );
}
