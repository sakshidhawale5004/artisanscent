import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/soaps')({
  head: () => meta('Handcrafted Soaps', 'Explore the Artisan Scent handcrafted soaps collection.'),
  component: Page,
});
function Page() { return <CategoryPage kind="soaps"/>; }
