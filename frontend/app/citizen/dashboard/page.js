import Navbar from '@/components/Navbar';
import ComplaintCard from '@/components/ComplaintCard';

const complaints = [
  { id: 'SS-10245', category: 'Garbage', status: 'In Progress', location: 'Ranchi, Sector 4', date: '2026-09-18' },
  { id: 'SS-10231', category: 'Street Light', status: 'Resolved', location: 'Ranchi, Main Market', date: '2026-09-10' },
  { id: 'SS-10198', category: 'Pothole', status: 'Assigned', location: 'Ranchi, Near School', date: '2026-09-07' },
];

export default function CitizenDashboardPage() {
  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto max-w-6xl px-6 py-10">
        <div className="mb-8 flex items-center justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Citizen Portal</p>
            <h1 className="text-3xl font-bold text-slate-900">My Reports</h1>
          </div>

          <a href="/citizen/report" className="rounded-xl bg-emerald-600 px-5 py-3 font-semibold text-white">
            + New Complaint
          </a>
        </div>

        <div className="grid gap-5 md:grid-cols-3">
          {complaints.map((complaint) => (
            <ComplaintCard key={complaint.id} complaint={complaint} />
          ))}
        </div>
      </div>
    </main>
  );
}
