'use client';

import { useEffect } from 'react';
import { Environment, Grid, OrbitControls, PointerLockControls, Sparkles, Stars, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, MathUtils, Vector3 } from 'three';
import { ROOMS } from '@/lib/rooms';
import { useWorldStore } from '@/lib/store';
import { EntranceRitual } from './entrance/EntranceRitual';
import { GalleryAuctionRoom } from './rooms/GalleryAuctionRoom';

function CameraRail() {
  const activeRoom = useWorldStore((s) => s.activeRoom);
  const room = ROOMS.find((r) => r.id === activeRoom) ?? ROOMS[0];
  const { camera } = useThree();
  const target = new Vector3(room.position[0], 2.4, room.position[2] + 11);

  useFrame((_, dt) => {
    camera.position.lerp(target, 1 - Math.exp(-dt * 1.8));
    camera.lookAt(room.position[0], 1.8, room.position[2]);
  });

  return null;
}

function RoomLabels() {
  return (
    <group>
      {ROOMS.map((room) => (
        <group key={room.id} position={room.position}>
          <mesh position={[0, 0, 0]}>
            <boxGeometry args={[8, 0.1, 8]} />
            <meshStandardMaterial color="#130e36" metalness={0.3} roughness={0.4} />
          </mesh>
          <Text position={[0, 2.4, 0]} fontSize={0.65} color="#d8cbff" anchorX="center" anchorY="middle">
            {room.title}
          </Text>
        </group>
      ))}
    </group>
  );
}

export function SpatialWorld() {
  const neonMode = useWorldStore((s) => s.neonMode);

  useEffect(() => {
    document.body.style.background = neonMode ? 'var(--mx-gradient-core)' : '#08090d';
  }, [neonMode]);

  return (
    <>
      <ambientLight intensity={0.25} color={new Color(neonMode ? '#8a74ff' : '#6f7a86')} />
      <pointLight position={[0, 6, 5]} intensity={65} color="#9555ff" decay={2.2} />
      <pointLight position={[210, 8, -4]} intensity={85} color="#9ddbff" decay={1.9} />
      <spotLight
        position={[210, 14, -2]}
        angle={MathUtils.degToRad(28)}
        intensity={160}
        distance={45}
        penumbra={0.7}
        color="#f3f7ff"
        castShadow
      />

      <Grid args={[420, 84]} cellColor="#7d4aff" sectionColor="#29145f" fadeDistance={260} fadeStrength={1.6} />
      <Stars radius={280} depth={70} count={9000} factor={4} saturation={0} fade speed={0.35} />
      <Sparkles count={280} size={2} speed={0.4} color="#9f5cff" scale={[320, 80, 120]} />
      <Environment preset="night" />

      <RoomLabels />
      <EntranceRitual />
      <GalleryAuctionRoom position={[210, 0.1, -2]} />

      <CameraRail />
      <PointerLockControls pointerSpeed={0.5} />
      <OrbitControls enablePan enableZoom enableRotate dampingFactor={0.08} enableDamping />
    </>
  );
}
