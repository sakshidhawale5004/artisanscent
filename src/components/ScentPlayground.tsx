import { useState, lazy, Suspense, useEffect } from 'react';
import { Link } from '@tanstack/react-router';
import { Volume2, VolumeX, Sparkles, ArrowUpRight, Compass, Rotate3d, Check } from 'lucide-react';
import { Button } from './ui/button';
import { useShop } from './SiteShell';

const Playground3DCanvas = lazy(() => import('./Playground3DCanvas'));

interface NoteFamily {
  id: string;
  name: string;
  category: string;
  subtitle: string;
  color: string;
  particleColor: string;
  accent: string;
  mood: string;
  topNotes: string[];
  heartNotes: string[];
  baseNotes: string[];
  description: string;
  link: string;
  sampleName: string;
  samplePrice: number;
}

const FAMILIES: NoteFamily[] = [
  {
    id: 'woody',
    name: 'Wood & Earth',
    category: 'BOTANICAL ESSENCES',
    subtitle: 'Vetiver · Patchouli · Amberwood',
    color: '#8c6239',
    particleColor: '#e0b579',
    accent: '#d4af37',
    mood: 'Grounded · Aristocratic · Enduring',
    topNotes: ['Bergamot Zest', 'Pink Peppercorn', 'Coriander Seed'],
    heartNotes: ['Indonesian Patchouli', 'Clary Sage', 'Smoked Birch'],
    baseNotes: ['Haitian Vetiver', 'Atlas Cedarwood', 'Warm Amber'],
    description: 'Deep, meditative, and grounded. Capturing rich distilled roots, petrichor over forest earth, and precious resinous woods.',
    link: '/oils',
    sampleName: 'Royal Vetiver & Patchouli Discovery Vial',
    samplePrice: 349,
  },
  {
    id: 'floral',
    name: 'Solar Floral',
    category: 'HAUTE PARFUMERIE',
    subtitle: 'Damask Rose · French Lavender · Geranium',
    color: '#b85b7e',
    particleColor: '#f9cad8',
    accent: '#ffd1dc',
    mood: 'Ethereal · Luminous · Sensual',
    topNotes: ['French Lavender', 'Mandarin Blossom', 'Morning Dew'],
    heartNotes: ['Bourbon Geranium', 'Damascena Rose', 'Neroli Absolue'],
    baseNotes: ['Palmarosa Essence', 'White Musk', 'Golden Honeycomb'],
    description: 'Opulent, velvet-soft, and radiating warmth. Handpicked blossoms distilled at dawn while mist still clings to petals.',
    link: '/perfumes',
    sampleName: 'Solar Flora Signature Parfum Sample',
    samplePrice: 399,
  },
  {
    id: 'resins',
    name: 'Sacred Resins',
    category: 'INCENSE & AGARBATTI',
    subtitle: 'Temple Agarbatti · Oudh · Frankincense',
    color: '#9a7442',
    particleColor: '#f5d38c',
    accent: '#f59e0b',
    mood: 'Spiritual · Majestic · Mystical',
    topNotes: ['Green Cardamom', 'Elemi Resin', 'Saffron Threads'],
    heartNotes: ['Sandalwood Paste', 'Temple Agarbatti Smoke', 'Myrrh'],
    baseNotes: ['Wild Agarwood (Oudh)', 'Golden Benzoin', 'Labdanum'],
    description: 'Ancient devotional rituals reimagined. Silky fragrant smoke curling through temple sanctums and quiet meditation sanctuaries.',
    link: '/incense',
    sampleName: 'Sacred Temple Agarbatti Discovery Pack',
    samplePrice: 299,
  },
  {
    id: 'citrus',
    name: 'Verdant Citrus',
    category: 'PURE BOTANICAL OILS',
    subtitle: 'Lemongrass · Citronella · Palmarosa',
    color: '#658334',
    particleColor: '#d6ed7a',
    accent: '#a3e635',
    mood: 'Invigorating · Crisp · Radiant',
    topNotes: ['Indian Lemongrass', 'Wild Citronella', 'Lime Peel'],
    heartNotes: ['Sweet Palmarosa', 'Crushed Basil', 'Green Tea Leaf'],
    baseNotes: ['Vetiver Roots', 'Sunlit Hinoki', 'Clean Moss'],
    description: 'Electrifying, sun-drenched, and clean. Crisp leaves crushed between warm fingers in the morning breeze of aromatic plantations.',
    link: '/oils',
    sampleName: 'Verdant Lemongrass & Palmarosa Essence',
    samplePrice: 329,
  },
  {
    id: 'soaps',
    name: 'Artisanal Care',
    category: 'COLD-PROCESSED SOAPS',
    subtitle: 'Therapeutic Herbs · Travertine Lather',
    color: '#3d6f5c',
    particleColor: '#a7e3cc',
    accent: '#34d399',
    mood: 'Restorative · Nourishing · Serene',
    topNotes: ['Rosemary Leaf', 'Sweet Valencia Orange', 'Mint'],
    heartNotes: ['Lavender Floret', 'Raw Honey', 'Chamomile Infusion'],
    baseNotes: ['Virgin Coconut', 'Unrefined Shea Butter', 'Rice Bran'],
    description: 'Sensorial velvet lather loaded with pure essential oils and nourishing plant butters for daily elevated bathing rituals.',
    link: '/soaps',
    sampleName: 'Artisan Cold-Process Botanical Bar Sample',
    samplePrice: 249,
  },
];

