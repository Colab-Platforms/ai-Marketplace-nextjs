const heroStats = [
  { value: "7+", label: "Signal categories tracked" },
  { value: "Real-time", label: "Intelligence delivery" },
  { value: "100%", label: "Privacy-safe by design" },
  { value: "∞", label: "Smarter as ecosystem grows" },
];

const capabilities = ["Workflow Intelligence", "Behavioral Signals", "Industry Benchmarks", "Predictive Models", "Privacy-First", "Real-Time Alerts"];

const features = [
  { title: "Workflow Intelligence", desc: "Tracks completion rates, bottlenecks, and automation ROI across every process so you can prioritize the right improvements." },
  { title: "Behavioral Analytics", desc: "Understands how users navigate your product to power UX improvements and retention models." },
  { title: "Industry Benchmarking", desc: "Compare your performance metrics against anonymized peers in your vertical." },
  { title: "Model Training Feed", desc: "Aggregated signals continuously retrain Avatar's AI models, making every product smarter over time." },
  { title: "Privacy-First Architecture", desc: "All intelligence is derived from aggregated and anonymized data, without sharing raw personal information." },
  { title: "Real-Time Alerting", desc: "Proactive anomaly detection surfaces issues the moment they emerge." },
];

const signals = [
  { type: "Workflow Completion Rate", source: "Automation Engine", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "Bottleneck detection, SLA prediction" },
  { type: "User Interaction Paths", source: "Product Analytics", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "UX optimization, churn prediction" },
  { type: "Industry Benchmark Scores", source: "Aggregated Tenants", freq: "Weekly", freqStyle: "bg-sky-100 text-sky-700 border-sky-200", usedFor: "Competitive intelligence, goal setting" },
  { type: "Support Ticket Patterns", source: "Support AI Module", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "Routing AI and issue classification" },
  { type: "Sales Funnel Signals", source: "CRM Integrations", freq: "Hourly", freqStyle: "bg-sky-100 text-sky-700 border-sky-200", usedFor: "Lead scoring, revenue forecasting" },
  { type: "Model Performance Metrics", source: "AI Runtime Layer", freq: "Real-time", freqStyle: "bg-emerald-100 text-emerald-700 border-emerald-200", usedFor: "Continuous model improvement" },
  { type: "Market & Industry News", source: "External Partners", freq: "Daily", freqStyle: "bg-amber-100 text-amber-700 border-amber-200", usedFor: "Strategic intelligence briefings" },
];

const useCases = [
  { num: "01", title: "Smarter Automation Decisions", desc: "Workflow intelligence identifies which automations deliver the highest ROI so your team prioritizes the right projects first." },
  { num: "02", title: "Proactive Customer Retention", desc: "Behavioral signals flag at-risk customers days before they churn, giving your team time to intervene." },
  { num: "03", title: "Competitive Benchmarking", desc: "Understand how your response times and conversion metrics compare with anonymized peers." },
  { num: "04", title: "Strategic Product Intelligence", desc: "Product teams use aggregated usage patterns to prioritize features and reduce friction." },
];

const steps = [
  { n: 1, title: "Signal Ingestion", desc: "Data flows in from automations, chatbots, CRM integrations, and external partners into a unified event stream." },
  { n: 2, title: "Anonymization & Aggregation", desc: "Signals are stripped of identifiable information and aggregated at tenant and industry level." },
  { n: 3, title: "Model Training & Enrichment", desc: "Continuous retraining improves accuracy for every tenant as the ecosystem grows." },
  { n: 4, title: "Intelligence Delivery", desc: "Insights are surfaced via dashboards, alerts, recommendations, and APIs in real time." },
];

const related = [
  { title: "AI Solutions", desc: "Automation, chatbots, workflow AI, and sales systems built on this intelligence layer.", href: "/solutions" },
  { title: "AI Learning Platform", desc: "Upskill teams with structured AI courses and certifications informed by real-world intelligence.", href: "/learning" },
  { title: "Enterprise Infrastructure", desc: "Private deployments, custom LLMs, and API-first infrastructure powered by the same data layer.", href: "#" },
];

