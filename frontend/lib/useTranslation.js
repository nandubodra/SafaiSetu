'use client';

import { useEffect, useState } from 'react';
import { getDictionary } from '@/i18n';

export function useTranslation() {
  const [locale, setLocale] = useState('en');

  useEffect(() => {
    const saved = localStorage.getItem('safaisetu-locale');
    if (saved) setLocale(saved);
  }, []);

  const t = (key) => {
    const dict = getDictionary(locale);
    return dict[key] || key;
  };

  return { locale, setLocale, t };
}
