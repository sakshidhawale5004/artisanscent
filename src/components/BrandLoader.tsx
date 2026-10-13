import { useState, useEffect } from 'react';
import { Sparkles, ArrowRight } from 'lucide-react';

export function BrandLoader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);
  const [isFading, setIsFading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      onComplete();
      return;
    }

    // Smooth progress counter reaching 100% in ~2.2 seconds
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          return 100;
        }
        const increment = Math.max(1, Math.floor((100 - prev) * 0.12 + Math.random() * 5));
        return Math.min(100, prev + increment);
      });
    }, 45);

    return () => clearInterval(interval);
  }, [onComplete]);

  useEffect(() => {
    if (progress >= 100 && !isFading) {
      const exitTimeout = setTimeout(() => {
        setIsFading(true);
        const completeTimeout = setTimeout(() => {
          onComplete();
        }, 800);
        return () => clearTimeout(completeTimeout);
      }, 350);

      return () => clearTimeout(exitTimeout);
    }
  }, [progress, isFading, onComplete]);

  const handleSkip = () => {
    setIsFading(true);
    setTimeout(() => {
      onComplete();
    }, 400);
  };

  const getStageText = () => {
    if (progress < 30) return 'Harvesting Rare Botanicals...';
    if (progress < 65) return 'Hydro-Steam Distillation...';
    if (progress < 95) return 'Formulating Olfactive Harmony...';
    return 'Essence of Every Moment';
  };

  return (
    <div
      className={`luxury-brand-loader-3d ${isFading ? 'luxury-loader-fade-out' : ''}`}
      role="status"
      aria-live="polite"
      aria-label="Loading Aurea Artisan Scent"
    >
      {/* Light Theme Background Atmosphere */}
      <div className="loader-bg-light-ambient" aria-hidden="true" />
      <div className="loader-bg-champagne-glow" aria-hidden="true" />
      <div className="loader-bg-rose-halo" aria-hidden="true" />

      {/* Main 3D Icon Stage */}
      <div className="loader-3d-stage">
        {/* 360 Degree Atelier Indicator Badge */}
        <div className="loader-360-badge" aria-hidden="true">
          <span className="loader-360-dot" />
          <span>360° ATELIER ICON</span>
        </div>

        {/* 3D Flacon Perspective Container */}
        <div className="bottle-3d-scene">
          {/* Rotating Celestial Orbital Rings */}
          <div className="orbital-ring ring-outer" aria-hidden="true" />
          <div className="orbital-ring ring-mid" aria-hidden="true" />
          <div className="orbital-ring ring-inner" aria-hidden="true" />

          {/* Floating Botanical & Light Particles */}
          <div className="loader-particles-container" aria-hidden="true">
            <span className="botanical-speck s1">✦</span>
            <span className="botanical-speck s2">🌸</span>
            <span className="botanical-speck s3">✦</span>
            <span className="botanical-speck s4">✨</span>
            <span className="botanical-speck s5">✦</span>
            <span className="botanical-speck s6">🌸</span>
          </div>

          {/* 3D Flacon Structure */}
          <div className="perfume-flacon-3d">
            {/* Specular Light Sweep Overlay */}
            <div className="flacon-light-sweep" aria-hidden="true" />

            {/* 3D Bottle Cap (Milled Brushed Gold) */}
            <div className="flacon-cap-assembly">
              <div className="flacon-cap-crest">✦</div>
              <div className="flacon-cap-cylinder">
                <div className="cap-highlight" />
              </div>
            </div>

            {/* Sprayer Collar & Atomizer Nozzle */}
            <div className="flacon-neck-assembly">
              <div className="neck-collar-gold" />
              <div className="atomizer-nozzle-gold" />
            </div>

            {/* Faceted Crystal Glass Body with Perspective Facets */}
            <div className="flacon-crystal-body">
              {/* Outer Crystal Facet Bevels */}
              <div className="facet-bevel facet-top-left" />
              <div className="facet-bevel facet-top-right" />
              <div className="facet-bevel facet-side-left" />
              <div className="facet-bevel facet-side-right" />
              <div className="facet-bevel facet-bottom-base" />

              {/* Liquid Perfume Essence Inside (Champagne / Rose Gold) */}
              <div className="flacon-liquid-core" style={{ height: `${35 + (progress * 0.55)}%` }}>
                <div className="liquid-surface-wave" />
                <div className="liquid-bubble b1" />
                <div className="liquid-bubble b2" />
                <div className="liquid-glow" />
              </div>

              {/* Front Facet Luxury Glass Label */}
              <div className="flacon-luxury-label">
                <span className="label-crest">✦</span>
                <span className="label-brand">AUREA</span>
                <span className="label-sub">ARTISAN SCENT</span>
                <span className="label-vol">50 ML · EAU DE PARFUM</span>
              </div>

              {/* Crystal Glass Refraction Highlights */}
              <div className="glass-reflection-streak left" />
              <div className="glass-reflection-streak right" />
            </div>

            {/* Flacon Base Shadow & Golden Caustic Aura */}
            <div className="flacon-caustic-shadow" aria-hidden="true" />
          </div>
        </div>

        {/* Luxury Typography & Progress Display */}
        <div className="loader-copy-container">
          <div className="loader-eyebrow-row">
            <span className="loader-eyebrow-line" />
            <span className="loader-eyebrow-text">HAUTE PARFUMERIE</span>
            <span className="loader-eyebrow-line" />
          </div>

          <h2 className="loader-brand-title">AUREA</h2>
          <p className="loader-brand-subtitle">THE ESSENCE OF EVERY MOMENT</p>

          {/* Progress Bar & Counter */}
          <div className="loader-progress-module">
            <div className="loader-progress-track">
              <div
                className="loader-progress-fill"
                style={{ width: `${progress}%` }}
              />
            </div>
            <div className="loader-status-row">
              <span className="loader-stage-name">{getStageText()}</span>
              <span className="loader-percentage-num">{progress}%</span>
            </div>
          </div>
        </div>

        {/* Discreet Instant Skip Button */}
        <button
          type="button"
          onClick={handleSkip}
          className="loader-skip-cta"
          aria-label="Skip to Atelier"
        >
          <span>Enter Atelier</span>
          <ArrowRight size={12} />
        </button>
      </div>
    </div>
  );
}
