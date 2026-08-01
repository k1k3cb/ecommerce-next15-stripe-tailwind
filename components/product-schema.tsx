import Stripe from 'stripe';

interface ProductSchemaProps {
  product: Stripe.Product;
}

export function ProductSchema({ product }: ProductSchemaProps) {
  const price = product.default_price as Stripe.Price;

  const schema = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    description: product.description || undefined,
    image: product.images?.[0] || undefined,
    offers: {
      '@type': 'Offer',
      price: price?.unit_amount ? (price.unit_amount / 100).toFixed(2) : undefined,
      priceCurrency: 'eur',
      availability: 'https://schema.org/InStock'
    }
  };

  return (
    <script
      type='application/ld+json'
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
