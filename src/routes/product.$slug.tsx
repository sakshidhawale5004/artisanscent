import { createFileRoute } from '@tanstack/react-router';
import { ProductDetailPage } from '@/components/ProductDetailPage';
import { getProductBySlug, meta } from '@/lib/artisan-data';

export const Route = createFileRoute('/product/$slug')({
  head: ({ params }) => {
    const product = getProductBySlug(params.slug);
    return meta(
      product ? product.name : 'Product Detail',
      product
        ? `${product.name} — ${product.notes}. Handcrafted luxury formulation by Artisan Scent.`
        : 'Explore handcrafted luxury creations by Artisan Scent.'
    );
  },
  component: ProductRoute,
});

function ProductRoute() {
  const { slug } = Route.useParams();
  return <ProductDetailPage slug={slug} />;
}
