'use client';

import { useState } from 'react';
import Navbar from '@/components/Navbar';

const categories = [
  'Garbage',
  'Water',
  'Roads',
  'Street Lights',
  'Electricity',
  'Public Facilities',
  'Public Property',
  'Environment',
  'Traffic Infrastructure',
  'Other',
];

export default function ReportComplaintPage() {
  const [formData, setFormData] = useState({
    citizenId: 'demo-user',
    title: 'Civic Issue',
    category: 'Garbage',
    description: '',
    locationLabel: '',
    latitude: 23.3441,
    longitude: 85.3096,
    imageUrl: 'https://example.com/demo.jpg',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await fetch(`${process.env.NEXT_PUBLIC_API_URL}/complaints`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(formData),
    });
    alert('Complaint submitted');
  };

  return (
    <main className="min-h-screen bg-slate-100">
      <Navbar />
      <div className="mx-auto max-w-3xl px-6 py-10">
        <div className="rounded-3xl bg-white p-8 shadow-lg">
          <h1 className="text-3xl font-bold text-slate-900">Report an Issue</h1>

          <form onSubmit={handleSubmit} className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block font-medium text-slate-700">Category</label>
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
              >
                {categories.map((category) => (
                  <option key={category} value={category}>{category}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">Description</label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                rows={5}
                placeholder="Describe the issue"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
              />
            </div>

            <div>
              <label className="mb-2 block font-medium text-slate-700">Location</label>
              <input
                name="locationLabel"
                value={formData.locationLabel}
                onChange={handleChange}
                placeholder="Location"
                className="w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-3"
              />
            </div>

            <button className="w-full rounded-xl bg-slate-900 px-4 py-3 font-semibold text-white">
              Submit Complaint
            </button>
          </form>
        </div>
      </div>
    </main>
  );
}
