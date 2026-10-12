import { createFileRoute } from '@tanstack/react-router';
import { WholesalePage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/wholesale')({
  head: () => meta('Wholesale & Services', 'Essential oil bulk prices, sample kits, manufacturing and agro consultancy.'),
  component: WholesalePage,
});
