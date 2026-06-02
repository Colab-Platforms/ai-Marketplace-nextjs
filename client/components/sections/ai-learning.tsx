import Image from "next/image";

const stats = [
  { value: "12,000+", label: "Certified Graduates" },
  { value: "40+", label: "Programs & Courses" },
  { value: "98%", label: "Completion Rate" },
  { value: "15+", label: "Industry Partners" },
];

const programs = [
  { icon: "🏅", title: "AI Certifications", desc: "Industry-recognised credentials, self-paced" },
  { icon: "⚡", title: "Intensive Bootcamps", desc: "4–8 week cohorts with live mentors" },
  { icon: "🏢", title: "Enterprise Training", desc: "Custom programs for teams of 10–10,000" },
  { icon: "📅", title: "Workshops", desc: "Focused single-day & weekend sessions" },
  { icon: "🔬", title: "AI Labs", desc: "Hands-on project-based experimentation" },
  { icon: "🏛️", title: "AI University", desc: "Semester-style academic curriculum" },
];

const tracks = [
  { name: "AI Fundamentals", desc: "Core concepts & tools — no coding required", duration: "4 weeks", level: "Beginner", levelColor: "bg-emerald-100 text-emerald-700" },
  { name: "Prompt Engineering", desc: "Master LLMs and build AI workflows", duration: "3 weeks", level: "Intermediate", levelColor: "bg-blue-100 text-blue-700" },
  { name: "AI for Business", desc: "Strategy, ROI & automation for managers", duration: "5 weeks", level: "Intermediate", levelColor: "bg-blue-100 text-blue-700" },
  { name: "AI Automation Specialist", desc: "Build & deploy end-to-end AI agents", duration: "8 weeks", level: "Advanced", levelColor: "bg-violet-100 text-violet-700" },
  { name: "Enterprise AI Leadership", desc: "AI governance & org-wide transformation", duration: "Custom", level: "Enterprise", levelColor: "bg-orange-100 text-orange-700" },
];

const outcomes = [
  "Build and deploy AI chatbots and automation workflows for real business problems",
  "Write effective prompts that reliably produce high-quality AI outputs",
  "Identify and implement AI use cases that save time and reduce operational costs",
  "Earn a verifiable, industry-recognised AI certification to advance your career",
  "Lead AI adoption initiatives across departments or entire organisations",
];

const morePrograms = [
  { icon: "🧠", label: "Beginner · 4 Weeks", title: "AI Fundamentals Certificate", desc: "Core concepts, tools, and use cases — zero coding required.", tags: ["All Levels", "Self-Paced"] },
  { icon: "🏛️", label: "Enterprise · Custom", title: "AI University Program", desc: "Full academic curriculum for institutions and large teams.", tags: ["Enterprise", "Branded"] },
  { icon: "🔬", label: "Advanced · Project-Based", title: "AI Labs", desc: "Build real models and deploy agents in a sandboxed environment.", tags: ["Hands-On", "Advanced"] },
];

