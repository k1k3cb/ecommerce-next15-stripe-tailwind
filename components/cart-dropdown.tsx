'use client';

import { useCartStore } from '@/store/cart-store';
import Image from 'next/image';
import Link from 'next/link';

const CartDropdown = () => {
  const { items } = useCartStore();
  const total = items.reduce((acc, item) => acc + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <div className='absolute right-0 top-full mt-2 w-72 bg-white dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-800 p-4 z-50 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
        <p className='text-sm text-gray-500 dark:text-gray-400 text-center py-4'>
          Tu carrito está vacío
        </p>
      </div>
    );
  }

  return (
    <div className='absolute right-0 top-full mt-2 w-80 bg-white dark:bg-gray-900 rounded-lg shadow-xl border dark:border-gray-800 z-50 overflow-hidden opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200'>
      <div className='p-3 border-b dark:border-gray-800'>
        <p className='font-semibold text-sm'>Tu carrito ({items.length})</p>
      </div>

      <ul className='max-h-64 overflow-y-auto divide-y dark:divide-gray-800'>
        {items.map(item => (
          <li key={`${item.id}-${item.size}`} className='flex items-center gap-3 p-3'>
            {item.imageUrl && (
              <div className='w-12 h-12 relative rounded overflow-hidden flex-shrink-0'>
                <Image
                  src={item.imageUrl}
                  alt={item.name}
                  fill
                  className='object-cover'
                  sizes='48px'
                />
              </div>
            )}
            <div className='flex-1 min-w-0'>
              <p className='text-sm font-medium truncate'>{item.name}</p>
              {item.size && (
                <p className='text-xs text-gray-500'>Talla {item.size}</p>
              )}
              <p className='text-xs text-gray-500'>x{item.quantity}</p>
            </div>
            <span className='text-sm font-semibold whitespace-nowrap'>
              €{(item.price * item.quantity).toFixed(2)}
            </span>
          </li>
        ))}
      </ul>

      <div className='p-3 border-t dark:border-gray-800 bg-gray-50 dark:bg-gray-800/50'>
        <div className='flex justify-between items-center mb-3'>
          <span className='text-sm font-medium'>Total</span>
          <span className='font-bold'>€{total.toFixed(2)}</span>
        </div>
        <Link
          href='/checkout'
          className='block w-full text-center py-2 px-4 rounded-md bg-gray-900 dark:bg-white text-white dark:text-gray-900 text-sm font-semibold hover:opacity-90 transition'
        >
          Ver carrito
        </Link>
      </div>
    </div>
  );
};

export default CartDropdown;
