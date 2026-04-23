/* Offline typecheck shims for dependency-restricted environments. */

type Setter<T> = T | ((prev: T) => T);

declare module 'react' {
  export type ReactNode = any;
  export type ChangeEvent<T = any> = { target: T };
  export type DragEvent<T = any> = { preventDefault: () => void; dataTransfer: { files?: FileList }; target: T };
  export const Suspense: any;
  export function useState<T = any>(initial: T): [T, (next: Setter<T>) => void];
  export function useEffect(effect: (...args: any[]) => any, deps?: any[]): void;
  export function useMemo<T>(factory: () => T, deps?: any[]): T;
  export function useRef<T = any>(initial: T): { current: T };
}

declare module 'next' {
  export type Metadata = Record<string, any>;
  export type NextConfig = Record<string, any>;
}

declare module 'next/font/google' {
  export const JetBrains_Mono: any;
  export const Space_Grotesk: any;
}

declare module '@react-three/fiber' {
  export const Canvas: any;
  export const useFrame: any;
  export const useThree: any;
}

declare module '@react-three/drei' {
  export const KeyboardControls: any;
  export const Loader: any;
  export const Stats: any;
  export const Environment: any;
  export const Grid: any;
  export const OrbitControls: any;
  export const PointerLockControls: any;
  export const Sparkles: any;
  export const Stars: any;
  export const Text: any;
  export const Float: any;
  export const MeshTransmissionMaterial: any;
  export const useTexture: any;
}

declare module '@react-three/postprocessing' {
  export const EffectComposer: any;
  export const Bloom: any;
  export const DepthOfField: any;
  export const Vignette: any;
  export const Noise: any;
}

declare module 'three' {
  export const MathUtils: any;
  export class Group {
    [key: string]: any;
  }
  export class Vector3 {
    constructor(...args: any[]);
    set(...args: any[]): this;
  }
  export class Color {
    constructor(...args: any[]);
  }
}

declare module 'zustand' {
  export function create<T>(factory: (set: any) => T): (selector?: any) => any;
}

declare module 'tailwindcss' {
  export type Config = any;
}

declare namespace React {
  type ReactNode = any;
}

declare namespace JSX {
  interface IntrinsicElements {
    [elemName: string]: any;
  }
}