export default function AILearningPage() {
  return (
    <div className="min-h-screen bg-[#f7f8fa] font-sans text-[#111827]">
      {/* Banner */}
      <div className="bg-[#1b2a4a] text-white text-center text-sm py-2.5 px-4">
        🎓 New cohort starting July 2026 — Limited seats available.{" "}
        <a href="#cta" className="text-blue-300 font-medium ml-1 hover:underline">Enrol now →</a>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 pb-20">
        {/* Breadcrumb */}
        <div className="flex items-center gap-2 text-sm text-gray-500 mb-6">
          <a href="/" className="text-blue-600 hover:underline">Home</a>
          <span>/</span>
          <a href="/#divisions" className="text-blue-600 hover:underline">Divisions</a>
          <span>/</span>
          <span className="text-gray-800 font-medium">AI Learning</span>
        </div>

        {/* Hero Card */}
        <div className="bg-white rounded-2xl border border-gray-200 overflow-hidden shadow-sm mb-8">
          {/* Hero image strip */}
          <div className="relative h-52 bg-gradient-to-br from-[#1b2a4a] via-[#1e3a6e] to-[#0ea5e9] overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
              alt="AI Learning Workshop"
              fill
              className="object-cover opacity-30"
            />
            <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center">
              <span className="text-4xl mb-2">🎓</span>
              <h2 className="text-2xl font-bold">AI Learning Division</h2>
              <p className="text-blue-200 text-sm mt-1">Master AI — From Fundamentals to Enterprise</p>
            </div>
          </div>

          {/* Body */}
          <div className="p-8">
            {/* Tags */}
            <div className="flex flex-wrap gap-2 mb-4">
              {["Workshops", "Certifications", "Bootcamps", "Enterprise Training", "Self-Paced", "Live Sessions"].map((tag) => (
                <span key={tag} className="px-3 py-1 bg-indigo-50 text-indigo-700 text-xs font-semibold rounded-full border border-indigo-100">{tag}</span>
              ))}
            </div>

            <h1 className="text-3xl font-bold text-[#1b2a4a] mb-3">AI Learning</h1>
            <p className="text-gray-600 text-base leading-relaxed mb-6 max-w-2xl">
              Workshops, certifications, bootcamps, and enterprise training programs — structured for students, working professionals, and businesses at every stage of AI adoption.
            </p>

            {/* Stats */}
            <div className="flex flex-wrap gap-0 mb-8 border border-gray-200 rounded-xl overflow-hidden w-fit">
              {stats.map((s, i) => (
                <div key={s.label} className={`px-6 py-4 text-center ${i < stats.length - 1 ? "border-r border-gray-200" : ""}`}>
                  <div className="text-xl font-bold text-[#1b2a4a]">{s.value}</div>
                  <div className="text-xs text-gray-500 mt-0.5">{s.label}</div>
                </div>
              ))}
            </div>

            {/* Program Formats */}
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Program Formats</p>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3 mb-8">
              {programs.map((p) => (
                <div key={p.title} className="flex items-start gap-3 p-4 rounded-xl border border-gray-200 hover:border-blue-200 hover:shadow-sm transition-all">
                  <span className="text-2xl">{p.icon}</span>
                  <div>
                    <h4 className="font-semibold text-sm text-[#1b2a4a]">{p.title}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">{p.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Learning Tracks */}
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">Learning Tracks</p>
            <div className="rounded-xl border border-gray-200 overflow-hidden mb-8">
              <table className="w-full text-sm">
                <thead>
                  <tr className="bg-[#1b2a4a] text-white text-xs">
                    <th className="text-left px-4 py-3 font-semibold">Track</th>
                    <th className="text-left px-4 py-3 font-semibold">Description</th>
                    <th className="text-left px-4 py-3 font-semibold">Duration</th>
                    <th className="text-left px-4 py-3 font-semibold">Level</th>
                  </tr>
                </thead>
                <tbody>
                  {tracks.map((t, i) => (
                    <tr key={t.name} className={`border-t border-gray-100 ${i % 2 === 0 ? "bg-white" : "bg-gray-50"} hover:bg-blue-50 transition-colors`}>
                      <td className="px-4 py-3 font-semibold text-[#1b2a4a]">{t.name}</td>
                      <td className="px-4 py-3 text-gray-600">{t.desc}</td>
                      <td className="px-4 py-3 text-gray-600">{t.duration}</td>
                      <td className="px-4 py-3">
                        <span className={`px-2.5 py-1 rounded-full text-xs font-semibold ${t.levelColor}`}>{t.level}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* What You'll Do */}
            <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-3">What You'll Be Able to Do</p>
            <ul className="space-y-2">
              {outcomes.map((o) => (
                <li key={o} className="flex items-start gap-2.5 text-sm text-gray-700">
                  <span className="text-emerald-500 mt-0.5 font-bold">✓</span>
                  {o}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* More Programs */}
        <div className="mb-10">
          <h2 className="text-xl font-bold text-[#1b2a4a] mb-1">More Programs You May Like</h2>
          <p className="text-gray-500 text-sm mb-5">Explore other learning paths in the Avatar ecosystem.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {morePrograms.map((p) => (
              <div key={p.title} className="bg-white border border-gray-200 rounded-xl overflow-hidden hover:shadow-md hover:-translate-y-0.5 transition-all cursor-pointer">
                <div className="h-20 bg-gradient-to-br from-blue-600 to-sky-400 flex items-center justify-center text-4xl">
                  {p.icon}
                </div>
                <div className="p-4">
                  <p className="text-xs text-gray-500 mb-1">{p.label}</p>
                  <h4 className="font-bold text-[#1b2a4a] text-sm mb-1.5">{p.title}</h4>
                  <p className="text-xs text-gray-500 mb-3">{p.desc}</p>
                  <div className="flex gap-1.5 flex-wrap">
                    {p.tags.map((t) => (
                      <span key={t} className="px-2.5 py-0.5 bg-gray-100 text-gray-600 text-xs rounded-full font-medium">{t}</span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Footer CTA */}
        <div id="cta" className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white border border-gray-200 rounded-2xl p-7 flex gap-5 items-start">
            <span className="text-3xl">🎓</span>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">For Individuals</p>
              <h3 className="text-lg font-bold text-[#1b2a4a] mb-2">Master AI Skills</h3>
              <p className="text-sm text-gray-600 mb-4">Learn at your own pace, earn certifications, and get hired through the Avatar Talent Network.</p>
              <a href="#" className="inline-block px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">Start Learning for Free</a>
            </div>
          </div>
          <div className="bg-white border border-gray-200 rounded-2xl p-7 flex gap-5 items-start">
            <span className="text-3xl">🏢</span>
            <div>
              <p className="text-xs font-bold text-blue-600 uppercase tracking-widest mb-1">For Companies & Teams</p>
              <h3 className="text-lg font-bold text-[#1b2a4a] mb-2">Train Your Workforce</h3>
              <p className="text-sm text-gray-600 mb-4">Deploy custom AI training programs at scale with progress dashboards and dedicated support.</p>
              <a href="#" className="inline-block px-5 py-2.5 bg-blue-600 text-white text-sm font-semibold rounded-lg hover:bg-blue-700 transition-colors">Explore Enterprise Plans</a>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
}
