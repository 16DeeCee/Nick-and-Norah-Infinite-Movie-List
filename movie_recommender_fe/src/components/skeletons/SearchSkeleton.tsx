import { Skeleton } from '@/components/ui/skeleton';

function SearchSkeleton() {
  return (
    <>
      <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
        <div className='space-y-1'>
          <Skeleton className='h-7 w-65 mt-1' />
          <Skeleton className='h-5 w-30' />
        </div>
        <div className='space-x-2 flex'>
          <Skeleton className='h-9 w-9 rounded-lg' />
          <Skeleton className='h-9 w-9 rounded-lg' />
        </div>
      </div>

      <div className='flex flex-wrap items-center gap-4 p-4 bg-muted/20 rounded-lg'>
        <Skeleton className='h-6 w-17' />
        <Skeleton className='h-10 w-40 rounded-lg' />
        <Skeleton className='h-10 w-40 rounded-lg' />
        <Skeleton className='h-10 w-40 rounded-lg' />
      </div>

      <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
        {Array.from({length: 5}).map((_, index) => (
          <div key={index} className='flex flex-col items-center space-y-1'>
            <Skeleton className='h-78 w-34 md:h-113 md:w-57 rounded-lg' />
          </div>
        ))}
      </div>
    </>
  )
}

export default SearchSkeleton;