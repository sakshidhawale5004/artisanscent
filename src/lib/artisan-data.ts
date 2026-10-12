import { photos } from './artisan-assets';
import { productPhotos } from './product-assets';
export const categories = [
  { name: 'Oils', short: 'Oils', path: '/oils' as const, image: productPhotos.oils[0], text: 'Botanical essential oils for fragrance, wellness and personal-care applications, with retail and bulk packaging.' },
  { name: 'Artisan Scent', short: 'Artisan Scent', path: '/perfumes' as const, image: productPhotos.scents[2], text: 'Distinctive fragrance compositions with sophisticated scent profiles for personal wear, special occasions and thoughtful gifting.' },
  { name: 'Agarbatti', short: 'Agarbatti', path: '/incense' as const, image: productPhotos.agarbatti[0], text: 'Floral, woody and soothing fragrances inspired by Indian traditions for prayer, meditation and home ambience.' },
  { name: 'Soaps', short: 'Soaps', path: '/soaps' as const, image: productPhotos.soaps[0], text: 'Refreshing, sensory fragrance designed to complement everyday personal-care routines.' },
];
export const additionalCategories = [
  { name: 'Essence oils', short: 'Essence oils', path: '/essence-oils' as const, image: productPhotos.oils[1], text: 'Versatile fragrance oils with floral, woody, fresh and oriental-inspired aromatic profiles.' },
  { name: 'Car perfumes', short: 'Car perfumes', path: '/car-perfumes' as const, image: productPhotos.scents[0], text: 'Compact, stylish diffuser formats with fresh, woody and sophisticated fragrance options.' },
];
export type ProductGroup = 'oils' | 'artisan-scent' | 'soaps' | 'agarbatti' | 'car-perfumes';
export type Product = { name: string; image: string; category: string; group: ProductGroup; notes: string; price?: number; bulk?: number; sizes?: number[]; botanical?: string; applications?: string };
export const oils: Product[] = [
  ['Lavender Oil',450,30000,'Floral · Calming · Sweet','Lavandula officinalis',3800,16500],
  ['Vetiver (Khus) Oil',650,45000,'Earthy · Woody · Deep','Chrysopogon zizanioides',5500,24000],
  ['Geranium Oil',550,39000,'Rose-like · Floral · Soft','Pelargonium graveolens',4800,21000],
  ['Lemongrass Oil',299,19500,'Citrus · Fresh · Bright','Cymbopogon flexuosus',2400,10500],
  ['Rosemary Oil',399,27000,'Herbal · Refreshing · Green','Rosmarinus officinalis',3300,14500],
  ['Patchouli Oil',599,43000,'Earthy · Musky · Exotic','Pogostemon cablin',5200,23000],
  ['Citronella Oil',275,17500,'Fresh · Herbal · Citrus','Cymbopogon winterianus',2200,9500],
  ['Palmarosa Oil',425,29000,'Rose-like · Sweet · Floral','Cymbopogon martinii',3600,15500],
  ['Menthol Mint Oil',325,22000,'Mint · Cooling · Refreshing','Mentha arvensis',2800,12000],
].map((row, i) => ({ name: String(row[0]), price: Number(row[1]), bulk: Number(row[2]), notes: String(row[3]), botanical: String(row[4]), sizes: [Number(row[5]), Number(row[6]), Number(row[2])], category: 'Essential oil', group: 'oils' as const, image: productPhotos.oils[i] ?? photos['project site'][12], applications: ['Aromatherapy, wellness, skincare and perfumery','Attars, perfumes and luxury fragrances','Cosmetics, personal care and aromatherapy','Personal care, fragrance and wellness products','Hair care, room fragrance and wellness','Fine fragrance, perfume and luxury skincare','Soaps, cosmetics and home fragrance','Cosmetics, soaps and aromatherapy','Oral care, wellness and personal care'][i] ?? 'Wellness, fragrance and personal care' }));
export const showcase = [
  { name: 'Luxury Perfume Collection', image: productPhotos.scents[2], category: 'Artisan Scent', group: 'artisan-scent', notes: 'Distinctive fragrance compositions' },
  { name: 'Signature Car Perfumes', image: productPhotos.scents[1], category: 'Car fragrance', group: 'car-perfumes', notes: 'Fresh · Woody · Sophisticated' },
  { name: 'Handcrafted Soap Collection', image: productPhotos.soaps[0], category: 'Handcrafted soap', group: 'soaps', notes: 'Fragrance for everyday care' },
  { name: 'Scented Agarbatti Collection', image: productPhotos.agarbatti[0], category: 'Agarbatti', group: 'agarbatti', notes: 'Floral · Woody · Soothing' },
] satisfies [Product, Product, Product, Product];
const scentNames = ['Hanging Car Diffuser', 'Artisan Car Fragrance', 'Midnight Eau de Parfum', 'Artisan Scent Discovery Set', 'Rouge Eau de Parfum', 'Azure Eau de Parfum', 'Violet Eau de Parfum', 'Miniature Scent Collection', 'Signature Fragrance Wardrobe', 'Noir Eau de Parfum', 'Botanical Car Diffuser'];
const scentProducts: Product[] = productPhotos.scents.map((image, i) => ({ name: scentNames[i] ?? `Artisan Scent ${i + 1}`, image, category: i === 0 || i === 1 || i === 10 ? 'Car fragrance' : 'Artisan Scent', group: i === 0 || i === 1 || i === 10 ? 'car-perfumes' : 'artisan-scent', notes: i === 0 || i === 1 || i === 10 ? 'A refined fragrance for everyday journeys' : 'A distinctive composition from our fragrance collection' }));
export const artisanScents = scentProducts.filter(product => product.group === 'artisan-scent');
export const carPerfumes = scentProducts.filter(product => product.group === 'car-perfumes');
export const soaps: Product[] = productPhotos.soaps.map((image, i) => ({ name: i === 0 ? 'Artisan Soap Discovery Collection' : 'Artisan Soap Gift Collection', image, category: 'Handcrafted soap', group: 'soaps', notes: 'Colourful handcrafted soaps for a fragrant daily ritual' }));
export const agarbatti: Product[] = productPhotos.agarbatti.map((image, i) => ({ name: ['Floral Agarbatti Collection', 'Classic Agarbatti Collection', 'Premium Incense Selection'][i] ?? `Agarbatti Collection ${i + 1}`, image, category: 'Agarbatti', group: 'agarbatti', notes: 'Floral, woody and soothing incense for familiar rituals' }));
export const allProducts: Product[] = [...oils, ...artisanScents, ...agarbatti, ...soaps, ...carPerfumes];
export const formatPrice = (price: number) => new Intl.NumberFormat('en-IN', { style: 'currency', currency: 'INR', maximumFractionDigits: 0 }).format(price);
export const meta = (title: string, description: string) => ({ meta: [ { title: `${title} — Artisan Scent` }, { name: 'description', content: description }, { property: 'og:title', content: `${title} — Artisan Scent` }, { property: 'og:description', content: description }, { property: 'og:type', content: 'website' }, { name: 'twitter:card', content: 'summary_large_image' } ] });
