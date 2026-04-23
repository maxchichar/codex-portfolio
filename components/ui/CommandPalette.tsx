'use client';

import { useEffect, useMemo, useState } from 'react';
import { ROOMS } from '@/lib/rooms';
import { useWorldStore } from '@/lib/store';

const STATIC_COMMANDS = [
  { id: 'toggle-neon', title: 'Toggle neon mode', description: 'Switch dark/neon ambiance.' },
  { id: 'go-auction', title: 'Fly to auction room', description: 'Jump to gallery auction room.' }
] as const;

export function CommandPalette() {
  const open = useWorldStore((s) => s.paletteOpen);
  const setOpen = useWorldStore((s) => s.setPaletteOpen);
  const setRoom = useWorldStore((s) => s.setActiveRoom);
  const toggleNeon = useWorldStore((s) => s.toggleNeon);
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

  const roomMatches = useMemo(
    () => ROOMS.filter((room) => room.title.toLowerCase().includes(query.toLowerCase())),
    [query]
  );

  const aiSuggestion = useMemo(() => {
    const plain = query.toLowerCase().trim();
    if (!plain.startsWith('find ')) return null;
    const keyword = plain.replace('find ', '');
    return ROOMS.find((room) => room.title.toLowerCase().includes(keyword));
  }, [query]);

  if (!open) return null;

  return (
    <div className="absolute inset-0 z-40 flex items-start justify-center bg-[#01010f90] p-10 backdrop-blur-sm">
      <div className="glass-panel w-[min(680px,96vw)] rounded-2xl p-4">
        <input
          autoFocus
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="find projects, fly to contact, toggle neon..."
          className="w-full rounded-xl border border-[#5d4f90] bg-[#09051f] px-3 py-3 text-sm outline-none"
        />

        {aiSuggestion && (
          <button
            className="mt-3 w-full rounded-lg border border-[#6853b0] bg-[#140d35] px-3 py-2 text-left text-sm"
            onClick={() => {
              setRoom(aiSuggestion.id);
              setOpen(false);
              setQuery('');
            }}
          >
            AI mock search: fly to <span className="font-semibold">{aiSuggestion.title}</span>
          </button>
        )}

        <ul className="mt-3 space-y-2">
          {roomMatches.map((room) => (
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
          {STATIC_COMMANDS.map((cmd) => (
            <li key={cmd.id}>
              <button
                className="w-full rounded-lg border border-[#40355f] bg-[#11122f] px-3 py-2 text-left text-sm"
                onClick={() => {
                  if (cmd.id === 'toggle-neon') toggleNeon();
                  if (cmd.id === 'go-auction') setRoom('auction');
                  setOpen(false);
                }}
              >
                <span className="font-semibold">{cmd.title}</span>
                <span className="ml-2 text-xs text-[#b8b4d8]">{cmd.description}</span>
              </button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
