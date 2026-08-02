'use client';

import { useCartStore } from '@/store/cart-store';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    clearCart();
  }, [clearCart]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
      <CheckCircle2 className='w-20 h-20 text-green-500 mb-6 animate-bounce' />

      <h1 className='text-3xl font-bold text-gray-900 dark:text-white'>
        Pago realizado con exito
      </h1>
      <p className='mt-2 text-gray-600 dark:text-gray-400 max-w-md'>
        Gracias por tu compra. Tu pedido esta en proceso y recibiras un email
        de confirmacion en breve.
      </p>

      <div className='mt-8 space-y-4 w-full max-w-sm'>
        <Link
          href='/products'
          className='block w-full py-3 rounded-xl font-semibold 
                     bg-gray-900 dark:bg-white
                     dark:text-gray-900
                     text-white shadow-md hover:opacity-90 
                     transition-all duration-300'
        >
          Seguir comprando
        </Link>

        <Link
          href='/'
          className='block w-full py-3 rounded-xl font-semibold 
                     border border-gray-800 dark:border-gray-300 text-gray-900 dark:text-white hover:bg-gray-100 dark:hover:bg-gray-800
                     transition-all duration-300'
        >
          Volver al inicio
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
