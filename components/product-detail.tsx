'use client';

import { useCartStore } from '@/store/cart-store';
import { formatCurrency } from '@/utils/utils';
import Image from 'next/image';
import { useState } from 'react';
import Stripe from 'stripe';
import { Button } from './ui/button';

interface ProductDetailProps {
  product: Stripe.Product;
}

const ProductDetail = ({ product }: ProductDetailProps) => {
  const { items, addOrIncreaseItem, decreaseQuantity } = useCartStore();
  const price = product.default_price as Stripe.Price;

  // Leer tallas desde metadata (ej: "S,M,L,XL")
  const sizes = product.metadata?.sizes?.split(',') || [];
  const hasSizes = sizes.length > 0;
  const [selectedSize, setSelectedSize] = useState<string | undefined>(undefined);

  const cartItem = items.find(
    item => item.id === product.id && item.size === (hasSizes ? selectedSize : undefined)
  );
  const quantity = cartItem ? cartItem.quantity : 0;

  if (!product || !price || price.unit_amount === null) {
    return <div>Producto no disponible o sin precio.</div>;
  }

  const unitAmount = price.unit_amount;

  const onAddItem = () => {
    if (hasSizes && !selectedSize) return;

    addOrIncreaseItem({
      id: product.id,
      name: product.name,
      price: unitAmount / 100,
      imageUrl: product.images?.[0] || null,
      quantity: 1,
      size: selectedSize
    });
  };

  const onDecreaseItem = () => {
    decreaseQuantity(product.id, selectedSize);
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

        {/* Selector de tallas */}
        {hasSizes && (
          <fieldset className='mt-6'>
            <legend className='text-sm font-medium mb-2'>Talla</legend>
            <div className='flex flex-wrap gap-2' role='radiogroup'>
              {sizes.map(size => (
                <button
                  key={size}
                  onClick={() => setSelectedSize(size)}
                  role='radio'
                  aria-checked={selectedSize === size}
                  aria-label={`Talla ${size.trim()}`}
                  className={`px-4 py-2 border rounded-md text-sm font-medium transition-colors cursor-pointer ${
                    selectedSize === size
                      ? 'bg-primary text-primary-foreground border-primary'
                      : 'border-gray-300 hover:border-primary'
                  }`}
                >
                  {size.trim()}
                </button>
              ))}
            </div>
          </fieldset>
        )}

        {/* Controles */}
        <div className='flex items-center gap-4 mt-8' role='group' aria-label='Controles de cantidad'>
          <Button
            onClick={onDecreaseItem}
            variant='outline'
            className='w-12 h-12 text-2xl cursor-pointer'
            disabled={quantity === 0}
            aria-label='Disminuir cantidad'
          >
            -
          </Button>
          <span className='text-2xl font-semibold w-8 text-center' aria-live='polite' aria-label={`${quantity} en el carrito`}>
            {quantity}
          </span>
          <Button
            onClick={onAddItem}
            variant='outline'
            className='w-12 h-12 text-2xl cursor-pointer'
            disabled={hasSizes && !selectedSize}
            aria-label='Aumentar cantidad'
          >
            +
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ProductDetail;
