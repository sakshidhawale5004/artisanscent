import { createFileRoute } from '@tanstack/react-router';
import { LegalPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/terms')({
  head: () => meta('Terms & Conditions', 'Read the Artisan Scent terms & conditions and contact our team for enquiries.'),
  component: Page,
});
function Page() { return <LegalPage kind="terms"/>; }
