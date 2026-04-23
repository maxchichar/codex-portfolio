'use client';

import { useMemo } from 'react';
import { useTexture } from '@react-three/drei';
import { useWorldStore } from '@/lib/store';

export function GalleryAuctionRoom({ position }: { position: [number, number, number] }) {
  const customTexture = useWorldStore((s) => s.customGalleryTexture);
  const textureUrl = customTexture ?? '/assets/gallery-placeholder.svg';
  const artTexture = useTexture(textureUrl);

  const pedestalProps = useMemo(() => ({ roughness: 0.1, metalness: 0.3 }), []);

  return (
    <group position={position}>
      <mesh receiveShadow position={[0, 0, 0]}>
        <boxGeometry args={[14, 0.1, 14]} />
        <meshPhysicalMaterial color="#eef2ff" roughness={0.18} metalness={0.08} clearcoat={0.6} />
      </mesh>

      <mesh position={[0, 2.8, -4.2]}>
        <boxGeometry args={[7.2, 4.5, 0.18]} />
        <meshPhysicalMaterial color="#f8fbff" transmission={0.1} roughness={0.04} metalness={0.2} />
      </mesh>

      <mesh position={[0, 2.8, -4.08]}>
        <planeGeometry args={[6.4, 3.8]} />
        <meshStandardMaterial map={artTexture} emissive="#4d3fa9" emissiveIntensity={0.2} />
      </mesh>

      <mesh position={[0, 1.1, -1.7]} castShadow>
        <cylinderGeometry args={[1.2, 1.5, 2.2, 64]} />
        <meshStandardMaterial color="#edf4ff" {...pedestalProps} />
      </mesh>

      <mesh position={[0, 2.6, -1.7]}>
        <icosahedronGeometry args={[0.8, 1]} />
        <meshPhysicalMaterial color="#ab92ff" emissive="#6639ff" emissiveIntensity={1.4} transmission={0.75} thickness={0.4} />
      </mesh>
    </group>
  );
}
