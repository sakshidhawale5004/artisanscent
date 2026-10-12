import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/car-perfumes')({
  head: () => meta('Car Perfumes', 'Explore the Artisan Scent car perfumes collection.'),
  component: Page,
});
function Page() { return <CategoryPage kind="car-perfumes"/>; }
