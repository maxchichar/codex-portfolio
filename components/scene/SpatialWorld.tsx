'use client';

import { useEffect, useMemo, useRef } from 'react';
import { Environment, Grid, OrbitControls, PointerLockControls, Sparkles, Stars, Text } from '@react-three/drei';
import { useFrame, useThree } from '@react-three/fiber';
import { Color, Group, MathUtils, Vector3 } from 'three';
import { ROOMS } from '@/lib/rooms';
import { useWorldStore } from '@/lib/store';
import { EntranceRitual } from './entrance/EntranceRitual';
import { GalleryAuctionRoom } from './rooms/GalleryAuctionRoom';

function CameraRail() {
  const activeRoom = useWorldStore((s) => s.activeRoom);
  const room = ROOMS.find((r) => r.id === activeRoom) ?? ROOMS[0];
  const { camera } = useThree();
  const target = useMemo(() => new Vector3(), []);

  useFrame((_, dt) => {
    target.set(room.position[0], 2.8, room.position[2] + 10);
    camera.position.lerp(target, 1 - Math.exp(-dt * 2.1));
    camera.lookAt(room.position[0], 1.9, room.position[2] - 1.8);
  });

  return null;
}

function RoomPlinths() {
  return (
    <group>
      {ROOMS.map((room, index) => (
        <group key={room.id} position={room.position}>
          <mesh position={[0, 0, 0]} receiveShadow>
            <boxGeometry args={[10, 0.1, 10]} />
            <meshStandardMaterial color="#130e36" metalness={0.25} roughness={0.48} />
          </mesh>

          <mesh position={[0, 1.05, -2.2]}>
            <octahedronGeometry args={[0.85 + (index % 3) * 0.2, 0]} />
            <meshPhysicalMaterial color="#8b67ff" emissive="#5c2bff" emissiveIntensity={0.8} roughness={0.26} metalness={0.42} />
          </mesh>

          <Text position={[0, 2.9, 0]} fontSize={0.62} color="#d8cbff" anchorX="center" anchorY="middle">
            {room.title}
          </Text>
        </group>
      ))}
    </group>
  );
}

function DynamicLightRig() {
  const accent = useRef<Group>(null);
  const activeRoom = useWorldStore((s) => s.activeRoom);
  const room = ROOMS.find((r) => r.id === activeRoom) ?? ROOMS[0];

  useFrame((state, dt) => {
    if (!accent.current) return;
    accent.current.position.x = MathUtils.damp(accent.current.position.x, room.position[0], 3, dt);
    accent.current.position.z = MathUtils.damp(accent.current.position.z, room.position[2] + 2, 3, dt);
    accent.current.position.y = 9 + Math.sin(state.clock.elapsedTime * 1.8) * 0.8;
  });

  return (
    <group ref={accent} position={[0, 9, 2]}>
      <pointLight intensity={90} distance={38} color="#8c63ff" decay={2} />
      <pointLight intensity={55} distance={32} color="#5ab8ff" decay={2} position={[2, 1, -4]} />
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
      <ambientLight intensity={0.22} color={new Color(neonMode ? '#8a74ff' : '#6f7a86')} />
      <spotLight
        position={[210, 14, -2]}
        angle={MathUtils.degToRad(28)}
        intensity={145}
        distance={46}
        penumbra={0.75}
        color="#f3f7ff"
        castShadow
      />

      <DynamicLightRig />
      <Grid args={[460, 92]} cellColor="#7d4aff" sectionColor="#29145f" fadeDistance={280} fadeStrength={1.7} />
      <Stars radius={300} depth={74} count={9000} factor={4} saturation={0} fade speed={0.35} />
      <Sparkles count={320} size={2.2} speed={0.4} color="#9f5cff" scale={[340, 90, 140]} />
      <Environment preset="night" />

      <RoomPlinths />
      <EntranceRitual />
      <GalleryAuctionRoom position={[210, 0.1, -2]} />

      <CameraRail />
      <PointerLockControls pointerSpeed={0.45} />
      <OrbitControls enablePan enableZoom enableRotate dampingFactor={0.08} enableDamping minDistance={3.6} maxDistance={32} />
    </>
  );
}
