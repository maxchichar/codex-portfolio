import { RoomId } from './store';

export type RoomMeta = {
  id: RoomId;
  title: string;
  position: [number, number, number];
  description: string;
};

export const ROOMS: RoomMeta[] = [
  { id: 'entrance', title: 'Entrance Hall', position: [0, 0, 0], description: 'Door ritual and avatar reveal.' },
  { id: 'about', title: 'About / Origin', position: [24, 0, -12], description: 'Backstory in floating translucent slabs.' },
  { id: 'skills', title: 'Skills Graph', position: [44, 0, -10], description: 'Neural network sphere with node pulses.' },
  { id: 'projects', title: 'Projects Cubes', position: [66, 0, -12], description: 'Enterable project cubes.' },
  { id: 'case-studies', title: 'Case Studies', position: [86, 0, -10], description: 'Forensic deep-dives in data bays.' },
  { id: 'experience', title: 'Experience Crystal', position: [106, 0, -8], description: 'Levitating crystal timeline.' },
  { id: 'testimonials', title: 'Testimonials', position: [126, 0, -8], description: 'Voice pillars with orbital captions.' },
  { id: 'philosophy', title: 'Engineering Philosophy', position: [146, 0, -8], description: 'Manifesto theater.' },
  { id: 'open-source', title: 'Open Source', position: [166, 0, -8], description: 'GitHub constellation galaxy.' },
  { id: 'blog', title: 'Blog Shelves', position: [186, 0, -8], description: 'Holographic rotating shelves.' },
  { id: 'auction', title: 'Gallery Auction Room', position: [210, 0, -2], description: 'Luxury marble room with swappable hero art.' },
  { id: 'contact', title: 'Contact Portal', position: [236, 0, 0], description: 'Portal gate to launch contact channels.' }
];
