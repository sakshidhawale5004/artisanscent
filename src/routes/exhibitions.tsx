import { createFileRoute } from '@tanstack/react-router';
import { GalleryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/exhibitions')({
  head: () => meta('Exhibitions & Connections', 'Meet the Artisan Scent team through our exhibition gallery.'),
  component: Page,
});
function Page() { return <GalleryPage kind="exhibitions"/>; }
