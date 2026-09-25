export default function CitizenVerificationPage() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-2xl rounded-3xl bg-white p-8 shadow-lg">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">Citizen Verification</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">Was the issue resolved?</h1>

        <div className="mt-6 rounded-2xl border border-slate-200 p-4">
          <p className="text-lg font-semibold">SS-10245</p>
          <p className="mt-2 text-slate-600">Garbage cleanup completed near the bus stand.</p>
        </div>

        <div className="mt-6 grid gap-4 md:grid-cols-2">
          <button className="rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">
            Yes, it is resolved
          </button>
          <button className="rounded-xl bg-red-600 px-4 py-3 font-semibold text-white">
            No, it is not fixed
          </button>
        </div>
      </div>
    </main>
  );
}
