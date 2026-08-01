'use client';

import { Button } from '@/components/ui/button';
import { PackageX, RefreshCw } from 'lucide-react';
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
      <div className='w-16 h-16 rounded-full bg-orange-100 dark:bg-orange-900/20 flex items-center justify-center mb-6'>
        <PackageX className='w-8 h-8 text-orange-600 dark:text-orange-400' />
      </div>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
        No pudimos cargar los productos
      </h2>
      <p className='text-gray-500 dark:text-gray-400 mb-6 max-w-md'>
        Parece que hubo un problema al conectar con el catálogo. Intenta de
        nuevo o vuelve al inicio.
      </p>
      <div className='flex gap-3'>
        <Button onClick={reset} variant='default' className='flex items-center gap-2'>
          <RefreshCw size={16} />
          Reintentar
        </Button>
        <Button asChild variant='outline'>
          <Link href='/'>Ir al inicio</Link>
        </Button>
      </div>
    </div>
  );
}
