import { stripe } from '@/lib/stripe';
import ProductPageClient from './product-page-client';


interface ProductPageProps {
  params: Promise<{
    id: string;
  }>;
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
