'use client';

import Navbar from '@/components/Navbar';
import { useTranslation } from '@/lib/useTranslation';

export default function HomePage() {
  const { t } = useTranslation();

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />

      <section className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid gap-8 lg:grid-cols-[1.3fr_0.7fr]">
          <div className="rounded-3xl bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-900 p-8 text-white shadow-xl">
            <p className="mb-3 text-sm uppercase tracking-[0.2em] text-emerald-300">Transparent civic governance</p>
            <h1 className="max-w-xl text-4xl font-bold leading-tight md:text-5xl">
              {t('reportIssue')} and track with full transparency.
            </h1>
            <p className="mt-5 max-w-xl text-slate-200">
              Citizens report issues, authorities act, and communities verify whether services were actually fixed.
            </p>

            <div className="mt-8 flex flex-wrap gap-4">
              <a href="/citizen/report" className="rounded-xl bg-yellow-400 px-5 py-3 font-semibold text-slate-900">
                {t('reportIssue')}
              </a>
              <a href="/login" className="rounded-xl border border-white/30 bg-white/5 px-5 py-3 font-semibold text-white">
                {t('login')}
              </a>
            </div>
          </div>

          <div className="rounded-3xl bg-white p-6 shadow-lg">
            <h2 className="mb-4 text-xl font-bold">{t('login')}</h2>
            <button className="w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white">
              {t('citizenLogin')}
            </button>
            <button className="mt-4 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white">
              {t('authorityLogin')}
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
