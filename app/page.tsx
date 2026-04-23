'use client';

import { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { KeyboardControls, Loader, Stats } from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, Noise } from '@react-three/postprocessing';
import { CinematicLoader } from '@/components/ui/CinematicLoader';
import { OverlayHud } from '@/components/ui/OverlayHud';
import { CommandPalette } from '@/components/ui/CommandPalette';
import { SpatialWorld } from '@/components/scene/SpatialWorld';
import { useWorldStore } from '@/lib/store';

const controls = [
  { name: 'forward', keys: ['ArrowUp', 'KeyW'] },
  { name: 'backward', keys: ['ArrowDown', 'KeyS'] },
  { name: 'left', keys: ['ArrowLeft', 'KeyA'] },
  { name: 'right', keys: ['ArrowRight', 'KeyD'] },
  { name: 'fly', keys: ['Space'] }
];

export default function Page() {
  const loaded = useWorldStore((s) => s.loaded);

  return (
    <main className="relative h-screen w-screen">
      {!loaded && <CinematicLoader />}
      <KeyboardControls map={controls as never}>
        <Canvas dpr={[1, 2]} camera={{ fov: 45, near: 0.1, far: 2000, position: [0, 2.8, 16] }} shadows>
          <color attach="background" args={['#050315']} />
          <fog attach="fog" args={['#06031a', 20, 240]} />
          <Suspense fallback={null}>
            <SpatialWorld />
          </Suspense>
          <EffectComposer multisampling={4}>
            <Bloom intensity={1.2} luminanceThreshold={0.12} mipmapBlur />
            <DepthOfField focusDistance={0.013} focalLength={0.02} bokehScale={2.4} />
            <Vignette eskil={false} offset={0.15} darkness={0.65} />
            <Noise opacity={0.02} />
          </EffectComposer>
          <Stats className="!left-auto !right-2" />
        </Canvas>
      </KeyboardControls>
      <OverlayHud />
      <CommandPalette />
      <Loader containerStyles={{ background: 'transparent' }} />
    </main>
  );
}
