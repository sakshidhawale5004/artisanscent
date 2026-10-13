import { useState, useEffect } from 'react';

interface Petal {
  id: number;
  left: number; // percentage 0-100
  size: number; // pixel size 16-32
  duration: number; // animation seconds 8-16
  delay: number; // start delay in seconds
  rotate: number; // initial rotation
  swayAmount: number; // horizontal sway distance
  opacity: number;
  hue: 'rose' | 'blush' | 'gold';
}

export function FloatingRosePetals({ count = 12 }: { count?: number }) {
  const [petals, setPetals] = useState<Petal[]>([]);
  const [reducedMotion, setReducedMotion] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setReducedMotion(true);
      return;
    }

    const items: Petal[] = [];
    const hues: ('rose' | 'blush' | 'gold')[] = ['rose', 'blush', 'blush', 'gold', 'rose'];

    for (let i = 0; i < count; i++) {
      items.push({
        id: i,
        left: Math.random() * 94 + 3,
        size: Math.floor(Math.random() * 14 + 18),
        duration: 9 + Math.random() * 8,
        delay: Math.random() * 7,
        rotate: Math.floor(Math.random() * 360),
        swayAmount: 30 + Math.random() * 45,
        opacity: 0.55 + Math.random() * 0.35,
        hue: hues[i % hues.length],
      });
    }

    setPetals(items);
  }, [count]);

  if (reducedMotion || petals.length === 0) return null;

  return (
    <div className="floating-petals-viewport" aria-hidden="true">
      {petals.map((p) => (
        <div
          key={p.id}
          className={`floating-petal petal-${p.hue}`}
          style={{
            left: `${p.left}%`,
            width: `${p.size}px`,
            height: `${Math.round(p.size * 1.3)}px`,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
            opacity: p.opacity,
            ['--sway' as string]: `${p.swayAmount}px`,
            ['--init-rot' as string]: `${p.rotate}deg`,
          }}
        >
          {/* Organic Curved Rose Petal SVG Shape with Delicate Specular Gradient */}
          <svg
            viewBox="0 0 40 52"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="petal-svg"
          >
            <defs>
              <linearGradient id={`petal-grad-${p.id}`} x1="0%" y1="0%" x2="100%" y2="100%">
                {p.hue === 'rose' ? (
                  <>
                    <stop offset="0%" stopColor="#f7d5cc" stopOpacity="0.95" />
                    <stop offset="60%" stopColor="#e8a89a" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#c9826d" stopOpacity="0.75" />
                  </>
                ) : p.hue === 'gold' ? (
                  <>
                    <stop offset="0%" stopColor="#fff2be" stopOpacity="0.9" />
                    <stop offset="55%" stopColor="#e6ca65" stopOpacity="0.8" />
                    <stop offset="100%" stopColor="#d4af37" stopOpacity="0.7" />
                  </>
                ) : (
                  <>
                    <stop offset="0%" stopColor="#fdf0ed" stopOpacity="0.95" />
                    <stop offset="50%" stopColor="#f2c5be" stopOpacity="0.85" />
                    <stop offset="100%" stopColor="#dca094" stopOpacity="0.75" />
                  </>
                )}
              </linearGradient>
              <radialGradient id={`petal-sheen-${p.id}`} cx="40%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ffffff" stopOpacity="0.6" />
                <stop offset="100%" stopColor="#ffffff" stopOpacity="0" />
              </radialGradient>
            </defs>
            <path
              d="M20 2C31 2 39 15 38 31C37 44 28 50 20 50C12 50 3 44 2 31C1 15 9 2 20 2Z"
              fill={`url(#petal-grad-${p.id})`}
            />
            {/* Subtle highlight sheen */}
            <path
              d="M18 5C26 5 32 14 31 26C30 36 24 42 18 42C13 42 7 36 6 26C5 14 11 5 18 5Z"
              fill={`url(#petal-sheen-${p.id})`}
            />
          </svg>
        </div>
      ))}
    </div>
  );
}
