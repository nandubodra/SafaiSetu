import Link from 'next/link';

const complaints = [
  { id: 'SS-10310', category: 'Garbage', status: 'Pending', priority: 'High' },
  { id: 'SS-10311', category: 'Water', status: 'Assigned', priority: 'Medium' },
  { id: 'SS-10312', category: 'Roads', status: 'In Progress', priority: 'High' },
];

export default function AuthorityDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <header className="mb-8">
          <p className="text-sm uppercase tracking-[0.2em] text-blue-700">Authority Dashboard</p>
          <h1 className="text-3xl font-bold text-slate-900">SafaiSetu Admin</h1>
        </header>

        <div className="mb-8 grid gap-5 md:grid-cols-4">
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">Total Reports</p>
            <h3 className="mt-2 text-3xl font-bold">1,248</h3>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">Pending</p>
            <h3 className="mt-2 text-3xl font-bold">183</h3>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">In Progress</p>
            <h3 className="mt-2 text-3xl font-bold">241</h3>
          </div>
          <div className="rounded-2xl bg-white p-5 shadow-md">
            <p className="text-sm text-slate-500">Resolved</p>
            <h3 className="mt-2 text-3xl font-bold">824</h3>
          </div>
        </div>

        <div className="rounded-3xl bg-white p-5 shadow-md">
          <h2 className="mb-4 text-2xl font-bold">Complaint Register</h2>

          <div className="space-y-4">
            {complaints.map((item) => (
              <div key={item.id} className="flex items-center justify-between rounded-2xl border border-slate-200 p-4">
                <div>
                  <p className="text-lg font-bold">{item.id}</p>
                  <p className="text-sm text-slate-600">{item.category}</p>
                </div>

                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-red-100 px-2 py-1 text-xs font-semibold text-red-700">{item.priority}</span>
                  <span className="rounded-full bg-slate-200 px-2 py-1 text-xs font-semibold text-slate-700">{item.status}</span>
                  <Link href={`/authority/complaints/${item.id}`} className="rounded-xl bg-slate-900 px-3 py-2 text-sm font-medium text-white">
                    Review
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </main>
  );
}
