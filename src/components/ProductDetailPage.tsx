import { Link } from '@tanstack/react-router';
import { useState, useMemo } from 'react';
import {
  ArrowLeft,
  ArrowUpRight,
  Plus,
  Minus,
  Sparkles,
  ShoppingBag,
  ShieldCheck,
  Droplets,
  Wind,
  Clock,
  Compass,
  Check,
  Share2,
} from 'lucide-react';
import { Button } from './ui/button';
import { useShop } from './SiteShell';
import { LuxuryTiltCard } from './LuxuryTiltCard';
import {
  getProductBySlug,
  allProducts,
  categories,
  formatPrice,
  type Product,
} from '@/lib/artisan-data';

export function ProductDetailPage({ slug }: { slug: string }) {
  const { add } = useShop();
  const product = useMemo(() => getProductBySlug(slug), [slug]);

  // Fallback if product not found
  if (!product) {
    return (
      <div className="product-not-found-section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">OLFACTORY ATELIER</span>
            <h2>Creation Not Found</h2>
            <p>
              The creation you are searching for may have been retired or moved to our private
              archives.
            </p>
          </div>
          <Button variant="luxury" asChild>
            <Link to="/collections">
              <ArrowLeft size={16} /> Return to Collections
            </Link>
          </Button>
        </div>
      </div>
    );
  }

  const categoryObj = categories.find((c) => c.short.toLowerCase() === product.group.toLowerCase()) ||
    categories.find((c) => c.path.includes(product.group)) ||
    categories[0];

  // Size option state
  const [selectedSizeIndex, setSelectedSizeIndex] = useState(0);
  const selectedSize = product.sizeOptions?.[selectedSizeIndex];
  const activePrice = selectedSize?.price ?? product.price ?? 450;
  const activeVolume = selectedSize?.volume ?? (product.group === 'oils' ? '10 ml' : 'Standard');

  // Quantity state
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);
  const [activeTab, setActiveTab] = useState<'profile' | 'origin' | 'ritual' | 'wholesale'>('profile');
  const [copied, setCopied] = useState(false);

  // Gallery array
  const galleryImages = product.gallery?.length ? product.gallery : [product.image];

  // Related products from the same group
  const relatedProducts = allProducts
    .filter((p) => p.group === product.group && p.slug !== product.slug)
    .slice(0, 4);

  // Handle add to bag
  const handleAddToBag = () => {
    // Add product with selected size options
    for (let i = 0; i < quantity; i++) {
      add({
        ...product,
        price: activePrice,
        name: `${product.name}${selectedSize ? ` (${selectedSize.volume})` : ''}`,
      });
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: `${product.name} — Artisan Scent`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <article className="luxury-product-page">
      {/* Top Breadcrumbs & Back Navigation */}
      <div className="product-page-nav-bar">
        <nav className="product-breadcrumbs" aria-label="Breadcrumb">
          <Link to="/" className="breadcrumb-link">Artisan Scent</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to="/collections" className="breadcrumb-link">Collections</Link>
          <span className="breadcrumb-sep">/</span>
          <Link to={categoryObj.path} className="breadcrumb-link">{categoryObj.name}</Link>
          <span className="breadcrumb-sep">/</span>
          <span className="breadcrumb-current">{product.name}</span>
        </nav>

        <div className="product-nav-actions">
          <Button
            variant="ghost"
            size="sm"
            className="share-btn"
            onClick={handleShare}
            aria-label="Share product"
          >
            {copied ? <Check size={14} className="text-amber-500" /> : <Share2 size={14} />}
            <span>{copied ? 'Link Copied' : 'Share'}</span>
          </Button>
          <Button variant="ghost" size="sm" asChild className="back-category-btn">
            <Link to={categoryObj.path}>
              <ArrowLeft size={14} /> Back to {categoryObj.name}
            </Link>
          </Button>
        </div>
      </div>

      {/* Main Luxury Dual Column Showcase */}
      <div className="product-showcase-grid">
        {/* Left Column: Visual Atelier */}
        <div className="product-gallery-column">
          <LuxuryTiltCard maxTilt={5} scale={1.015} glare={true}>
            <div className="product-main-visual-frame">
              <img
                src={activeImage}
                alt={product.name}
                className="product-main-visual"
                loading="eager"
              />
              <div className="product-visual-halo" />
              <div className="product-visual-badges">
                <span className="visual-badge gold-seal">
                  <Sparkles size={11} /> ATELIER HARVEST
                </span>
                {product.botanical && (
                  <span className="visual-badge botanical-seal">
                    {product.botanical}
                  </span>
                )}
              </div>
            </div>
          </LuxuryTiltCard>

          {/* Thumbnails Carousel */}
          {galleryImages.length > 1 && (
            <div className="product-thumbnails-strip" aria-label="Product image gallery">
              {galleryImages.map((img, idx) => (
                <button
                  key={`${img}-${idx}`}
                  type="button"
                  className={`thumbnail-btn ${activeImage === img ? 'is-active' : ''}`}
                  onClick={() => setActiveImage(img)}
                  aria-label={`View photo ${idx + 1}`}
                >
                  <img src={img} alt={`${product.name} view ${idx + 1}`} />
                </button>
              ))}
            </div>
          )}

          {/* Sensory Metrics Strip */}
          <div className="olfactory-metrics-card">
            <h4>OLFACTORY PERFORMANCE</h4>
            <div className="metrics-grid">
              <div className="metric-item">
                <div className="metric-header">
                  <Droplets size={14} className="metric-icon" />
                  <span>Intensity</span>
                </div>
                <strong>{product.intensity || 'Balanced · Rich'}</strong>
                <div className="metric-bar">
                  <span className="bar-fill" style={{ width: '85%' }} />
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-header">
                  <Clock size={14} className="metric-icon" />
                  <span>Longevity</span>
                </div>
                <strong>{product.longevity || '8–12 Hours'}</strong>
                <div className="metric-bar">
                  <span className="bar-fill" style={{ width: '92%' }} />
                </div>
              </div>

              <div className="metric-item">
                <div className="metric-header">
                  <Wind size={14} className="metric-icon" />
                  <span>Sillage & Aura</span>
                </div>
                <strong>{product.sillage || 'Enveloping Trail'}</strong>
                <div className="metric-bar">
                  <span className="bar-fill" style={{ width: '80%' }} />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Product Dossier */}
        <div className="product-dossier-column">
          <div className="dossier-eyebrow-row">
            <span className="category-roman-badge">{product.category.toUpperCase()}</span>
            <span className="provenance-chip">
              <Compass size={11} /> {product.origin || 'KEOMC Agro-Estate, India'}
            </span>
          </div>

          <h1 className="product-monumental-title">{product.name}</h1>

          {product.botanical && (
            <p className="product-latin-name">
              <em>{product.botanical}</em> · Pure Botanical Distillation
            </p>
          )}

          <div className="product-notes-summary-banner">
            <span className="notes-label">ACCORD PROFILE</span>
            <p className="notes-text">{product.notes}</p>
          </div>

          <p className="product-narrative-copy">
            {product.description ||
              'A masterfully balanced olfactory composition, steam distilled from fragrant botanicals and crafted for restorative personal rituals and discerning spaces.'}
          </p>

          {/* Olfactory Pyramid Accords */}
          {(product.topNotes || product.heartNotes || product.baseNotes) && (
            <div className="olfactory-pyramid-container">
              <h3 className="pyramid-header">THE OLFACTORY ARCHITECTURE</h3>

              {product.topNotes && (
                <div className="pyramid-layer">
                  <div className="layer-label">
                    <span className="layer-step">01</span>
                    <div>
                      <strong>Top Breath</strong>
                      <small>Immediate First Impression</small>
                    </div>
                  </div>
                  <div className="layer-chips">
                    {product.topNotes.map((note) => (
                      <span key={note} className="note-chip top-chip">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.heartNotes && (
                <div className="pyramid-layer">
                  <div className="layer-label">
                    <span className="layer-step">02</span>
                    <div>
                      <strong>Heart Theme</strong>
                      <small>Core Emotional Essence</small>
                    </div>
                  </div>
                  <div className="layer-chips">
                    {product.heartNotes.map((note) => (
                      <span key={note} className="note-chip heart-chip">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}

              {product.baseNotes && (
                <div className="pyramid-layer">
                  <div className="layer-label">
                    <span className="layer-step">03</span>
                    <div>
                      <strong>Base Sillage</strong>
                      <small>Enduring Reverberation</small>
                    </div>
                  </div>
                  <div className="layer-chips">
                    {product.baseNotes.map((note) => (
                      <span key={note} className="note-chip base-chip">
                        {note}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Size / Volume Selection */}
          {product.sizeOptions && product.sizeOptions.length > 0 && (
            <div className="product-size-selection-card">
              <div className="size-header-row">
                <span className="size-label">SELECT EDITION & PACKAGING</span>
                <span className="size-current-vol">{activeVolume}</span>
              </div>
              <div className="size-pills-grid" role="radiogroup">
                {product.sizeOptions.map((opt, i) => (
                  <button
                    key={opt.label}
                    type="button"
                    role="radio"
                    aria-checked={selectedSizeIndex === i}
                    className={`size-pill-btn ${selectedSizeIndex === i ? 'is-selected' : ''}`}
                    onClick={() => setSelectedSizeIndex(i)}
                  >
                    <div className="pill-top">
                      <strong className="pill-vol">{opt.volume}</strong>
                      <span className="pill-price">{formatPrice(opt.price)}</span>
                    </div>
                    <span className="pill-name">{opt.label}</span>
                    {opt.bulkNote && <span className="pill-badge">{opt.bulkNote}</span>}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Pricing & Add to Enquiry Bar */}
          <div className="product-purchase-console">
            <div className="price-display-box">
              <span className="price-label">INVESTMENT</span>
              <div className="price-amount-row">
                <h2>{formatPrice(activePrice * quantity)}</h2>
                <span className="price-volume-note">
                  ({formatPrice(activePrice)} / {activeVolume})
                </span>
              </div>
              <span className="price-tax-note">Includes batch distillation verified by KEOMC</span>
            </div>

            <div className="purchase-cta-row">
              <div className="quantity-counter-box" aria-label="Select quantity">
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                  aria-label="Decrease quantity"
                  disabled={quantity <= 1}
                >
                  <Minus size={14} />
                </button>
                <span className="qty-value">{quantity}</span>
                <button
                  type="button"
                  className="qty-btn"
                  onClick={() => setQuantity((q) => q + 1)}
                  aria-label="Increase quantity"
                >
                  <Plus size={14} />
                </button>
              </div>

              <Button
                variant="luxury"
                size="lg"
                className="add-to-enquiry-main-btn"
                onClick={handleAddToBag}
              >
                <ShoppingBag size={16} />
                <span>ADD TO ENQUIRY BAG • {formatPrice(activePrice * quantity)}</span>
                <Sparkles size={14} className="text-amber-300" />
              </Button>
            </div>

            {/* Direct Concierge WhatsApp / Email link */}
            <div className="concierge-direct-row">
              <a
                href={`mailto:keomc12@gmail.com?subject=${encodeURIComponent(
                  `Enquiry: ${product.name} (${activeVolume})`
                )}&body=${encodeURIComponent(
                  `Hello Artisan Scent Atelier,\nI would like to enquire about ordering ${quantity} × ${product.name} in the ${activeVolume} edition (${formatPrice(
                    activePrice
                  )} each).\n\nPlease provide availability, delivery timeline and payment details.`
                )}`}
                className="concierge-direct-link"
              >
                Direct Atelier Email Consultation <ArrowUpRight size={13} />
              </a>
              <span className="concierge-dot">•</span>
              <a href="tel:+919820252868" className="concierge-direct-link">
                Phone: +91 98202 52868
              </a>
            </div>
          </div>

          {/* Dossier Tabs: Profile, Origin, Ritual, Wholesale */}
          <div className="dossier-details-accordion">
            <div className="dossier-tab-headers" role="tablist">
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'profile'}
                className={`dossier-tab-btn ${activeTab === 'profile' ? 'active' : ''}`}
                onClick={() => setActiveTab('profile')}
              >
                Profile & Notes
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'origin'}
                className={`dossier-tab-btn ${activeTab === 'origin' ? 'active' : ''}`}
                onClick={() => setActiveTab('origin')}
              >
                Origin & Harvest
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'ritual'}
                className={`dossier-tab-btn ${activeTab === 'ritual' ? 'active' : ''}`}
                onClick={() => setActiveTab('ritual')}
              >
                Application Ritual
              </button>
              <button
                type="button"
                role="tab"
                aria-selected={activeTab === 'wholesale'}
                className={`dossier-tab-btn ${activeTab === 'wholesale' ? 'active' : ''}`}
                onClick={() => setActiveTab('wholesale')}
              >
                Bulk & Wholesale
              </button>
            </div>

            <div className="dossier-tab-content">
              {activeTab === 'profile' && (
                <div className="tab-pane">
                  <p>{product.description}</p>
                  <ul className="spec-bullet-list">
                    <li>
                      <strong>Sensorial Classification:</strong> {product.category} ({categoryObj.name})
                    </li>
                    <li>
                      <strong>Key Aromatic Accords:</strong> {product.notes}
                    </li>
                    {product.botanical && (
                      <li>
                        <strong>Botanical Nomenclature:</strong> {product.botanical}
                      </li>
                    )}
                    <li>
                      <strong>Preservation:</strong> Protected in pharmaceutical amber glass or natural timber diffuser housing.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'origin' && (
                <div className="tab-pane">
                  <p>
                    Every harvest is nurtured under ethical cultivation standards and recovered through
                    slow, low-temperature steam distillation overseen by our parent company, KEOMC
                    (Khadi & Essential Oils Mfg. Co.).
                  </p>
                  <ul className="spec-bullet-list">
                    <li>
                      <strong>Origin:</strong> {product.origin || 'KEOMC Agro-Estate, Maharashtra, India'}
                    </li>
                    <li>
                      <strong>Harvest Method:</strong> {product.harvest || 'Fractional Steam Distillation'}
                    </li>
                    <li>
                      <strong>Batch Integrity:</strong> Single-harvest lot verification, zero synthetic extenders.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'ritual' && (
                <div className="tab-pane">
                  <p>
                    {product.applications ||
                      'Suited for personal wear, cold-air diffusion, restorative bathing rituals, and sacred spaces.'}
                  </p>
                  <ul className="spec-bullet-list">
                    <li>
                      <strong>Diffusion:</strong> Add 3–5 drops to an ultrasonic diffuser or water basin.
                    </li>
                    <li>
                      <strong>Personal Ritual:</strong> Warm 1 drop between palms, inhale deeply, and apply to pulse points or collar.
                    </li>
                    <li>
                      <strong>Spatial Ambiance:</strong> Diffuse 30 minutes prior to meditation or rest.
                    </li>
                  </ul>
                </div>
              )}

              {activeTab === 'wholesale' && (
                <div className="tab-pane">
                  <p>
                    We supply commercial formulations, hotels, spas, wellness retreats, and luxury
                    brands across India and internationally.
                  </p>
                  <ul className="spec-bullet-list">
                    <li>
                      <strong>Available Packaging:</strong> 1 Litre, 5 Litres, 25 kg carboys, and 200 kg master drums.
                    </li>
                    <li>
                      <strong>White-Label Services:</strong> Custom flacon bottling, debossed wooden caps, and tailored olfactory profiles.
                    </li>
                    <li>
                      <strong>Direct Contact:</strong> Consult directly with our Mumbai formulation team.
                    </li>
                  </ul>
                  <Button variant="editorial" size="sm" asChild className="mt-3">
                    <Link to="/wholesale">
                      View Wholesale Services <ArrowUpRight size={13} />
                    </Link>
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Atelier Reassurance Guarantee Band */}
      <section className="section product-guarantee-band">
        <div className="guarantee-grid">
          <div className="guarantee-card">
            <span className="guarantee-icon">✦</span>
            <h4>100% PURE HARVEST</h4>
            <p>Direct from Indian botanical cultivation with absolute chemical purity.</p>
          </div>
          <div className="guarantee-card">
            <span className="guarantee-icon">⚗️</span>
            <h4>FRACTIONAL STEAM DISTILLED</h4>
            <p>Gentle low-heat extraction preserving delicate volatile fragrance notes.</p>
          </div>
          <div className="guarantee-card">
            <span className="guarantee-icon">📦</span>
            <h4>WHITE-GLOVE PACKAGING</h4>
            <p>Preserved in amber UV glass, sustainably sourced timber, and linen boxes.</p>
          </div>
          <div className="guarantee-card">
            <span className="guarantee-icon">🤝</span>
            <h4>KEOMC HERITAGE GUILD</h4>
            <p>Crafted under decades of recognized khadi and essential oil expertise.</p>
          </div>
        </div>
      </section>

      {/* Harmonious Companions / Related Products Section */}
      {relatedProducts.length > 0 && (
        <section className="section product-related-section">
          <div className="section-heading">
            <div>
              <span className="eyebrow">HARMONIOUS COMPANIONS</span>
              <h2>Complementary creations.</h2>
              <p>Curated creations from the {categoryObj.name} portfolio to layer with {product.name}.</p>
            </div>
            <Button variant="editorial" asChild>
              <Link to={categoryObj.path}>
                Explore full {categoryObj.name} collection <ArrowUpRight />
              </Link>
            </Button>
          </div>

          <div className="product-grid">
            {relatedProducts.map((rel) => (
              <LuxuryTiltCard key={rel.slug} maxTilt={6} scale={1.02}>
                <article className="product-card">
                  <div className="product-photo">
                    <Link to={`/product/${rel.slug}`} className="image-open" aria-label={`View ${rel.name}`}>
                      <img src={rel.image} alt={rel.name} loading="lazy" />
                    </Link>
                    <Button
                      variant="ghost"
                      className="quick-add"
                      size="icon"
                      title="Add to enquiry"
                      aria-label={`Add ${rel.name} to enquiry`}
                      onClick={() => add(rel)}
                    >
                      <Plus />
                    </Button>
                  </div>
                  <div className="product-meta">
                    <span>{rel.category}</span>
                    <Link to={`/product/${rel.slug}`}>
                      <h3>{rel.name}</h3>
                    </Link>
                    <p>{rel.notes}</p>
                    <div className="product-price">
                      {rel.price ? (
                        <>
                          {formatPrice(rel.price)}{' '}
                          {rel.group === 'oils' ? <small>/ 10 ml</small> : <small>/ unit</small>}
                        </>
                      ) : (
                        <small>Enquire for pricing</small>
                      )}
                    </div>
                  </div>
                </article>
              </LuxuryTiltCard>
            ))}
          </div>
        </section>
      )}
    </article>
  );
}
