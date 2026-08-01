import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='space-y-8 max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6'>
      {/* Breadcrumb */}
      <div className='flex items-center gap-2'>
        <Skeleton className='h-4 w-16' />
        <Skeleton className='h-4 w-1' />
        <Skeleton className='h-4 w-20' />
        <Skeleton className='h-4 w-1' />
        <Skeleton className='h-4 w-32' />
      </div>

      {/* Botón volver */}
      <Skeleton className='h-10 w-44 rounded-md' />

      {/* Detalle del producto */}
      <div className='flex flex-col md:flex-row gap-8 lg:gap-16 items-start'>
        {/* Imagen */}
        <Skeleton className='w-full md:w-1/2 h-96 rounded-xl' />

        {/* Info */}
        <div className='w-full md:w-1/2 p-4 space-y-4'>
          <Skeleton className='h-10 w-3/4' />
          <Skeleton className='h-5 w-full' />
          <Skeleton className='h-5 w-2/3' />
          <Skeleton className='h-8 w-32 mt-4' />

          {/* Tallas */}
          <div className='mt-6 space-y-2'>
            <Skeleton className='h-4 w-12' />
            <div className='flex gap-2'>
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className='h-10 w-14 rounded-md' />
              ))}
            </div>
          </div>

          {/* Controles */}
          <div className='flex items-center gap-4 mt-8'>
            <Skeleton className='h-12 w-12 rounded-md' />
            <Skeleton className='h-8 w-8' />
            <Skeleton className='h-12 w-12 rounded-md' />
          </div>
        </div>
      </div>
    </div>
  );
}