export default function AIDataIntelligencePage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-white border-b border-slate-200 px-6 md:px-10 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <a href="/" className="text-slate-700 hover:text-slate-900 hover:underline">Home</a>
          <span>›</span>
          <a href="/#divisions" className="text-slate-700 hover:text-slate-900 hover:underline">Divisions</a>
          <span>›</span>
          <span className="font-medium text-slate-900">AI Data & Intelligence</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-slate-950 px-6 md:px-10 py-16 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950/90 to-transparent" />
        <div className="max-w-6xl mx-auto relative grid gap-10 lg:grid-cols-[1.35fr_0.65fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Premium intelligence layer</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-5">AI Data & Intelligence for strategic growth</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 mb-8">
              Build a premium data foundation that turns every signal into a decision advantage. Avatar's intelligence layer connects product, customer, and market data into one trusted view.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#briefing" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">Request a briefing</a>
              <a href="#architecture" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">See architecture</a>
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
        <main>
          <div className="mb-12">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Overview</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">A premium intelligence foundation for every business.</h2>
            <p className="text-sm leading-7 text-slate-600 max-w-3xl">Avatar's intelligence layer uses workflow signals, behavioral data, and industry benchmarks to deliver actionable recommendations, protect privacy, and drive faster outcomes.</p>
          </div>

          <div className="grid gap-5 md:grid-cols-2 mb-12">
            {features.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                <div className="mb-4 w-12 rounded-2xl bg-slate-100" />
                <h3 className="text-lg font-semibold text-slate-900 mb-2">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-12" id="briefing">
            <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-2">Data signal catalogue</p>
                <h2 className="text-3xl font-semibold text-slate-950">Signals that fuel smarter decisions.</h2>
              </div>
            </div>
            <div className="overflow-hidden rounded-[1.75rem] border border-slate-200">
              <table className="min-w-full text-sm text-left">
                <thead className="bg-slate-900 text-slate-100 text-xs uppercase tracking-[0.2em]">
                  <tr>
                    <th className="px-5 py-4">Signal Type</th>
                    <th className="px-5 py-4">Source</th>
                    <th className="px-5 py-4">Frequency</th>
                    <th className="px-5 py-4">Used For</th>
                  </tr>
                </thead>
                <tbody>
                  {signals.map((signal, index) => (
                    <tr key={signal.type} className={index % 2 === 0 ? 'bg-white' : 'bg-slate-50'}>
                      <td className="px-5 py-4 font-semibold text-slate-900">{signal.type}</td>
                      <td className="px-5 py-4 text-slate-600">{signal.source}</td>
                      <td className="px-5 py-4">
                        <span className={`inline-flex rounded-full border px-2.5 py-1 text-[11px] font-semibold ${signal.freqStyle}`}>{signal.freq}</span>
                      </td>
                      <td className="px-5 py-4 text-slate-600 text-xs">{signal.usedFor}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-14">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Applications</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-6">Built for modern teams and enterprise scale.</h2>
            <div className="space-y-4">
              {useCases.map((item) => (
                <div key={item.num} className="rounded-[1.75rem] border border-slate-300 bg-white p-6 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="mb-2 text-sm font-semibold uppercase tracking-[0.2em] text-slate-500">{item.num}</div>
                  <h3 className="text-xl font-semibold text-slate-950 mb-2">{item.title}</h3>
                  <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          <div className="mb-16" id="architecture">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Architecture</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-6">A premium flow from signals to action.</h2>
            <div className="space-y-4">
              {steps.map((step) => (
                <div key={step.n} className="flex gap-4 items-start rounded-[1.75rem] border border-slate-300 bg-white p-5 shadow-md hover:shadow-2xl transform hover:-translate-y-1 transition-all duration-300">
                  <div className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-900 text-white font-semibold">{step.n}</div>
                  <div>
                    <h3 className="text-lg font-semibold text-slate-950 mb-2">{step.title}</h3>
                    <p className="text-sm leading-6 text-slate-600">{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </main>
      </div>

      <section className="bg-slate-100 px-6 md:px-10 py-16">
        <div className="max-w-6xl mx-auto">
          <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
            <div className="mb-8 text-center">
              <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Explore more</p>
              <h2 className="text-3xl font-semibold text-slate-950">Explore other premium Avatar divisions</h2>
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {related.map((item) => (
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
