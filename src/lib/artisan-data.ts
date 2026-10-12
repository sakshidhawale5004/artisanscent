import { photos } from './artisan-assets';
import { productPhotos } from './product-assets';

export const productSlug = (name: string): string =>
  name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/(^-|-$)/g, '');

export const categories = [
  {
    name: 'Oils',
    short: 'Oils',
    path: '/oils' as const,
    image: productPhotos.oils[0],
    tagline: 'Pure essential oils with steam distillation notes',
    subheading: 'Single-origin harvests recovered through gentle steam distillation.',
    text: 'Botanical essential oils for fragrance, wellness and personal-care applications, with retail and bulk packaging.',
  },
  {
    name: 'Artisan Scent',
    short: 'Artisan Scent',
    path: '/perfumes' as const,
    image: productPhotos.scents[2],
    tagline: 'Fine luxury Eau de Parfum editions',
    subheading: 'Distinctive fine fragrance compositions & rare botanical absolutes.',
    text: 'Distinctive fragrance compositions with sophisticated scent profiles for personal wear, special occasions and thoughtful gifting.',
  },
  {
    name: 'Agarbatti',
    short: 'Agarbatti',
    path: '/incense' as const,
    image: productPhotos.agarbatti[0],
    tagline: 'Sacred ritual incense and meditation sticks',
    subheading: 'Temple florals, calming woods & traditional Indian incense heritage.',
    text: 'Floral, woody and soothing fragrances inspired by Indian traditions for prayer, meditation and home ambience.',
  },
  {
    name: 'Soaps',
    short: 'Soaps',
    path: '/soaps' as const,
    image: productPhotos.soaps[0],
    tagline: 'Cold-processed artisanal cleansing bars',
    subheading: 'Sensorial velvet lather enriched with pure nourishing plant oils.',
    text: 'Refreshing, sensory fragrance designed to complement everyday personal-care routines.',
  },
  {
    name: 'Car perfumes',
    short: 'Car perfumes',
    path: '/car-perfumes' as const,
    image: productPhotos.scents[1],
    tagline: 'Compact interior diffusers for everyday journeys',
    subheading: 'Architectural timber & glass diffusers for elevated travel.',
    text: 'Compact, stylish diffuser formats with fresh, woody and sophisticated fragrance options for everyday journeys.',
  },
];

export const additionalCategories: typeof categories = [];

export type ProductGroup = 'oils' | 'artisan-scent' | 'soaps' | 'agarbatti' | 'car-perfumes';

export type ProductSizeOption = {
  label: string;
  volume: string;
  price: number;
  bulkNote?: string;
};

export type Product = {
  name: string;
  slug: string;
  image: string;
  category: string;
  group: ProductGroup;
  notes: string;
  price?: number;
  bulk?: number;
  sizes?: number[];
  sizeOptions?: ProductSizeOption[];
  botanical?: string;
  applications?: string;
  description?: string;
  topNotes?: string[];
  heartNotes?: string[];
  baseNotes?: string[];
  intensity?: string;
  longevity?: string;
  sillage?: string;
  origin?: string;
  harvest?: string;
  gallery?: string[];
};

