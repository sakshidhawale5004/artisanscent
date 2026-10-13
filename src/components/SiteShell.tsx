import { Link, useRouterState } from '@tanstack/react-router';
import { createContext, useContext, useState, useEffect, lazy, Suspense, type ReactNode } from 'react';
import { Search, Menu, X, ArrowUpRight, ShoppingBag, Plus, Minus, ArrowRight, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { Dialog, DialogContent, DialogTitle, DialogDescription } from './ui/dialog';
import { allProducts, formatPrice, type Product } from '@/lib/artisan-data';
import { BrandLoader } from './BrandLoader';

const logoUrl = '/assets/brand/logo.jpeg';
const ScentScene = lazy(() => import('./ScentScene'));
type BagItem = { product: Product; quantity: number };
const ShopContext = createContext<{ add: (product: Product) => void; inspect: (product: Product) => void }>({ add: () => {}, inspect: () => {} });
export const useShop = () => useContext(ShopContext);

export type LuxuryTheme = 'alabaster' | 'rose-champagne' | 'golden-amber';

export interface ThemeOption {
  id: LuxuryTheme;
  name: string;
  palette: string;
  dot: string;
  description: string;
}

export const LUXURY_THEMES: ThemeOption[] = [
  {
    id: 'alabaster',
    name: 'Alabaster & Gold',
    palette: 'Ivory & Gold',
    dot: '#d4af37',
    description: 'Crisp royal ivory with lustrous warm gold accents.',
  },
  {
    id: 'rose-champagne',
    name: 'Rose Champagne',
    palette: 'Blush & Rose Gold',
    dot: '#c9826d',
    description: 'Romantic blush pink nuances with delicate rose gold sheen.',
  },
  {
    id: 'golden-amber',
    name: 'Golden Amber',
    palette: 'Honey & Amber',
    dot: '#c49320',
    description: 'Warm honeyed alabaster and sun-drenched resinous amber.',
  },
];

const ThemeContext = createContext<{
  theme: LuxuryTheme;
  setTheme: (theme: LuxuryTheme) => void;
}>({
  theme: 'alabaster',
  setTheme: () => {},
});
export const useTheme = () => useContext(ThemeContext);

const nav = [
  { label: 'About', path: '/about' as const },
  { label: 'KEOMC', path: '/keomc' as const },
  { label: 'Products', path: '/collections' as const },
  { label: 'Project Sites', path: '/project-sites' as const },
  { label: 'Exhibitions', path: '/exhibitions' as const },
  { label: 'Services', path: '/wholesale' as const },
  { label: 'Contact', path: '/contact' as const },
];

const footerProducts = [
  { label: 'Oils', path: '/oils' as const },
  { label: 'Agarbatti', path: '/incense' as const },
  { label: 'Artisan Scent', path: '/perfumes' as const },
  { label: 'Soaps', path: '/soaps' as const },
  { label: 'Car perfumes', path: '/car-perfumes' as const },
];

export function SiteShell({ children }: { children: ReactNode }) {
  const [menu, setMenu] = useState(false);
  const [search, setSearch] = useState(false);
  const [query, setQuery] = useState('');
  const [bagOpen, setBagOpen] = useState(false);
  const [bag, setBag] = useState<BagItem[]>([]);
  const [product, setProduct] = useState<Product | null>(null);
  const [loading, setLoading] = useState(true);
  const [cursorPos, setCursorPos] = useState({ x: -200, y: -200 });

  const [theme, setTheme] = useState<LuxuryTheme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('artisan-scent-theme') as LuxuryTheme | null;
      if (saved && (saved === 'alabaster' || saved === 'rose-champagne' || saved === 'golden-amber')) {
        return saved;
      }
    }
    return 'alabaster';
  });
  const [ambianceMenuOpen, setAmbianceMenuOpen] = useState(false);

  const path = useRouterState({ select: (s) => s.location.pathname });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('artisan-scent-theme', theme);
    } catch {
      // safe fallback
    }
    window.dispatchEvent(new CustomEvent('artisan-theme-change', { detail: { theme } }));
  }, [theme]);


  useEffect(() => {
    setMenu(false);
    setSearch(false);
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [path]);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      setCursorPos({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener('mousemove', handleMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMove);
  }, []);

  function add(p: Product) {
    setBag((items) =>
      items.some((i) => i.product.name === p.name)
        ? items.map((i) => (i.product.name === p.name ? { ...i, quantity: i.quantity + 1 } : i))
        : [...items, { product: p, quantity: 1 }]
    );
    setProduct(null);
    setBagOpen(true);
  }

  const count = bag.reduce((n, i) => n + i.quantity, 0);
  const matches = allProducts.filter((p) =>
    (p.name + ' ' + p.notes + ' ' + p.category).toLowerCase().includes(query.toLowerCase())
  );

  const email =
    'mailto:keomc12@gmail.com?subject=' +
    encodeURIComponent('Artisan Scent — product enquiry') +
    '&body=' +
    encodeURIComponent(
      'Hello Artisan Scent,\nI would like to enquire about:\n' +
        bag
          .map(
            (i) =>
              `${i.quantity} × ${i.product.name}${
                i.product.price
                  ? ` (${i.product.group === 'oils' ? '10 ml' : i.product.category === 'Sample kit' ? 'sample kit' : 'unit'}, ${formatPrice(i.product.price)} each)`
                  : ''
              }`
          )
          .join('\n') +
        '\n\nPlease confirm availability, delivery charges, and payment details.'
    );

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      <ShopContext.Provider value={{ add, inspect: setProduct }}>
      {/* Luxury Golden Cursor Aura */}
      <div
        className="luxury-cursor-aura"
        style={{
          transform: `translate3d(${cursorPos.x - 150}px, ${cursorPos.y - 150}px, 0)`,
        }}
        aria-hidden="true"
      />

      {loading && <BrandLoader onComplete={() => setLoading(false)} />}

      <div className="announcement">
        <span>BOTANICAL ROOTS · EXTRAORDINARY SCENTS</span>
        <Link to="/wholesale">
          Discover our wholesale collection <ArrowUpRight size={12} />
        </Link>
      </div>

      <header className="site-header">
        <Button
          variant="ghost"
          size="icon"
          className="mobile-menu"
          aria-label="Open menu"
          onClick={() => setMenu(true)}
        >
          <Menu />
        </Button>
        <Link to="/" className="brand">
          <img src={logoUrl} alt="Artisan Scent logo" />
          <span>
            ARTISAN SCENT<small>THE ART OF FRAGRANCE</small>
          </span>
        </Link>
        <nav>
          {nav.map((n) => (
            <Link key={n.path} to={n.path} activeProps={{ className: 'active' }}>
              {n.label}
            </Link>
          ))}
        </nav>
        <div className="header-tools">
          {/* Scent Ambiance Theme Transition Selector */}
          <div className="ambiance-selector-wrapper">
            <button
              type="button"
              className="ambiance-trigger-btn"
              onClick={() => setAmbianceMenuOpen(!ambianceMenuOpen)}
              aria-label="Select Scent Ambiance Theme"
              title="Select Scent Ambiance Theme"
            >
              <Sparkles size={13} className="ambiance-sparkle" />
              <span className="ambiance-current-name">
                {LUXURY_THEMES.find((t) => t.id === theme)?.name.split(' ')[0] || 'Alabaster'}
              </span>
              <span
                className="ambiance-current-dot"
                style={{
                  background: LUXURY_THEMES.find((t) => t.id === theme)?.dot || '#d4af37',
                }}
              />
            </button>

            {ambianceMenuOpen && (
              <div className="ambiance-dropdown-card">
                <div className="ambiance-card-header">
                  <span className="ambiance-card-eyebrow">LIGHT SCENT PALETTE</span>
                  <span className="ambiance-card-title">Transition Atmosphere</span>
                </div>
                <div className="ambiance-options-list">
                  {LUXURY_THEMES.map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      className={`ambiance-option-row ${theme === t.id ? 'active' : ''}`}
                      onClick={() => {
                        setTheme(t.id);
                        setAmbianceMenuOpen(false);
                      }}
                    >
                      <span className="ambiance-swatch" style={{ background: t.dot }} />
                      <div className="ambiance-option-text">
                        <strong>{t.name}</strong>
                        <small>{t.description}</small>
                      </div>
                      {theme === t.id && <span className="ambiance-active-check">✦</span>}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            aria-label="Search products"
            title="Search"
            onClick={() => setSearch(true)}
          >
            <Search />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            aria-label={`Open enquiry bag, ${count} items`}
            title="Enquiry bag"
            onClick={() => setBagOpen(true)}
          >
            <ShoppingBag />
            {count > 0 && <span className="bag-count">{count}</span>}
          </Button>
          <Link className="contact-nav" to="/contact">
            Get in touch <ArrowUpRight size={14} />
          </Link>
        </div>
      </header>

      {/* Main Page Content with Smooth Transition */}
      <main key={path} className="site-main-content">
        {children}
      </main>

      <section className="closing-band">
        <span className="eyebrow">LET’S FIND YOUR SIGNATURE</span>
        <h2>A scent for every story.</h2>
        <Button asChild variant="editorial">
          <Link to="/contact">
            Begin a conversation <ArrowUpRight />
          </Link>
        </Button>
      </section>

      <footer>
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/" className="brand">
              <img src={logoUrl} alt="Artisan Scent" />
              <span>
                ARTISAN SCENT<small>THE ART OF FRAGRANCE</small>
              </span>
            </Link>
            <p>
              Rooted in nature.
              <br />
              Crafted for the senses.
            </p>
          </div>
          <div>
            <h4>Explore</h4>
            {footerProducts.map((c) => (
              <Link key={c.path} to={c.path}>
                {c.label}
              </Link>
            ))}
          </div>
          <div>
            <h4>Our world</h4>
            <Link to="/about">Our story</Link>
            <Link to="/keomc">Mother company</Link>
            <Link to="/project-sites">Project sites</Link>
            <Link to="/exhibitions">Exhibitions</Link>
            <Link to="/wholesale">Wholesale & services</Link>
          </div>
          <div>
            <h4>Connect</h4>
            <a href="mailto:keomc12@gmail.com">keomc12@gmail.com</a>
            <a href="tel:+919820252868">+91 98202 52868</a>
            <Link to="/contact">
              Airoli, Navi Mumbai <ArrowUpRight size={13} />
            </Link>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Artisan Scent · KEOMC</span>
          <div>
            <Link to="/privacy">Privacy policy</Link>
            <Link to="/returns">Return policy</Link>
            <Link to="/terms">Terms & conditions</Link>
          </div>
          <span>INDIA · INR ₹</span>
        </div>
      </footer>

      {/* Mobile Navigation Dialog */}
      <Dialog open={menu} onOpenChange={setMenu}>
        <DialogContent className="menu-dialog">
          <DialogTitle>Artisan Scent</DialogTitle>
          {nav.map((n) => (
            <Link key={n.path} to={n.path}>
              {n.label}
              <ArrowUpRight />
            </Link>
          ))}

          {/* Mobile Ambiance Theme Switcher */}
          <div className="mobile-ambiance-section">
            <span className="mobile-ambiance-title">SCENT AMBIANCE PALETTE</span>
            <div className="mobile-ambiance-buttons">
              {LUXURY_THEMES.map((t) => (
                <button
                  key={t.id}
                  type="button"
                  className={`mobile-ambiance-btn ${theme === t.id ? 'active' : ''}`}
                  onClick={() => {
                    setTheme(t.id);
                    setMenu(false);
                  }}
                >
                  <span className="mobile-ambiance-dot" style={{ background: t.dot }} />
                  <span>{t.name}</span>
                </button>
              ))}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Search Dialog */}
      <Dialog open={search} onOpenChange={setSearch}>
        <DialogContent className="search-dialog">
          <DialogTitle>Find your scent</DialogTitle>
          <DialogDescription>Explore the complete Artisan Scent collection.</DialogDescription>
          <div className="search-input">
            <Search size={20} />
            <input
              autoFocus
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search oils, perfumes, soaps, agarbatti, car diffusers…"
              aria-label="Search the collection"
            />
          </div>
          <div className="search-results">
            {matches.length ? (
              matches.map((p) => (
                <Button
                  key={p.name}
                  variant="ghost"
                  className="search-result"
                  onClick={() => {
                    setSearch(false);
                    setProduct(p);
                  }}
                >
                  <img src={p.image} alt={p.name} />
                  <span>
                    {p.name}
                    <small>
                      {p.category} · {p.notes}
                    </small>
                  </span>
                  <ArrowUpRight />
                </Button>
              ))
            ) : (
              <p>No products found. Try “oil”, “soap” or “agarbatti”.</p>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Product Quick-View Dialog */}
      <Dialog open={!!product} onOpenChange={(open) => { if (!open) setProduct(null); }}>
        <DialogContent className="product-dialog">
          <DialogTitle className="sr-only">{product?.name || 'Product'}</DialogTitle>
          <DialogDescription className="sr-only">Product information and enquiry</DialogDescription>
          {product && (
            <>
              <img className="detail-image" src={product.image} alt={product.name} />
              <div className="detail-copy">
                <span className="eyebrow">{product.category}</span>
                <h2>{product.name}</h2>
                <p>{product.notes}</p>
                {product.botanical && <p className="botanical">{product.botanical}</p>}
                {product.price ? (
                  <>
                    <h3>
                      {formatPrice(product.price)}{' '}
                      <small>
                        {product.group === 'oils'
                          ? '/ 10 ml'
                          : product.category === 'Sample kit'
                          ? '/ kit'
                          : '/ unit'}
                      </small>
                    </h3>
                    {product.bulk ? (
                      <p>Bulk packaging available. {formatPrice(product.bulk)} per litre.</p>
                    ) : null}
                  </>
                ) : (
                  <p>Contact us for available fragrances, sizes and pricing.</p>
                )}
                <Button variant="luxury" onClick={() => add(product)}>
                  Add to enquiry <Plus />
                </Button>
                <p className="product-disclaimer">
                  Availability and delivery confirmed personally by our team.
                </p>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>

      {/* Bag / Enquiry Dialog */}
      <Dialog open={bagOpen} onOpenChange={setBagOpen}>
        <DialogContent className="bag-dialog">
          <DialogTitle>
            Your enquiry bag <span>({count})</span>
          </DialogTitle>
          <DialogDescription>
            Our team will confirm availability, delivery and your final quote.
          </DialogDescription>
          {bag.length ? (
            <>
              <div className="bag-items">
                {bag.map((i) => (
                  <div className="bag-item" key={i.product.name}>
                    <img src={i.product.image} alt={i.product.name} />
                    <div>
                      <h4>{i.product.name}</h4>
                      <small>
                        {i.product.price
                          ? `${formatPrice(i.product.price)} / ${
                              i.product.group === 'oils'
                                ? '10 ml'
                                : i.product.category === 'Sample kit'
                                ? 'kit'
                                : 'unit'
                            }`
                          : 'Price on enquiry'}
                      </small>
                      <div className="quantity">
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Decrease ${i.product.name}`}
                          onClick={() =>
                            setBag((rows) =>
                              rows
                                .map((row) =>
                                  row.product.name === i.product.name
                                    ? { ...row, quantity: row.quantity - 1 }
                                    : row
                                )
                                .filter((row) => row.quantity > 0)
                            )
                          }
                        >
                          <Minus />
                        </Button>
                        <span>{i.quantity}</span>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Increase ${i.product.name}`}
                          onClick={() =>
                            setBag((rows) =>
                              rows.map((row) =>
                                row.product.name === i.product.name
                                  ? { ...row, quantity: row.quantity + 1 }
                                  : row
                              )
                            )
                          }
                        >
                          <Plus />
                        </Button>
                      </div>
                    </div>
                    <Button
                      variant="ghost"
                      size="icon"
                      aria-label={`Remove ${i.product.name}`}
                      onClick={() =>
                        setBag((rows) => rows.filter((row) => row.product.name !== i.product.name))
                      }
                    >
                      <X />
                    </Button>
                  </div>
                ))}
              </div>
              {bag.every((i) => i.product.price) && (
                <div className="bag-total">
                  <span>Product subtotal</span>
                  <strong>
                    {formatPrice(
                      bag.reduce((n, i) => n + (i.product.price || 0) * i.quantity, 0)
                    )}
                  </strong>
                </div>
              )}
              <Button variant="luxury" asChild>
                <a href={email}>
                  Send enquiry by email <ArrowRight />
                </a>
              </Button>
            </>
          ) : (
            <div className="empty-bag">
              <ShoppingBag size={36} />
              <h3>Your next favourite awaits.</h3>
              <Button variant="luxury" asChild>
                <Link to="/collections" onClick={() => setBagOpen(false)}>
                  Explore the collection <ArrowRight />
                </Link>
              </Button>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </ShopContext.Provider>
    </ThemeContext.Provider>
  );
}

export function InteractiveSculpture() {
  return (
    <div className="scent-sculpture" aria-label="Interactive rotating fragrance sculpture">
      <Suspense
        fallback={
          <div className="loader-rings">
            <i />
            <i />
            <i />
          </div>
        }
      >
        <ScentScene />
      </Suspense>
    </div>
  );
}
