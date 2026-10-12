import { createFileRoute } from '@tanstack/react-router';
import { HomePage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/')({
  head: () => meta('Luxury Fragrances & Botanical Essences', 'Discover Artisan Scent luxury perfumes, essential oils, handcrafted soaps, car perfumes and agarbatti.'),
  component: HomePage,
});
