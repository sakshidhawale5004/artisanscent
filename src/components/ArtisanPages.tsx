import { Link } from '@tanstack/react-router';
import { useState, useRef, useEffect } from 'react';
import { ArrowUpRight, ArrowRight, Plus, Pause, Play, ArrowDown, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { useShop, InteractiveSculpture } from './SiteShell';
import {
  categories,
  additionalCategories,
  oils,
  artisanScents,
  carPerfumes,
  soaps,
  agarbatti,
  allProducts,
  formatPrice,
  type Product,
  type ProductGroup,
} from '@/lib/artisan-data';
import { photos } from '@/lib/artisan-assets';
import { LuxuryPageHero } from './LuxuryPageHero';
import { LuxuryTiltCard } from './LuxuryTiltCard';

const heroVideoUrl = '/assets/video/scent.mp4';

export function PageHeading({
  title,
  eyebrow = 'THE WORLD OF ARTISAN SCENT',
  description,
}: {
  title: string;
  eyebrow?: string;
  description: string;
}) {
  return (
    <div className="page-heading">
      <span className="eyebrow">{eyebrow}</span>
      <h1>{title}</h1>
      <p>{description}</p>
    </div>
  );
}

export function ProductCard({
  product,
  badge,
}: {
  product: Product;
  badge?: string | undefined;
}) {
  const { add, inspect } = useShop();
  return (
    <LuxuryTiltCard maxTilt={7} scale={1.02} glare={true}>
      <article className="product-card">
        <div className="product-photo">
          <Button
            className="image-open"
            variant="ghost"
            onClick={() => inspect(product)}
            aria-label={`View ${product.name}`}
          >
            <img src={product.image} alt={product.name} loading="lazy" />
          </Button>
          {badge && <span className="product-badge">{badge}</span>}
          <Button
            variant="ghost"
            className="quick-add"
            size="icon"
            title="Add to enquiry"
            aria-label={`Add ${product.name} to enquiry`}
            onClick={() => add(product)}
          >
            <Plus />
          </Button>
        </div>
        <div className="product-meta">
          <span>{product.category}</span>
          <h3>{product.name}</h3>
          <p>{product.notes}</p>
          <div className="product-price">
            {product.price ? (
              <>
                {formatPrice(product.price)}{' '}
                {product.group === 'oils' ? (
                  <small>/ 10 ml</small>
                ) : (
                  <small>/ unit</small>
                )}
              </>
            ) : (
              <small>Discover the collection · Enquire for pricing</small>
            )}
          </div>
        </div>
      </article>
    </LuxuryTiltCard>
  );
}

const productFilters: { label: string; value: ProductGroup }[] = [
  { label: 'Oils', value: 'oils' },
  { label: 'Artisan Scent', value: 'artisan-scent' },
  { label: 'Agarbatti', value: 'agarbatti' },
  { label: 'Soaps', value: 'soaps' },
  { label: 'Car perfumes', value: 'car-perfumes' },
];

const categoryDetails: Record<
  string,
  { number: string; title: string; body: string; points: string[] }
> = {
  oils: {
    number: '01',
    title: 'Pure botanical essences.',
    body: 'Discover essential oils recovered from aromatic plants through steam distillation. Our botanical collection supports fragrance, wellness and personal-care requirements, with retail and bulk packaging available.',
    points: ['Botanical essential oils', '10 ml retail pricing', 'Bulk packaging available'],
  },
  soaps: {
    number: '02',
    title: 'Everyday care, elevated by scent.',
    body: 'Discover soaps that combine everyday cleansing with an appealing fragrance experience. Designed to complement daily personal-care routines, our soap category brings together fragrance, presentation and everyday usability.',
    points: ['Refreshing', 'Sensory', 'Everyday care'],
  },
  incense: {
    number: '03',
    title: 'Fragrance for familiar rituals.',
    body: 'Artisan Scent brings fragrance to traditional rituals and everyday moments through its agarbatti range. Suitable for prayer spaces, meditation settings and home ambience, these incense products help create an atmosphere of calm and familiarity.',
    points: ['Fragrances inspired by Indian traditions', 'Floral, woody and soothing scent profiles'],
  },
  'car-perfumes': {
    number: '04',
    title: 'Personalise the journey.',
    body: 'Enhance your driving environment with car perfumes designed to bring a pleasant fragrance to vehicle interiors. Combining compact designs with everyday lifestyle appeal, this category offers a simple way to personalise the in-car experience.',
    points: [
      'Designed for automotive fragrance use',
      'Compact and stylish diffuser formats',
      'Fresh, woody and sophisticated fragrance options',
    ],
  },
  perfumes: {
    number: '05',
    title: 'An expression of individuality.',
    body: 'The Artisan Scent luxury perfume category celebrates fragrance as an expression of personality, style and individuality. With sophisticated presentation and distinctive scent experiences, these perfumes are suited to personal wear, special occasions and thoughtful gifting.',
    points: ['Distinctive fragrance compositions', 'Sophisticated scent profiles'],
  },
};

const categoryHeroConfigs: Record<
  string,
  { image: string; badge: string; eyebrow: string; pills: string[] }
> = {
  oils: {
    image: '/assets/heroes/oils-hero.jpg',
    badge: 'PURE BOTANICAL ESSENCES',
    eyebrow: 'STEAM DISTILLED HARVESTS',
    pills: [
      '100% Pure Essential Oils',
      'Single Origin Harvests',
      '10 ml Retail & Bulk Packaging Available',
    ],
  },
  perfumes: {
    image: '/assets/heroes/perfumes-hero.jpg',
    badge: 'HAUTE PARFUMERIE',
    eyebrow: 'EAU DE PARFUM EDITIONS',
    pills: [
      'Artisanal Compositions',
      'Distinctive Sillage',
      'Rare Botanical Absolutes',
    ],
  },
  soaps: {
    image: '/assets/heroes/soaps-hero.jpg',
    badge: 'HANDCRAFTED BOTANICAL SOAPS',
    eyebrow: 'COLD-PROCESSED CARES',
    pills: [
      'Sensorial Travertine Lather',
      'Enriched with Botanical Oils',
      'Everyday Restorative Rituals',
    ],
  },
  incense: {
    image: '/assets/heroes/incense-hero.jpg',
    badge: 'SACRED SCENTED AGARBATTI',
    eyebrow: 'DEVOTIONAL RITUAL HERITAGE',
    pills: [
      'Traditional Indian Incense',
      'Floral, Woody & Resinous Accords',
      'Calming Sanctuary Ambience',
    ],
  },
  'car-perfumes': {
    image: '/assets/heroes/car-perfumes-hero.jpg',
    badge: 'PRESTIGE CABIN DIFFUSERS',
    eyebrow: 'AUTOMOTIVE LUXURY DIFFUSION',
    pills: [
      'Engineered for Interiors',
      'Compact & Refined Diffusers',
      'Sophisticated Timber & Glass Notes',
    ],
  },
};

function ProductCatalogue({ limit }: { limit?: number }) {
  const [filter, setFilter] = useState<ProductGroup>('oils');
  const products = allProducts.filter((p) => p.group === filter).slice(0, limit);
  return (
    <>
      <div className="product-filters" aria-label="Filter products">
        {productFilters.map((item) => (
          <Button
            key={item.value}
            variant="ghost"
            className={filter === item.value ? 'active' : ''}
            aria-pressed={filter === item.value}
            onClick={() => setFilter(item.value)}
          >
            {item.label}
          </Button>
        ))}
      </div>
      <div className="product-grid">
        {products.map((product) => (
          <ProductCard key={product.name} product={product} />
        ))}
      </div>
    </>
  );
}

export function HomePage() {
  const ref = useRef<HTMLVideoElement>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      ref.current?.pause();
      setPaused(true);
    }
  }, []);

  return (
    <>
      <section className="home-hero">
        <video
          className="hero-video"
          ref={ref}
          autoPlay
          muted
          loop
          playsInline
          preload="auto"
          aria-label="Artisan Scent luxury film"
        >
          <source src={heroVideoUrl} type="video/mp4" />
        </video>
        <div className="hero-shade" />
        <div className="hero-content">
          <span className="eyebrow">NATURE’S ESSENCE. AN ARTISAN’S TOUCH.</span>
          <h1>
            Artisan Scent
            <em>
              A world of
              <br />
              quiet luxury.
            </em>
          </h1>
          <p>
            From botanical essences to signature fragrances.
            <br />
            Discover the extraordinary in every drop.
          </p>
          <Button variant="luxury" asChild>
            <Link to="/collections">
              Explore the collection <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <div className="hero-foot">
          <span>ROOTED IN NATURE. CRAFTED IN INDIA.</span>
          <div className="hero-foot-right">
            <span>THE ART OF FRAGRANCE</span>
            <Button
              className="video-toggle"
              variant="ghost"
              size="icon"
              aria-label={paused ? 'Play hero video' : 'Pause hero video'}
              onClick={() => {
                if (!ref.current) return;
                if (paused) {
                  void ref.current.play();
                  setPaused(false);
                } else {
                  ref.current.pause();
                  setPaused(true);
                }
              }}
            >
              {paused ? <Play size={12} /> : <Pause size={12} />}
            </Button>
            <ArrowDown size={15} />
          </div>
        </div>
      </section>

      <div className="collection-ribbon">
        {categories.map((c, i) => (
          <Link key={c.path} to={c.path}>
            {c.short}
            <span>{i === categories.length - 1 ? '↗' : '✧'}</span>
          </Link>
        ))}
      </div>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">SHOP THE COLLECTION</span>
            <h2>Made to be remembered.</h2>
          </div>
          <Button variant="editorial" asChild>
            <Link to="/collections">
              View all products <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <ProductCatalogue limit={8} />
      </section>

      <section className="fact-band">
        <div>
          <strong>09</strong>
          <span>Pure essential oils</span>
        </div>
        <div>
          <strong>05</strong>
          <span>Signature product families</span>
        </div>
        <div>
          <strong>10 ml</strong>
          <span>Retail oil size</span>
        </div>
        <div>
          <strong>Bulk</strong>
          <span>Packaging available</span>
        </div>
      </section>

      <section className="story-section">
        <img
          className="story-image"
          src={photos['project site'][2]}
          loading="lazy"
          alt="Cultivating aromatic plants at an Artisan Scent project site"
        />
        <div className="story-copy">
          <span className="eyebrow">FROM THE EARTH, WITH INTENTION</span>
          <h2>
            Beautiful scents.<em>Deeper roots.</em>
          </h2>
          <p>
            Our story begins long before the first drop. In aromatic fields, in the hands of
            growers, and in the careful art of distillation. We bring the world of botanicals
            into the rituals of everyday life.
          </p>
          <Button variant="editorial" asChild>
            <Link to="/about">
              Discover our story <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">BEYOND THE FRAGRANCE</span>
            <h2>Inside our world.</h2>
          </div>
        </div>
        <div className="world-grid">
          <LuxuryTiltCard maxTilt={5} scale={1.015}>
            <article className="world-item">
              <Link to="/project-sites">
                <img
                  src={photos['project site'][0]}
                  alt="Aromatic plantation"
                  loading="lazy"
                />
              </Link>
              <div className="world-caption">
                <div>
                  <span>01 / FROM THE SOURCE</span>
                  <h3>Where the journey begins.</h3>
                </div>
                <Link to="/project-sites" aria-label="Visit project sites">
                  <ArrowUpRight />
                </Link>
              </div>
            </article>
          </LuxuryTiltCard>

          <LuxuryTiltCard maxTilt={5} scale={1.015}>
            <article className="world-item">
              <Link to="/exhibitions">
                <img
                  src={photos.exibition[2]}
                  alt="Artisan Scent team at a fragrance exhibition"
                  loading="lazy"
                />
              </Link>
              <div className="world-caption">
                <div>
                  <span>02 / SHARED EXPERIENCES</span>
                  <h3>Connections through scent.</h3>
                </div>
                <Link to="/exhibitions" aria-label="Visit exhibitions">
                  <ArrowUpRight />
                </Link>
              </div>
            </article>
          </LuxuryTiltCard>
        </div>
      </section>

      <section className="sculpture-band">
        <div className="sculpture-copy">
          <span className="eyebrow">THE INVISIBLE, MADE EXTRAORDINARY</span>
          <h2>
            A little nature.
            <br />
            An infinite possibility.
          </h2>
          <p>
            Floral. Woody. Fresh. Discover botanical notes that become something uniquely yours.
          </p>
          <Button variant="editorial" asChild>
            <Link to="/oils">
              Discover our essential oils <ArrowUpRight />
            </Link>
          </Button>
        </div>
        <InteractiveSculpture />
      </section>
    </>
  );
}

