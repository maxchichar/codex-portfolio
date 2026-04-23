'use client';

import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Float, MeshTransmissionMaterial, Text, useTexture } from '@react-three/drei';
import { Group, MathUtils } from 'three';
import { useWorldStore } from '@/lib/store';

function AvatarPortal() {
  const avatar = useRef<Group>(null);
  const avatarTexture = useTexture('/assets/avatar-source.svg');

  useFrame((state, dt) => {
    if (!avatar.current) return;
    avatar.current.rotation.y += dt * 0.45;
    avatar.current.position.y = 2.2 + Math.sin(state.clock.elapsedTime * 0.9) * 0.18;
  });

  return (
    <Float speed={1.4} rotationIntensity={0.22} floatIntensity={1.1}>
      <group ref={avatar} position={[0, 2.25, -1.35]}>
        <mesh>
          <circleGeometry args={[0.95, 96]} />
          <meshPhysicalMaterial
            map={avatarTexture}
            transmission={0.14}
            thickness={0.4}
            roughness={0.24}
            metalness={0.12}
            emissive="#8d5aff"
            emissiveIntensity={0.28}
          />
        </mesh>

        <mesh position={[0, 0, -0.02]}>
          <circleGeometry args={[1.05, 96]} />
          <meshBasicMaterial color="#8b65ff" transparent opacity={0.2} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, 0]} scale={1.18}>
          <torusGeometry args={[0.94, 0.03, 20, 180]} />
          <meshBasicMaterial color="#c0adff" transparent opacity={0.85} />
        </mesh>

        <mesh rotation={[Math.PI / 2, 0, Math.PI / 2]} scale={1.05}>
          <torusGeometry args={[0.94, 0.015, 20, 180]} />
          <meshBasicMaterial color="#4fa1ff" transparent opacity={0.55} />
        </mesh>
      </group>
    </Float>
  );
}

export function EntranceRitual() {
  const loaded = useWorldStore((s) => s.loaded);
  const leftDoor = useRef<Group>(null);
  const rightDoor = useRef<Group>(null);
  const energyCore = useRef<Group>(null);

  useFrame((state, dt) => {
    const target = loaded ? 2.95 : 0.02;
    if (leftDoor.current) {
      leftDoor.current.position.x = MathUtils.damp(leftDoor.current.position.x, -target, 5.2, dt);
    }
    if (rightDoor.current) {
      rightDoor.current.position.x = MathUtils.damp(rightDoor.current.position.x, target, 5.2, dt);
    }
    if (energyCore.current) {
      energyCore.current.rotation.z += dt * 0.8;
      const pulse = 0.55 + Math.sin(state.clock.elapsedTime * 3.1) * 0.2;
      energyCore.current.scale.setScalar(pulse);
    }
  });

  return (
    <group position={[0, 0, 0]}>
      <mesh position={[0, 3.25, -2.35]}>
        <boxGeometry args={[8.2, 7.1, 0.34]} />
        <meshStandardMaterial color="#0d1026" metalness={0.92} roughness={0.18} emissive="#25104f" emissiveIntensity={0.45} />
      </mesh>

      <group ref={leftDoor} position={[-0.02, 3.2, -2.21]}>
        <mesh>
          <boxGeometry args={[3.9, 6.4, 0.21]} />
          <MeshTransmissionMaterial roughness={0.08} thickness={0.8} chromaticAberration={0.1} anisotropy={0.4} backside />
        </mesh>
      </group>

      <group ref={rightDoor} position={[0.02, 3.2, -2.21]}>
        <mesh>
          <boxGeometry args={[3.9, 6.4, 0.21]} />
          <MeshTransmissionMaterial roughness={0.08} thickness={0.8} chromaticAberration={0.1} anisotropy={0.4} backside />
        </mesh>
      </group>

      <group ref={energyCore} position={[0, 3.2, -2.01]}>
        <mesh>
          <torusGeometry args={[0.55, 0.08, 24, 128]} />
          <meshBasicMaterial color="#9f5cff" />
        </mesh>
      </group>

      <Text position={[0, 7.05, -1.15]} fontSize={0.52} letterSpacing={0.05} color="#f4f8ff">
        WELCOME TO MAXCHICHAR PORTFOLIO
      </Text>

      {loaded && <AvatarPortal />}
    </group>
  );
}
