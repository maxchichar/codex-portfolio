import { create } from 'zustand';

export type RoomId =
  | 'entrance'
  | 'about'
  | 'skills'
  | 'projects'
  | 'case-studies'
  | 'experience'
  | 'testimonials'
  | 'philosophy'
  | 'open-source'
  | 'blog'
  | 'auction'
  | 'contact';

type WorldState = {
  loaded: boolean;
  neonMode: boolean;
  paletteOpen: boolean;
  activeRoom: RoomId;
  customGalleryTexture?: string;
  setLoaded: (loaded: boolean) => void;
  toggleNeon: () => void;
  setPaletteOpen: (open: boolean) => void;
  setActiveRoom: (room: RoomId) => void;
  setCustomGalleryTexture: (url?: string) => void;
};

export const useWorldStore = create<WorldState>((set) => ({
  loaded: false,
  neonMode: true,
  paletteOpen: false,
  activeRoom: 'entrance',
  customGalleryTexture: undefined,
  setLoaded: (loaded) => set({ loaded }),
  toggleNeon: () => set((s) => ({ neonMode: !s.neonMode })),
  setPaletteOpen: (paletteOpen) => set({ paletteOpen }),
  setActiveRoom: (activeRoom) => set({ activeRoom }),
  setCustomGalleryTexture: (customGalleryTexture) => set({ customGalleryTexture })
}));