export function CollectionsPage() {
  return (
    <>
      <LuxuryPageHero
        title="The Collections"
        eyebrow="THE COMPLETE OLFACTORY PORTFOLIO"
        description="Explore pure botanical essences, Artisan Scent perfumes, handcrafted soaps and sacred incense — masterfully crafted for personal rituals, gifting, and discerning spaces."
        image="/assets/heroes/collections-hero.jpg"
        badge="HAUTE BOTANIQUE & PARFUM"
        pills={[
          '5 Curated Families',
          '100% Pure Botanical Oils',
          'Artisanal Distillation',
          'Bespoke Formulations',
        ]}
        breadcrumbs={[{ label: 'Collections' }]}
      />

      <section className="section collection-catalogue">
        <div className="section-heading">
          <div>
            <span className="eyebrow">ALL PRODUCTS</span>
            <h2>Find your ritual.</h2>
          </div>
        </div>
        <ProductCatalogue />
      </section>

      <section className="section">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CURATED FAMILIES</span>
            <h2>The Olfactory Spectrum.</h2>
          </div>
        </div>
        <div className="category-grid collection-families">
          {categories.map((c) => (
            <LuxuryTiltCard key={c.path} maxTilt={6} scale={1.02}>
              <article className="category-tile">
                <Link to={c.path}>
                  <img src={c.image} alt={c.name} />
                </Link>
                <h2>{c.name}</h2>
                <p>{c.text}</p>
                <Button asChild variant="editorial">
                  <Link to={c.path}>
                    Discover the collection <ArrowUpRight />
                  </Link>
                </Button>
              </article>
            </LuxuryTiltCard>
          ))}
        </div>
      </section>
    </>
  );
}

