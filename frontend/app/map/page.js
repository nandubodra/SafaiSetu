'use client';

import { useEffect, useState } from 'react';
import dynamic from 'next/dynamic';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Marker = dynamic(() => import('react-leaflet').then((mod) => mod.Marker), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

const complaints = [
  { id: 'SS-10245', category: 'Garbage', status: 'In Progress', position: [23.3441, 85.3096] },
  { id: 'SS-10231', category: 'Street Light', status: 'Resolved', position: [23.3492, 85.3125] },
  { id: 'SS-10198', category: 'Pothole', status: 'Assigned', position: [23.3398, 85.3057] },
];

export default function MapPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Civic Issue Map</h1>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <MapContainer center={[23.3441, 85.3096]} zoom={13} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {complaints.map((item) => (
              <Marker key={item.id} position={item.position}>
                <Popup>
                  <div>
                    <p className="font-semibold">{item.id}</p>
                    <p>{item.category}</p>
                    <p>Status: {item.status}</p>
                  </div>
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
