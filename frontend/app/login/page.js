'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslation } from '@/lib/useTranslation';

export default function LoginPage() {
  const router = useRouter();
  const { t } = useTranslation();

  const [role, setRole] = useState('citizen');
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);

  const sendOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/send-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, role }),
      });
      const data = await res.json();
      if (res.ok) {
        setOtpSent(true);
        console.log('OTP demo:', data.otp);
      }
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async () => {
    setLoading(true);
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/auth/verify-otp`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, otp, role }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem('safaisetu-user', JSON.stringify(data.user));
        router.push(role === 'authority' ? '/authority/dashboard' : '/citizen/dashboard');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-100 p-6">
      <div className="w-full max-w-md rounded-3xl bg-white p-8 shadow-xl">
        <p className="text-sm uppercase tracking-[0.2em] text-emerald-700">SafaiSetu</p>
        <h1 className="mt-3 text-3xl font-bold text-slate-900">{t('login')}</h1>

        <div className="mt-6">
          <label className="mb-2 block text-sm font-medium text-slate-700">Role</label>
          <select
            value={role}
            onChange={(e) => setRole(e.target.value)}
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
          >
            <option value="citizen">Citizen</option>
            <option value="authority">Authority</option>
          </select>
        </div>

        <div className="mt-5">
          <label className="mb-2 block text-sm font-medium text-slate-700">Email</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="name@example.com"
            className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
          />
        </div>

        {!otpSent ? (
          <button
            onClick={sendOtp}
            className="mt-6 w-full rounded-xl bg-emerald-600 px-4 py-3 font-semibold text-white"
          >
            {loading ? 'Sending...' : 'Send OTP'}
          </button>
        ) : (
          <>
            <div className="mt-5">
              <label className="mb-2 block text-sm font-medium text-slate-700">OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                placeholder="Enter OTP"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
              />
            </div>

            <button
              onClick={verifyOtp}
              className="mt-6 w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white"
            >
              {loading ? 'Verifying...' : 'Verify OTP'}
            </button>
          </>
        )}
      </div>
    </main>
  );
}
