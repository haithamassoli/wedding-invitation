import { useMemo } from "react";

export function GoldParticles({ count = 20 }: { count?: number }) {
  const particles = useMemo(
    () =>
      Array.from({ length: count }, (_, i) => ({
        id: i,
        left: `${Math.random() * 100}%`,
        size: Math.random() * 3 + 2,
        duration: `${Math.random() * 6 + 6}s`,
        delay: `${Math.random() * 8}s`,
        opacity: Math.random() * 0.4 + 0.2,
      })),
    [count]
  );

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map((p) => (
        <span
          key={p.id}
          className="particle"
          style={{
            left: p.left,
            bottom: "-10px",
            width: `${p.size}px`,
            height: `${p.size}px`,
            "--duration": p.duration,
            "--delay": p.delay,
            opacity: p.opacity,
          } as React.CSSProperties}
        />
      ))}
    </div>
  );
}
