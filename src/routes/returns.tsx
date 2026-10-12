import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/returns')({
  head: () => meta('Return Policy', 'Read the Artisan Scent return policy and contact our team for enquiries.'),
  component: Page,
});
function Page() { return <LegalPage kind="returns"/>; }
