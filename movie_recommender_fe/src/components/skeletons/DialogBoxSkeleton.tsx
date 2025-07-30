import { Skeleton } from '@/components/ui/skeleton'

export function PersonalInfoSkeleton() {
  return (
    <div className='space-y-2 mt-3'>
      <Skeleton className='h-5 w-30 rounded-lg' />
      <Skeleton className='h-5 w-40 rounded-lg' />
    </div>
  )
}

export function BiographySkeleton() {
  return (
    <div className='space-y-2'>
      <Skeleton className='h-6 w-18 rounded-lg mb-4' />
      <Skeleton className='h-4 w-65 md:w-100 lg:w-110 rounded-lg' />
      <Skeleton className='h-4 w-65 md:w-100 lg:w-110 rounded-lg' />
      <Skeleton className='h-4 w-65 md:w-100 lg:w-110 rounded-lg' />
      <Skeleton className='h-4 w-65 md:w-100 lg:w-110 rounded-lg' />
      <Skeleton className='h-4 w-65 md:w-100 lg:w-110 rounded-lg' />
    </div>
  )
}