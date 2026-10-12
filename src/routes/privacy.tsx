import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/privacy')({
  head: () => meta('Privacy Policy', 'Read the Artisan Scent privacy policy and contact our team for enquiries.'),
  component: Page,
});
function Page() { return <LegalPage kind="privacy"/>; }
