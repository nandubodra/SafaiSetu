const complaint = {
  id: 'SS-10310',
  category: 'Garbage',
  status: 'In Progress',
  location: 'Ranchi, Sector 4',
  description: 'Overflowing garbage near the bus stand.',
  beforeImage: 'https://images.unsplash.com/photo-1581578731548-c64695cc6952?auto=format&fit=crop&w=900&q=80',
  afterImage: 'https://images.unsplash.com/photo-1528747045269-390fe33c19f2?auto=format&fit=crop&w=900&q=80',
};

const statusOptions = ['Reported', 'Verified', 'Assigned', 'In Progress', 'Resolved', 'Citizen Verification'];

export default function ComplaintDetailPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <div className="rounded-3xl bg-white p-6 shadow-lg">
          <div className="mb-6 flex items-center justify-between">
            <div>
              <p className="text-sm uppercase tracking-[0.2em] text-blue-700">Authority Review</p>
              <h1 className="text-3xl font-bold text-slate-900">{complaint.id}</h1>
            </div>
            <span className="rounded-full bg-yellow-100 px-3 py-1 text-sm font-semibold text-yellow-800">
              {complaint.status}
            </span>
          </div>

          <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Category</p>
                <p className="text-xl font-semibold">{complaint.category}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Description</p>
                <p className="mt-2 text-slate-700">{complaint.description}</p>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <p className="text-sm text-slate-500">Location</p>
                <p className="mt-2">{complaint.location}</p>
              </div>
            </div>

            <div className="space-y-5">
              <div className="rounded-2xl border border-slate-200 p-4">
                <label className="mb-2 block font-medium text-slate-700">Update status</label>
                <select className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3">
                  {statusOptions.map((status) => (
                    <option key={status} value={status}>{status}</option>
                  ))}
                </select>
              </div>

              <div className="rounded-2xl border border-slate-200 p-4">
                <label className="mb-2 block font-medium text-slate-700">Resolution notes</label>
                <textarea rows={4} className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3" />
              </div>

              <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">
                Save Action
              </button>
            </div>
          </div>

          <div className="mt-8 grid gap-5 md:grid-cols-2">
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 font-semibold text-slate-700">Before photo</p>
              <img src={complaint.beforeImage} alt="Before" className="h-72 w-full rounded-2xl object-cover" />
            </div>
            <div className="rounded-2xl border border-slate-200 p-4">
              <p className="mb-3 font-semibold text-slate-700">After photo</p>
              <img src={complaint.afterImage} alt="After" className="h-72 w-full rounded-2xl object-cover" />
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
