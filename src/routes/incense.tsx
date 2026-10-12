import { createFileRoute } from '@tanstack/react-router';
import { CategoryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/incense')({
  head: () => meta('Scented Agarbatti', 'Explore the Artisan Scent scented agarbatti collection.'),
  component: Page,
});
function Page() { return <CategoryPage kind="incense"/>; }
