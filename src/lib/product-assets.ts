import oilLavender from '@/assets/products/oil-lavender.png.asset.json';
import oilVetiver from '@/assets/products/oil-vetiver.png.asset.json';
import oilGeranium from '@/assets/products/oil-geranium.png.asset.json';
import oilLemongrass from '@/assets/products/oil-lemongrass.png.asset.json';
import oilRosemary from '@/assets/products/oil-rosemary.png.asset.json';
import oilPatchouli from '@/assets/products/oil-patchouli.png.asset.json';
import oilCitronella from '@/assets/products/oil-citronella.png.asset.json';
import oilPalmarosa from '@/assets/products/oil-palmarosa.png.asset.json';
import scent01 from '@/assets/products/artisan-scent-01.webp.asset.json';
import scent02 from '@/assets/products/artisan-scent-02.webp.asset.json';
import scent03 from '@/assets/products/artisan-scent-03.webp.asset.json';
import scent04 from '@/assets/products/artisan-scent-04.webp.asset.json';
import scent05 from '@/assets/products/artisan-scent-05.webp.asset.json';
import scent06 from '@/assets/products/artisan-scent-06.webp.asset.json';
import scent07 from '@/assets/products/artisan-scent-07.webp.asset.json';
import scent08 from '@/assets/products/artisan-scent-08.webp.asset.json';
import scent09 from '@/assets/products/artisan-scent-09.webp.asset.json';
import scent10 from '@/assets/products/artisan-scent-10.webp.asset.json';
import scent11 from '@/assets/products/artisan-scent-11.webp.asset.json';
import soap01 from '@/assets/products/soap-01.jpeg.asset.json';
import soap02 from '@/assets/products/soap-02.jpeg.asset.json';
import agarbatti01 from '@/assets/products/agarbatti-01.jpeg.asset.json';
import agarbatti02 from '@/assets/products/agarbatti-02.jpeg.asset.json';
import agarbatti03 from '@/assets/products/agarbatti-03.jpeg.asset.json';

export const productPhotos = {
  oils: [oilLavender.url, oilVetiver.url, oilGeranium.url, oilLemongrass.url, oilRosemary.url, oilPatchouli.url, oilCitronella.url, oilPalmarosa.url],
  scents: [scent01.url, scent02.url, scent03.url, scent04.url, scent05.url, scent06.url, scent07.url, scent08.url, scent09.url, scent10.url, scent11.url],
  soaps: [soap01.url, soap02.url],
  agarbatti: [agarbatti01.url, agarbatti02.url, agarbatti03.url],
} as const;