import { Skeleton } from '@/components/ui/skeleton';

function MovieSkeleton() {
  return (
    <>
      <section className='relative'>
        <div className='container mx-auto px-4 py-12'>
          <div className='grid md:grid-cols-2 gap-8 items-center'>
            <div className='space-y-6'>

              {/* Film Description Skeleton */}
              <div className='space-y-2'>
                <Skeleton className='h-5 w-10' />
                <Skeleton className='h-12 w-60 md:w-80' />
                <div className='flex items-center space-x-4'>
                  <Skeleton className='h-5 w-12' />
                  <Skeleton className='h-5 w-20' />
                </div>
              </div>
              <div className='space-y-3'>              
                <Skeleton className='h-5 w-72 md:w-90 lg:w-180 ' />
                <Skeleton className='h-5 w-72 md:w-90 lg:w-180 ' />
                <Skeleton className='h-5 w-72 md:w-90 lg:w-180' />
                <Skeleton className='h-5 w-72 md:w-90 lg:w-180' />
              </div>

              {/* Film Director and Cast Skeleton */}
              <div className='space-y-4'>
                <div className='space-y-2'>
                  <Skeleton className='h-5 w-12' />
                  <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                      <div className='flex flex-col items-center space-y-1'>
                        <Skeleton className='h-20 w-20 rounded-full' />
                        <Skeleton className='h-3 w-18' /> 
                      </div>
                  </div>
                </div>
                <div>
                  <Skeleton className='h-5 w-10' />
                  <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-3'>
                    {Array.from({length: 6}).map((_, index) => (
                      <div key={index} className='flex flex-col items-center space-y-1'>
                        <Skeleton className='h-20 w-20 rounded-full' />
                        <Skeleton className='h-3 w-18' />
                        <Skeleton className='h-2 w-15' />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              
              {/* Actions Button Skeleton */}
              <div className='flex space-x-4'>
                <Skeleton className='h-10 w-34 md:w-38' />
                <Skeleton className='h-10 w-34 md:w-38' />
              </div>

            </div>
            
            {/* Movie Poster Skeleton */}
            <div className='flex justify-center'>
              <Skeleton className='h-150 w-70 md:w-95' />
            </div>
          </div>
        </div>
      </section>
    </>
  )
}

export default MovieSkeleton;