import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/perfumes')({
  head: () => meta('Luxury Perfumes', 'Explore the Artisan Scent luxury perfumes collection.'),
  component: Page,
});
function Page() { return <CategoryPage kind="perfumes"/>; }
