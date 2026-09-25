'use client';

import { useTranslation } from '@/lib/useTranslation';

export default function LanguageSwitcher() {
  const { locale, setLocale, t } = useTranslation();

  const handleChange = (e) => {
    const nextLocale = e.target.value;
    localStorage.setItem('safaisetu-locale', nextLocale);
    setLocale(nextLocale);
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-2">
      <label className="text-sm text-slate-300">{t('language')}</label>
      <select
        value={locale}
        onChange={handleChange}
        className="rounded-lg border border-slate-600 bg-slate-800 px-2 py-1 text-sm text-white"
      >
        <option value="en">English</option>
        <option value="hi">हिन्दी</option>
      </select>
    </div>
  );
}
