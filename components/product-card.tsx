import Image from 'next/image';
import Link from 'next/link';
import Stripe from 'stripe';
import { Button } from './ui/button';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';

interface ProductCardProps {
  product: Stripe.Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const price = product.default_price as Stripe.Price;

  if (!product || !product.default_price) {
    return null;
  }

  return (
    <Link href={`/products/${product.id}`} className='group block '>
      <Card className='overflow-hidden rounded-2xl border shadow-lg hover:shadow-xl transition-shadow duration-300 h-full flex flex-col'>
        {/* Imagen */}
        {product.images?.[0] && (
          <div className='relative h-56 w-full overflow-hidden'>
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className='object-cover transition-transform duration-500 group-hover:scale-110'
            />
          </div>
        )}

        {/* Contenido */}
        <CardHeader className='p-4 flex-grow'>
          <CardTitle className='text-lg font-semibold line-clamp-1'>
            {product.name}
          </CardTitle>
        </CardHeader>

        <CardContent className='px-4 pb-4 flex flex-col gap-2'>
          {price?.unit_amount && (
            <p className='text-xl font-bold text-primary'>
              €{(price.unit_amount / 100).toFixed(2)}
            </p>
          )}
          <p className='text-sm text-gray-600 line-clamp-2'>
            {product.description || 'No description available'}
          </p>
          <Button className='w-full mt-2 cursor-pointer'>Ver Detalles</Button>
        </CardContent>
      </Card>
    </Link>
  );
};

export default ProductCard;
