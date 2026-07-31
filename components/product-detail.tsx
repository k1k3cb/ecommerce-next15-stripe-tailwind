'use client';

import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/utils/utils';
import Image from 'next/image';
import Stripe from 'stripe';
import { Button } from './ui/button';

interface ProductDetailProps {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { items, addOrIncreaseItem, decreaseQuantity } = useCartStore();
  const price = product.default_price as Stripe.Price;
  const cartItem = items.find(item => item.id === product.id);
  const quantity = cartItem ? cartItem.quantity : 0;

  // 👇 Validamos datos antes de seguir
  if (!product || !price || price.unit_amount === null) {
    return <div>Producto no disponible o sin precio.</div>;
  }

  // Ahora TS sabe que `price.unit_amount` es solo number
  const unitAmount = price.unit_amount;

  const onAddItem = () => {
    addOrIncreaseItem({
      id: product.id,
      name: product.name,
      price: unitAmount / 100,
      imageUrl: product.images?.[0] || null,
      quantity: 1 // el store se encarga de sumarlo
    });
  };

  const onDecreaseItem = () => {
    decreaseQuantity(product.id);
  };

  return (
    <div className='flex flex-col md:flex-row gap-8 lg:gap-16 items-start'>
      {/* Imagen */}
      <div
        className='w-full md:w-1/2 relative h-96 rounded-xl overflow-hidden shadow-lg'
        style={{ viewTransitionName: `product-image-${product.id}` }}
      >
        {product.images?.[0] && (
          <Image
            src={product.images[0]}
            alt={product.name}
            fill
            className='object-cover'
            priority
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
          />
        )}
      </div>

      {/* Detalles */}
      <div className='w-full md:w-1/2 p-4'>
        <h1 className='text-3xl lg:text-4xl font-bold'>{product.name}</h1>
        {product.description && (
          <p className='text-gray-600 dark:text-gray-400 mt-2 text-lg'>{product.description}</p>
        )}
        <p className='text-2xl font-bold text-primary mt-4'>
          {formatCurrency(unitAmount / 100)}
        </p>

        {/* Controles */}
        <div className='flex items-center gap-4 mt-8 '>
          <Button
            onClick={onDecreaseItem}
            variant='outline'
            className='w-12 h-12 text-2xl cursor-pointer'
            disabled={quantity === 0}
          >
            -
          </Button>
          <span className='text-2xl font-semibold w-8 text-center'>
            {quantity}
          </span>
          <Button
            onClick={onAddItem}
            variant='outline'
            className='w-12 h-12 text-2xl cursor-pointer'
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