export function ScentPlayground() {
  const [activeFamily, setActiveFamily] = useState<NoteFamily>(FAMILIES[0]);
  const [activePyramid, setActivePyramid] = useState<'top' | 'heart' | 'base'>('heart');
  const [soundEnabled, setSoundEnabled] = useState(false);
  const [isClient, setIsClient] = useState(false);
  const [added, setAdded] = useState(false);
  const { add } = useShop();

  useEffect(() => {
    setIsClient(true);
  }, []);

  // Silky crystal chime sound synthesized with Web Audio API
  const playChime = (freq: number) => {
    if (!soundEnabled || typeof window === 'undefined') return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, ctx.currentTime);
      // Gentle soft harmonic frequency sweep
      osc.frequency.exponentialRampToValueAtTime(freq * 1.5, ctx.currentTime + 0.4);

      gain.gain.setValueAtTime(0.001, ctx.currentTime);
      gain.gain.linearRampToValueAtTime(0.12, ctx.currentTime + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 1.2);

      osc.connect(gain);
      gain.connect(ctx.destination);

      osc.start();
      osc.stop(ctx.currentTime + 1.3);
    } catch {
      // Audio autoplay gracefully blocked
    }
  };

  const selectFamily = (f: NoteFamily, index: number) => {
    setActiveFamily(f);
    setAdded(false);
    playChime(320 + index * 90);
  };

  const handleAddSample = () => {
    add({
      name: activeFamily.sampleName,
      category: activeFamily.name,
      notes: activeFamily.subtitle,
      price: activeFamily.samplePrice,
      group: 'oils',
      image: '/assets/brand/logo.jpeg',
    });
    setAdded(true);
    playChime(580);
    setTimeout(() => setAdded(false), 2400);
  };

  return (
    <section className="scent-playground-section" aria-label="Interactive 3D Scent Explorer">
      {/* Background Luxury Ambient Glow */}
      <div
        className="playground-ambient-glow"
        style={{
          background: `radial-gradient(circle at 60% 40%, ${activeFamily.color}33 0%, transparent 65%)`,
        }}
      />

      <div className="playground-header">
        <div className="playground-eyebrow-wrap">
          <span className="eyebrow">
            <Compass size={13} className="inline mr-2 text-amber-500" />
            THE INTERACTIVE OLFACTORY ATELIER
          </span>
          <button
            type="button"
            onClick={() => setSoundEnabled(!soundEnabled)}
            className="sound-toggle-btn"
            title={soundEnabled ? 'Mute audio feedback' : 'Enable luxury sound chime'}
            aria-label={soundEnabled ? 'Mute audio' : 'Enable audio'}
          >
            {soundEnabled ? (
              <>
                <Volume2 size={13} /> <span>SOUND CHIME ON</span>
              </>
            ) : (
              <>
                <VolumeX size={13} /> <span>SOUND CHIME OFF</span>
              </>
            )}
          </button>
        </div>
        <h2 className="playground-main-title">
          Play with <em>Scent Architecture.</em>
        </h2>
        <p className="playground-subtitle">
          Rotate our 3D crystal flacon, explore layered notes, and experience the harmonic balance of botanical accords.
        </p>
      </div>

      {/* Fragrance Family Selector Tabs */}
      <div className="playground-family-tabs" role="tablist">
        {FAMILIES.map((fam, idx) => (
          <button
            key={fam.id}
            type="button"
            role="tab"
            aria-selected={activeFamily.id === fam.id}
            onClick={() => selectFamily(fam, idx)}
            className={`playground-family-tab ${activeFamily.id === fam.id ? 'is-active' : ''}`}
            style={{
              '--tab-color': fam.color,
            } as React.CSSProperties}
          >
            <span className="tab-pill-dot" style={{ backgroundColor: fam.color }} />
            <span className="tab-family-name">{fam.name}</span>
          </button>
        ))}
      </div>

      {/* Main Interactive Stage: 3D Canvas + Scent Pyramid */}
      <div className="playground-stage-grid">
        {/* Left Column: 3D Interactive Canvas */}
        <div className="playground-3d-card">
          <div className="playground-3d-badge">
            <Rotate3d size={13} className="text-amber-400" />
            <span>DRAG TO ROTATE 3D FLACON</span>
          </div>

          <div className="playground-canvas-box">
            {isClient ? (
              <Suspense
                fallback={
                  <div className="canvas-loading-placeholder">
                    <div className="loader-rings">
                      <i />
                      <i />
                      <i />
                    </div>
                    <span>CRAFTING 3D ESSENCE...</span>
                  </div>
                }
              >
                <Playground3DCanvas
                  color={activeFamily.color}
                  particleColor={activeFamily.particleColor}
                  accent={activeFamily.accent}
                />
              </Suspense>
            ) : (
              <div className="canvas-loading-placeholder">
                <span>INITIALIZING ATELIER...</span>
              </div>
            )}
          </div>

          <div className="playground-3d-footer">
            <div>
              <span className="flacon-tag">{activeFamily.category}</span>
              <h4 className="flacon-name">{activeFamily.name} Accord</h4>
            </div>
            <span className="flacon-mood">{activeFamily.mood}</span>
          </div>
        </div>

        {/* Right Column: Scent Pyramid & Exploration Details */}
        <div className="playground-pyramid-card">
          <div className="pyramid-intro">
            <span className="eyebrow" style={{ color: activeFamily.color }}>
              ✦ OLFACTORY ARCHITECTURE
            </span>
            <h3 className="pyramid-family-title">{activeFamily.name}</h3>
            <p className="pyramid-family-description">{activeFamily.description}</p>
          </div>

          {/* Scent Pyramid Layer Tabs */}
          <div className="pyramid-layers-control">
            <button
              type="button"
              className={`pyramid-layer-btn ${activePyramid === 'top' ? 'active' : ''}`}
              onClick={() => {
                setActivePyramid('top');
                playChime(500);
              }}
            >
              <span className="layer-num">01</span>
              <div>
                <strong>Top Notes</strong>
                <small>Immediate First Breath</small>
              </div>
            </button>
            <button
              type="button"
              className={`pyramid-layer-btn ${activePyramid === 'heart' ? 'active' : ''}`}
              onClick={() => {
                setActivePyramid('heart');
                playChime(420);
              }}
            >
              <span className="layer-num">02</span>
              <div>
                <strong>Heart Notes</strong>
                <small>Soul of the Fragrance</small>
              </div>
            </button>
            <button
              type="button"
              className={`pyramid-layer-btn ${activePyramid === 'base' ? 'active' : ''}`}
              onClick={() => {
                setActivePyramid('base');
                playChime(340);
              }}
            >
              <span className="layer-num">03</span>
              <div>
                <strong>Base Notes</strong>
                <small>Enduring Memory & Sillage</small>
              </div>
            </button>
          </div>

          {/* Active Note Pills with Luxury Reveal */}
          <div className="pyramid-active-notes">
            <span className="notes-heading">
              {activePyramid === 'top'
                ? 'TOP NOTES · FIRST 15 MINUTES'
                : activePyramid === 'heart'
                ? 'HEART NOTES · THE CENTRAL THEME (2–4 HOURS)'
                : 'BASE NOTES · LASTING DRY-DOWN (6–12+ HOURS)'}
            </span>
            <div className="notes-chip-container">
              {(activePyramid === 'top'
                ? activeFamily.topNotes
                : activePyramid === 'heart'
                ? activeFamily.heartNotes
                : activeFamily.baseNotes
              ).map(note => (
                <div key={note} className="scent-note-chip">
                  <Sparkles size={11} className="text-amber-500" />
                  <span>{note}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Action Callouts */}
          <div className="pyramid-actions">
            <Button
              variant="luxury"
              className="w-full sm:w-auto"
              onClick={handleAddSample}
            >
              {added ? (
                <>
                  <Check size={14} className="text-emerald-400 mr-2" />
                  Added Discovery Vial!
                </>
              ) : (
                <>
                  Experience Accord Vial (₹{activeFamily.samplePrice})
                  <ArrowUpRight size={14} className="ml-2" />
                </>
              )}
            </Button>
            <Button variant="editorial" asChild>
              <Link to={activeFamily.link}>
                Explore {activeFamily.name} Products <ArrowUpRight size={14} />
              </Link>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}
