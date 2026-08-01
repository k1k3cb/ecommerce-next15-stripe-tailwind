import { Skeleton } from '@/components/ui/skeleton';

export default function Loading() {
  return (
    <div className='space-y-6'>
      <Skeleton className='h-8 w-48' />

      <div className='max-w-2xl mx-auto space-y-6'>
        {/* Card del resumen */}
        <div className='border dark:border-gray-800 rounded-lg p-6 space-y-6'>
          <Skeleton className='h-6 w-40' />

          {/* Items */}
          {Array.from({ length: 3 }).map((_, i) => (
            <div key={i} className='flex items-center gap-4'>
              <Skeleton className='w-16 h-16 rounded-lg' />
              <div className='flex-1 space-y-2'>
                <div className='flex justify-between'>
                  <Skeleton className='h-5 w-32' />
                  <Skeleton className='h-5 w-16' />
                </div>
                <div className='flex items-center gap-4'>
                  <Skeleton className='h-10 w-10 rounded-md' />
                  <Skeleton className='h-6 w-6' />
                  <Skeleton className='h-10 w-10 rounded-md' />
                </div>
              </div>
            </div>
          ))}

          {/* Total */}
          <div className='border-t dark:border-gray-800 pt-4'>
            <div className='flex justify-between'>
              <Skeleton className='h-6 w-16' />
              <Skeleton className='h-6 w-20' />
            </div>
          </div>
        </div>

        {/* Botones */}
        <Skeleton className='h-14 w-full rounded-md' />
        <Skeleton className='h-14 w-full rounded-md' />
      </div>
    </div>
  );
}
