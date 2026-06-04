const stats = [
  { value: "12,000+", label: "Certified Graduates" },
  { value: "40+", label: "Programs & Courses" },
  { value: "98%", label: "Completion Rate" },
  { value: "15+", label: "Industry Partners" },
];

const programs = [
  { title: "AI Certifications", desc: "Industry-recognized credentials with self-paced options." },
  { title: "Intensive Bootcamps", desc: "4–8 week cohorts with live mentors and hands-on projects." },
  { title: "Enterprise Training", desc: "Custom programs for teams of 10–10,000 with dedicated support." },
  { title: "Workshops", desc: "Focused single-day and weekend sessions for fast skill development." },
  {title:"Job Placement Program", desc: "Career support and job placement assistance for graduates."},
];

const outcomes = [
  "Build and deploy AI chatbots and automation workflows for real business problems.",
  "Write effective prompts that consistently produce high-quality AI outputs.",
  "Identify and implement AI use cases that save time and reduce operational costs.",
  "Earn a verifiable AI certification to advance your career.",
  "Lead AI adoption initiatives across departments or entire organisations.",
];

const morePrograms = [
  { label: "Beginner · 4 Weeks", title: "AI Fundamentals Certificate", desc: "Core concepts, tools, and use cases for new learners.", tags: ["All Levels", "Self-Paced"] },
  { label: "Enterprise · Custom", title: "AI University Program", desc: "Full curriculum for institutions and large teams.", tags: ["Enterprise", "Branded"] },
  { label: "Advanced · Project-Based", title: "AI Labs", desc: "Build real models and deploy agents in a sandbox environment.", tags: ["Hands-On", "Advanced"] },
];

