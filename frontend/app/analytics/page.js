const metrics = [
  { label: 'Average resolution time', value: '4.2 days' },
  { label: 'Resolution rate', value: '72%' },
  { label: 'Overdue complaints', value: '23' },
  { label: 'Citizen satisfaction', value: '88%' },
];

const categoryStats = [
  { category: 'Garbage', count: 420, trend: '+12%' },
  { category: 'Roads', count: 310, trend: '+8%' },
  { category: 'Water', count: 290, trend: '+5%' },
  { category: 'Street Lights', count: 200, trend: '+3%' },
];

export default function AnalyticsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-violet-700">Analytics</p>
          <h1 className="text-3xl font-bold text-slate-900">Operations Dashboard</h1>
        </header>

        <div className="grid gap-5 md:grid-cols-4">
          {metrics.map((metric) => (
            <div key={metric.label} className="rounded-2xl bg-white p-5 shadow-md">
              <p className="text-sm text-slate-500">{metric.label}</p>
              <h3 className="mt-2 text-3xl font-bold">{metric.value}</h3>
            </div>
          ))}
        </div>

        <div className="mt-8 rounded-3xl bg-white p-5 shadow-md">
          <h2 className="mb-5 text-2xl font-bold">Category-wise reports</h2>

          <div className="space-y-4">
            {categoryStats.map((item) => (
              <div key={item.category}>
                <div className="mb-1 flex items-center justify-between">
                  <p className="font-medium">{item.category}</p>
                  <p className="text-sm text-slate-500">{item.trend}</p>
                </div>
                <div className="h-2.5 w-full rounded-full bg-slate-200">
                  <div className="h-2.5 rounded-full bg-emerald-500" style={{ width: `${Math.min((item.count / 500) * 100, 100)}%` }} />
                </div>
                <p className="mt-1 text-sm text-slate-500">{item.count} reports</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
