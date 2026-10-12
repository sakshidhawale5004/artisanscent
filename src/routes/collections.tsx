import { createFileRoute } from '@tanstack/react-router';
import { CollectionsPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/collections')({
  head: () => meta('The Collections', 'Discover every Artisan Scent fragrance collection.'),
  component: CollectionsPage,
});
