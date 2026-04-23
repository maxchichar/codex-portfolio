'use client';

import { useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text } from '@react-three/drei';
import { Group } from 'three';
import { useRef } from 'react';
import { useWorldStore } from '@/lib/store';

function AvatarPortal() {
  const avatar = useRef<Group>(null);
  useFrame((state, dt) => {
    if (!avatar.current) return;
    avatar.current.rotation.y += dt * 0.45;
    avatar.current.position.y = 2.1 + Math.sin(state.clock.elapsedTime * 1.1) * 0.2;
  });

  return (
    <Float speed={1.2} rotationIntensity={0.15} floatIntensity={0.8}>
      <group ref={avatar} position={[0, 2.1, -1.8]}>
        <mesh>
          <cylinderGeometry args={[0.9, 0.9, 0.04, 64]} />
          <meshBasicMaterial color="#d6f5ff" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 0, 0.02]}>
          <circleGeometry args={[0.85, 64]} />
          <meshStandardMaterial map={useMemo(() => null, [])} emissive="#8d5aff" emissiveIntensity={1.2} />
        </mesh>
        <mesh scale={1.15}>
          <torusGeometry args={[0.9, 0.03, 24, 240]} />
          <meshBasicMaterial color="#9f5cff" />
        </mesh>
      </group>
    </Float>
  );
}

export function EntranceRitual() {
  const loaded = useWorldStore((s) => s.loaded);
  const leftDoor = useRef<Group>(null);
  const rightDoor = useRef<Group>(null);

  useFrame((_, dt) => {
    const t = loaded ? 1 : 0;
    if (leftDoor.current) leftDoor.current.position.x += ((-2.8 - leftDoor.current.position.x) * t + (0 - leftDoor.current.position.x) * (1 - t)) * dt * 2;
    if (rightDoor.current) rightDoor.current.position.x += ((2.8 - rightDoor.current.position.x) * t + (0 - rightDoor.current.position.x) * (1 - t)) * dt * 2;
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 3.2, -2.35]}>
        <boxGeometry args={[7.4, 6.8, 0.3]} />
        <meshStandardMaterial color="#11172f" metalness={0.9} roughness={0.2} emissive="#321865" emissiveIntensity={0.5} />
      </mesh>
      <group ref={leftDoor} position={[-0.05, 3.2, -2.2]}>
        <mesh>
          <boxGeometry args={[3.4, 6.4, 0.2]} />
          <MeshTransmissionMaterial roughness={0.09} thickness={0.7} chromaticAberration={0.09} backside />
        </mesh>
      </group>
      <group ref={rightDoor} position={[0.05, 3.2, -2.2]}>
        <mesh>
          <boxGeometry args={[3.4, 6.4, 0.2]} />
          <MeshTransmissionMaterial roughness={0.09} thickness={0.7} chromaticAberration={0.09} backside />
        </mesh>
      </group>
      <Text position={[0, 6.9, -1.2]} fontSize={0.5} letterSpacing={0.04} color="#f4f8ff">
        WELCOME TO MAXCHICHAR PORTFOLIO
      </Text>
      {loaded && <AvatarPortal />}
    </group>
  );
}
