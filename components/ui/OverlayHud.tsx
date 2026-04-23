'use client';

import { ChangeEvent, useMemo } from 'react';
import { ROOMS } from '@/lib/rooms';
import { useWorldStore } from '@/lib/store';

export function OverlayHud() {
  const setActiveRoom = useWorldStore((s) => s.setActiveRoom);
  const activeRoom = useWorldStore((s) => s.activeRoom);
  const setCustomGalleryTexture = useWorldStore((s) => s.setCustomGalleryTexture);
  const toggleNeon = useWorldStore((s) => s.toggleNeon);

  const onFile = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomGalleryTexture(String(reader.result));
    reader.readAsDataURL(file);
  };

  const auctionRoom = useMemo(() => ROOMS.find((r) => r.id === 'auction')!, []);

  return (
    <aside className="pointer-events-none absolute inset-0 z-20 p-4 md:p-6">
      <div className="glass-panel pointer-events-auto max-w-[410px] rounded-2xl p-4 text-sm">
        <h2 className="text-lg font-semibold">5D Spatial Navigator</h2>
        <p className="mt-1 text-xs text-[#c7b6ff]">WASD / arrows = motion • Space = lift • mouse = orbit</p>

        <div className="mt-4 flex flex-wrap gap-2">
          {ROOMS.map((room) => (
            <button
              key={room.id}
              onClick={() => setActiveRoom(room.id)}
              className={`rounded-full border px-3 py-1 text-xs transition ${
                activeRoom === room.id
                  ? 'border-[#be9dff] bg-[#8f61ff33] text-white'
                  : 'border-[#534780] bg-[#100a2e] text-[#d5d7f4]'
              }`}
            >
              {room.title}
            </button>
          ))}
        </div>

        <div className="mt-4 rounded-xl border border-[#4d3f7f] p-3">
          <p className="font-mono text-xs uppercase tracking-[0.15em] text-[#97bbff]">Gallery Auction Room Upload</p>
          <p className="mt-1 text-xs text-[#cfcaed]">Select any image (or drag file onto this input) to replace the framed artwork.</p>
          <input
            className="mt-2 block w-full rounded border border-dashed border-[#6f5ab4] bg-[#0a0625] p-2 text-xs"
            type="file"
            accept="image/*"
            onChange={onFile}
          />
          <button onClick={toggleNeon} className="mt-2 w-full rounded bg-[#4c2bbb] px-3 py-2 text-xs font-semibold">
            Toggle Dark / Neon Mode
          </button>
          <button onClick={() => setActiveRoom(auctionRoom.id)} className="mt-2 w-full rounded bg-[#1c3f88] px-3 py-2 text-xs font-semibold">
            Jump To Auction Room
          </button>
        </div>
      </div>
    </aside>
  );
}
