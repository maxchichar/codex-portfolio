'use client';

import { ChangeEvent, DragEvent, useMemo, useState } from 'react';
import { ROOMS } from '@/lib/rooms';
import { useWorldStore } from '@/lib/store';

export function OverlayHud() {
  const setActiveRoom = useWorldStore((s) => s.setActiveRoom);
  const activeRoom = useWorldStore((s) => s.activeRoom);
  const setCustomGalleryTexture = useWorldStore((s) => s.setCustomGalleryTexture);
  const toggleNeon = useWorldStore((s) => s.toggleNeon);
  const [imageUrl, setImageUrl] = useState('');

  const setFileAsTexture = (file?: File) => {
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => setCustomGalleryTexture(String(reader.result));
    reader.readAsDataURL(file);
  };

  const onFile = (event: ChangeEvent<HTMLInputElement>) => setFileAsTexture(event.target.files?.[0]);

  const onDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setFileAsTexture(event.dataTransfer.files?.[0]);
  };

  const applyUrl = () => {
    if (!imageUrl.trim()) return;
    setCustomGalleryTexture(imageUrl.trim());
  };

  const auctionRoom = useMemo(() => ROOMS.find((r) => r.id === 'auction')!, []);

  return (
    <aside className="pointer-events-none absolute inset-0 z-20 p-4 md:p-6">
      <div className="glass-panel pointer-events-auto max-w-[430px] rounded-2xl p-4 text-sm">
        <h2 className="text-lg font-semibold">5D Spatial Navigator</h2>
        <p className="mt-1 text-xs text-[#c7b6ff]">WASD + mouse = spatial move • Space = ascend • Cmd/Ctrl + K = command flight</p>

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
          <p className="mt-1 text-xs text-[#cfcaed]">Choose, drag-drop, or paste URL/base64 data to replace framed art instantly.</p>

          <label
            onDragOver={(event) => event.preventDefault()}
            onDrop={onDrop}
            className="mt-2 block w-full cursor-copy rounded border border-dashed border-[#6f5ab4] bg-[#0a0625] p-2 text-xs"
          >
            Drop image here or click to select
            <input className="sr-only" type="file" accept="image/*" onChange={onFile} />
          </label>

          <div className="mt-2 flex gap-2">
            <input
              value={imageUrl}
              onChange={(event) => setImageUrl(event.target.value)}
              placeholder="https://... or data:image/..."
              className="w-full rounded border border-[#6f5ab4] bg-[#09061f] px-2 py-1 text-xs"
            />
            <button onClick={applyUrl} className="rounded bg-[#2b59af] px-3 py-1 text-xs font-semibold">
              Apply
            </button>
          </div>

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