export function CategoryPage({ kind }: { kind: string }) {
  const [sort, setSort] = useState('featured');
  const c = [...categories, ...additionalCategories].find((cat) => cat.path === `/${kind}`);
  if (!c) return null;

  let products: Product[] =
    kind === 'oils'
      ? oils
      : kind === 'perfumes'
      ? artisanScents.filter((p) => p.category === 'Artisan Scent')
      : kind === 'soaps'
      ? soaps
      : kind === 'incense'
      ? agarbatti
      : kind === 'car-perfumes'
      ? carPerfumes
      : [];

  if (sort === 'low') products = [...products].sort((a, b) => (a.price || 0) - (b.price || 0));
  if (sort === 'high') products = [...products].sort((a, b) => (b.price || 0) - (a.price || 0));
  if (sort === 'name') products = [...products].sort((a, b) => a.name.localeCompare(b.name));

  const detail = categoryDetails[kind];
  const heroCfg = categoryHeroConfigs[kind] || {
    image: '/assets/heroes/collections-hero.jpg',
    badge: 'THE COLLECTION',
    eyebrow: 'ARTISAN SCENT',
    pills: ['Handcrafted', 'Pure Botanical', 'Artisanal Integrity'],
  };

  return (
    <>
      <LuxuryPageHero
        title={c.name}
        eyebrow={heroCfg.eyebrow}
        description={c.text}
        image={heroCfg.image}
        badge={heroCfg.badge}
        pills={heroCfg.pills}
        breadcrumbs={[{ label: 'Collections', href: '/collections' }, { label: c.name }]}
      />

      {detail && (
        <section className="category-story">
          <span>{detail.number}.</span>
          <div>
            <span className="eyebrow">ABOUT THE COLLECTION</span>
            <h2>{detail.title}</h2>
            <p>{detail.body}</p>
            <ul>
              {detail.points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section className="section">
        <div className="catalog-tools">
          <span>
            {products.length} {kind === 'oils' ? 'botanical essences' : 'products'}
          </span>
          <label>
            Sort by{' '}
            <select
              aria-label="Sort products"
              value={sort}
              onChange={(e) => setSort(e.target.value)}
            >
              <option value="featured">Featured</option>
              <option value="name">Name A–Z</option>
              {kind === 'oils' && (
                <>
                  <option value="low">Price: low to high</option>
                  <option value="high">Price: high to low</option>
                </>
              )}
            </select>
          </label>
        </div>
        <div className="product-grid">
          {products.map((p) => (
            <ProductCard key={p.name} product={p} />
          ))}
        </div>
        <div className="catalog-details">
          <h2>
            {kind === 'oils'
              ? 'Pure, natural, versatile.'
              : 'Created for fragrant everyday moments.'}
          </h2>
          <p>
            {kind === 'oils'
              ? 'Our oils serve aromatherapy, wellness, skincare, cosmetics, soap making, perfumery and home fragrance. Retail prices are for 10 ml; 15 ml and bulk packaging are available on enquiry.'
              : 'The photographs show our current product range. Contact our team for fragrance options, pack sizes, availability, business quantities and a personal quotation.'}
          </p>
        </div>
      </section>
    </>
  );
}

const aboutFamilies = [
  {
    number: '01',
    label: 'ESSENCE OILS',
    title: 'Fragrance character and versatility.',
    body: 'Artisan Scent offers essence oils designed for fragrance applications across a variety of suitable products and environments. With a focus on fragrance character and versatility, these oils serve as an option for businesses and customers seeking distinctive aromatic profiles for their specific requirements.',
    points: ['Diverse fragrance profiles', 'Floral, woody, fresh and oriental-inspired notes'],
  },
  {
    number: '02',
    label: 'HANDCRAFTED SOAPS',
    title: 'Everyday care, elevated by scent.',
    body: 'Discover soaps that combine everyday cleansing with an appealing fragrance experience. Designed to complement daily personal-care routines, our soap category brings together fragrance, presentation and everyday usability.',
    points: ['Refreshing', 'Sensory', 'Everyday care'],
  },
  {
    number: '03',
    label: 'SCENTED AGARBATTI',
    title: 'Fragrance for familiar rituals.',
    body: 'Artisan Scent brings fragrance to traditional rituals and everyday moments through its agarbatti range. Suitable for prayer spaces, meditation settings and home ambience, these incense products help create an atmosphere of calm and familiarity.',
    points: ['Fragrances inspired by Indian traditions', 'Floral, woody and soothing scent profiles'],
  },
  {
    number: '04',
    label: 'CAR PERFUME',
    title: 'Personalise the journey.',
    body: 'Enhance your driving environment with car perfumes designed to bring a pleasant fragrance to vehicle interiors. Combining compact designs with everyday lifestyle appeal, this category offers a simple way to personalise the in-car experience.',
    points: [
      'Designed for automotive fragrance use',
      'Compact and stylish diffuser formats',
      'Fresh, woody and sophisticated fragrance options',
    ],
  },
  {
    number: '05',
    label: 'LUXURY PERFUMES',
    title: 'An expression of individuality.',
    body: "Artisan Scent's luxury perfume category celebrates fragrance as an expression of personality, style and individuality. With an emphasis on sophisticated presentation and distinctive scent experiences, these perfumes are suited to personal wear, special occasions and thoughtful gifting.",
    points: ['Distinctive fragrance compositions', 'Sophisticated scent profiles'],
  },
];

const aboutDetails = [
  {
    number: '01',
    title: 'Every detail shapes the experience.',
    body: 'From the first conversation to the final quotation, every enquiry is handled with care. We take time to understand the fragrance, format and quantity you have in mind before confirming what is possible.',
  },
  {
    number: '02',
    title: 'Fragrance and ingredient specifications.',
    body: 'Fragrance character and ingredient requirements can be discussed for suitable product and business applications.',
  },
  {
    number: '03',
    title: 'Material verification.',
    body: 'Material requirements and suitability are reviewed in relation to the intended fragrance application.',
  },
  {
    number: '04',
    title: 'Product and packaging checks.',
    body: 'Product format and packaging requirements are considered before availability and final quotations are confirmed.',
  },
  {
    number: '05',
    title: 'Sourcing & procurement.',
    body: 'Aromatic and medicinal plants including geranium, citronella, lemongrass, vetiver and patchouli are cultivated and distilled through KEOMC, with seeds, planting material and grower guidance supporting the supply of botanicals.',
  },
];

export function AboutPage() {
  return (
    <>
      <LuxuryPageHero
        title="Our Heritage & Vision"
        eyebrow="THE ARTISAN SCENT ODYSSEY"
        description="From fertile Indian soil and multi-generational grower partnerships to state-of-the-art steam distillation. A fragrance house dedicated to botanical honesty and quiet luxury."
        image="/assets/heroes/about-hero.jpg"
        badge="HERITAGE & CRAFT"
        pills={[
          'Rooted in Living Soil',
          'Sustainable Agro-Ecosystems',
          'Master Perfumery Architecture',
        ]}
        breadcrumbs={[{ label: 'About Us' }]}
      />

      <section className="section editorial-intro">
        <LuxuryTiltCard maxTilt={4} scale={1.01}>
          <img
            src="/assets/gallery/about-page.jpg"
            alt="The Artisan Scent collection — perfumes, soaps, oils, agarbatti and car perfumes"
          />
        </LuxuryTiltCard>
        <div>
          <span className="eyebrow">THE ART OF FRAGRANCE</span>
          <h2>Meaningful connections through scent.</h2>
          <p>
            Artisan Scent operates across a diverse portfolio of fragrance products and related
            solutions. With a focus on the fragrance and flavours sector, the brand brings
            together essential oils, essence oils, perfumes, car perfumes, soaps and agarbatti.
          </p>
          <p>
            Our approach centres on understanding fragrance preferences, exploring product
            possibilities and delivering solutions aligned with evolving customer and business
            requirements. From everyday fragrance experiences to specialised fragrance and
            flavour applications, we aim to build meaningful connections through the world of
            scent.
          </p>
          <Button variant="editorial" asChild>
            <Link to="/collections">
              Explore our products <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <span className="eyebrow">OUR PRODUCT FAMILIES</span>
        <h2>Five ways to experience scent.</h2>
        {aboutFamilies.map((f) => (
          <section className="category-story" key={f.number}>
            <span>{f.number}.</span>
            <div>
              <span className="eyebrow">{f.label}</span>
              <h2>{f.title}</h2>
              <p>{f.body}</p>
              <ul>
                {f.points.map((p) => (
                  <li key={p}>{p}</li>
                ))}
              </ul>
            </div>
          </section>
        ))}
      </section>

      <section className="section about-source">
        <div>
          <span className="eyebrow">OUR BOTANICAL FOUNDATION</span>
          <h2>
            From living plants
            <br />
            to lasting impressions.
          </h2>
        </div>
        <div>
          <p>
            Kulswami Essence Oil Manufacturing Company (KEOMC) processes aromatic and medicinal
            plants including geranium, citronella, lemongrass, vetiver and patchouli. Essential
            oils are recovered through steam distillation.
          </p>
          <Button variant="editorial" asChild>
            <Link to="/project-sites">
              Meet the source <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <span className="eyebrow">OUR EXPERTISE</span>
        <h2>Nature, knowledge, and care.</h2>
        <div className="service-grid">
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Botanical roots</h3>
              <p>
                From cultivation of aromatic plants to the recovery of their essence, our work
                connects agriculture and fragrance.
              </p>
            </article>
          </LuxuryTiltCard>
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Fragrance possibilities</h3>
              <p>
                Floral, woody, fresh and oriental-inspired profiles for personal care, perfumery
                and everyday environments.
              </p>
            </article>
          </LuxuryTiltCard>
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Shared knowledge</h3>
              <p>
                Skill development, consultancy and technical know-how supporting growers,
                manufacturers and fragrance businesses.
              </p>
            </article>
          </LuxuryTiltCard>
        </div>
      </section>

      <section className="section">
        <span className="eyebrow">HOW WE WORK</span>
        <h2>Every detail shapes the experience.</h2>
        <div className="quality-grid">
          {aboutDetails.map((d) => (
            <article key={d.number}>
              <span>{d.number}</span>
              <h3>{d.title}</h3>
              <p>{d.body}</p>
            </article>
          ))}
        </div>
      </section>
    </>
  );
}

export function KeomcPage() {
  return (
    <>
      <LuxuryPageHero
        title="The Mother Company"
        eyebrow="KULSWAMI ESSENCE OIL MANUFACTURING COMPANY"
        description="The essence oil manufacturing powerhouse behind Artisan Scent — cultivating aromatic botanicals, pioneering agro-technology, and distilling therapeutic essential oils."
        image="/assets/heroes/keomc-hero.jpg"
        badge="DISTILLATION & AGRO-TECH"
        pills={[
          'Field Distillation Units (FDU)',
          'Agricultural Feasibility & Guidance',
          'Steam Distillation Purity',
        ]}
        breadcrumbs={[{ label: 'KEOMC' }]}
      />

      <section className="section editorial-intro">
        <LuxuryTiltCard maxTilt={4} scale={1.01}>
          <img
            src="/assets/gallery/keomc-page.png"
            alt="The Artisan Scent range manufactured by KEOMC — perfume, agarbatti, essential oils and car perfume"
          />
        </LuxuryTiltCard>
        <div>
          <span className="eyebrow">ABOUT KEOMC</span>
          <h2>From living plants to pure essence.</h2>
          <p>
            Kulswami Essence Oil Manufacturing Company (KEOMC) processes different types of
            aromatic and medicinal plants — geranium, citronella, lemongrass, vetiver, patchouli
            and more — to recover essence oil. Essential oil is extracted by the steam
            distillation method.
          </p>
          <p>
            The key services offered by KEOMC include design and manufacturing, skill development,
            and consultancy. Services focusing on the fragrance and flavours sector include:
          </p>
          <ul className="policy-list">
            <li>Soap manufacturing</li>
            <li>Perfume manufacturing</li>
            <li>Car perfume and agarbatti</li>
            <li>Agro technology services</li>
            <li>
              Engineering and consultancy services — technical know-how for cultivation of
              aromatic and medicinal plants
            </li>
            <li>
              Supply of seeds and planting material, and preparation of feasibility reports
            </li>
            <li>Visits to farmers' fields for on-the-spot consultancy and guidance</li>
            <li>Training</li>
            <li>Distillation of oil by Field Distillation Unit (FDU) on job work basis</li>
            <li>Production and sale of essential oils</li>
            <li>Consultancy for establishment of aromatic and herbal gardens</li>
          </ul>
          <Button variant="editorial" asChild>
            <Link to="/contact">
              Talk to our team <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>

      <section className="section">
        <span className="eyebrow">WHAT WE DO</span>
        <h2>Manufacturing, agro technology and consultancy.</h2>
        <div className="service-grid">
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Design & manufacturing</h3>
              <p>
                Soap manufacturing, perfume manufacturing, car perfumes and agarbatti — production
                capabilities across the fragrance and flavours sector.
              </p>
            </article>
          </LuxuryTiltCard>
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Agro technology services</h3>
              <p>
                Supply of seeds and planting material, feasibility reports, field visits for
                on-the-spot guidance, training, and distillation of oil by Field Distillation Unit
                (FDU) on a job-work basis.
              </p>
            </article>
          </LuxuryTiltCard>
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Consultancy & skill development</h3>
              <p>
                Engineering and technical know-how for cultivation of aromatic and medicinal
                plants, production and sale of essential oils, and consultancy for aromatic and
                herbal gardens.
              </p>
            </article>
          </LuxuryTiltCard>
        </div>
        <div className="mt-8">
          <Button variant="luxury" asChild>
            <Link to="/wholesale">
              Explore wholesale & services <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export function GalleryPage({ kind }: { kind: 'projects' | 'exhibitions' }) {
  const [selected, setSelected] = useState<number | null>(null);
  const projects = kind === 'projects';
  const list = projects
    ? [...photos['project site']]
    : photos.exibition.filter((_, i) => i !== 1 && i !== 9);

  const captions = projects
    ? [
        'Aromatic cultivation',
        'Field distillation facility',
        'Harvesting aromatic plants',
        'Working with growers',
        'Aromatic crop harvesting',
        'Botanical close-up',
        'Cultivation and distillation site',
        'Steam distillation equipment',
        'Care in the field',
        'Cultivation facility',
        'Oil recovery unit',
        'Preparing plants for distillation',
        'Fresh botanical harvest',
        'Inside the distillation facility',
        'Distillation in progress',
        'Facility construction',
        'Cultivated aromatic rows',
        'Guidance in the field',
        'Aromatic plantation',
        'Growing infrastructure',
        'Field distillation unit',
        'Project equipment',
        'Distillation infrastructure',
      ]
    : [
        'An exhibition moment',
        'Meeting the fragrance community',
        'Artisan Scent product showcase',
        'Sharing our collection',
        'Conversations through scent',
        'Our exhibition display',
        'Connecting with visitors',
        'A shared moment',
        'Meet our team',
      ];

  return (
    <>
      <LuxuryPageHero
        title={projects ? 'From the Living Source' : 'Exhibitions & Salons'}
        eyebrow={projects ? 'OUR PROJECT SITES & FIELDS' : 'THE ARTISAN SCENT COMMUNITY'}
        description={
          projects
            ? 'A closer look at our aromatic fields, growers and distillation facilities across India. The real places behind our botanical essences.'
            : 'Discover moments from our exhibitions, where our products meet people and new fragrance conversations begin.'
        }
        image={
          projects
            ? '/assets/heroes/project-sites-hero.jpg'
            : '/assets/heroes/exhibitions-hero.jpg'
        }
        badge={projects ? 'FIELD ARCHIVE' : 'EXHIBITION DIARY'}
        pills={
          projects
            ? [
                'Aromatic Crop Fields',
                'Steam Distillation Facilities',
                'Farmer Partnerships',
              ]
            : [
                'National Olfactory Showcases',
                'Fragrance Community Gatherings',
                'Direct Scent Discoveries',
              ]
        }
        breadcrumbs={[{ label: projects ? 'Project Sites' : 'Exhibitions' }]}
      />

      <section className="section gallery-intro">
        <span className="eyebrow">
          {projects ? 'CULTIVATION TO DISTILLATION' : 'IN PERSON, THROUGH SCENT'}
        </span>
        <h2>{projects ? 'Rooted in the field.' : 'A collection made to be experienced.'}</h2>
        <p>
          {projects
            ? 'KEOMC works with aromatic and medicinal plants including geranium, citronella, lemongrass, vetiver and patchouli. Steam distillation recovers their concentrated essence for fragrance, wellness and personal-care applications.'
            : 'Our exhibitions bring oils, fragrances, soaps and agarbatti together for discovery, business conversations and lasting connections with the fragrance community.'}
        </p>
        <div className="gallery-grid">
          {list.map((src, i) => (
            <LuxuryTiltCard key={src} maxTilt={6} scale={1.02}>
              <figure>
                <Button
                  variant="ghost"
                  className="image-open"
                  aria-label={`View ${captions[i]}`}
                  onClick={() => setSelected(i)}
                >
                  <img src={src} alt={captions[i]} loading="lazy" />
                </Button>
                <figcaption>
                  {String(i + 1).padStart(2, '0')} / {captions[i]}
                </figcaption>
              </figure>
            </LuxuryTiltCard>
          ))}
        </div>
      </section>

      <Dialog
        open={selected !== null}
        onOpenChange={(open) => {
          if (!open) setSelected(null);
        }}
      >
        <DialogContent className="lightbox-dialog">
          <DialogTitle>{selected !== null ? captions[selected] : 'Gallery'}</DialogTitle>
          <DialogDescription className="sr-only">Artisan Scent photo gallery</DialogDescription>
          {selected !== null && <img src={list[selected]} alt={captions[selected]} />}
        </DialogContent>
      </Dialog>
    </>
  );
}

export function WholesalePage() {
  const { add } = useShop();
  return (
    <>
      <LuxuryPageHero
        title="Wholesale & Services"
        eyebrow="BULK INGREDIENTS & CONTRACT SERVICES"
        description="Direct botanical ingredients, manufacturing expertise, volume drum supplies and curated sample collections for your next fragrance project."
        image="/assets/heroes/wholesale-hero.jpg"
        badge="B2B & BESPOKE COMMISSIONS"
        pills={[
          'Bulk Packaging & Volume Pricing',
          'Curated Perfumery Sample Kits',
          'Agro-Technology Feasibility Reports',
          'Field Distillation on Job Work',
        ]}
        breadcrumbs={[{ label: 'Wholesale & Services' }]}
      />

      <section className="section">
        <span className="eyebrow">ESSENTIAL OILS · BULK PRICING</span>
        <h2>Made for your possibilities.</h2>
        <div className="price-table">
          <table>
            <thead>
              <tr>
                <th>Botanical oil</th>
                <th>100 ml</th>
                <th>500 ml</th>
                <th>1 litre</th>
              </tr>
            </thead>
            <tbody>
              {oils.map((p) => (
                <tr key={p.name}>
                  <td>{p.name}</td>
                  {p.sizes?.map((price, i) => (
                    <td key={i}>{formatPrice(price)}</td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <span className="eyebrow">BEGIN WITH DISCOVERY</span>
        <h2>The sample collection.</h2>
        <div className="sample-grid">
          {[
            ['Starter Sample Kit', '5 oils × 5 ml each', 999],
            ['Professional Sample Kit', '10 oils × 5 ml each', 1799],
            ['Premium Perfumery Kit', 'Rose, Vetiver, Lavender, Geranium, Patchouli', 2499],
          ].map(([name, notes, price]) => (
            <LuxuryTiltCard key={name as string} maxTilt={6} scale={1.02}>
              <article>
                <h3>{name}</h3>
                <p>{notes}</p>
                <strong>{formatPrice(Number(price))}</strong>
                <br />
                <Button
                  variant="editorial"
                  onClick={() =>
                    add({
                      name: String(name),
                      notes: String(notes),
                      price: Number(price),
                      category: 'Sample kit',
                      group: 'oils',
                      image: photos.products[7],
                    })
                  }
                >
                  Enquire about this kit <ArrowUpRight />
                </Button>
              </article>
            </LuxuryTiltCard>
          ))}
        </div>

        <ul className="policy-list mt-8">
          <li>Sample charges can be adjusted against the first wholesale order above ₹50,000.</li>
          <li>A complimentary sample kit may be provided to approved distributors.</li>
          <li>Sample freight is payable by the customer. Export samples are prepaid.</li>
          <li>Single oil samples: 5 ml, ₹150–₹500. Contact us for the exact oil quotation.</li>
        </ul>

        <div className="quality-section">
          <span className="eyebrow">PRODUCT DEVELOPMENT SUPPORT</span>
          <h2>From specification to presentation.</h2>
          <div className="quality-grid">
            <article>
              <span>01</span>
              <h3>Fragrance & ingredient specifications</h3>
              <p>
                Fragrance character and ingredient requirements can be discussed for suitable
                product and business applications.
              </p>
            </article>
            <article>
              <span>02</span>
              <h3>Material verification</h3>
              <p>
                Material requirements and suitability are reviewed in relation to the intended
                fragrance application.
              </p>
            </article>
            <article>
              <span>03</span>
              <h3>Product & packaging checks</h3>
              <p>
                Product format and packaging requirements are considered before availability and
                final quotations are confirmed.
              </p>
            </article>
          </div>
        </div>

        <div className="service-grid">
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Manufacturing</h3>
              <p>
                Soap and perfume manufacturing, car perfumes, agarbatti, and production and sale of
                essential oils.
              </p>
            </article>
          </LuxuryTiltCard>
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Agro technology</h3>
              <p>
                Seeds and planting material, cultivation guidance, feasibility reports and field
                visits for aromatic and medicinal plants.
              </p>
            </article>
          </LuxuryTiltCard>
          <LuxuryTiltCard maxTilt={5} scale={1.02}>
            <article>
              <h3>Consultancy & training</h3>
              <p>
                Engineering, skill development, aromatic garden consultancy and job-work
                distillation with Field Distillation Units.
              </p>
            </article>
          </LuxuryTiltCard>
        </div>

        <div className="mt-8">
          <Button variant="luxury" asChild>
            <Link to="/contact">
              Discuss your requirements <ArrowUpRight />
            </Link>
          </Button>
        </div>
      </section>
    </>
  );
}

export function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [interest, setInterest] = useState('Product enquiry');
  const [message, setMessage] = useState('');
  const [opened, setOpened] = useState(false);

  return (
    <>
      <LuxuryPageHero
        title="Let’s Talk Scent"
        eyebrow="ATELIER CONCIERGE & INQUIRIES"
        description="A bespoke fragrance commission, volume wholesale procurement, or a new botanical possibility. Our team in Navi Mumbai is here to guide you."
        image="/assets/heroes/contact-hero.jpg"
        badge="ATELIER COMMISSIONS"
        pills={[
          'Navi Mumbai Atelier',
          'Instant WhatsApp Support',
          'Bespoke Olfactory Consultations',
        ]}
        breadcrumbs={[{ label: 'Contact' }]}
      />

      <section className="section contact-grid">
        <div className="contact-copy">
          <span className="eyebrow">ARTISAN SCENT · KEOMC</span>
          <h2>
            Every connection
            <br />
            begins somewhere.
          </h2>
          <h4>Email</h4>
          <a href="mailto:keomc12@gmail.com">keomc12@gmail.com</a>
          <h4>Call</h4>
          <a href="tel:+919820252868">+91 98202 52868</a>
          <h4>WhatsApp</h4>
          <a
            href="https://wa.me/919820252868"
            target="_blank"
            rel="noreferrer"
          >
            +91 98202 52868
          </a>
          <h4>Visit us</h4>
          <p>
            Flat No. 602, Plot No. 1, Shiv Shankar Plaza 2,
            <br />
            Sector 7, Airoli, Navi Mumbai 400708, India.
          </p>
          <Button variant="editorial" asChild>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Shiv+Shankar+Plaza+2+Airoli+Navi+Mumbai"
              target="_blank"
              rel="noreferrer"
            >
              Find us on the map <ArrowUpRight />
            </a>
          </Button>
        </div>

        <form
          className="contact-form"
          onSubmit={(e) => {
            e.preventDefault();
            window.location.href =
              'mailto:keomc12@gmail.com?subject=' +
              encodeURIComponent(`Artisan Scent — ${interest}`) +
              '&body=' +
              encodeURIComponent(
                `Name: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`
              );
            setOpened(true);
          }}
        >
          <label>
            Your name
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Full name"
              autoComplete="name"
            />
          </label>
          <label>
            Email address
            <input
              required
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="you@example.com"
              autoComplete="email"
            />
          </label>
          <label>
            I’m interested in
            <select
              value={interest}
              onChange={(e) => setInterest(e.target.value)}
            >
              <option>Product enquiry</option>
              <option>Wholesale & distribution</option>
              <option>Samples</option>
              <option>Manufacturing & consultancy</option>
              <option>Other</option>
            </select>
          </label>
          <label>
            Your message
            <textarea
              required
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              placeholder="Tell us what you have in mind…"
            />
          </label>
          <Button type="submit" variant="luxury">
            Compose email <ArrowRight />
          </Button>
          <Button
            type="button"
            variant="editorial"
            onClick={() =>
              window.open(
                'https://wa.me/919820252868?text=' +
                  encodeURIComponent(
                    `Hello Artisan Scent,\n\nName: ${name}\nEmail: ${email}\nInterest: ${interest}\n\n${message}`
                  ),
                '_blank'
              )
            }
          >
            Send via WhatsApp <ArrowUpRight />
          </Button>
          <p role="status">
            {opened
              ? 'Your email app has been requested. Send the message there to complete your enquiry.'
              : 'Your enquiry opens in your email app. We do not collect or store this form on the website.'}
          </p>
        </form>
      </section>
    </>
  );
}

const policies: Record<
  string,
  { title: string; intro: string; sections: [string, string][] }
> = {
  privacy: {
    title: 'Privacy policy',
    intro: 'How information is handled when you visit Artisan Scent or make an enquiry.',
    sections: [
      [
        'Information you share',
        'Product enquiries and contact messages are sent through your own email application. Information you choose to include, such as your name, email address and enquiry details, is received by our team when you send the email. This website does not provide user accounts or store submitted contact forms.',
      ],
      [
        'Use of enquiry information',
        'Information received through an enquiry is used to respond to your request, discuss products, arrange quotations and communicate about an agreed order. Please do not include sensitive financial or identity information in an initial enquiry.',
      ],
      [
        'Website services',
        'The website loads imagery and video from its hosting service and fonts from Google Fonts. These services may receive technical information such as your IP address. Platform hosting may process technical logs. Hosting and service-provider practices should be reviewed before this policy is approved.',
      ],
      [
        'Your requests',
        'To ask about information you have shared or request correction or deletion, contact keomc12@gmail.com. Requests will be considered subject to applicable record-keeping obligations.',
      ],
    ],
  },
  returns: {
    title: 'Return policy',
    intro: 'Please contact our team before returning a product or reporting an issue with your order.',
    sections: [
      [
        'Report a concern',
        'If your order arrives damaged, incorrect or incomplete, email keomc12@gmail.com with your order reference, a description of the issue and clear photographs of the product and packaging. Keep the product and original packaging while the concern is reviewed.',
      ],
      [
        'Return authorisation',
        'Do not send products back without first speaking to our team. Return eligibility, the return address, shipping responsibility and any resolution will be confirmed directly for your order.',
      ],
      [
        'Opened and customised products',
        'The treatment of opened fragrance products, essential oils, custom-made products and wholesale orders must be confirmed in writing before purchase. No automatic eligibility for returns is stated on this website.',
      ],
      [
        'Refunds and timelines',
        'A fixed return window, refund timeframe, cancellation deadline and shipping-charge policy have not yet been supplied. Please request the applicable written terms before placing an order.',
      ],
    ],
  },
  terms: {
    title: 'Terms & conditions',
    intro: 'Information for browsing our collections and making product or wholesale enquiries.',
    sections: [
      [
        'Website and enquiries',
        'This website presents the Artisan Scent range and related KEOMC services. Adding products to an enquiry bag does not create an order or take payment. A purchase is confirmed only after our team agrees availability, final pricing, payment and delivery terms with you.',
      ],
      [
        'Product information and pricing',
        'Essential oil and sample prices are shown in Indian rupees using the supplied product information. Final quotations must confirm packaging, applicable taxes, freight and availability. Collection photographs may show multiple products; exact variants and packaging should be confirmed before purchase.',
      ],
      [
        'Safe and appropriate use',
        'Essential oils are concentrated ingredients. Follow product-specific instructions and relevant professional guidance. Do not ingest oils or apply undiluted oils to skin unless the product instructions explicitly permit it. Fragrance information is not medical advice.',
      ],
      [
        'Wholesale and samples',
        'Sample charges may be adjusted against a first wholesale order above ₹50,000. Complimentary samples are discretionary for approved distributors. Freight for samples is payable by the customer and export samples are prepaid. Confirm all applicable terms with our team.',
      ],
      [
        'Brand materials and contact',
        'The Artisan Scent name, supplied photography, logo and website materials must not be represented as your own. For product terms or questions, contact keomc12@gmail.com or +91 9820252868.',
      ],
    ],
  },
};

export function LegalPage({ kind }: { kind: string }) {
  const p = policies[kind];
  if (!p) return null;
  return (
    <>
      <LuxuryPageHero
        title={p.title}
        eyebrow="ARTISAN SCENT · STANDARDS OF EXCELLENCE"
        description={p.intro}
        image="/assets/heroes/legal-hero.jpg"
        badge="CUSTOMER CARE & INTEGRITY"
        pills={['Authenticity Guaranteed', 'Pure Sourcing Standards', 'Responsible Trade']}
        breadcrumbs={[{ label: 'Customer Care' }, { label: p.title }]}
      />
      <div className="legal-content">
        <div className="policy-notice">
          Policy draft — awaiting business and legal approval. This text does not establish
          unconfirmed return windows or order conditions. Please contact our team for the written
          terms applicable to your order.
        </div>
        {p.sections.map(([title, text]) => (
          <section key={title}>
            <h2>{title}</h2>
            <p>{text}</p>
          </section>
        ))}
        <Button variant="editorial" asChild>
          <Link to="/contact">
            Contact our team <ArrowUpRight />
          </Link>
        </Button>
      </div>
    </>
  );
}
