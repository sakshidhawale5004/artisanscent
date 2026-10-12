import { useState } from 'react';
import { Link } from '@tanstack/react-router';
import {
  Sparkles,
  Droplets,
  Leaf,
  ShieldCheck,
  ArrowUpRight,
  ArrowRight,
  Clock,
  Compass,
  Award,
  ChevronDown,
  Package,
  Layers,
  Heart,
  Plus,
} from 'lucide-react';
import { Button } from './ui/button';
import { LuxuryTiltCard } from './LuxuryTiltCard';
import { photos } from '@/lib/artisan-assets';
import { productPhotos } from '@/lib/product-assets';
import { formatPrice, type Product } from '@/lib/artisan-data';
import { useShop } from './SiteShell';

// 1. TERROIR & QUALITY STANDARDS STRIP
export function TerroirStandardsStrip() {
  const standards = [
    {
      icon: Droplets,
      number: '01',
      title: 'Hydro-Steam Distillation',
      desc: 'Extracted in small batches at low temperatures to protect fragile volatile terpenes and pure aromatic profiles.',
    },
    {
      icon: Leaf,
      number: '02',
      title: '100% Pure Botanical Roots',
      desc: 'Ethically cultivated single-origin harvests from pristine Indian agro-terroirs. Zero petroleum fillers or adulterants.',
    },
    {
      icon: ShieldCheck,
      number: '03',
      title: 'GC/MS Tested Purity',
      desc: 'Rigorous gas chromatography quality testing guarantees therapeutic grade purity for personal wear, cosmetics, and fine fragrance.',
    },
    {
      icon: Package,
      number: '04',
      title: 'Atelier to Bulk Supply',
      desc: 'From 10 ml retail flacons to 100 ml studio sizes and bulk industrial packaging (1 Litre to drum scale) with nationwide delivery.',
    },
  ];

  return (
    <section className="terroir-standards-strip" aria-label="Artisan Scent Quality Standards">
      <div className="terroir-standards-inner">
        {standards.map((s) => {
          const Icon = s.icon;
          return (
            <div key={s.number} className="standard-col">
              <div className="standard-header">
                <div className="standard-icon-box">
                  <Icon size={18} />
                </div>
                <span className="standard-number">{s.number}</span>
              </div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// 2. INTERACTIVE OLFACTORY NOTES ARCHITECTURE
type AccordKey = 'earthy' | 'floral' | 'haute';

export function InteractiveScentPyramid() {
  const [activeAccord, setActiveAccord] = useState<AccordKey>('earthy');

  const accords: Record<
    AccordKey,
    {
      name: string;
      subtitle: string;
      inspiration: string;
      featuredProduct: {
        name: string;
        category: string;
        slug: string;
        price: number;
        image: string;
        volume: string;
      };
      topNotes: string[];
      heartNotes: string[];
      baseNotes: string[];
      longevity: string;
      sillage: string;
      season: string;
    }
  > = {
    earthy: {
      name: 'Earthy & Woody Roots',
      subtitle: 'The Soul of Ancient Terroirs',
      inspiration:
        'Capturing the regal petrichor of monsoonal riverbeds and aged timber. Grounding, rich, and sovereign.',
      featuredProduct: {
        name: 'Vetiver (Khus) Oil',
        category: 'Pure Essential Oil',
        slug: 'vetiver-khus-oil',
        price: 650,
        image: productPhotos.oils[1],
        volume: '10 ml / Bulk Available',
      },
      topNotes: ['Riverbed Moisture', 'Sunlit Green Grass', 'Spiced Pink Pepper'],
      heartNotes: ['Distilled Vetiver Root', 'Wild Orris Root', 'Smoked Incense'],
      baseNotes: ['Damp Earth Petrichor', 'Aged Patchouli Leaf', 'Precious Sandalwood'],
      longevity: '14+ Hours on Skin',
      sillage: 'Profound, Intimate Warmth',
      season: 'Monsoon, Autumn & Quiet Evenings',
    },
    floral: {
      name: 'Regal Botanical Florals',
      subtitle: 'Dew-Drenched Highland Blooms',
      inspiration:
        'Lyrical harmony between hand-gathered French lavender petals and crisp Deccan rose geranium.',
      featuredProduct: {
        name: 'Lavender Oil',
        category: 'Pure Essential Oil',
        slug: 'lavender-oil',
        price: 450,
        image: productPhotos.oils[0],
        volume: '10 ml / Bulk Available',
      },
      topNotes: ['French Lavender Blossom', 'Wild Bergamot Dew', 'Crisp Mint Leaf'],
      heartNotes: ['Bourbon Rose Geranium', 'Honeyed Clary Sage', 'White Magnolia'],
      baseNotes: ['Sweet Dried Hay', 'Clean Cedar Timber', 'Velveteen Cashmere Amber'],
      longevity: '10–12 Hours on Skin',
      sillage: 'Airy, Radiant Aura',
      season: 'Spring Mornings & Restorative Rituals',
    },
    haute: {
      name: 'Haute Evening Parfumerie',
      subtitle: 'Nocturnal Allure & Rare Absolutes',
      inspiration:
        'An opulent interplay of nocturnal orchids, warm spices, and decadent bourbon amber for commanding presence.',
      featuredProduct: {
        name: 'Midnight Eau de Parfum',
        category: 'Artisan Scent Perfume',
        slug: 'midnight-eau-de-parfum',
        price: 2850,
        image: productPhotos.scents[2],
        volume: '50 ml Flacon',
      },
      topNotes: ['Black Truffle Accord', 'Bergamot Caviar', 'French Ylang-Ylang'],
      heartNotes: ['Nocturnal Black Orchid', 'Spiced Damson Plum', 'Smoked Lotus'],
      baseNotes: ['Bourbon Vanilla Pod', 'Dark Indonesian Patchouli', 'Golden Vetiver'],
      longevity: '16+ Hours Sillage',
      sillage: 'Magnetic, Room-Filling Elegance',
      season: 'Gala Evenings & Special Occasions',
    },
  };

  const curr = accords[activeAccord];

  return (
    <section className="section scent-pyramid-section" aria-label="Olfactory Architecture">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE ARCHITECTURE OF FRAGRANCE</span>
          <h2>The Olfactory Pyramid.</h2>
          <p className="scent-pyramid-intro">
            Fine perfumery unfolds in three deliberate movements. Explore how top freshness yields
            to evocative heart notes and timeless base sillage.
          </p>
        </div>
        <div className="accord-pills-row" role="tablist">
          <button
            role="tab"
            aria-selected={activeAccord === 'earthy'}
            className={`accord-tab-btn ${activeAccord === 'earthy' ? 'active' : ''}`}
            onClick={() => setActiveAccord('earthy')}
          >
            Earthy & Woody
          </button>
          <button
            role="tab"
            aria-selected={activeAccord === 'floral'}
            className={`accord-tab-btn ${activeAccord === 'floral' ? 'active' : ''}`}
            onClick={() => setActiveAccord('floral')}
          >
            Regal Florals
          </button>
          <button
            role="tab"
            aria-selected={activeAccord === 'haute'}
            className={`accord-tab-btn ${activeAccord === 'haute' ? 'active' : ''}`}
            onClick={() => setActiveAccord('haute')}
          >
            Haute Parfumerie
          </button>
        </div>
      </div>

      <div className="pyramid-content-grid">
        {/* Left: The 3 Tier Pyramid Visualization */}
        <div className="pyramid-visual-card">
          <div className="pyramid-tier tier-top">
            <div className="tier-badge">
              <span className="tier-name">TOP NOTES</span>
              <span className="tier-time">0–30 MINS · FIRST IMPRESSION</span>
            </div>
            <div className="tier-tags">
              {curr.topNotes.map((note) => (
                <span key={note} className="note-pill">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="pyramid-tier tier-heart">
            <div className="tier-badge">
              <span className="tier-name">HEART NOTES</span>
              <span className="tier-time">2–6 HOURS · THE EMOTIVE SOUL</span>
            </div>
            <div className="tier-tags">
              {curr.heartNotes.map((note) => (
                <span key={note} className="note-pill">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="pyramid-tier tier-base">
            <div className="tier-badge">
              <span className="tier-name">BASE NOTES</span>
              <span className="tier-time">8–16+ HOURS · ENDURING SILLAGE</span>
            </div>
            <div className="tier-tags">
              {curr.baseNotes.map((note) => (
                <span key={note} className="note-pill">
                  {note}
                </span>
              ))}
            </div>
          </div>

          <div className="pyramid-specs-strip">
            <div className="spec-item">
              <Clock size={14} />
              <span>Longevity: <strong>{curr.longevity}</strong></span>
            </div>
            <div className="spec-item">
              <Compass size={14} />
              <span>Sillage: <strong>{curr.sillage}</strong></span>
            </div>
          </div>
        </div>

        {/* Right: Featured Accord Creation Card */}
        <div className="pyramid-accord-spotlight">
          <div className="accord-spotlight-inner">
            <span className="accord-eyebrow">{curr.subtitle}</span>
            <h3>{curr.name}</h3>
            <p className="accord-desc">{curr.inspiration}</p>

            <div className="featured-accord-item">
              <img
                src={curr.featuredProduct.image}
                alt={curr.featuredProduct.name}
                className="featured-item-thumb"
              />
              <div className="featured-item-meta">
                <span className="featured-item-cat">{curr.featuredProduct.category}</span>
                <h4>{curr.featuredProduct.name}</h4>
                <span className="featured-item-price">
                  {formatPrice(curr.featuredProduct.price)}{' '}
                  <small>· {curr.featuredProduct.volume}</small>
                </span>
                <Link
                  to={`/product/${curr.featuredProduct.slug}`}
                  className="featured-item-link"
                >
                  View Notes & Formulation <ArrowUpRight size={13} />
                </Link>
              </div>
            </div>

            <div className="accord-meta-footer">
              <span className="season-note">Recommended Ritual: {curr.season}</span>
              <Button asChild variant="luxury" className="explore-accord-cta">
                <Link to="/collections">
                  Explore Full Library <ArrowRight size={14} />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

// 3. ARTISANAL DISTILLATION JOURNEY (Soil to Flacon)
export function DistillationCraftJourney() {
  const steps = [
    {
      num: '01',
      title: 'Dawn Botanical Harvest',
      subtitle: 'Single-Origin Plantations',
      desc: 'Selected flowers, roots, and aromatic leaves are hand-gathered at dawn when ambient humidity keeps volatile oils concentrated within the plant cells.',
      image: photos['project site'][0],
    },
    {
      num: '02',
      title: 'Low-Temp Steam Distillation',
      subtitle: 'Field Distillation Units (FDU)',
      desc: 'Steam gently permeates the botanical biomass in stainless field units, vaporizing delicate essence without thermal scorching or chemical solvents.',
      image: photos['project site'][3],
    },
    {
      num: '03',
      title: 'Florentine Separation & Curing',
      subtitle: 'Pure Oil & Pure Hydrosol',
      desc: 'As aromatic vapor condenses in chilled coils, the precious essence separates naturally by density, followed by multi-week maturation in dark glass vessels.',
      image: photos['project site'][12],
    },
    {
      num: '04',
      title: 'Artisanal Flacon Bottling',
      subtitle: 'Finished with Precision',
      desc: 'Each edition is filtered, inspected under strict purity standards, and hand-poured into UV-filtering amber flacons or architectural wood diffusers.',
      image: photos['project site'][15],
    },
  ];

  return (
    <section className="section distillation-journey-section" aria-label="Distillation Journey">
      <div className="section-heading">
        <div>
          <span className="eyebrow">THE KEOMC DISTILLATION PROCESS</span>
          <h2>From Soil to Flacon.</h2>
          <p className="journey-intro-text">
            Rooted in nature, perfected through craft. Kulswami Essence Oil Manufacturing Company
            (KEOMC) marries traditional agro-wisdom with modern precision steam distillation.
          </p>
        </div>
        <Button variant="editorial" asChild>
          <Link to="/keomc">
            About KEOMC Agro-Tech <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="journey-steps-grid">
        {steps.map((st) => (
          <div key={st.num} className="journey-step-card">
            <div className="journey-image-wrapper">
              <img src={st.image} alt={st.title} loading="lazy" />
              <span className="journey-step-badge">{st.num}</span>
            </div>
            <div className="journey-step-body">
              <span className="journey-step-sub">{st.subtitle}</span>
              <h3>{st.title}</h3>
              <p>{st.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 4. SPOTLIGHT CONNOISSEUR CREATIONS
export function SpotlightConnoisseurCreations() {
  const { add } = useShop();

  const spotlightItems = [
    {
      name: 'Lavender Oil',
      category: 'Pure Essential Oil',
      slug: 'lavender-oil',
      price: 450,
      sizeNote: '10 ml / ₹30,000 Bulk Litre',
      image: productPhotos.oils[0],
      badge: 'Bestseller',
      notes: 'French Blossom · Honeyed Herbals · Velvet Amber',
      fullProduct: {
        name: 'Lavender Oil',
        slug: 'lavender-oil',
        price: 450,
        group: 'oils' as const,
        category: 'Essential oil',
        image: productPhotos.oils[0],
        notes: 'Floral · Calming · Sweet',
      },
    },
    {
      name: 'Vetiver (Khus) Oil',
      category: 'Single-Origin Fluvial Roots',
      slug: 'vetiver-khus-oil',
      price: 650,
      sizeNote: '10 ml / ₹45,000 Bulk Litre',
      image: productPhotos.oils[1],
      badge: 'Heritage Icon',
      notes: 'Wet River Soil · Distilled Roots · Smoked Cedar',
      fullProduct: {
        name: 'Vetiver (Khus) Oil',
        slug: 'vetiver-khus-oil',
        price: 650,
        group: 'oils' as const,
        category: 'Essential oil',
        image: productPhotos.oils[1],
        notes: 'Earthy · Woody · Deep',
      },
    },
    {
      name: 'Midnight Eau de Parfum',
      category: 'Fine Fragrance Edition',
      slug: 'midnight-eau-de-parfum',
      price: 2850,
      sizeNote: '50 ml Prestige Flacon',
      image: productPhotos.scents[2],
      badge: 'Haute Sillage',
      notes: 'Black Truffle · Orchid Noir · Bourbon Amber',
      fullProduct: {
        name: 'Midnight Eau de Parfum',
        slug: 'midnight-eau-de-parfum',
        price: 2850,
        group: 'artisan-scent' as const,
        category: 'Artisan Scent',
        image: productPhotos.scents[2],
        notes: 'Black Truffle · Orchid Noir · Spiced Amber',
      },
    },
    {
      name: 'Frosted Pear Hanging Diffuser',
      category: 'Automotive Timber Flacon',
      slug: 'frosted-pear-hanging-diffuser',
      price: 399,
      sizeNote: 'Natural Turned Beechwood',
      image: productPhotos.scents[1],
      badge: 'Cabin Luxury',
      notes: 'Pear Nectar · Vanilla Blossom · Sweet Amber',
      fullProduct: {
        name: 'Frosted Pear Hanging Diffuser',
        slug: 'frosted-pear-hanging-diffuser',
        price: 399,
        group: 'car-perfumes' as const,
        category: 'Car fragrance',
        image: productPhotos.scents[1],
        notes: 'Vanilla Blossom · Sweet Amber · Warm Timber',
      },
    },
  ];

  return (
    <section className="section spotlight-creations-section" aria-label="Signature Highlights">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CURATED MASTERPIECES</span>
          <h2>The Signature Icons.</h2>
        </div>
        <Button variant="editorial" asChild>
          <Link to="/collections">
            Browse All 5 Collections <ArrowUpRight />
          </Link>
        </Button>
      </div>

      <div className="spotlight-cards-grid">
        {spotlightItems.map((item) => (
          <LuxuryTiltCard key={item.slug} maxTilt={6} scale={1.02} glare={true}>
            <article className="spotlight-card">
              <div className="spotlight-card-photo">
                <Link to={`/product/${item.slug}`}>
                  <img src={item.image} alt={item.name} loading="lazy" />
                </Link>
                <span className="spotlight-badge">{item.badge}</span>
                <Button
                  variant="ghost"
                  className="quick-add"
                  size="icon"
                  title="Add to enquiry"
                  aria-label={`Add ${item.name} to enquiry`}
                  onClick={(e) => {
                    e.preventDefault();
                    e.stopPropagation();
                    add(item.fullProduct as Product);
                  }}
                >
                  <Plus />
                </Button>
              </div>

              <div className="spotlight-card-meta">
                <span className="spotlight-cat">{item.category}</span>
                <Link to={`/product/${item.slug}`} className="spotlight-title-link">
                  <h3>{item.name}</h3>
                </Link>
                <p className="spotlight-notes">{item.notes}</p>
                <div className="spotlight-price-row">
                  <div className="spotlight-price">
                    <strong>{formatPrice(item.price)}</strong>
                    <small>{item.sizeNote}</small>
                  </div>
                  <Link to={`/product/${item.slug}`} className="spotlight-discover-btn">
                    Details <ArrowUpRight size={13} />
                  </Link>
                </div>
              </div>
            </article>
          </LuxuryTiltCard>
        ))}
      </div>
    </section>
  );
}

// 5. COMMERCIAL, B2B & SAMPLE SUITE BANNER
export function CommercialWholesaleBanner() {
  const samplePacks = [
    {
      title: 'Starter Sample Kit',
      size: '5 Oils × 5 ml each',
      price: '₹999',
      desc: 'Ideal for initial fragrance testing and perfumery prototyping.',
    },
    {
      title: 'Professional Sample Kit',
      size: '10 Oils × 5 ml each',
      price: '₹1,799',
      desc: 'Comprehensive botanical palette for cosmetic formulators and brands.',
    },
    {
      title: 'Premium Perfumery Kit',
      size: '5 Precious Absolutes',
      price: '₹2,499',
      desc: 'Rose, Vetiver, Lavender, Geranium & Patchouli single harvests.',
    },
  ];

  return (
    <section className="commercial-wholesale-banner" aria-label="Wholesale and B2B Solutions">
      <div className="commercial-inner">
        <div className="commercial-left-copy">
          <span className="eyebrow">COMMERCIAL, B2B & AGRO-SERVICES</span>
          <h2>
            Wholesale bulk harvests.
            <em>Custom fragrance distillation.</em>
          </h2>
          <p>
            Kulswami Essence Oil Manufacturing Company (KEOMC) partners with distributors,
            cosmetic manufacturers, luxury hotels, and private ateliers across India and abroad.
          </p>

          <ul className="commercial-features-list">
            <li>
              <ShieldCheck size={16} className="text-gold" />
              <span>Bulk volumes available in 100 ml, 500 ml, 1 Litre, and industrial drums</span>
            </li>
            <li>
              <ShieldCheck size={16} className="text-gold" />
              <span>Field Distillation Unit (FDU) job work and turnkey agro-technology</span>
            </li>
            <li>
              <ShieldCheck size={16} className="text-gold" />
              <span>Sample charges credited against your first wholesale order above ₹50,000</span>
            </li>
          </ul>

          <div className="commercial-cta-group">
            <Button asChild variant="luxury">
              <Link to="/wholesale">
                Explore Wholesale Catalog <ArrowUpRight />
              </Link>
            </Button>
            <Button asChild variant="editorial">
              <Link to="/contact">
                Enquire for Contract Distillation <ArrowRight size={14} />
              </Link>
            </Button>
          </div>
        </div>

        <div className="commercial-samples-box">
          <div className="sample-box-header">
            <span className="sample-box-eyebrow">EVALUATION SAMPLE KITS</span>
            <h3>Test our botanical harvests before placing bulk orders</h3>
          </div>

          <div className="sample-cards-stack">
            {samplePacks.map((pack) => (
              <div key={pack.title} className="sample-mini-card">
                <div className="sample-card-head">
                  <div>
                    <h4>{pack.title}</h4>
                    <span className="sample-card-size">{pack.size}</span>
                  </div>
                  <strong className="sample-card-price">{pack.price}</strong>
                </div>
                <p>{pack.desc}</p>
              </div>
            ))}
          </div>

          <div className="sample-box-foot">
            <small>Complimentary sample kit may be provided to verified distributors.</small>
          </div>
        </div>
      </div>
    </section>
  );
}

// 6. THE ART OF SCENTING RITUAL EDITORIAL
export function ScentingRitualEditorial() {
  const rituals = [
    {
      title: 'Pulse Point Resonance',
      step: '01',
      desc: 'Apply pure oils or perfume to inner wrists, behind ears, and along the collarbones. Natural blood flow radiates gentle heat that slowly unfurls subtle middle notes.',
    },
    {
      title: 'Bespoke Olfactory Layering',
      step: '02',
      desc: 'Lay a deep grounding anchor using Vetiver or Patchouli oil on damp skin, then mist Midnight Eau de Parfum or a floral touch over fabric for a signature sillage.',
    },
    {
      title: 'Ambient & Cabin Sanctuary',
      step: '03',
      desc: 'Inverted wooden car diffusers and slow-burning agarbatti sticks purify interior spaces without harsh aerosol propellants, cultivating mindful tranquility.',
    },
  ];

  return (
    <section className="section ritual-editorial-section" aria-label="The Art of Scenting">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CONNOISSEUR ADVICE</span>
          <h2>The Art of Scenting.</h2>
          <p className="ritual-subtext">
            Fragrance is an invisible garment. Discover three rituals to elevate longevity,
            projection, and personal presence.
          </p>
        </div>
      </div>

      <div className="rituals-grid">
        {rituals.map((r) => (
          <article key={r.step} className="ritual-card">
            <span className="ritual-step-num">{r.step}</span>
            <h3>{r.title}</h3>
            <p>{r.desc}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

// 7. CONNOISSEUR TESTIMONIALS & ACCLAIMS
export function ConnoisseurTestimonials() {
  const testimonials = [
    {
      quote:
        'The Vetiver (Khus) distillation has a petrichor depth and root clarity that synthetic aroma chemicals can never replicate. It has become our bespoke house signature.',
      author: 'Aroma Atelier & Formulators',
      location: 'Mumbai, India',
      rating: '★★★★★',
    },
    {
      quote:
        'Exceptional steam-distilled essential oils. The GC/MS purity and consistency across batches make Artisan Scent our preferred partner for luxury wellness formulations.',
      author: 'Luxury Spa & Hospitality Group',
      location: 'Bengaluru, India',
      rating: '★★★★★',
    },
    {
      quote:
        'The beechwood car diffusers are architectural works of art. The scent lasts for weeks without ever overpowering the cabin. Quiet luxury at its finest.',
      author: 'Private Fragrance Collector',
      location: 'New Delhi, India',
      rating: '★★★★★',
    },
  ];

  return (
    <section className="section luxury-testimonials-section" aria-label="Client Acclaims">
      <div className="section-heading">
        <div>
          <span className="eyebrow">VOICES OF DISTINCTION</span>
          <h2>Loved by Discerning Connoisseurs.</h2>
        </div>
      </div>

      <div className="testimonials-grid">
        {testimonials.map((t, idx) => (
          <div key={idx} className="testimonial-card">
            <span className="testimonial-stars">{t.rating}</span>
            <blockquote>“{t.quote}”</blockquote>
            <div className="testimonial-author">
              <strong>{t.author}</strong>
              <span>{t.location}</span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

// 8. BRAND FAQ ACCORDION
export function BrandFAQSection() {
  const [openIdx, setOpenIdx] = useState<number | null>(0);

  const faqs = [
    {
      q: 'Are Artisan Scent essential oils 100% pure and steam distilled?',
      a: 'Yes. Every bottle in our essential oils portfolio is recovered through gentle hydro-steam distillation from aromatic harvests (Lavender, Khus Vetiver, Geranium, Lemongrass, Citronella, Patchouli). We add no chemical preservatives, artificial perfumes, or mineral oil extenders.',
    },
    {
      q: 'Can I purchase samples before committing to wholesale orders?',
      a: 'Yes! We offer Starter Kits (5 oils), Professional Formulator Kits (10 oils), and Premium Perfumery Kits. Furthermore, sample costs are credited directly against your first wholesale order above ₹50,000.',
    },
    {
      q: 'What is the longevity and sillage of Artisan Scent perfumes?',
      a: 'Our fine Eau de Parfum editions are crafted with high concentrations of pure botanical absolutes and precious resins. They typically achieve 12 to 16+ hours of enduring skin sillage with elegant, non-cloying projection.',
    },
    {
      q: 'Do you offer custom distillation and contract manufacturing?',
      a: 'Through Kulswami Essence Oil Manufacturing Company (KEOMC), we provide turnkey contract manufacturing for soap bars, perfumes, car diffusers, and incense. We also operate Field Distillation Units (FDU) on a job-work basis and consult on aromatic crop plantation establishment.',
    },
  ];

  return (
    <section className="section brand-faq-section" aria-label="Frequently Asked Questions">
      <div className="section-heading">
        <div>
          <span className="eyebrow">CURATED ANSWERS</span>
          <h2>Frequently Asked Questions.</h2>
        </div>
      </div>

      <div className="faq-accordion-list">
        {faqs.map((faq, i) => {
          const isOpen = openIdx === i;
          return (
            <div key={i} className={`faq-accordion-item ${isOpen ? 'open' : ''}`}>
              <button
                className="faq-question-btn"
                onClick={() => setOpenIdx(isOpen ? null : i)}
                aria-expanded={isOpen}
              >
                <span>{faq.q}</span>
                <ChevronDown className={`faq-chevron ${isOpen ? 'rotate-180' : ''}`} size={18} />
              </button>
              {isOpen && (
                <div className="faq-answer-panel">
                  <p>{faq.a}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </section>
  );
}
