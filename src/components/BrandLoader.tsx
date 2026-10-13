import { useState, useEffect } from 'react';

export function BrandLoader({ onComplete }: { onComplete: () => void }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const timeout = setTimeout(() => {
      setIsFading(true);
      const fadeTimeout = setTimeout(() => {
        onComplete();
      }, 800);
      return () => clearTimeout(fadeTimeout);
    }, 2200);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      className={`luxury-brand-loader ${isFading ? 'luxury-loader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Artisan Scent"
    >
      <div className="loader-backdrop-glow" aria-hidden="true" />

      <div className="loader-perfume-container">
        <svg
          className="perfume-bottle-3d"
          viewBox="0 0 200 300"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="bottleGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f7f5f0" />
              <stop offset="50%" stopColor="#ffffff" />
              <stop offset="100%" stopColor="#e8e4da" />
            </linearGradient>
            <linearGradient id="liquidGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f3e5ab" />
              <stop offset="100%" stopColor="#aa7c11" />
            </linearGradient>
            <linearGradient id="capGradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#2d2d2d" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0d0d0d" />
            </linearGradient>
            <filter id="gloss">
              <feGaussianBlur in="SourceGraphic" stdDeviation="2" />
            </filter>
            <radialGradient id="shine" cx="35%" cy="35%" r="50%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.6)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>
          </defs>

          {/* Bottle Cap - Luxury Flat Top */}
          <rect x="75" y="18" width="50" height="8" fill="url(#capGradient)" rx="2" />
          <rect x="72" y="26" width="56" height="6" fill="#1a1a1a" rx="1" />

          {/* Bottle Neck - Elegant Taper */}
          <path
            d="M 80 32 L 75 50 L 125 50 L 120 32 Z"
            fill="url(#bottleGradient)"
            stroke="#d4d0c8"
            strokeWidth="0.8"
          />

          {/* Main Bottle Body - Classic Perfume Shape */}
          <ellipse cx="100" cy="65" rx="28" ry="8" fill="url(#bottleGradient)" opacity="0.9" />
          <path
            d="M 72 50 Q 60 100 65 160 Q 68 180 72 195 Q 100 210 128 195 Q 132 180 135 160 Q 140 100 128 50 Z"
            fill="url(#bottleGradient)"
            stroke="#d4d0c8"
            strokeWidth="0.8"
          />

          {/* Liquid Inside - Gold Luxe */}
          <defs>
            <clipPath id="bottleClip">
              <path d="M 72 50 Q 60 100 65 160 Q 68 180 72 195 Q 100 210 128 195 Q 132 180 135 160 Q 140 100 128 50 Z" />
            </clipPath>
          </defs>
          <rect
            x="60"
            y="130"
            width="80"
            height="80"
            fill="url(#liquidGradient)"
            clipPath="url(#bottleClip)"
            opacity="0.85"
          />

          {/* Glossy Shine Effect on Bottle */}
          <ellipse cx="85" cy="90" rx="12" ry="35" fill="url(#shine)" opacity="0.7" />

          {/* Highlight on Neck */}
          <ellipse cx="102" cy="40" rx="8" ry="4" fill="rgba(255,255,255,0.5)" />

          {/* Bottom Detail */}
          <ellipse cx="100" cy="200" rx="30" ry="6" fill="#d4d0c8" opacity="0.4" />

          {/* Decorative Bottom Mark */}
          <circle cx="100" cy="205" r="2" fill="#aa7c11" opacity="0.8" />
        </svg>

        {/* Rotating Aura Ring */}
        <div className="loader-aura-ring" aria-hidden="true" />
      </div>
    </div>
  );
}