export default function AILearningPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans text-slate-900">
      <div className="bg-white border-b border-slate-200 px-6 md:px-10 py-3">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-2 text-sm text-slate-500">
          <a href="/" className="text-slate-700 hover:text-slate-900 hover:underline">Home</a>
          <span>›</span>
          <a href="/#divisions" className="text-slate-700 hover:text-slate-900 hover:underline">Divisions</a>
          <span>›</span>
          <span className="font-medium text-slate-900">AI Learning</span>
        </div>
      </div>

      <section className="relative overflow-hidden bg-slate-950 px-6 md:px-10 py-16 text-white">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-48 bg-gradient-to-b from-slate-950/90 to-transparent" />
        <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.25fr_0.75fr] items-center">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-slate-400 mb-4">Premium learning experience</p>
            <h1 className="text-4xl md:text-5xl font-semibold leading-tight text-white mb-5">Master AI — From Fundamentals to Enterprise</h1>
            <p className="max-w-2xl text-base leading-8 text-slate-300 mb-8">
            Workshops, certifications, bootcamps, and enterprise training programs — structured for students, working professionals, and businesses at every stage of AI adoption.
            </p>
            <div className="flex flex-wrap gap-3">
              <a href="#programs" className="inline-flex items-center justify-center rounded-full bg-sky-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-sky-500/20 transition hover:bg-sky-400">View programs</a>
              <a href="#outcomes" className="inline-flex items-center justify-center rounded-full border border-white/20 bg-white/10 px-6 py-3 text-sm font-semibold text-white transition hover:bg-white/20">Explore outcomes</a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-white/5 p-8 shadow-[0_18px_60px_rgba(15,23,42,0.18)] backdrop-blur-xl">
            <div className="grid gap-5 sm:grid-cols-2">
              {stats.map((item) => (
                <div key={item.label} className="rounded-3xl border border-slate-800 bg-slate-900/80 p-5 text-center">
                  <div className="text-3xl font-semibold text-sky-300">{item.value}</div>
                  <div className="mt-3 text-xs uppercase tracking-[0.24em] text-slate-400">{item.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <div className="bg-white border-t border-b border-slate-200 px-6 md:px-10 py-5">
        <div className="max-w-6xl mx-auto flex flex-wrap items-center gap-3">
          <span className="text-xs font-semibold uppercase tracking-[0.3em] text-slate-500">Program format</span>
          {['Workshops', 'Certifications', 'Bootcamps', 'Enterprise Training', 'Self-Paced', 'Live Sessions'].map((tag) => (
            <span key={tag} className="rounded-full border border-slate-200 bg-slate-50 px-3 py-1 text-xs font-semibold text-slate-600">{tag}</span>
          ))}
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 md:px-10 py-14 grid gap-10">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">Program highlights</p>
            <h2 className="text-3xl font-semibold text-slate-950 mb-4">Hands-on AI training for every level.</h2>
            <p className="text-sm leading-7 text-slate-600 max-w-3xl">Fast-track your team or organisation with premium AI programs, certifications and 100% Job placements that deliver confidence and practical outcomes.</p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 mb-10">
            {programs.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-slate-50 p-5 hover:shadow-sm transition">
                <h3 className="font-semibold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600">{item.desc}</p>
              </div>
            ))}
          </div>

          <div className="mb-10 overflow-hidden rounded-[2rem] border border-slate-200 bg-slate-950 text-white shadow-[0_24px_80px_rgba(15,23,42,0.22)]">
            <div className="pointer-events-none absolute right-6 top-6 h-28 w-28 rounded-full bg-sky-500/20 blur-3xl" />
            <div className="pointer-events-none absolute left-6 bottom-6 h-36 w-36 rounded-full bg-emerald-400/15 blur-3xl" />
            <div className="relative overflow-hidden rounded-[2rem] p-8">
              <div className="absolute inset-0 bg-gradient-to-br from-slate-900 via-slate-950 to-slate-800 opacity-80" />
              <div className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-sky-400 via-sky-500 to-emerald-400 opacity-90 animate-[pulse_3s_ease-in-out_infinite]" />
              <div className="relative grid gap-6 lg:grid-cols-[1.2fr_0.8fr] items-center">
                <div className="space-y-4">
                  <p className="text-xs uppercase tracking-[0.3em] text-sky-300">Available courses</p>
                  <h3 className="text-3xl font-semibold text-white leading-tight">All courses coming soon</h3>
                  <p className="max-w-xl text-sm leading-7 text-slate-300">A refined AI learning experience is being prepared. Check back soon for premium courses, labs, and enterprise programs designed to accelerate your AI capabilities.</p>
                </div>
                <div className="rounded-[1.75rem] border border-slate-800 bg-slate-900/90 p-6 shadow-[0_20px_60px_rgba(56,189,248,0.14)]">
                  <div className="mb-4 inline-flex items-center gap-2 rounded-full bg-sky-500/10 px-4 py-2 text-xs uppercase tracking-[0.28em] text-sky-300 shadow-sm shadow-sky-500/10">Coming soon</div>
                  <div className="space-y-3">
                    <div className="h-4 w-full animate-pulse rounded-full bg-slate-700/80" />
                    <div className="h-4 w-5/6 animate-pulse rounded-full bg-slate-700/80" />
                    <div className="h-4 w-3/4 animate-pulse rounded-full bg-slate-700/80" />
                  </div>
                  <div className="mt-8 rounded-[1.5rem] border border-sky-500/15 bg-slate-950/90 p-5 text-sm text-slate-300 shadow-inner shadow-sky-500/10">
                    <p className="font-semibold text-white">Stay tuned</p>
                    <p className="mt-2">Premium lab-based courses and executive AI programs will be available soon.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="mb-10">
            <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-3">What you'll do</p>
            <ul className="list-disc space-y-3 pl-5 text-sm text-slate-700">
              {outcomes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </div>

          {/* <div className="grid gap-6 lg:grid-cols-3 mb-10">
            {morePrograms.map((item) => (
              <div key={item.title} className="rounded-[1.75rem] border border-slate-200 bg-white p-6 hover:shadow-sm transition">
                <p className="text-xs text-slate-500 mb-2">{item.label}</p>
                <h3 className="font-semibold text-slate-950 mb-2">{item.title}</h3>
                <p className="text-sm leading-6 text-slate-600 mb-4">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span key={tag} className="rounded-full bg-slate-100 px-2.5 py-1 text-xs text-slate-600">{tag}</span>
                  ))}
                </div>
              </div>
            ))}
          </div> */}

            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-2">
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-2">For individuals</p>
                <h3 className="text-xl font-semibold text-slate-950 mb-3">Master AI skills</h3>
                <p className="text-sm leading-6 text-slate-600 mb-5">Learn at your own pace, earn certifications, and advance your career with practical AI skills.</p>
                <a href="#" className="inline-flex items-center justify-center rounded-full bg-slate-950 px-6 py-3 text-sm font-semibold text-white transition hover:bg-slate-800">Start learning</a>
              </div>
              <div className="rounded-[1.75rem] border border-slate-200 bg-white p-6 shadow-sm">
                <p className="text-xs uppercase tracking-[0.3em] text-sky-600 mb-2">For companies</p>
                <h3 className="text-xl font-semibold text-slate-950 mb-3">Train your workforce</h3>
                <p className="text-sm leading-6 text-slate-600 mb-5">Deploy custom AI training programs at scale with progress dashboards and dedicated support.</p>
                <a href="#" className="inline-flex items-center justify-center rounded-full border border-slate-300 px-6 py-3 text-sm font-semibold text-slate-900 hover:bg-slate-50 transition">Explore enterprise</a>
              </div>
            </div>
        </div>
      </div>
    </div>
  );
}
