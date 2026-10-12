import { useState, useRef, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';

export interface LuxuryPageHeroProps {
  title: string;
  eyebrow?: string;
  description: string;
  image: string;
  badge?: string;
  pills?: string[];
  breadcrumbs?: { label: string; href?: string }[];
}

export function LuxuryPageHero({
  title,
  eyebrow = 'THE WORLD OF ARTISAN SCENT',
  description,
  image,
  badge = 'HAUTE PARFUMERIE',
  pills = ['100% Pure Botanical', 'Artisanal Steam Extraction', 'Sustainably Harvested'],
  breadcrumbs,
}: LuxuryPageHeroProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [imageLoaded, setImageLoaded] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      // Only calculate if in view
      if (rect.bottom < 0 || rect.top > window.innerHeight) return;
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 2;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 2;
      setOffset({ x: Math.max(-1, Math.min(1, x)), y: Math.max(-1, Math.min(1, y)) });
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const scrollToContent = () => {
    if (containerRef.current) {
      const bottom = containerRef.current.offsetTop + containerRef.current.offsetHeight - 40;
      window.scrollTo({ top: bottom, behavior: 'smooth' });
    }
  };

  return (
    <section
      ref={containerRef}
      className="luxury-page-hero"
      aria-label={`${title} banner`}
      style={{
        // CSS variables for 3D parallax transform
        '--mx': `${offset.x * 12}px`,
        '--my': `${offset.y * 12}px`,
      } as React.CSSProperties}
    >
      {/* 3D Parallax Background Image */}
      <div className="hero-bg-wrapper">
        <img
          src={image}
          alt={title}
          className={`hero-bg-image ${imageLoaded ? 'is-loaded' : ''}`}
          onLoad={() => setImageLoaded(true)}
          loading="eager"
        />
        {/* Cinematic Dual-Tone Scrim & Luxury Ambient Vignette */}
        <div className="hero-cinema-scrim" />
        <div className="hero-gold-vignette" />
        <div className="hero-mist-overlay" />
      </div>

      {/* Floating 3D Gold Accent Sparkles */}
      <div className="hero-particles-layer" aria-hidden="true">
        <span className="gold-particle p1" />
        <span className="gold-particle p2" />
        <span className="gold-particle p3" />
        <span className="gold-particle p4" />
      </div>

      {/* Hero Content Container */}
      <div className="luxury-hero-container">
        {/* Breadcrumb Path */}
        <nav className="hero-breadcrumb" aria-label="Breadcrumb">
          <Link to="/" className="hero-breadcrumb-link">
            Artisan Scent
          </Link>
          <ChevronRight size={11} className="hero-breadcrumb-sep" />
          {breadcrumbs && breadcrumbs.length > 0 ? (
            breadcrumbs.map((bc, idx) => (
              <span key={idx} className="flex items-center gap-1.5">
                {bc.href ? (
                  <Link to={bc.href} className="hero-breadcrumb-link">
                    {bc.label}
                  </Link>
                ) : (
                  <span className="hero-breadcrumb-current">{bc.label}</span>
                )}
                {idx < breadcrumbs.length - 1 && (
                  <ChevronRight size={11} className="hero-breadcrumb-sep" />
                )}
              </span>
            ))
          ) : (
            <span className="hero-breadcrumb-current">{title}</span>
          )}
        </nav>

        {/* Luxury Badge */}
        <div className="hero-badge-wrap">
          <span className="hero-gold-badge">
            <Sparkles size={11} className="text-amber-300" />
            <span>{badge}</span>
            <span className="hero-badge-dot">✦</span>
            <span>{eyebrow}</span>
          </span>
        </div>

        {/* Hero Title */}
        <h1 className="hero-luxury-title">
          <span>{title}</span>
        </h1>

        {/* Ornamental Divider */}
        <div className="hero-ornament-line">
          <span className="hero-ornament-dot">◆</span>
        </div>

        {/* Hero Description */}
        <p className="hero-luxury-description">{description}</p>

        {/* Botanical Quality Pills */}
        {pills && pills.length > 0 && (
          <div className="hero-pills-row">
            {pills.map((pill, i) => (
              <span key={i} className="hero-pill">
                <span className="hero-pill-star">✧</span>
                {pill}
              </span>
            ))}
          </div>
        )}

        {/* Scroll Indicator */}
        <button
          type="button"
          onClick={scrollToContent}
          className="hero-scroll-btn"
          aria-label="Scroll to explore collection"
        >
          <span className="hero-scroll-text">EXPLORE BELOW</span>
          <ArrowDown size={14} className="hero-scroll-icon" />
        </button>
      </div>

      {/* Bottom Luxury Golden Bevel */}
      <div className="hero-bottom-border" />
    </section>
  );
}
