export const DESIGN_SYSTEM = {
  visualDna: {
    primary: '#9f5cff',
    secondary: '#5f9cff',
    accent: '#ff4ae8',
    deepVoid: '#06031a',
    marbleHighlight: '#f1f3ff'
  },
  gradients: {
    spectrum: ['#9f5cff', '#7f6dff', '#5f9cff'],
    aura: 'radial-gradient(circle, rgba(159,92,255,0.45), rgba(6,3,26,0.1) 60%)'
  },
  materials: {
    glass: {
      transmission: 0.78,
      roughness: 0.08,
      metalness: 0.35,
      thickness: 1.4,
      ior: 1.2
    },
    metal: {
      roughness: 0.2,
      metalness: 0.9,
      envMapIntensity: 1.6
    },
    hologram: {
      opacity: 0.6,
      emissiveIntensity: 2.2,
      blending: 'AdditiveBlending'
    }
  },
  typography: {
    display: 'Space Grotesk',
    mono: 'JetBrains Mono'
  }
};
