import Link from 'next/link';

export default function DashboardPage() {
  return (
    <main className="min-h-screen bg-slate-50">
      <div className="mx-auto max-w-6xl px-6 py-12">
        <div className="rounded-[2rem] border border-slate-200 bg-white p-10 shadow-sm">
          <div className="mb-8">
            <p className="text-sm uppercase tracking-[0.3em] text-sky-600 mb-3">Vendor dashboard</p>
            <h1 className="text-4xl font-bold text-slate-950 mb-4">Welcome back to your AI vendor workspace</h1>
            <p className="text-base text-slate-600 max-w-2xl">
              Manage your listings, track customer activity, and publish new AI tools from a single dashboard.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2">
            <Link
              href="/marketplace"
              className="rounded-3xl border border-slate-200 bg-slate-100 p-6 transition hover:border-slate-300 hover:bg-slate-50"
            >
              <p className="text-sm text-sky-600 font-semibold mb-2">Browse marketplace</p>
              <h2 className="text-xl font-semibold text-slate-950">View active tools</h2>
              <p className="mt-3 text-sm text-slate-600">
                Jump to the marketplace to see what buyers are browsing and trending across categories.
              </p>
            </Link>

            <div className="rounded-3xl border border-slate-200 bg-slate-100 p-6">
              <p className="text-sm text-sky-600 font-semibold mb-2">Quick actions</p>
              <div className="space-y-3">
                <button className="w-full rounded-2xl bg-avatar-accent px-5 py-3 text-sm font-semibold text-white transition hover:bg-avatar-navy">
                  Create a new listing
                </button>
                <button className="w-full rounded-2xl border border-avatar-light bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                  View sales performance
                </button>
                <button className="w-full rounded-2xl border border-avatar-light bg-white px-5 py-3 text-sm font-semibold text-slate-900 transition hover:bg-slate-50">
                  Manage vendor settings
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
