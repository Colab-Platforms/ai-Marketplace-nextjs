
const heroStats = [
  { value: "7+", label: "Signal categories tracked" },
  { value: "Real-time", label: "Intelligence delivery" },
  { value: "100%", label: "Privacy-safe by design" },
  { value: "∞", label: "Smarter as ecosystem grows" },
];

const capabilities = ["Workflow Intelligence", "Behavioral Signals", "Industry Benchmarks", "Predictive Models", "Privacy-First", "Real-Time Alerts"];

const features = [
  { icon: "🔄", title: "Workflow Intelligence", desc: "Tracks completion rates, bottlenecks, and automation ROI across every process — so you know which workflows are working and which need fixing." },
  { icon: "👤", title: "Behavioral Analytics", desc: "Understands how users navigate your product — session paths, feature adoption, churn indicators — to power UX improvements and retention models." },
  { icon: "📊", title: "Industry Benchmarking", desc: "Compare your performance metrics against anonymized industry peers in your vertical. Know where you stand and where to focus next." },
  { icon: "🤖", title: "Model Training Feed", desc: "Aggregated signals continuously retrain Avatar's AI models, making every product — chatbots, scoring, forecasting — smarter over time." },
  { icon: "🔒", title: "Privacy-First Architecture", desc: "All intelligence is derived from aggregated, anonymized data. No raw personal data is ever shared across tenants — compliance built in." },
  { icon: "⚡", title: "Real-Time Alerting", desc: "Proactive anomaly detection and smart alerts surface issues the moment they emerge — not in your next weekly report." },
];

const signals = [
  { type: "Workflow Completion Rate", source: "Automation Engine", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "Bottleneck detection, SLA prediction" },
  { type: "User Interaction Paths", source: "Product Analytics", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "UX optimization, churn prediction" },
  { type: "Industry Benchmark Scores", source: "Aggregated Tenants", freq: "Weekly", freqStyle: "bg-blue-100 text-blue-700 border-blue-200", usedFor: "Competitive intelligence, goal setting" },
  { type: "Support Ticket Patterns", source: "Support AI Module", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "Deflection model training, routing AI" },
  { type: "Sales Funnel Signals", source: "CRM Integrations", freq: "Hourly", freqStyle: "bg-blue-100 text-blue-700 border-blue-200", usedFor: "Lead scoring, revenue forecasting" },
  { type: "Model Performance Metrics", source: "AI Runtime Layer", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "Continuous model improvement" },
  { type: "Market & Industry News", source: "External Data Partners", freq: "Daily", freqStyle: "bg-orange-100 text-orange-700 border-orange-200", usedFor: "Strategic intelligence briefings" },
];

const useCases = [
  { num: "01", title: "Smarter Automation Decisions", desc: "Workflow intelligence identifies which automations deliver the highest ROI — so your team prioritizes the right projects first, every time." },
  { num: "02", title: "Proactive Customer Retention", desc: "Behavioral signals flag at-risk customers days before they churn, giving your team a window to intervene with personalized outreach." },
  { num: "03", title: "Competitive Benchmarking", desc: "Understand how your response times, resolution rates, and conversion metrics compare to anonymized industry peers in your vertical." },
  { num: "04", title: "Strategic Product Intelligence", desc: "Product teams use aggregated usage patterns to prioritize features, reduce friction points, and build what users actually need next." },
];

const steps = [
  { n: 1, title: "Signal Ingestion", desc: "Data flows in from every Avatar product — automations, chatbots, CRM integrations, and external partners — into a unified event stream." },
  { n: 2, title: "Anonymization & Aggregation", desc: "All signals are stripped of identifiable information and aggregated at the tenant and industry level — privacy-safe by design." },
  { n: 3, title: "Model Training & Enrichment", desc: "Aggregated signals continuously retrain Avatar's predictive models, improving accuracy for every tenant as the ecosystem grows." },
  { n: 4, title: "Intelligence Delivery", desc: "Insights are surfaced back to businesses via dashboards, automated alerts, AI recommendations, and API endpoints — in real time." },
];

const related = [
  { icon: "⚡", title: "AI Solutions", desc: "Automation, chatbots, workflow AI, and sales & support systems — the operational layer built on top of this intelligence.", href: "/solutions" },
  { icon: "🎓", title: "AI Learning Platform", desc: "Upskill teams with structured AI courses and certifications, informed by real-world workflow intelligence from the ecosystem.", href: "/learning" },
  { icon: "🏢", title: "Enterprise Infrastructure", desc: "Private deployments, custom LLMs, and API-first infrastructure — powered by the same data intelligence layer underneath.", href: "#" },
];

