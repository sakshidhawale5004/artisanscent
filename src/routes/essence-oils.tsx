import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/essence-oils')({
  head: () => meta('Essence Oils', 'Discuss floral, woody, fresh and oriental-inspired fragrance oil requirements with Artisan Scent.'),
  component: Page,
});
function Page() { return <CategoryPage kind="essence-oils"/>; }