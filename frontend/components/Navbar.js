'use client';

import LanguageSwitcher from '@/components/LanguageSwitcher';
import { useTranslation } from '@/lib/useTranslation';

export default function Navbar() {
  const { t } = useTranslation();

  return (
    <header className="bg-slate-950 text-white shadow-md">
      <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-4">
        <div>
          <p className="text-2xl font-bold tracking-wide">{t('appName')}</p>
          <p className="text-xs text-slate-300">{t('tagline')}</p>
        </div>

        <nav className="hidden items-center gap-6 text-sm md:flex">
          <a href="/" className="hover:text-yellow-300">Home</a>
          <a href="/citizen/dashboard" className="hover:text-yellow-300">{t('myReports')}</a>
          <a href="/citizen/report" className="hover:text-yellow-300">{t('reportIssue')}</a>
          <a href="/analytics" className="hover:text-yellow-300">{t('analytics')}</a>
          <a href="/login" className="hover:text-yellow-300">{t('login')}</a>
        </nav>

        <LanguageSwitcher />
      </div>
    </header>
  );
}
