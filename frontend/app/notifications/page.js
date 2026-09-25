const notifications = [
  { title: 'Complaint assigned', message: 'SS-10310 has been assigned to your team.', time: '2 min ago', unread: true },
  { title: 'Status update', message: 'SS-10231 resolved and waiting for citizen verification.', time: '30 min ago', unread: true },
  { title: 'New report', message: 'A new garbage issue was reported near your ward.', time: '1 hour ago', unread: false },
];

export default function NotificationsPage() {
  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-4xl rounded-3xl bg-white p-6 shadow-lg">
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-slate-900">Notification Center</h1>
          <span className="rounded-full bg-emerald-100 px-3 py-1 text-sm font-semibold text-emerald-800">3 unread</span>
        </div>

        <div className="space-y-4">
          {notifications.map((item, index) => (
            <div key={index} className={`rounded-2xl border p-4 ${item.unread ? 'border-emerald-200 bg-emerald-50' : 'border-slate-200 bg-slate-50'}`}>
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="font-semibold text-slate-900">{item.title}</p>
                  <p className="mt-1 text-sm text-slate-600">{item.message}</p>
                </div>
                <span className="text-xs text-slate-500">{item.time}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </main>
  );
}
