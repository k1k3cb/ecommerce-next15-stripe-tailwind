import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='space-y-6'>
      {/* Título y breadcrumb */}
      <div className='space-y-3'>
        <Skeleton className='h-4 w-48' />
        <Skeleton className='h-10 w-64' />
      </div>

      {/* Grid de productos */}
      <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6'>
        {Array.from({ length: 8 }).map((_, i) => (
          <div key={i} className='space-y-3 rounded-2xl overflow-hidden border dark:border-gray-800'>
            <Skeleton className='h-56 w-full rounded-none' />
            <div className='p-4 space-y-3'>
              <Skeleton className='h-5 w-3/4' />
              <Skeleton className='h-4 w-full' />
              <Skeleton className='h-4 w-2/3' />
              <Skeleton className='h-6 w-24' />
              <Skeleton className='h-10 w-full rounded-md' />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
