import { createFileRoute } from '@tanstack/react-router';
import { ContactPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/contact')({
  head: () => meta('Contact Artisan Scent', 'Contact Artisan Scent in Airoli, Navi Mumbai for fragrance and wholesale enquiries.'),
  component: ContactPage,
});
