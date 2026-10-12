const productImage = (file: string) => `/assets/products/${file}`;

export const productPhotos = {
  oils: [
    'oil-lavender.png',
    'oil-vetiver.png',
    'oil-geranium.png',
    'oil-lemongrass.png',
    'oil-rosemary.png',
    'oil-patchouli.png',
    'oil-citronella.png',
    'oil-palmarosa.png',
  ].map(productImage),
  scents: [
    'artisan-scent-01.webp',
    'artisan-scent-02.webp',
    'artisan-scent-03.webp',
    'artisan-scent-04.webp',
    'artisan-scent-05.webp',
    'artisan-scent-06.webp',
    'artisan-scent-07.webp',
    'artisan-scent-08.webp',
    'artisan-scent-09.webp',
    'artisan-scent-10.webp',
    'artisan-scent-11.webp',
  ].map(productImage),
  soaps: ['soap-01.jpeg', 'soap-02.jpeg'].map(productImage),
  agarbatti: ['agarbatti-01.jpeg', 'agarbatti-02.jpeg', 'agarbatti-03.jpeg'].map(productImage),
} as const;
