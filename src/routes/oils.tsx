import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/oils')({
  head: () => meta('Oils', 'Discover Artisan Scent botanical oils, retail prices and bulk packaging for fragrance and personal care.'),
  component: Page,
});
function Page() { return <CategoryPage kind="oils"/>; }