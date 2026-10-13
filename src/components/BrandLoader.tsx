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
      }, 1000);
      return () => clearTimeout(fadeTimeout);
    }, 2400);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      className={`luxury-brand-loader ${isFading ? 'luxury-loader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Artisan Scent"
    >
      {/* Multi-layer backdrop glow */}
      <div className="loader-backdrop-glow" aria-hidden="true" />
      <div className="loader-backdrop-secondary" aria-hidden="true" />

      <div className="loader-perfume-container">
        {/* Outer rotating rings - premium effect */}
        <div className="loader-ring-outer-premium" aria-hidden="true" />
        <div className="loader-ring-mid-premium" aria-hidden="true" />

        {/* Premium 3D Perfume Bottle */}
        <svg
          className="perfume-bottle-3d-premium"
          viewBox="0 0 200 340"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Glass gradients for realism */}
            <linearGradient id="glassGradient" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#fefdfb" />
              <stop offset="40%" stopColor="#ffffff" />
              <stop offset="60%" stopColor="#f5f3f0" />
              <stop offset="100%" stopColor="#e6e2dc" />
            </linearGradient>
            
            <linearGradient id="liquidGold" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#ffd700" />
              <stop offset="50%" stopColor="#ffed4e" />
              <stop offset="100%" stopColor="#d4af37" />
            </linearGradient>

            <radialGradient id="capShine" cx="30%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#4a4a4a" />
              <stop offset="50%" stopColor="#1a1a1a" />
              <stop offset="100%" stopColor="#0a0a0a" />
            </radialGradient>

            <radialGradient id="glassShine" cx="25%" cy="25%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.8)" />
              <stop offset="40%" stopColor="rgba(255,255,255,0.3)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <filter id="shadowFilter">
              <feGaussianBlur in="SourceGraphic" stdDeviation="3" />
            </filter>

            {/* Luxury scent particle effect */}
            <linearGradient id="sparkle" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.9)" />
              <stop offset="100%" stopColor="rgba(212,175,55,0.4)" />
            </linearGradient>
          </defs>

          {/* Cap - Premium black lacquer finish */}
          <g>
            <rect x="80" y="15" width="40" height="12" fill="url(#capShine)" rx="3" />
            <rect x="76" y="28" width="48" height="8" fill="#0d0d0d" rx="2" />
            <ellipse cx="100" cy="28" rx="24" ry="4" fill="rgba(255,255,255,0.1)" />
          </g>

          {/* Neck - Tapered elegance */}
          <path
            d="M 82 36 L 75 55 L 125 55 L 118 36 Z"
            fill="url(#glassGradient)"
            stroke="#ddd8d0"
            strokeWidth="1"
            opacity="0.95"
          />
          <ellipse cx="100" cy="55" rx="26" ry="6" fill="url(#glassGradient)" opacity="0.8" />

          {/* Main bottle body - classic perfume silhouette */}
          <path
            d="M 70 55 Q 60 95 62 155 Q 65 185 70 210 Q 100 228 130 210 Q 135 185 138 155 Q 140 95 130 55 Z"
            fill="url(#glassGradient)"
            stroke="#ddd8d0"
            strokeWidth="1.2"
            opacity="0.92"
          />

          {/* Inner liquid - premium gold */}
          <defs>
            <clipPath id="liquidClip">
              <path d="M 70 55 Q 60 95 62 155 Q 65 185 70 210 Q 100 228 130 210 Q 135 185 138 155 Q 140 95 130 55 Z" />
            </clipPath>
          </defs>
          
          <g clipPath="url(#liquidClip)">
            <rect x="55" y="145" width="90" height="100" fill="url(#liquidGold)" opacity="0.9" />
            {/* Liquid shimmer */}
            <ellipse cx="100" cy="180" rx="20" ry="30" fill="rgba(255,255,255,0.2)" opacity="0.6" />
          </g>

          {/* Glass shine - high-end realism */}
          <ellipse cx="78" cy="95" rx="14" ry="40" fill="url(#glassShine)" opacity="0.9" />
          <ellipse cx="115" cy="120" rx="8" ry="25" fill="rgba(255,255,255,0.3)" opacity="0.5" />

          {/* Neck highlight */}
          <ellipse cx="100" cy="42" rx="10" ry="6" fill="rgba(255,255,255,0.6)" />

          {/* Bottom detail - premium finishing */}
          <ellipse cx="100" cy="212" rx="32" ry="6" fill="#d4d0c8" opacity="0.35" />
          <circle cx="100" cy="216" r="1.5" fill="#aa7c11" opacity="0.9" />
        </svg>

        {/* Animated glow particles around bottle */}
        <div className="loader-particles" aria-hidden="true">
          <div className="particle particle-1" />
          <div className="particle particle-2" />
          <div className="particle particle-3" />
          <div className="particle particle-4" />
        </div>

        {/* Central aura pulses */}
        <div className="loader-aura-pulse-1" aria-hidden="true" />
        <div className="loader-aura-pulse-2" aria-hidden="true" />
      </div>
    </div>
  );
}
