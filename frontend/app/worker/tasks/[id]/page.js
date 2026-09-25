const task = {
  id: 'SS-10310',
  category: 'Garbage',
  location: 'Ranchi, Sector 4',
  description: 'Garbage pile blocking pedestrian lane near utility pole.',
  beforeImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  status: 'Assigned',
};

export default function WorkerTaskDetailPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-5xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Task Detail</p>
            <h1 className="text-3xl font-bold text-slate-900">{task.id}</h1>
          </div>
          <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">{task.status}</span>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <div className="rounded-2xl border border-slate-200 p-4">
            <p className="text-sm text-slate-500">Description</p>
            <p className="mt-2 text-slate-700">{task.description}</p>

            <div className="mt-5">
              <p className="mb-3 font-semibold text-slate-700">Before photo</p>
              <img src={task.beforeImage} alt="Before" className="h-72 w-full rounded-2xl object-cover" />
            </div>
          </div>

          <div className="space-y-5">
            <div className="rounded-2xl border border-slate-200 p-4">
              <label className="mb-2 block font-medium text-slate-700">Update task status</label>
              <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                <option>Assigned</option>
                <option>In Progress</option>
                <option>Resolved</option>
              </select>
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <label className="mb-2 block font-medium text-slate-700">Resolution notes</label>
              <textarea rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" />
            </div>

            <div className="rounded-2xl border border-slate-200 p-4">
              <label className="mb-2 block font-medium text-slate-700">Upload after photo</label>
              <input type="file" accept="image/*" className="w-full rounded-xl border border-dashed border-slate-300 bg-slate-50 px-3 py-3" />
            </div>

            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white">
              Save Update
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
