'use client';

import { useEffect, useMemo, useState } from 'react';
import { ROOMS } from '@/lib/rooms';
import { useWorldStore } from '@/lib/store';

export function CommandPalette() {
  const open = useWorldStore((s) => s.paletteOpen);
  const setOpen = useWorldStore((s) => s.setPaletteOpen);
  const setRoom = useWorldStore((s) => s.setActiveRoom);
  const [query, setQuery] = useState('');

  useEffect(() => {
    const listener = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
        e.preventDefault();
        setOpen(!open);
      }
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', listener);
    return () => window.removeEventListener('keydown', listener);
  }, [open, setOpen]);

  const matches = useMemo(
    () => ROOMS.filter((room) => room.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-start justify-center bg-[#01010f90] p-10 backdrop-blur-sm">
      <div className="glass-panel w-[min(650px,96vw)] rounded-2xl p-4">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Fly to room, run AI mock search..."
          className="w-full rounded-xl border border-[#5d4f90] bg-[#09051f] px-3 py-3 text-sm outline-none"
        />
        <ul className="mt-3 space-y-2">
          {matches.map((room) => (
            <li key={room.id}>
              <button
                className="w-full rounded-lg border border-[#40355f] bg-[#0f0a2b] px-3 py-2 text-left text-sm"
                onClick={() => {
                  setRoom(room.id);
                  setOpen(false);
                  setQuery('');
                }}
              >
                <span className="font-semibold">{room.title}</span>
                <span className="ml-2 text-xs text-[#b8b4d8]">{room.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
