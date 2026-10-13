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
      className={`luxury-brand-loader-premium ${isFading ? 'luxury-loader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Artisan Scent"
    >
      {/* Layered backdrop with multiple glows */}
      <div className="loader-bg-layer-1" aria-hidden="true" />
      <div className="loader-bg-layer-2" aria-hidden="true" />
      <div className="loader-bg-layer-3" aria-hidden="true" />

      <div className="loader-center-stage">
        {/* Outer hexagon ring */}
        <svg className="loader-hexagon-outer" viewBox="0 0 400 400" aria-hidden="true">
          <defs>
            <linearGradient id="hexGrad1" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#d4af37" />
              <stop offset="50%" stopColor="#f3e5ab" />
              <stop offset="100%" stopColor="#aa7c11" />
            </linearGradient>
          </defs>
          <polygon
            points="200,50 350,125 350,275 200,350 50,275 50,125"
            fill="none"
            stroke="url(#hexGrad1)"
            strokeWidth="1.5"
            opacity="0.6"
          />
        </svg>

        {/* Inner circle rings */}
        <div className="loader-circle-1" aria-hidden="true" />
        <div className="loader-circle-2" aria-hidden="true" />
        <div className="loader-circle-3" aria-hidden="true" />

        {/* Ultra-premium perfume bottle */}
        <svg
          className="perfume-bottle-ultra"
          viewBox="0 0 240 420"
          xmlns="http://www.w3.org/2000/svg"
          aria-hidden="true"
        >
          <defs>
            {/* Complex glass gradients */}
            <linearGradient id="bottleBody" x1="0%" y1="0%" x2="100%" y2="0%">
              <stop offset="0%" stopColor="#f9f7f3" />
              <stop offset="30%" stopColor="#ffffff" />
              <stop offset="50%" stopColor="#faf8f5" />
              <stop offset="70%" stopColor="#f5f2ed" />
              <stop offset="100%" stopColor="#ede8e0" />
            </linearGradient>

            <linearGradient id="capMetal" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#424242" />
              <stop offset="30%" stopColor="#1a1a1a" />
              <stop offset="70%" stopColor="#0d0d0d" />
              <stop offset="100%" stopColor="#000000" />
            </linearGradient>

            <radialGradient id="liquidPremium" cx="40%" cy="30%" r="60%">
              <stop offset="0%" stopColor="#fff8dc" />
              <stop offset="40%" stopColor="#ffd700" />
              <stop offset="80%" stopColor="#d4af37" />
              <stop offset="100%" stopColor="#b8860b" />
            </radialGradient>

            <radialGradient id="bottleGloss" cx="20%" cy="20%" r="70%">
              <stop offset="0%" stopColor="rgba(255,255,255,0.95)" />
              <stop offset="20%" stopColor="rgba(255,255,255,0.5)" />
              <stop offset="50%" stopColor="rgba(255,255,255,0.1)" />
              <stop offset="100%" stopColor="rgba(255,255,255,0)" />
            </radialGradient>

            <filter id="premiumShadow">
              <feDropShadow dx="0" dy="8" stdDeviation="12" floodOpacity="0.25" />
              <feDropShadow dx="0" dy="20" stdDeviation="40" floodOpacity="0.15" />
            </filter>
          </defs>

          {/* Stopper/Cap */}
          <g filter="url(#premiumShadow)">
            <rect x="95" y="8" width="50" height="6" fill="url(#capMetal)" rx="1" />
            <rect x="90" y="14" width="60" height="4" fill="#0a0a0a" rx="1" />
            <ellipse cx="120" cy="14" rx="30" ry="2" fill="rgba(100,100,100,0.3)" />
          </g>

          {/* Neck Flange */}
          <path
            d="M 92 18 L 85 28 L 155 28 L 148 18 Z"
            fill="url(#bottleBody)"
            stroke="#e0dbd3"
            strokeWidth="0.8"
          />
          <ellipse cx="120" cy="28" rx="35" ry="5" fill="url(#bottleBody)" opacity="0.7" />

          {/* Main Bottle - Classic Pear Shape */}
          <path
            d="M 85 28 Q 70 70 68 140 Q 65 180 75 240 Q 85 290 120 310 Q 155 290 165 240 Q 175 180 172 140 Q 170 70 155 28 Z"
            fill="url(#bottleBody)"
            stroke="#e0dbd3"
            strokeWidth="1.2"
            opacity="0.95"
            filter="url(#premiumShadow)"
          />

          {/* Liquid Fill - Premium Gold */}
          <defs>
            <clipPath id="liquidContainer">
              <path d="M 85 28 Q 70 70 68 140 Q 65 180 75 240 Q 85 290 120 310 Q 155 290 165 240 Q 175 180 172 140 Q 170 70 155 28 Z" />
            </clipPath>
          </defs>

          <rect
            x="60"
            y="180"
            width="120"
            height="140"
            fill="url(#liquidPremium)"
            clipPath="url(#liquidContainer)"
            opacity="0.92"
          />

          {/* Liquid surface shimmer */}
          <ellipse
            cx="120"
            cy="180"
            rx="28"
            ry="8"
            fill="rgba(255,255,255,0.3)"
            clipPath="url(#liquidContainer)"
            opacity="0.8"
          />

          {/* Main Glass Reflection - Left Side */}
          <ellipse
            cx="90"
            cy="90"
            rx="16"
            ry="70"
            fill="url(#bottleGloss)"
            opacity="0.85"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Secondary Reflection - Right Side */}
          <ellipse
            cx="145"
            cy="120"
            rx="10"
            ry="50"
            fill="rgba(255,255,255,0.4)"
            opacity="0.6"
            style={{ mixBlendMode: 'screen' }}
          />

          {/* Neck Highlight */}
          <ellipse cx="120" cy="22" rx="12" ry="3" fill="rgba(255,255,255,0.7)" opacity="0.8" />

          {/* Bottom Indent Shadow */}
          <ellipse cx="120" cy="308" rx="32" ry="6" fill="rgba(0,0,0,0.15)" opacity="0.4" />

          {/* Center Bottom Dot */}
          <circle cx="120" cy="312" r="1" fill="#aa7c11" opacity="0.8" />
        </svg>

        {/* Floating particles orbiting bottle */}
        <div className="particle-system" aria-hidden="true">
          <div className="orbit-particle op-1" />
          <div className="orbit-particle op-2" />
          <div className="orbit-particle op-3" />
          <div className="orbit-particle op-4" />
          <div className="orbit-particle op-5" />
          <div className="orbit-particle op-6" />
        </div>

        {/* Pulsing aura layers */}
        <div className="aura-layer aura-1" aria-hidden="true" />
        <div className="aura-layer aura-2" aria-hidden="true" />
        <div className="aura-layer aura-3" aria-hidden="true" />

        {/* Shimmer effect lines */}
        <div className="shimmer-line shimmer-1" aria-hidden="true" />
        <div className="shimmer-line shimmer-2" aria-hidden="true" />
      </div>
    </div>
  );
}
