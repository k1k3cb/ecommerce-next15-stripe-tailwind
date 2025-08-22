'use client';

import { useCartStore } from '@/store/cart-store';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

const SuccessPage = () => {
  const { clearCart } = useCartStore();

  useEffect(() => {
    // Limpiar carrito tras el pago
    clearCart();
  }, [clearCart]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[70vh] text-center px-4'>
      
      <CheckCircle2 className='w-20 h-20 text-green-500 mb-6 animate-bounce' />

      <h1 className='text-3xl font-bold text-gray-900'>
        Payment Successful 🎉
      </h1>
      <p className='mt-2 text-gray-600 max-w-md'>
        Thank you for your purchase! Your order is being processed and you will
        receive a confirmation email shortly.
      </p>

      
      <div className='mt-8 space-y-4 w-full max-w-sm'>
        <Link
          href='/products'
          className='block w-full py-3 rounded-xl font-semibold 
                     bg-gradient-to-r from-gray-900 via-black to-gray-800 
                     text-white shadow-md hover:opacity-90 
                     transition-all duration-300'
        >
          Continue Shopping
        </Link>

        <Link
          href='/'
          className='block w-full py-3 rounded-xl font-semibold 
                     border border-gray-800 text-gray-900 hover:bg-gray-100 
                     transition-all duration-300'
        >
          Back to Home
        </Link>
      </div>
    </div>
  );
};

export default SuccessPage;
