const classes = {
  Reported: 'bg-slate-200 text-slate-800',
  Verified: 'bg-blue-100 text-blue-800',
  Assigned: 'bg-indigo-100 text-indigo-800',
  'In Progress': 'bg-yellow-100 text-yellow-800',
  Resolved: 'bg-emerald-100 text-emerald-800',
  'Citizen Verification': 'bg-violet-100 text-violet-800',
};

export default function StatusBadge({ status }) {
  return (
    <span className={`rounded-full px-2 py-1 text-xs font-semibold ${classes[status] || 'bg-slate-200 text-slate-800'}`}>
      {status}
    </span>
  );
}