export const oils: Product[] = [
  {
    name: 'Lavender Oil',
    price: 450,
    bulk: 30000,
    notes: 'Floral · Calming · Sweet',
    botanical: 'Lavandula officinalis',
    sizes: [3800, 16500, 30000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[0],
    applications: 'Aromatherapy, wellness, skincare and perfumery',
    description: 'A sovereign botanical essence distilled from selected lavender blossoms. Characterized by an ethereal floral clarity, honeyed herbal facets, and a profoundly restorative finish that quiets the senses.',
    topNotes: ['French Lavender Blossom', 'Wild Bergamot Dew', 'Crisp Mint Leaf'],
    heartNotes: ['Honeyed Clary Sage', 'Crushed Alpine Herbals', 'Linden Floret'],
    baseNotes: ['Warm Sweet Hay', 'Distilled Cedar Timber', 'Velvet Amber'],
    intensity: 'Balanced · Restorative',
    longevity: '8–12 Hours',
    sillage: 'Enveloping Aura',
    origin: 'Distilled at KEOMC Agro-Estate',
    harvest: 'Steam Distillation 2026 Batch',
  },
  {
    name: 'Vetiver (Khus) Oil',
    price: 650,
    bulk: 45000,
    notes: 'Earthy · Woody · Deep',
    botanical: 'Chrysopogon zizanioides',
    sizes: [5500, 24000, 45000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[1],
    applications: 'Attars, perfumes and luxury fragrances',
    description: 'The green gold of traditional Indian perfumery. Recovered from root clusters washed by monsoonal waters, delivering an aristocratically smoky, petrichor-rich olfactory architecture of rare depth.',
    topNotes: ['Wet River Soil', 'Green Grass Reed', 'Sunlit Amber'],
    heartNotes: ['Distilled Vetiver Root', 'Spiced Cardamom Pod', 'Wild Orris'],
    baseNotes: ['Smoked Earth Petrichor', 'Dark Cedar Timber', 'Precious Sandalwood Accord'],
    intensity: 'Deep · Grounding',
    longevity: '14+ Hours',
    sillage: 'Intimate Sillage',
    origin: 'North Indian Fluvial Riverbeds',
    harvest: 'Hydro-Steam Distillation',
  },
  {
    name: 'Geranium Oil',
    price: 550,
    bulk: 39000,
    notes: 'Rose-like · Floral · Soft',
    botanical: 'Pelargonium graveolens',
    sizes: [4800, 21000, 39000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[2],
    applications: 'Cosmetics, personal care and aromatherapy',
    description: 'An effervescent floral distillation mirroring the regal poise of fresh damascena rose, underscored by crisp green leaves and bright citrus nuances.',
    topNotes: ['Rose Leaf Dew', 'Green Lemon Peel', 'Pink Peppercorn'],
    heartNotes: ['Pelargonium Petals', 'Bourbon Geranium', 'Sweet Magnolia'],
    baseNotes: ['Cashmere Musk', 'Clean Cedarwood', 'Powdery Amber'],
    intensity: 'Vibrant · Radiant',
    longevity: '9–11 Hours',
    sillage: 'Airy Trail',
    origin: 'High-Altitude Deccan Terroir',
    harvest: 'Fractional Steam Distillation',
  },
  {
    name: 'Lemongrass Oil',
    price: 299,
    bulk: 19500,
    notes: 'Citrus · Fresh · Bright',
    botanical: 'Cymbopogon flexuosus',
    sizes: [2400, 10500, 19500],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[3],
    applications: 'Personal care, fragrance and wellness products',
    description: 'A burst of crystalline sunlight. Freshly harvested tropical grass yields an invigorating essence bursting with pure citral brilliance and restorative botanical vitality.',
    topNotes: ['Sparkling Lemon Zest', 'Crushed Grass Blade', 'Lime Blossom'],
    heartNotes: ['Ginger Root Accord', 'Verbena Leaf', 'Sweet Neroli'],
    baseNotes: ['Dry Vetiver Touch', 'Sun-Dried Timber', 'Clean Herbal Moss'],
    intensity: 'Luminous · Uplifting',
    longevity: '6–8 Hours',
    sillage: 'Expansive Diffusion',
    origin: 'Western Ghats Plantation',
    harvest: 'Direct Steam Recovery',
  },
  {
    name: 'Rosemary Oil',
    price: 399,
    bulk: 27000,
    notes: 'Herbal · Refreshing · Green',
    botanical: 'Rosmarinus officinalis',
    sizes: [3300, 14500, 27000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[4],
    applications: 'Hair care, room fragrance and wellness',
    description: 'Crisp, camphoric clarity distilled from needle-leaved Mediterranean botanicals. Celebrated for mental focus, meditative ritual spaces, and scalp-care elixirs.',
    topNotes: ['Eucalyptus Frost', 'Crushed Rosemary Needle', 'Pine Resin'],
    heartNotes: ['Mountain Thyme', 'Wild Sage Blossom', 'Green Laurel'],
    baseNotes: ['Woody Frankincense', 'Dry Oakmoss', 'Aged Juniper'],
    intensity: 'Invigorating · Crisp',
    longevity: '7–9 Hours',
    sillage: 'Focused Clarity',
    origin: 'Nilgiri Hills Botanical Gardens',
    harvest: 'Steam Distillation',
  },
  {
    name: 'Patchouli Oil',
    price: 599,
    bulk: 43000,
    notes: 'Earthy · Musky · Exotic',
    botanical: 'Pogostemon cablin',
    sizes: [5200, 23000, 43000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[5],
    applications: 'Fine fragrance, perfume and luxury skincare',
    description: 'Aged and cured to perfection. Dark, velvety and enigmatic, this precious distillation imparts an unmistakable sensual warmth revered by legendary perfume houses.',
    topNotes: ['Spiced Black Tea', 'Damp Foliage', 'Plum Wine'],
    heartNotes: ['Cured Patchouli Leaf', 'Cacao Husk', 'Smoked Cinnamon'],
    baseNotes: ['Bourbon Amber', 'Vintage Leather Accord', 'Dark Labdanum'],
    intensity: 'Opulent · Seductive',
    longevity: '16+ Hours',
    sillage: 'Magnetic Sillage',
    origin: 'Sumatran Terroir Selection',
    harvest: 'Aged Copper Pot Distillation',
  },
  {
    name: 'Citronella Oil',
    price: 275,
    bulk: 17500,
    notes: 'Fresh · Herbal · Citrus',
    botanical: 'Cymbopogon winterianus',
    sizes: [2200, 9500, 17500],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[6],
    applications: 'Soaps, cosmetics and home fragrance',
    description: 'Pure, crisp botanical barrier and outdoor sanctuary essence. Clean lemon rind balanced with herbal green tenacity that purifies surrounding air effortlessly.',
    topNotes: ['Ceylon Citrus Rind', 'Eucalyptus Leaf', 'Lemon Verbena'],
    heartNotes: ['Citronella Shoot', 'Green Lemongrass', 'Geraniol Flora'],
    baseNotes: ['Woody Camphor', 'Sweet Timber Sap', 'Clean Cedar'],
    intensity: 'Brisk · Purifying',
    longevity: '6–8 Hours',
    sillage: 'Vigorous Clean Diffusion',
    origin: 'Sub-Himalayan Foothills',
    harvest: 'Rapid Steam Extraction',
  },
  {
    name: 'Palmarosa Oil',
    price: 425,
    bulk: 29000,
    notes: 'Rose-like · Sweet · Floral',
    botanical: 'Cymbopogon martinii',
    sizes: [3600, 15500, 29000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[7],
    applications: 'Cosmetics, soaps and aromatherapy',
    description: 'Wild rose grass distilled with delicate artisanal precision. Rich in natural geraniol, offering soft romantic sweet floral notes that illuminate cosmetic blends.',
    topNotes: ['Dew-Covered Rose Petal', 'Sweet Mandarin', 'Green Shoot'],
    heartNotes: ['Palmarosa Bloom', 'Wild Geranium', 'Orange Blossom'],
    baseNotes: ['Warm Honeycomb', 'Light Sandalwood', 'White Musk'],
    intensity: 'Tender · Lyrical',
    longevity: '8–10 Hours',
    sillage: 'Gentle Radiance',
    origin: 'Central Indian Highlands',
    harvest: 'Gentle Low-Temp Distillation',
  },
  {
    name: 'Menthol Mint Oil',
    price: 325,
    bulk: 22000,
    notes: 'Mint · Cooling · Refreshing',
    botanical: 'Mentha arvensis',
    sizes: [2800, 12000, 22000],
    category: 'Essential oil',
    group: 'oils',
    image: productPhotos.oils[8],
    applications: 'Oral care, wellness and personal care',
    description: 'Sub-zero botanical frost in a concentrated drop. Steam distilled from peppermint fields to create an electric shockwave of exhilarating cooling purity.',
    topNotes: ['Icy Spearmint Blast', 'Crystalline Menthol', 'Wintergreen'],
    heartNotes: ['Peppermint Leaf Oil', 'Crushed Eucalyptus', 'Mountain Fir'],
    baseNotes: ['Alpine Pine Cone', 'Clean White Musk', 'Herbal Frost'],
    intensity: 'Glacial · Invigorating',
    longevity: '7–9 Hours',
    sillage: 'Piercing Freshness',
    origin: 'Indo-Gangetic Mint Plains',
    harvest: 'Cryo-Steam Fractional Extraction',
  },
].map((item) => ({
  ...item,
  slug: productSlug(item.name),
  gallery: [
    item.image,
    photos['project site'][0],
    photos['project site'][3],
    photos['project site'][12],
  ],
  sizeOptions: [
    { label: 'Retail Dropper', volume: '10 ml', price: item.price ?? 450 },
    {
      label: 'Studio Flacon',
      volume: '100 ml',
      price: item.sizes?.[0] ?? 3800,
      bulkNote: 'Recommended Atelier Size',
    },
    {
      label: 'Apothecary Demijohn',
      volume: '1 Litre',
      price: item.sizes?.[1] ?? 16500,
      bulkNote: 'Direct Distiller Packaging',
    },
  ],
}));

export const showcase = [
  {
    name: 'Luxury Perfume Collection',
    image: productPhotos.scents[2],
    category: 'Artisan Scent',
    group: 'artisan-scent',
    notes: 'Distinctive fragrance compositions',
  },
  {
    name: 'Signature Car Perfumes',
    image: productPhotos.scents[1],
    category: 'Car fragrance',
    group: 'car-perfumes',
    notes: 'Fresh · Woody · Sophisticated',
  },
  {
    name: 'Handcrafted Soap Collection',
    image: productPhotos.soaps[0],
    category: 'Handcrafted soap',
    group: 'soaps',
    notes: 'Fragrance for everyday care',
  },
  {
    name: 'Scented Agarbatti Collection',
    image: productPhotos.agarbatti[0],
    category: 'Agarbatti',
    group: 'agarbatti',
    notes: 'Floral · Woody · Soothing',
  },
] satisfies [Product, Product, Product, Product];

const rawScentData = [
  {
    name: 'Frosted Pear Hanging Diffuser',
    isCar: true,
    price: 399,
    notes: 'Vanilla Blossom · Sweet Amber · Warm Timber',
    description: 'An architectural glass flacon capped in turned natural beechwood. Engineered to diffuse gentle warmth, vanilla nectar and soft amber throughout vehicular cabins.',
    topNotes: ['Bosc Pear Nectar', 'Bergamot Zest', 'Crisp Apple Peel'],
    heartNotes: ['Vanilla Blossom', 'Solar Heliotrope', 'Cashmere Accord'],
    baseNotes: ['Warm Beechwood', 'Golden Ambergris', 'Soft White Sandalwood'],
    sizes: [
      { label: 'Single Diffuser', volume: '10 ml', price: 399 },
      { label: 'Diffuser Duo Box', volume: '2 × 10 ml', price: 749, bulkNote: 'Twin Cabins' },
    ],
  },
  {
    name: 'Artisan Car Fragrance Trio',
    isCar: true,
    price: 549,
    notes: 'Woody Oud · Spiced Cedar · Citrus Amber',
    description: 'The definitive prestige cabin wardrobe. Three interchangeable artisanal diffusers spanning crisp morning freshness, refined afternoon timber, and opulent evening oud.',
    topNotes: ['Calabrian Bergamot', 'Spiced Pink Pepper', 'Crisp Pine Needle'],
    heartNotes: ['Atlas Cedarwood', 'Smoked Incense Resin', 'Nutmeg Flower'],
    baseNotes: ['Dark Cambodian Oud', 'Bourbon Amber', 'Smooth Vetiver Bark'],
    sizes: [
      { label: 'Curated Trio Presentation', volume: '3 × 10 ml', price: 549 },
      { label: 'Master Suite + Refill', volume: '3 × 10 ml + 30 ml', price: 999, bulkNote: 'Includes Glass Pipette' },
    ],
  },
  {
    name: 'Midnight Eau de Parfum',
    isCar: false,
    price: 2850,
    notes: 'Black Truffle · Orchid Noir · Spiced Amber',
    description: 'An arresting evening masterpiece. Nocturnal florals and dark resinous spice merge seamlessly into a commanding, velvet-draped sillage of unforgettable presence.',
    topNotes: ['Black Truffle Accord', 'Bergamot Caviar', 'French Ylang-Ylang'],
    heartNotes: ['Nocturnal Black Orchid', 'Spiced Plum', 'Lotus Wood'],
    baseNotes: ['Dark Indonesian Patchouli', 'Bourbon Vanilla Pod', 'Golden Vetiver'],
    sizes: [
      { label: 'Eau de Parfum Flacon', volume: '50 ml', price: 2850 },
      { label: 'Grand Flacon Deluxe', volume: '100 ml', price: 4600, bulkNote: 'Complimentary 10 ml Travel Flacon' },
    ],
  },
  {
    name: 'Artisan Scent Discovery Set',
    isCar: false,
    price: 1450,
    notes: 'Curated 5-Flacon Olfactory Wardrobe',
    description: 'The quintessential introduction to our haute parfumerie. Five miniature glass vials capturing the full emotional gamut of Artisan Scent signature creations.',
    topNotes: ['Solar Florals', 'Citrus Mist', 'Petrichor Accords'],
    heartNotes: ['Rare Botanical Absolutes', 'Temple Woods', 'Spiced Resins'],
    baseNotes: ['Precious Amber', 'Smoked Vetiver', 'Dark Timber'],
    sizes: [
      { label: 'Discovery Gift Presentation', volume: '5 × 5 ml', price: 1450 },
      { label: 'Collector Edition', volume: '5 × 10 ml', price: 2600, bulkNote: 'Includes Scent Blotters' },
    ],
  },
  {
    name: 'Rouge Eau de Parfum',
    isCar: false,
    price: 2650,
    notes: 'Saffron Threads · Damask Rose · Amber Crystals',
    description: 'An ardent ode to royal botanical celebrations. Crimson saffron threads woven through opulent red petals, dry cedar, and radiant ambergris warmth.',
    topNotes: ['Kashmiri Saffron', 'Blood Orange Rind', 'Cardamom Mist'],
    heartNotes: ['Damascena Rose Absolute', 'Jasmine Sambac', 'Warm Nutmeg'],
    baseNotes: ['Amber Crystal Facets', 'Virginia Cedarwood', 'Oakmoss Resin'],
    sizes: [
      { label: 'Eau de Parfum Flacon', volume: '50 ml', price: 2650 },
      { label: 'Grand Flacon Deluxe', volume: '100 ml', price: 4300, bulkNote: 'Linen Coffret' },
    ],
  },
  {
    name: 'Azure Eau de Parfum',
    isCar: false,
    price: 2450,
    notes: 'Marine Mineral · Sea Salt · Sun-Drenched Fig',
    description: 'A breath of coastal stillness. Mediterranean fig sap meets oceanic minerals, sparkling citrus zest and sun-bleached driftwood along solitary shores.',
    topNotes: ['Coastal Sea Salt', 'Grapefruit Mist', 'Green Fig Leaf'],
    heartNotes: ['Cyclamen Petals', 'Rosemary Breeze', 'Mineral Accord'],
    baseNotes: ['Sun-Warmed Driftwood', 'White Amber', 'Clean Sheer Musk'],
    sizes: [
      { label: 'Eau de Parfum Flacon', volume: '50 ml', price: 2450 },
      { label: 'Grand Flacon Deluxe', volume: '100 ml', price: 3950, bulkNote: 'Linen Coffret' },
    ],
  },
  {
    name: 'Violet Eau de Parfum',
    isCar: false,
    price: 2650,
    notes: 'Powdery Violet · Orris Butter · Soft Suede',
    description: 'Timeless aristocratic refinement. Silky Italian orris root draped over gentle violet blossoms and supple suede leather, whispered in hushed tones of elegance.',
    topNotes: ['Dewy Violet Petals', 'Pink Pepper Pod', 'Mandarin Essence'],
    heartNotes: ['Florentine Orris Butter', 'French Heliotrope', 'Mimosa Nectar'],
    baseNotes: ['Cashmere Suede Accord', 'Cedar Timber', 'Creamy Vanilla Bean'],
    sizes: [
      { label: 'Eau de Parfum Flacon', volume: '50 ml', price: 2650 },
      { label: 'Grand Flacon Deluxe', volume: '100 ml', price: 4300, bulkNote: 'Linen Coffret' },
    ],
  },
  {
    name: 'Miniature Scent Collection',
    isCar: false,
    price: 1850,
    notes: 'Seven Pocket Flacons for Discerning Voyagers',
    description: 'Engineered for seamless voyage across continents. Seven leak-proof apothecary vials nested in weighted luxury paperboard, ready for any horizon.',
    topNotes: ['Citrus, Resins & Botanicals'],
    heartNotes: ['Rare Distilled Florals & Spices'],
    baseNotes: ['Deep Woods & Sacred Ambers'],
    sizes: [
      { label: 'Voyage Coffret Box', volume: '7 × 5 ml', price: 1850 },
    ],
  },
  {
    name: 'Signature Fragrance Wardrobe',
    isCar: false,
    price: 3200,
    notes: 'The Master Opus • Four 25ml Flacons',
    description: 'A comprehensive curatorial study in four distinct movements: dawn botanical, midday radiance, twilight spice, and midnight velvet woods.',
    topNotes: ['Four Contrasting First Breaths'],
    heartNotes: ['Layered Heart Harmonizers'],
    baseNotes: ['Enduring Foundations of Amber, Woods & Musk'],
    sizes: [
      { label: 'Master Quad Presentation Box', volume: '4 × 25 ml', price: 3200 },
    ],
  },
  {
    name: 'Noir Eau de Parfum',
    isCar: false,
    price: 2950,
    notes: 'Smoked Incense · Black Pepper · Leather & Birch',
    description: 'The epitome of architectural darkness and sophistication. Sombre birch tar, ceremonial incense coils, cracked black peppercorn and smoldering cedar woods.',
    topNotes: ['Cracked Tellicherry Pepper', 'Juniper Berry', 'Bitter Bergamot'],
    heartNotes: ['Ceremonial Olibanum', 'Smoked Birch Tar', 'Nutmeg Blossom'],
    baseNotes: ['Aged Russian Leather Accord', 'Ebony Wood', 'Dark Indonesian Patchouli'],
    sizes: [
      { label: 'Eau de Parfum Flacon', volume: '50 ml', price: 2950 },
      { label: 'Grand Flacon Deluxe', volume: '100 ml', price: 4850, bulkNote: 'Linen Coffret' },
    ],
  },
  {
    name: 'Botanical Jade Car Diffuser',
    isCar: true,
    price: 429,
    notes: 'Crisp Green Apple · Bergamot · Herbal Mint',
    description: 'Hand-frosted jade glass capped with natural porous wood. Releases an invigorating alpine breeze of freshly peeled citrus, green herbs and gentle woods.',
    topNotes: ['Granny Smith Green Apple', 'Italian Bergamot', 'Crisp Spearmint'],
    heartNotes: ['Green Fig Blossom', 'Clary Sage', 'Crushed Basil'],
    baseNotes: ['White Cedarwood', 'Airy White Amber', 'Clean Clean Musk'],
    sizes: [
      { label: 'Single Diffuser', volume: '10 ml', price: 429 },
      { label: 'Diffuser Duo Gift Box', volume: '2 × 10 ml', price: 799, bulkNote: 'Includes Cord Lanyard' },
    ],
  },
];

const allScents: Product[] = rawScentData.map((item, idx) => ({
  name: item.name,
  slug: productSlug(item.name),
  image: productPhotos.scents[idx],
  category: item.isCar ? 'Car fragrance' : 'Artisan Scent',
  group: (item.isCar ? 'car-perfumes' : 'artisan-scent') as ProductGroup,
  notes: item.notes,
  price: item.price,
  description: item.description,
  topNotes: item.topNotes,
  heartNotes: item.heartNotes,
  baseNotes: item.baseNotes,
  intensity: item.isCar ? 'Balanced Cabin Diffusion' : 'Rich & Enveloping',
  longevity: item.isCar ? '45 Days Continuous Release' : '10–14 Hours',
  sillage: item.isCar ? '360° Interior Ambient Air' : 'Commanding Sillage',
  origin: item.isCar ? 'Handcrafted Wooden Turnery & Atelier Pour' : 'Fine Parfumerie Atelier',
  harvest: item.isCar ? 'Natural Timber Passive Capillary Action' : 'Artisanal Batch Distillation',
  sizeOptions: item.sizes,
  gallery: [
    productPhotos.scents[idx],
    photos['project site'][1],
    photos['project site'][4],
    photos.exibition[1],
  ],
}));

export const artisanScents = allScents.filter((p) => p.group === 'artisan-scent');
export const carPerfumes = allScents.filter((p) => p.group === 'car-perfumes');

export const soaps: Product[] = [
  {
    name: 'Artisan Soap Discovery Collection',
    slug: productSlug('Artisan Soap Discovery Collection'),
    image: productPhotos.soaps[0],
    category: 'Handcrafted soap',
    group: 'soaps',
    price: 349,
    notes: 'Cold-processed botanical oils · Mineral clays · Velvet lather',
    description: 'Hand-cut botanical soap bars cured over four weeks in humidity-controlled chambers. Infused with pure steam-distilled essential oils, rich plant butters, and fine mineral clays for an exceptionally soft bathing lather.',
    topNotes: ['Sweet Orange Rind', 'Lavender Dew', 'Spearmint Leaf'],
    heartNotes: ['Nourishing Shea Butter', 'Cold-Pressed Olive Oil', 'Oat Milk Accord'],
    baseNotes: ['Cedar Bark', 'Natural Mineral Clay', 'Warm Botanical Honey'],
    intensity: 'Gentle · Restorative',
    longevity: 'Everyday Daily Ritual',
    sillage: 'Subtle Clean Skin Aura',
    origin: 'Cold-Process Atelier',
    harvest: '4-Week Slow Wooden Mold Curing',
    sizeOptions: [
      { label: 'Single Cured Bar', volume: '125 g', price: 349 },
      { label: 'Trio Discovery Box', volume: '3 × 125 g', price: 899, bulkNote: 'Includes Travertine Soap Dish' },
    ],
    gallery: [
      productPhotos.soaps[0],
      productPhotos.soaps[1],
      photos['project site'][5],
      photos['project site'][6],
    ],
  },
  {
    name: 'Artisan Soap Gift Collection',
    slug: productSlug('Artisan Soap Gift Collection'),
    image: productPhotos.soaps[1],
    category: 'Handcrafted soap',
    group: 'soaps',
    price: 649,
    notes: 'Prestige Gift Box · Botanical botanic lather · Restorative care',
    description: 'An elevated four-bar gifting presentation crafted for discerning hosts and personal sanctuaries. Each bar features a distinct therapeutic aromatic profile wrapped in debossed handmade paper.',
    topNotes: ['Lemongrass & Citron', 'Wild Rose & Geranium', 'Vetiver & Earth'],
    heartNotes: ['Organic Coconut Butter', 'Sweet Almond Kernel', 'French Green Clay'],
    baseNotes: ['Smoked Timber Resin', 'Raw Amber Honey', 'Natural Glycerin'],
    intensity: 'Sensorial · Elevated',
    longevity: 'Long-Lasting Triple Milled Feel',
    sillage: 'Aromatherapeutic Steam Bloom',
    origin: 'Cold-Process Atelier',
    harvest: 'Small-Batch Hand Poured',
    sizeOptions: [
      { label: 'Gift Presentation Box', volume: '4 × 100 g', price: 649 },
      { label: 'Master Sanctuary Hamper', volume: '8 × 100 g', price: 1199, bulkNote: 'Includes Linen Washcloth' },
    ],
    gallery: [
      productPhotos.soaps[1],
      productPhotos.soaps[0],
      photos['project site'][7],
      photos['project site'][8],
    ],
  },
];

export const agarbatti: Product[] = [
  {
    name: 'Floral Agarbatti Collection',
    slug: productSlug('Floral Agarbatti Collection'),
    image: productPhotos.agarbatti[0],
    category: 'Agarbatti',
    group: 'agarbatti',
    price: 249,
    notes: 'Temple Rose · Night-Blooming Jasmine · Sacred Lotus',
    description: 'Traditional charcoal-free incense sticks hand-rolled by master artisans. Enriched with natural floral concretes and aromatic resins to transform spaces into temples of quiet devotion.',
    topNotes: ['Damask Rose Water', 'Morning Champaca Flower', 'Cardamom Mist'],
    heartNotes: ['Night Jasmine Sambac', 'Lotus Nectar', 'Marigold Petals'],
    baseNotes: ['White Sandalwood Bark', 'Sweet Benzoin Resin', 'Sacred Camphor Touch'],
    intensity: 'Serene · Meditative',
    longevity: '45 Min Burn · 6+ Hr Lingering Ambience',
    sillage: 'Sanctuary Enveloping',
    origin: 'Hand-Rolled Incense Atelier',
    harvest: '100% Charcoal-Free Bamboo Core',
    sizeOptions: [
      { label: 'Heritage Tube', volume: '50 Sticks', price: 249 },
      { label: 'Sanctuary Duo Pack', volume: '100 Sticks', price: 449, bulkNote: 'Includes Solid Brass Burner' },
    ],
    gallery: [
      productPhotos.agarbatti[0],
      productPhotos.agarbatti[1],
      photos['project site'][9],
      photos['project site'][10],
    ],
  },
  {
    name: 'Classic Agarbatti Collection',
    slug: productSlug('Classic Agarbatti Collection'),
    image: productPhotos.agarbatti[1],
    category: 'Agarbatti',
    group: 'agarbatti',
    price: 249,
    notes: 'Mysore Sandalwood · Guggul Resin · Warm Woods',
    description: 'The ancient fragrance of sacred Indian ceremonies. Ground aromatic herbs, pure sandalwood powder, and precious resins blended according to ancestral Ayurvedic proportions.',
    topNotes: ['Sweet Guggal Smoke', 'Cardamom Husk', 'Coriander Seed'],
    heartNotes: ['Mysore Sandalwood Paste', 'Frankincense Tears', 'Spikenard'],
    baseNotes: ['Earthy Vetiver Bark', 'Dry Cedar Ash', 'Golden Amber Powder'],
    intensity: 'Deep · Sacred',
    longevity: '50 Min Burn · 8+ Hr Lingering Ambience',
    sillage: 'Centering Atmosphere',
    origin: 'Traditional Vedic Guilds',
    harvest: 'Hand-Rolled Herbal Paste',
    sizeOptions: [
      { label: 'Heritage Tube', volume: '50 Sticks', price: 249 },
      { label: 'Sanctuary Duo Pack', volume: '100 Sticks', price: 449, bulkNote: 'Includes Solid Brass Burner' },
    ],
    gallery: [
      productPhotos.agarbatti[1],
      productPhotos.agarbatti[0],
      photos['project site'][11],
      photos['project site'][12],
    ],
  },
  {
    name: 'Premium Incense Selection',
    slug: productSlug('Premium Incense Selection'),
    image: productPhotos.agarbatti[2],
    category: 'Agarbatti',
    group: 'agarbatti',
    price: 329,
    notes: 'Assam Agarwood · Loban Resin · Himalayan Cedar',
    description: 'An elite meditative incense crafted with precious Assam oud wood chips and raw wild-harvested loban resin. Produces a fragrant thread of blue smoke of breathtaking serenity.',
    topNotes: ['Smoked Bergamot Leaf', 'Black Cumin', 'Golden Frankincense'],
    heartNotes: ['Rare Assam Agarwood Chips', 'Raw Loban Crystals', 'Cinnamon Bark'],
    baseNotes: ['Precious Amber Dust', 'Himalayan Cedarwood', 'Aged Moss'],
    intensity: 'Opulent · Meditative',
    longevity: '60 Min Slow Burn · 12+ Hr Lingering Ambience',
    sillage: 'Transcendent Sanctuary Sillage',
    origin: 'Rare Forest Harvest Guilds',
    harvest: 'Natural Resin & Wood Binder Only',
    sizeOptions: [
      { label: 'Collector Tube', volume: '40 Premium Sticks', price: 329 },
      { label: 'Ceremonial Master Box', volume: '120 Sticks', price: 799, bulkNote: 'Hand-Carved Stone Burner Included' },
    ],
    gallery: [
      productPhotos.agarbatti[2],
      productPhotos.agarbatti[1],
      photos['project site'][13],
      photos['project site'][14],
    ],
  },
];

export const allProducts: Product[] = [
  ...oils,
  ...artisanScents,
  ...agarbatti,
  ...soaps,
  ...carPerfumes,
];

export const getProductBySlug = (slug: string): Product | undefined => {
  if (!slug) return undefined;
  const cleanSlug = slug.toLowerCase().trim();
  return allProducts.find(
    (p) => p.slug === cleanSlug || productSlug(p.name) === cleanSlug
  );
};

export const formatPrice = (price: number) =>
  new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0,
  }).format(price);

export const meta = (title: string, description: string) => ({
  meta: [
    { title: `${title} — Artisan Scent` },
    { name: 'description', content: description },
    { property: 'og:title', content: `${title} — Artisan Scent` },
    { property: 'og:description', content: description },
    { property: 'og:type', content: 'website' },
    { name: 'twitter:card', content: 'summary_large_image' },
  ],
});
