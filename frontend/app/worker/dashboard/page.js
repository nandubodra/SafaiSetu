const tasks = [
  { id: 'SS-10310', category: 'Garbage', location: 'Ranchi, Sector 4', status: 'Assigned' },
  { id: 'SS-10311', category: 'Water', location: 'Ranchi, Main Road', status: 'In Progress' },
  { id: 'SS-10312', category: 'Roads', location: 'Ranchi, School Zone', status: 'Pending' },
];

export default function WorkerDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Worker Workspace</p>
          <h1 className="text-3xl font-bold text-slate-900">Assigned Work Queue</h1>
        </header>

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <div className="space-y-4">
            {tasks.map((task) => (
              <div key={task.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-lg font-bold">{task.id}</p>
                  <p className="text-sm text-slate-600">{task.category} • {task.location}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">
                    {task.status}
                  </span>
                  <button className="rounded-xl bg-emerald-600 px-3 py-2 text-sm font-medium text-white">
                    Update
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
