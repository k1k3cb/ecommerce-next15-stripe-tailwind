'use client';

import { Button } from '@/components/ui/button';
import { ShoppingBag, RefreshCw, ArrowLeft } from 'lucide-react';
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
      <div className='w-16 h-16 rounded-full bg-red-100 dark:bg-red-900/20 flex items-center justify-center mb-6'>
        <ShoppingBag className='w-8 h-8 text-red-600 dark:text-red-400' />
      </div>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
        Producto no encontrado
      </h2>
      <p className='text-gray-500 dark:text-gray-400 mb-6 max-w-md'>
        No pudimos cargar este producto. Puede que ya no esté disponible o que
        el enlace sea incorrecto.
      </p>
      <div className='flex gap-3'>
        <Button onClick={reset} variant='default' className='flex items-center gap-2'>
          <RefreshCw size={16} />
          Reintentar
        </Button>
        <Button asChild variant='outline' className='flex items-center gap-2'>
          <Link href='/products'>
            <ArrowLeft size={16} />
            Volver a productos
          </Link>
        </Button>
      </div>
    </div>
  );
}