export default function AIDataIntelligencePage() {
  return (
    <div className="min-h-screen bg-[#f7f9fc] font-sans">

      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200 px-10 py-3">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-sm text-gray-500">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <span>›</span>
          <a href="/#divisions" className="text-blue-600 hover:underline">Divisions</a>
          <span>›</span>
          <span className="text-[#0f1f3d] font-medium">AI Data & Intelligence</span>
        </div>
      </div>

      {/* Hero */}
      <section className="bg-gradient-to-br from-[#0f1f3d] via-[#1a3260] to-[#0d3b7a] px-10 py-16 text-white relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(0,184,148,0.12) 0%, transparent 70%)" }} />
        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-14 items-center relative">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-teal-500/20 border border-teal-400/30 text-teal-300 text-xs font-semibold uppercase tracking-widest px-3 py-1.5 rounded-full mb-5">
              📊 The Intelligence Layer
            </div>
            <h1 className="text-4xl md:text-5xl font-bold leading-tight mb-5">
              AI Data &<br /><span className="text-teal-300">Intelligence</span>
            </h1>
            <p className="text-white/70 text-base leading-relaxed mb-8 max-w-md">
              The data layer powering Avatar's ecosystem moat. Workflow patterns, user behavior, and industry intelligence — aggregated, anonymized, and delivered as actionable insights in real time.
            </p>
            <div className="flex gap-3 flex-wrap">
              <a href="#briefing" className="bg-teal-500 hover:bg-teal-400 text-white px-6 py-3 rounded-lg text-sm font-semibold transition-all hover:-translate-y-0.5 no-underline">Request a Briefing →</a>
              <a href="#architecture" className="border border-white/30 hover:border-white hover:bg-white/10 text-white px-6 py-3 rounded-lg text-sm font-medium transition-all no-underline">See Architecture</a>
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

      {/* Main + Sidebar */}
      <div className="max-w-6xl mx-auto px-10 py-12 grid grid-cols-1 lg:grid-cols-[1fr_300px] gap-10 items-start">
        <div>
          {/* Overview */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Overview</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-4">The Intelligence Layer That Powers It All</h2>
          <p className="text-sm text-slate-600 leading-relaxed mb-10">
            Avatar's AI Data & Intelligence division is the invisible backbone of the entire ecosystem. Every interaction across our products — automations executed, support tickets resolved, leads qualified, content generated — feeds a unified intelligence layer that makes the next action smarter than the last. It's not just analytics. It's a self-improving system.
          </p>

          {/* Feature grid */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Core Capabilities</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">What the Intelligence Layer Does</h2>
          <div className="grid grid-cols-2 gap-4 mb-10">
            {features.map((f) => (
              <div key={f.title} className="bg-white border border-gray-200 rounded-xl p-5 hover:shadow-md hover:border-blue-200 transition-all">
                <div className="w-10 h-10 bg-indigo-50 rounded-xl flex items-center justify-center text-xl mb-3">{f.icon}</div>
                <h4 className="font-bold text-sm text-[#0f1f3d] mb-1.5">{f.title}</h4>
                <p className="text-xs text-gray-500 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>

          {/* Signal catalogue table */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Data Signal Catalogue</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">What We Capture & Why It Matters</h2>
          <div className="rounded-xl border border-gray-200 overflow-hidden mb-10">
            <table className="w-full text-sm">
              <thead>
                <tr className="bg-[#0f1f3d] text-white text-xs">
                  <th className="text-left px-4 py-3 font-semibold">Signal Type</th>
                  <th className="text-left px-4 py-3 font-semibold">Source</th>
                  <th className="text-left px-4 py-3 font-semibold">Frequency</th>
                  <th className="text-left px-4 py-3 font-semibold">Used For</th>
                </tr>
              </thead>
              <tbody>
                {signals.map((s, i) => (
                  <tr key={s.type} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                    <td className="px-4 py-3 font-semibold text-[#0f1f3d]">{s.type}</td>
                    <td className="px-4 py-3 text-slate-600">{s.source}</td>
                    <td className="px-4 py-3">
                      <span className={`text-xs font-semibold px-2.5 py-0.5 rounded-full border ${s.freqStyle}`}>{s.freq}</span>
                    </td>
                    <td className="px-4 py-3 text-slate-600 text-xs">{s.usedFor}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Use Cases */}
          <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Applications</p>
          <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">How Businesses Use It</h2>
          <div className="space-y-3 mb-10">
            {useCases.map((u, i) => (
              <div key={u.num} className={`bg-white border-l-4 ${i % 2 === 0 ? "border-blue-600" : "border-teal-500"} border-y border-r border-gray-200 rounded-r-xl p-5 flex gap-4 items-start`}>
                <div className="text-2xl font-bold text-blue-200 flex-shrink-0">{u.num}</div>
                <div>
                  <h4 className="font-bold text-sm text-[#0f1f3d] mb-1">{u.title}</h4>
                  <p className="text-sm text-slate-600">{u.desc}</p>
                </div>
              </div>
            ))}
          </div>

          {/* Architecture steps */}
          <div id="architecture">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-2">Architecture</p>
            <h2 className="text-2xl font-bold text-[#0f1f3d] mb-5">How the Intelligence Layer Works</h2>
            <div className="space-y-4">
              {steps.map((s) => (
                <div key={s.n} className="flex gap-4 items-start">
                  <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-600 to-teal-400 text-white flex items-center justify-center font-bold text-sm flex-shrink-0">{s.n}</div>
                  <div className="bg-white border border-gray-200 rounded-xl p-4 flex-1">
                    <h4 className="font-bold text-sm text-[#0f1f3d] mb-1">{s.title}</h4>
                    <p className="text-sm text-slate-600">{s.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <aside id="briefing" className="space-y-5 lg:sticky lg:top-20">
          <div className="bg-white border border-gray-200 rounded-2xl overflow-hidden shadow-sm">
            <div className="bg-gradient-to-br from-[#0f1f3d] to-[#1a3260] px-6 py-5 text-white">
              <h3 className="font-bold text-base mb-1">Request an Intelligence Briefing</h3>
              <p className="text-white/65 text-sm">See what signals your business is generating — and how to act on them.</p>
            </div>
            <div className="px-6 py-5 space-y-3">
              {[["Signal coverage", "7+ categories"], ["Data freshness", "Real-time"], ["Privacy standard", "GDPR-ready"], ["API access", "Available"]].map(([label, val]) => (
                <div key={label} className="flex justify-between items-center text-sm border-b border-gray-100 pb-3 last:border-0 last:pb-0">
                  <span className="text-gray-500">{label}</span>
                  <span className="font-semibold text-[#0f1f3d]">{val}</span>
                </div>
              ))}
              <a href="#" className="block w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-semibold text-center py-3.5 rounded-xl transition-colors no-underline mt-2">Request a Briefing →</a>
              <a href="#" className="block w-full border border-blue-600 text-blue-600 hover:bg-blue-50 text-sm font-semibold text-center py-3 rounded-xl transition-colors no-underline">Talk to Sales</a>
            </div>
          </div>

          <div className="bg-white border border-gray-200 rounded-2xl p-5">
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Data Compliance</p>
            <div className="space-y-2.5">
              {[["GDPR Compliant", true], ["SOC 2 Type II", true], ["Zero cross-tenant sharing", true], ["Anonymization on ingest", true]].map(([label, ok]) => (
                <div key={label as string} className="flex items-center gap-2.5 text-sm">
                  <span className="text-emerald-500 font-bold">✓</span>
                  <span className="text-[#0f1f3d] font-medium">{label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-gradient-to-br from-teal-500 to-blue-600 rounded-2xl p-5 text-white">
            <h3 className="font-bold mb-1.5">Ecosystem Intelligence</h3>
            <p className="text-white/80 text-sm mb-3">Every new tenant makes Avatar's models smarter — benefiting all customers in the network.</p>
            <div className="flex items-center gap-2 text-sm text-white/90 font-medium">
              <span>📈</span> Compounding intelligence effect
            </div>
          </div>
        </aside>
      </div>

      {/* Related */}
      <section className="bg-white border-t border-gray-200 px-10 py-12">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-xl font-bold text-[#0f1f3d] mb-6">Explore More Avatar Divisions</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {related.map((r) => (
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
        <h2 className="text-3xl font-bold text-[#0f1f3d] mb-3">Ready to Unlock Your Data Intelligence?</h2>
        <p className="text-gray-500 mb-7 max-w-lg mx-auto">Request a briefing and see what signals your business is generating — and how to act on them.</p>
        <div className="flex gap-3 justify-center flex-wrap">
          <a href="#" className="bg-blue-600 text-white px-7 py-3.5 rounded-xl text-sm font-semibold hover:bg-blue-700 transition-colors no-underline">Request a Briefing →</a>
          <a href="#" className="border border-[#0f1f3d] text-[#0f1f3d] hover:bg-indigo-50 px-7 py-3.5 rounded-xl text-sm font-semibold transition-colors no-underline">Talk to Sales</a>
        </div>
      </section>

    </div>
  );
}
