'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';
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
        <AlertTriangle className='w-8 h-8 text-red-600 dark:text-red-400' />
      </div>
      <h2 className='text-2xl font-bold text-gray-900 dark:text-white mb-2'>
        Algo salió mal
      </h2>
      <p className='text-gray-500 dark:text-gray-400 mb-6 max-w-md'>
        Ha ocurrido un error inesperado. Puedes intentar recargar la página o
        volver al inicio.
      </p>
      <div className='flex gap-3'>
        <Button onClick={reset} variant='default' className='flex items-center gap-2'>
          <RefreshCw size={16} />
          Intentar de nuevo
        </Button>
        <Button
          onClick={() => (window.location.href = '/')}
          variant='outline'
        >
          Ir al inicio
        </Button>
      </div>
    </div>
  );
}
