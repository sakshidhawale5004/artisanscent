import { createFileRoute } from '@tanstack/react-router';
import { KeomcPage } from '@/components/ArtisanPages';
import { meta } from '@/lib/artisan-data';

export const Route = createFileRoute('/keomc')({
  head: () => meta('Mother Company — KEOMC', 'Kulswami Essence Oil Manufacturing Company (KEOMC) processes aromatic and medicinal plants into essential oils, with manufacturing, agro technology and consultancy services.'),
  component: KeomcPage,
});
