const issues = [
  { id: 'SS-10245', category: 'Garbage', status: 'In Progress', color: 'bg-yellow-400' },
  { id: 'SS-10231', category: 'Street Light', status: 'Resolved', color: 'bg-emerald-500' },
  { id: 'SS-10198', category: 'Pothole', status: 'Assigned', color: 'bg-blue-500' },
];

const stats = [
  { label: 'Total Reports', value: '1,248' },
  { label: 'Pending', value: '183' },
  { label: 'In Progress', value: '241' },
  { label: 'Resolved', value: '824' },
];

export default function HomePage() {
  return (
    <main className="min-h-screen bg-slate-100 text-slate-800">
      <header className="bg-slate-950 text-white shadow-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5">
          <div>
            <p className="text-2xl font-bold tracking-wide">SafaiSetu</p>
            <p className="text-sm text-slate-300">Civic issue reporting platform</p>
          </div>
          <nav className="flex gap-4 text-sm">
            <a href="#" className="hover:text-yellow-300">Home</a>
            <a href="#" className="hover:text-yellow-300">Dashboard</a>
            <a href="#" className="hover:text-yellow-300">Map</a>
            <a href="#" className="hover:text-yellow-300">Login</a>
          </nav>
        </div>
      </header>

      <section className="mx-auto max-w-7xl px-6 py-10">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-8 text-white shadow-xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-emerald-300">Transparent civic governance</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">
              Report civic issues and track action from start to finish.
            </h1>
            <p className="mt-5 max-w-xl text-slate-200">
              Citizens can upload evidence, authorities can assign work, and communities can verify whether problems are truly resolved.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <button className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900 transition hover:bg-yellow-300">
                Report an Issue
              </button>
              <button className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 font-semibold text-white transition hover:bg-white/10">
                View Dashboard
              </button>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">Citizen quick access</h2>
            <div className="space-y-4">
              <div className="rounded-2xl border border-slate-200 bg-slate-50 p-4">
                <p className="text-sm text-slate-500">Email OTP</p>
                <input
                  className="mt-2 w-full rounded-xl border border-slate-200 bg-white px-3 py-2 outline-none ring-0 focus:border-emerald-500"
                  placeholder="citizen@email.com"
                />
              </div>
              <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white hover:bg-emerald-500">
                Send OTP
              </button>
            </div>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-8">
        <div className="grid gap-4 md:grid-cols-4">
          {stats.map((stat) => (
            <div key={stat.label} className="rounded-2xl bg-white p-5 shadow-md">
              <p className="text-sm text-slate-500">{stat.label}</p>
              <h3 className="mt-2 text-3xl font-bold">{stat.value}</h3>
            </div>
          ))}
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-6 pb-12">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-2xl font-bold">Recent issue status</h2>
          <button className="text-sm font-medium text-emerald-700">View all</button>
        </div>

        <div className="grid gap-5 lg:grid-cols-3">
          {issues.map((issue) => (
            <div key={issue.id} className="rounded-3xl bg-white p-5 shadow-md">
              <div className="flex items-center justify-between">
                <p className="text-lg font-semibold">{issue.id}</p>
                <span className={`rounded-full px-2 py-1 text-xs font-medium text-white ${issue.color}`}>
                  {issue.status}
                </span>
              </div>
              <div className="mt-5 flex items-center gap-3">
                <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">
                  {issue.category}
                </span>
              </div>
              <p className="mt-4 text-sm text-slate-600">Location: Ranchi, Sector 4</p>
              <p className="mt-2 text-sm text-slate-600">Evidence: Photo + GPS</p>
            </div>
          ))}
        </div>
      </section>
    </main>
  );
}
