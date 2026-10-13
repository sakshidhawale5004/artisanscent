import { useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowUpRight, ArrowDown, Sparkles, Droplets, Compass } from 'lucide-react';
import { Button } from './ui/button';
import { FloatingRosePetals } from './FloatingRosePetals';
import { useShop } from './SiteShell';
import { allProducts } from '@/lib/artisan-data';

type AccordType = 'top' | 'heart' | 'base';

export function AureaHeroSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeAccord, setActiveAccord] = useState<AccordType>('heart');
  const { add } = useShop();

  // Find a flagship perfume product to link with
  const flagshipPerfume = allProducts.find((p) => p.group === 'scents') || allProducts[0];

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      // Calculate normalized coords (-1 to 1)
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setMousePos({
        x: Math.max(-1, Math.min(1, x)),
        y: Math.max(-1, Math.min(1, y)),
      });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const accordsData = {
    top: {
      name: 'Top Accord',
      notes: 'Sicilian Bergamot · Pink Peppercorn · Morning Dew',
      sensation: 'A radiant, sparkling opening of crisp citrus brilliance.',
      color: '#e6ca65',
    },
    heart: {
      name: 'Heart Accord',
      notes: 'Damask Rose · Florentine Iris · Jasmine Sambac',
      sensation: 'Velvety floral opulence slow-extracted at dawn.',
      color: '#c9826d',
    },
    base: {
      name: 'Base Accord',
      notes: 'Mysore Sandalwood · Aged Oud · Ambergris',
      sensation: 'A rich, sensual sillage that lingers intimately for 24+ hours.',
      color: '#c49320',
    },
  };

  const handleAcquire = () => {
    if (flagshipPerfume) {
      add(flagshipPerfume);
    }
  };

  const scrollToPyramid = () => {
    const el = document.querySelector('.scent-pyramid-section') || document.querySelector('.collection-ribbon');
    if (el) {
      el.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="aurea-luxury-hero"
      aria-label="Aurea Luxury Perfume Hero"
      style={{
        ['--mx' as string]: `${mousePos.x * 14}px`,
        ['--my' as string]: `${mousePos.y * 14}px`,
        ['--rot-x' as string]: `${-mousePos.y * 12}deg`,
        ['--rot-y' as string]: `${mousePos.x * 16}deg`,
      }}
    >
      {/* Light Theme Ethereal Ambient Atmosphere */}
      <div className="aurea-ambient-light" aria-hidden="true" />
      <div className="aurea-champagne-halo" aria-hidden="true" />
      <div className="aurea-rose-halo" aria-hidden="true" />
      <div className="aurea-subtle-grid" aria-hidden="true" />

      {/* Floating Delicate Rose Petals Animation */}
      <FloatingRosePetals count={14} />

      <div className="aurea-hero-grid">
        {/* Left Column: Brand Story & High-Impact Typography */}
        <div className="aurea-hero-copy">
          <div className="aurea-brand-eyebrow">
            <span className="aurea-eyebrow-line" />
            <span className="aurea-eyebrow-text">AUREA · HAUTE PARFUMERIE</span>
            <span className="aurea-eyebrow-star">✦</span>
          </div>

          <h1 className="aurea-hero-title">
            Essence of
            <em className="aurea-title-italic">Every Moment.</em>
          </h1>

          <div className="aurea-tagline-quote">
            <span className="quote-mark">“</span>
            <p>
              Timeless fragrances crafted with rare botanicals to evoke profound emotion,
              leave an unforgettable trace, and celebrate the sublime.
            </p>
          </div>

          {/* Interactive Accord Chord Selector */}
          <div className="aurea-accord-module">
            <div className="accord-tabs-header">
              <span className="accord-label-title">OLFAC-TIVE CHORD:</span>
              <div className="accord-pill-buttons">
                {(['top', 'heart', 'base'] as AccordType[]).map((key) => (
                  <button
                    key={key}
                    type="button"
                    onClick={() => setActiveAccord(key)}
                    className={`accord-tab-btn ${activeAccord === key ? 'active' : ''}`}
                  >
                    {key.toUpperCase()}
                  </button>
                ))}
              </div>
            </div>

            <div className="accord-active-display">
              <div className="accord-dot-indicator" style={{ background: accordsData[activeAccord].color }} />
              <div className="accord-info-text">
                <strong>{accordsData[activeAccord].notes}</strong>
                <span>{accordsData[activeAccord].sensation}</span>
              </div>
            </div>
          </div>

          {/* Action CTAs */}
          <div className="aurea-cta-group">
            <Button
              variant="luxury"
              className="aurea-primary-cta"
              onClick={handleAcquire}
            >
              <span>Acquire The Flacon</span>
              <ArrowUpRight size={14} />
            </Button>

            <Button
              variant="editorial"
              className="aurea-secondary-cta"
              onClick={scrollToPyramid}
            >
              <span>Explore Notes Pyramid</span>
              <ArrowDown size={14} />
            </Button>
          </div>

          {/* Luxury Quality Micro-Badges */}
          <div className="aurea-cert-row">
            <span className="aurea-cert-badge">
              <Sparkles size={11} /> 100% Pure Botanical Roots
            </span>
            <span className="aurea-cert-badge">
              <Droplets size={11} /> Hydro-Steam Distilled
            </span>
            <span className="aurea-cert-badge">
              <Compass size={11} /> Indian Terroir Heritage
            </span>
          </div>
        </div>

        {/* Right Column: 3D Perspective Perfume Flacon & Scent Accents */}
        <div className="aurea-hero-stage">
          {/* Circular 360° Atelier Indicator */}
          <div className="stage-360-badge" aria-hidden="true">
            <span className="stage-pulse-dot" />
            <span>360° ATELIER FLACON · EXTRAIT DE PARFUM</span>
          </div>

          {/* 3D Flacon Perspective Scene */}
          <div className="aurea-bottle-interactive-wrap">
            {/* Celestial Rotating Orbital Rings */}
            <div className="hero-orbital-ring outer-ring" aria-hidden="true" />
            <div className="hero-orbital-ring inner-ring" aria-hidden="true" />

            {/* Glowing Caustic Aura */}
            <div className="hero-bottle-aura" aria-hidden="true" />

            {/* 3D Flacon Geometry */}
            <div className="hero-flacon-3d">
              {/* Specular Light Sweep */}
              <div className="hero-flacon-light-sweep" aria-hidden="true" />

              {/* Brushed Gold Cap */}
              <div className="hero-flacon-cap">
                <div className="hero-cap-crest">✦</div>
                <div className="hero-cap-body">
                  <div className="hero-cap-sheen" />
                </div>
              </div>

              {/* Gold Sprayer Collar */}
              <div className="hero-flacon-collar">
                <div className="hero-collar-ring" />
              </div>

              {/* Faceted Crystal Flacon Body */}
              <div className="hero-flacon-body">
                {/* Facet Highlights */}
                <div className="hero-facet facet-tl" />
                <div className="hero-facet facet-tr" />
                <div className="hero-facet facet-edge-l" />
                <div className="hero-facet facet-edge-r" />

                {/* Animated Liquid Essence Core */}
                <div
                  className="hero-liquid-core"
                  style={{
                    background:
                      activeAccord === 'top'
                        ? 'linear-gradient(180deg, rgba(255, 235, 180, 0.45) 0%, rgba(235, 205, 130, 0.75) 50%, rgba(212, 175, 55, 0.9) 100%)'
                        : activeAccord === 'heart'
                        ? 'linear-gradient(180deg, rgba(255, 215, 205, 0.5) 0%, rgba(235, 175, 160, 0.8) 50%, rgba(201, 130, 109, 0.9) 100%)'
                        : 'linear-gradient(180deg, rgba(255, 225, 170, 0.5) 0%, rgba(220, 175, 90, 0.8) 50%, rgba(196, 147, 32, 0.92) 100%)',
                  }}
                >
                  <div className="hero-liquid-surface" />
                  <div className="hero-liquid-sparkle sp1" />
                  <div className="hero-liquid-sparkle sp2" />
                </div>

                {/* Front Haute Label */}
                <div className="hero-flacon-label">
                  <span className="flacon-label-star">✦</span>
                  <span className="flacon-label-name">AUREA</span>
                  <span className="flacon-label-subtitle">ARTISAN SCENT</span>
                  <span className="flacon-label-spec">50 ML · 1.7 FL. OZ.</span>
                </div>

                {/* Glass Reflection Streaks */}
                <div className="hero-glass-gleam gleam-l" />
                <div className="hero-glass-gleam gleam-r" />
              </div>

              {/* Flacon Base Caustic Reflection */}
              <div className="hero-flacon-shadow" aria-hidden="true" />
            </div>

            {/* Floating Scent Detail Cards */}
            <div className="floating-hero-card card-kashmir" aria-hidden="true">
              <span className="card-badge-dot" />
              <div>
                <strong>Damask Rose</strong>
                <small>Kashmir Dawn Harvest</small>
              </div>
            </div>

            <div className="floating-hero-card card-mysore" aria-hidden="true">
              <span className="card-badge-dot gold" />
              <div>
                <strong>Mysore Sandalwood</strong>
                <small>Aged 25-Year Heartwood</small>
              </div>
            </div>

            <div className="floating-hero-card card-concentration" aria-hidden="true">
              <span className="card-badge-dot rose" />
              <div>
                <strong>28% Extrait</strong>
                <small>Pure Olfactive Sillage</small>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Foot Ribbon with Sub-Brand Navigation */}
      <div className="aurea-hero-foot">
        <div className="aurea-foot-item">
          <span className="aurea-foot-dot">✦</span>
          <span>HAUTE PARFUMERIE</span>
        </div>
        <div className="aurea-foot-item">
          <span className="aurea-foot-dot">✦</span>
          <span>100% PURE BOTANICAL ROOTS</span>
        </div>
        <div className="aurea-foot-item">
          <span className="aurea-foot-dot">✦</span>
          <span>CIRCULAR REFILLABLE FLACON</span>
        </div>
        <div className="aurea-foot-item">
          <span className="aurea-foot-dot">✦</span>
          <span>COMPLIMENTARY DISCOVERY SAMPLES</span>
        </div>
      </div>
    </section>
  );
}
