'use client';

import { useEffect, useState } from 'react';

export function PerformanceDashboard() {
  const [fps, setFps] = useState(0);

  useEffect(() => {
    let frames = 0;
    let last = performance.now();
    let raf = 0;

    const tick = (time: number) => {
      frames += 1;
      if (time > last + 1000) {
        setFps(Math.round((frames * 1000) / (time - last)));
        last = time;
        frames = 0;
      }
      raf = requestAnimationFrame(tick);
    };

    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, []);

  return (
    <div className="glass-panel pointer-events-auto absolute bottom-4 right-4 z-30 rounded-xl px-3 py-2 text-xs">
      <p className="font-mono text-[#b4cfff]">PERF DASH</p>
      <p>FPS: {fps}</p>
      <p>Target: 60</p>
      <p>Render: Adaptive DPR</p>
    </div>
  );
}
