import { createFileRoute } from '@tanstack/react-router';
import { GalleryPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';
export const Route = createFileRoute('/project-sites')({
  head: () => meta('Our Project Sites', 'Explore real aromatic cultivation and distillation project photographs.'),
  component: Page,
});
function Page() { return <GalleryPage kind="projects"/>; }
