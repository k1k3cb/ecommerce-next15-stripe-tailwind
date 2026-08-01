'use client';

import { Button } from '@/components/ui/button';
import { CreditCard, RefreshCw, ShoppingCart } from 'lucide-react';
import Link from 'next/link';
import { useEffect } from 'react';

export default function Error({
  error,
  reset
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className='flex flex-col items-center justify-center min-h-[60vh] text-center px-4'>
      <div className='w-16 h-16 rounded-full bg-yellow-100 dark:bg-yellow-900/20 flex items-center justify-center mb-6'>
        <CreditCard className='w-8 h-8 text-yellow-600 dark:text-yellow-400' />
      </div>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
        Error en el checkout
      </h2>
      <p className='text-gray-500 dark:text-gray-400 mb-6 max-w-md'>
        Hubo un problema al procesar tu carrito. Tus artículos siguen guardados,
        puedes intentarlo de nuevo.
      </p>
      <div className='flex gap-3'>
        <Button onClick={reset} variant='default' className='flex items-center gap-2'>
          <RefreshCw size={16} />
          Reintentar
        </Button>
        <Button asChild variant='outline' className='flex items-center gap-2'>
          <Link href='/products'>
            <ShoppingCart size={16} />
            Seguir comprando
          </Link>
        </Button>
      </div>
    </div>
  );
}
