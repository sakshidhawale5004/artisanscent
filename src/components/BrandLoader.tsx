import { useState, useEffect } from 'react';

export function BrandLoader({ onComplete }: { onComplete: () => void }) {
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const timeout = setTimeout(() => {
      setIsFading(true);
      const fadeTimeout = setTimeout(() => {
        onComplete();
      }, 1200);
      return () => clearTimeout(fadeTimeout);
    }, 30000);

    return () => clearTimeout(timeout);
  }, [onComplete]);

  return (
    <div
      className={`luxury-brand-loader-3d ${isFading ? 'luxury-loader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Artisan Scent"
    >
      {/* Layered backdrop */}
      <div className="loader-bg-layer-1" aria-hidden="true" />
      <div className="loader-bg-layer-2" aria-hidden="true" />

      <div className="loader-3d-stage">
        {/* 360 rotation indicator */}
        <div className="rotation-indicator" aria-hidden="true">360°</div>

        {/* 3D Container with perspective */}
        <div className="bottle-3d-container">
          <svg
            className="perfume-bottle-3d-faceted"
            viewBox="0 0 280 380"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              {/* Faceted crystal glass gradients */}
              <linearGradient id="facet1" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#e8d7f8" />
                <stop offset="50%" stopColor="#d4b5f0" />
                <stop offset="100%" stopColor="#c99be8" />
              </linearGradient>

              <linearGradient id="facet2" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4b5f0" />
                <stop offset="50%" stopColor="#b89ee0" />
                <stop offset="100%" stopColor="#a885d8" />
              </linearGradient>

              <linearGradient id="facet3" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#c99be8" />
                <stop offset="50%" stopColor="#b383e0" />
                <stop offset="100%" stopColor="#9d6bd8" />
              </linearGradient>

              <linearGradient id="lightFacet" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#f5e9ff" />
                <stop offset="100%" stopColor="rgba(255,255,255,0.3)" />
              </linearGradient>

              <linearGradient id="capGold" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#ffd700" />
                <stop offset="50%" stopColor="#f0c874" />
                <stop offset="100%" stopColor="#d4af37" />
              </linearGradient>

              <radialGradient id="goldShine" cx="30%" cy="30%" r="60%">
                <stop offset="0%" stopColor="#ffed4e" />
                <stop offset="100%" stopColor="#c99be8" />
              </radialGradient>

              <filter id="crystalShadow">
                <feDropShadow dx="0" dy="20" stdDeviation="25" floodOpacity="0.2" />
              </filter>
            </defs>

            {/* Gold cap */}
            <g filter="url(#crystalShadow)">
              <ellipse cx="140" cy="30" rx="22" ry="8" fill="url(#capGold)" />
              <path d="M 118 30 Q 118 18 140 15 Q 162 18 162 30" fill="url(#capGold)" opacity="0.8" />
              <circle cx="140" cy="25" r="3" fill="#ffed4e" opacity="0.6" />
            </g>

            {/* Bottle neck */}
            <path
              d="M 120 35 L 110 55 L 170 55 L 160 35 Z"
              fill="url(#lightFacet)"
              stroke="#d4b5f0"
              strokeWidth="1.5"
              opacity="0.9"
            />

            {/* Main crystal bottle - faceted geometric design */}
            
            {/* Front top facet */}
            <polygon
              points="110,55 140,45 170,55 155,75 125,75"
              fill="url(#facet1)"
              stroke="#b89ee0"
              strokeWidth="1"
              opacity="0.95"
            />

            {/* Left front facet */}
            <polygon
              points="95,75 125,75 120,130 90,120"
              fill="url(#facet2)"
              stroke="#a885d8"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Right front facet */}
            <polygon
              points="155,75 185,75 190,120 160,130"
              fill="url(#facet1)"
              stroke="#b89ee0"
              strokeWidth="1"
              opacity="0.95"
            />

            {/* Center front large facet */}
            <polygon
              points="125,75 155,75 160,130 120,130"
              fill="url(#facet3)"
              stroke="#9d6bd8"
              strokeWidth="1"
              opacity="0.92"
            />

            {/* Left side facet */}
            <polygon
              points="90,120 120,130 115,190 85,180"
              fill="url(#facet2)"
              stroke="#a885d8"
              strokeWidth="1"
              opacity="0.88"
            />

            {/* Right side facet */}
            <polygon
              points="160,130 190,120 195,180 165,190"
              fill="url(#facet1)"
              stroke="#b89ee0"
              strokeWidth="1"
              opacity="0.88"
            />

            {/* Bottom left facet */}
            <polygon
              points="85,180 115,190 110,280 80,270"
              fill="url(#lightFacet)"
              stroke="#d4b5f0"
              strokeWidth="1"
              opacity="0.85"
            />

            {/* Bottom right facet */}
            <polygon
              points="165,190 195,180 200,270 170,280"
              fill="url(#facet2)"
              stroke="#a885d8"
              strokeWidth="1"
              opacity="0.85"
            />

            {/* Bottom center facet */}
            <polygon
              points="110,280 115,190 165,190 170,280"
              fill="url(#facet3)"
              stroke="#9d6bd8"
              strokeWidth="1"
              opacity="0.9"
            />

            {/* Bottom base */}
            <ellipse cx="140" cy="285" rx="35" ry="12" fill="url(#facet2)" opacity="0.7" />

            {/* Light reflection on facets */}
            <polygon
              points="125,75 140,60 150,75 140,85"
              fill="url(#lightFacet)"
              opacity="0.8"
            />

            {/* Shimmer effect */}
            <ellipse cx="125" cy="120" rx="8" ry="25" fill="#ffffff" opacity="0.4" />

            {/* Center light beam */}
            <path
              d="M 140 80 Q 142 150 138 270"
              stroke="#ffffff"
              strokeWidth="2"
              opacity="0.3"
              fill="none"
            />
          </svg>

          {/* Rotating rings around bottle */}
          <div className="bottle-ring-1" aria-hidden="true" />
          <div className="bottle-ring-2" aria-hidden="true" />

          {/* Floating particles */}
          <div class="bottle-particles" aria-hidden="true">
            <div class="crystal-particle p1" />
            <div class="crystal-particle p2" />
            <div class="crystal-particle p3" />
            <div class="crystal-particle p4" />
          </div>
        </div>

        {/* Pulsing glow */}
        <div class="bottle-glow-pulse" aria-hidden="true" />
      </div>
    </div>
  );
}
