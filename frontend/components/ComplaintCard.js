import StatusBadge from './StatusBadge';

export default function ComplaintCard({ complaint }) {
  return (
    <div className="rounded-3xl bg-white p-5 shadow-md">
      <div className="flex items-start justify-between gap-4">
        <div>
          <p className="text-xl font-bold">{complaint.id}</p>
          <p className="text-sm text-slate-500">{complaint.category}</p>
        </div>
        <StatusBadge status={complaint.status} />
      </div>

      <div className="mt-4 space-y-2 text-sm text-slate-600">
        <p><strong>Location:</strong> {complaint.location}</p>
        <p><strong>Submitted:</strong> {complaint.date}</p>
      </div>

      <button className="mt-5 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 font-medium hover:bg-slate-100">
        View Details
      </button>
    </div>
  );
}
