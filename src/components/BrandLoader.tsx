import { useState, useEffect } from 'react';

export function BrandLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [stage, setStage] = useState('Sourcing Rare Botanicals...');
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    // Check prefers-reduced-motion
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    const stages = [
      { at: 0, text: 'Sourcing Rare Botanicals...' },
      { at: 35, text: 'Gentle Steam Distillation...' },
      { at: 70, text: 'Refining Olfactory Accords...' },
      { at: 92, text: 'A World of Quiet Luxury' },
    ];

    const startTime = performance.now();
    const duration = 1600; // 1.6s smooth duration

    let animId: number;

    const tick = (now: number) => {
      const elapsed = now - startTime;
      const pct = Math.min(100, Math.round((elapsed / duration) * 100));
      setProgress(pct);

      for (let i = stages.length - 1; i >= 0; i--) {
        if (pct >= stages[i].at) {
          setStage(stages[i].text);
          break;
        }
      }

      if (pct < 100) {
        animId = requestAnimationFrame(tick);
      } else {
        // Start smooth fade out
        setIsFading(true);
        const timeout = setTimeout(() => {
          onComplete();
        }, 750); // fade out duration
        return () => clearTimeout(timeout);
      }
    };

    animId = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(animId);
  }, [onComplete]);

  return (
    <div
      className={`luxury-brand-loader ${isFading ? 'luxury-loader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Artisan Scent"
    >
      <div className="loader-backdrop-glow" aria-hidden="true" />

      <div className="loader-crest-container">
        {/* Animated Golden Luxury Seal */}
        <div className="loader-seal-wrapper">
          <svg
            className="loader-seal-svg"
            viewBox="0 0 120 120"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            aria-hidden="true"
          >
            <defs>
              <linearGradient id="goldSheen" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#d4af37" />
                <stop offset="50%" stopColor="#f3e5ab" />
                <stop offset="100%" stopColor="#aa7c11" />
              </linearGradient>
              <radialGradient id="auraGlow" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="rgba(212, 175, 55, 0.25)" />
                <stop offset="100%" stopColor="rgba(212, 175, 55, 0)" />
              </radialGradient>
            </defs>

            {/* Glowing Center Halo */}
            <circle cx="60" cy="60" r="48" fill="url(#auraGlow)" />

            {/* Outer Slow Orbiting Dashed Ring */}
            <circle
              className="loader-ring-outer"
              cx="60"
              cy="60"
              r="52"
              stroke="url(#goldSheen)"
              strokeWidth="1"
              strokeDasharray="4 6"
              opacity="0.6"
            />

            {/* Middle Fine Ring */}
            <circle
              className="loader-ring-mid"
              cx="60"
              cy="60"
              r="44"
              stroke="url(#goldSheen)"
              strokeWidth="1.2"
              opacity="0.85"
            />

            {/* Inner Sacred Geometric Diamond */}
            <rect
              className="loader-diamond"
              x="36"
              y="36"
              width="48"
              height="48"
              rx="2"
              transform="rotate(45 60 60)"
              stroke="url(#goldSheen)"
              strokeWidth="1"
              opacity="0.7"
            />

            {/* Central Botanical Scent Droplet Crest */}
            <path
              className="loader-droplet"
              d="M60 38 C60 38 72 53 72 63 C72 70 66.5 75 60 75 C53.5 75 48 70 48 63 C48 53 60 38 60 38 Z"
              stroke="url(#goldSheen)"
              strokeWidth="1.6"
              fill="rgba(212, 175, 55, 0.08)"
            />

            {/* Center Core Radiance */}
            <circle cx="60" cy="63" r="3.5" fill="url(#goldSheen)" className="loader-core-pulse" />
          </svg>
        </div>

        {/* Brand Typographic Identity */}
        <div className="loader-typography">
          <span className="loader-eyebrow">HAUTE PARFUMERIE & BOTANIQUE</span>
          <h1 className="loader-title">ARTISAN SCENT</h1>
          <div className="loader-divider">
            <span className="loader-divider-line" />
            <span className="loader-divider-diamond">✦</span>
            <span className="loader-divider-line" />
          </div>
          <span className="loader-subtitle">EST. KULSWAMI ESSENCE OIL CO.</span>
        </div>

        {/* Elegant Progress Bar & Percentage */}
        <div className="loader-progress-wrap">
          <div className="loader-track">
            <div
              className="loader-bar"
              style={{ width: `${progress}%` }}
              role="progressbar"
              aria-valuenow={progress}
              aria-valuemin={0}
              aria-valuemax={100}
            />
          </div>
          <div className="loader-meta">
            <span className="loader-stage-text">{stage}</span>
            <span className="loader-pct">{progress}%</span>
          </div>
        </div>
      </div>
    </div>
  );
}
