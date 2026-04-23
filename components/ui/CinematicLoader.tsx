'use client';

import { useEffect, useMemo, useState } from 'react';
import { useWorldStore } from '@/lib/store';

function generateKey() {
  const bytes = new Uint8Array(8);
  crypto.getRandomValues(bytes);
  const hex = Array.from(bytes)
    .map((b) => b.toString(16).padStart(2, '0').toUpperCase())
    .join('');
  return `MAXCHICHAR-0x${hex}`;
}

export function CinematicLoader() {
  const [progress, setProgress] = useState(0);
  const key = useMemo(generateKey, []);
  const setLoaded = useWorldStore((s) => s.setLoaded);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setProgress((p) => {
        const next = Math.min(100, p + Math.random() * 18);
        if (next >= 100) {
          window.clearInterval(timer);
          window.setTimeout(() => setLoaded(true), 450);
        }
        return next;
      });
    }, 220);

    return () => window.clearInterval(timer);
  }, [setLoaded]);

  return (
    <section className="absolute inset-0 z-50 flex items-center justify-center bg-[#030014]">
      <div className="scanlines glass-panel relative w-[min(760px,94vw)] overflow-hidden rounded-2xl p-8">
        <div className="absolute inset-0 animate-scan bg-gradient-to-b from-transparent via-[#ab7eff33] to-transparent" />
        <p className="font-mono text-xs uppercase tracking-[0.45em] text-[#8fb3ff]">SYSTEM AUTH / GALLERY PROTOCOL</p>
        <h1 className="mt-4 text-3xl font-semibold text-white drop-shadow-[0_0_18px_rgba(163,108,255,0.8)]">Cinematic Gateway Boot</h1>
        <p className="mt-5 font-mono text-lg text-[#d1b8ff]">{key}</p>
        <div className="mt-6 h-3 w-full overflow-hidden rounded-full bg-[#1a1240]">
          <div
            className="h-full bg-gradient-to-r from-[#9f5cff] via-[#5f9cff] to-[#ff4ae8] transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
        <p className="mt-2 font-mono text-sm text-[#b5b7db]">Neural scan: {progress.toFixed(0)}%</p>
      </div>
    </section>
  );
}
