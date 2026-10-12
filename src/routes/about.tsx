import { createFileRoute } from '@tanstack/react-router';
import { AboutPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/about')({
  head: () => meta('Our Story', 'Meet the botanical roots and fragrance expertise behind Artisan Scent.'),
  component: AboutPage,
});
