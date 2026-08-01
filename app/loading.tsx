import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='space-y-8'>
      {/* Hero skeleton */}
      <div className='py-16 lg:py-24 space-y-6'>
        <Skeleton className='h-12 w-3/4 max-w-lg' />
        <Skeleton className='h-6 w-full max-w-md' />
        <Skeleton className='h-6 w-2/3 max-w-sm' />
        <div className='flex gap-4 pt-4'>
          <Skeleton className='h-12 w-40 rounded-full' />
          <Skeleton className='h-12 w-36 rounded-full' />
        </div>
      </div>

      {/* Carousel skeleton */}
      <div className='py-16 space-y-6'>
        <div className='text-center space-y-3'>
          <Skeleton className='h-8 w-64 mx-auto' />
          <Skeleton className='h-5 w-96 mx-auto' />
        </div>
        <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 pt-10'>
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className='space-y-3'>
              <Skeleton className='h-56 w-full rounded-2xl' />
              <Skeleton className='h-5 w-3/4' />
              <Skeleton className='h-4 w-1/2' />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
