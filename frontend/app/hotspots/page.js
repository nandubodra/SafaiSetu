'use client';

import dynamic from 'next/dynamic';
import { useEffect, useState } from 'react';

const MapContainer = dynamic(() => import('react-leaflet').then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import('react-leaflet').then((mod) => mod.TileLayer), { ssr: false });
const Circle = dynamic(() => import('react-leaflet').then((mod) => mod.Circle), { ssr: false });
const Popup = dynamic(() => import('react-leaflet').then((mod) => mod.Popup), { ssr: false });

const hotspots = [
  { id: 'H1', category: 'Garbage', center: [23.3441, 85.3096], radius: 250, severity: 'High' },
  { id: 'H2', category: 'Roads', center: [23.3492, 85.3125], radius: 180, severity: 'Medium' },
];

export default function HotspotsPage() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <main className="min-h-screen bg-slate-100 p-6">
      <div className="mx-auto max-w-6xl">
        <h1 className="mb-6 text-3xl font-bold text-slate-900">Priority Hotspots</h1>

        <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-lg">
          <MapContainer center={[23.3441, 85.3096]} zoom={13} style={{ height: '600px', width: '100%' }}>
            <TileLayer
              attribution='&copy; OpenStreetMap contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />

            {hotspots.map((hotspot) => (
              <Circle
                key={hotspot.id}
                center={hotspot.center}
                radius={hotspot.radius}
                pathOptions={{
                  color: hotspot.severity === 'High' ? '#ef4444' : '#f59e0b',
                  fillColor: hotspot.severity === 'High' ? '#ef4444' : '#f59e0b',
                  fillOpacity: 0.25,
                }}
              >
                <Popup>
                  <div>
                    <p className="font-semibold">{hotspot.category}</p>
                    <p>Severity: {hotspot.severity}</p>
                  </div>
                </Popup>
              </Circle>
            ))}
          </MapContainer>
        </div>
      </div>
    </main>
  );
}
