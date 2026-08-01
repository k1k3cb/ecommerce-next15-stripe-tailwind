import { Button } from '@/components/ui/button';
import { ArrowLeft, Home } from 'lucide-react';
import Link from 'next/link';

export default function NotFound() {
  return (
    <div className='min-h-[80vh] flex flex-col items-center justify-center px-4 text-center relative overflow-hidden'>
      {/* Fondo decorativo */}
      <div className='absolute inset-0 -z-10'>
        <div className='absolute top-1/4 left-1/4 w-64 h-64 bg-primary/5 rounded-full blur-3xl' />
        <div className='absolute bottom-1/4 right-1/4 w-96 h-96 bg-primary/3 rounded-full blur-3xl' />
      </div>

      {/* Contenido principal */}
      <div className='space-y-8 max-w-lg'>
        {/* 404 con estilo sneaker */}
        <div className='relative'>
          <h1 className='text-[10rem] sm:text-[12rem] font-black leading-none text-gray-100 dark:text-gray-900 select-none'>
            404
          </h1>
          <div className='absolute inset-0 flex items-center justify-center'>
            <span className='text-6xl sm:text-7xl font-black text-primary tracking-tighter'>
              404
            </span>
          </div>
        </div>

        {/* Mensaje */}
        <div className='space-y-3'>
          <h2 className='text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white'>
            Este par se perdió
          </h2>
          <p className='text-gray-500 dark:text-gray-400 text-lg max-w-md mx-auto'>
            La página que buscas no está en nuestro inventario. Puede que el
            enlace esté roto o que el producto ya no exista.
          </p>
        </div>

        {/* Acciones */}
        <div className='flex flex-col sm:flex-row items-center justify-center gap-4 pt-4'>
          <Button asChild size='lg' className='px-6'>
            <Link href='/' className='flex items-center gap-2'>
              <Home size={18} />
              Ir al inicio
            </Link>
          </Button>
          <Button asChild variant='outline' size='lg' className='px-6'>
            <Link href='/products' className='flex items-center gap-2'>
              <ArrowLeft size={18} />
              Ver productos
            </Link>
          </Button>
        </div>
      </div>
    </div>
  );
}
