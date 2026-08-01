import { stripe } from '@/lib/stripe';
import ProductPageClient from './product-page-client';
import type { Metadata } from 'next';


interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
}

export async function generateMetadata({
  params
}: ProductPageProps): Promise<Metadata> {
  const { id } = await params;
  const product = await stripe.products.retrieve(id);

  return {
    title: product.name,
    description:
      product.description || `Compra ${product.name} en nuestra tienda online`,
    openGraph: {
      title: product.name,
      description: product.description || undefined,
      images: product.images?.[0] ? [product.images[0]] : []
    }
  };
}

const ProductPage = async ({ params }: ProductPageProps) => {
  const { id } = await params;
  const product = await stripe.products.retrieve(id, {
    expand: ['default_price']
  });
  const plainProduct = JSON.parse(JSON.stringify(product));

  return <ProductPageClient product={plainProduct} />;
};

export default ProductPage;
