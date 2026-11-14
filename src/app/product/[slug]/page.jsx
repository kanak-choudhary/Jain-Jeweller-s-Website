import { notFound } from 'next/navigation';
import productsData from '@/data/products.json';
import ProductDetailView from '@/components/pdp/ProductDetailView';

export function generateStaticParams() {
  return productsData.map((product) => ({
    slug: product.slug,
  }));
}

export async function generateMetadata({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    return {
      title: 'Product Not Found | Jain Jewellers',
      description: 'The requested jewellery piece could not be found at Jain Jewellers.',
    };
  }

  return {
    title: `${product.name} | BIS Hallmarked Fine Jewellery | Jain Jewellers`,
    description: `Discover ${product.name} handcrafted in ${product.purity} ${product.metalName}. Authentic BIS hallmarked fine jewellery with certified royal craftsmanship.`,
    openGraph: {
      title: `${product.name} | Jain Jewellers`,
      description: `Handcrafted in ${product.purity} ${product.metalName} by Jain Jewellers.`,
      images: [product.image || (product.images && product.images[0]) || '/images/home/shop-by-category/earrings-category.webp'],
    },
  };
}

export default async function ProductDetailPage({ params }) {
  const { slug } = await params;
  const product = productsData.find((p) => p.slug === slug);

  if (!product) {
    notFound();
  }

  return <ProductDetailView product={product} />;
}

