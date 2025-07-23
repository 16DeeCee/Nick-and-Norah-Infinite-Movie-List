import { 
  Carousel, 
  CarouselContent, 
  CarouselItem, 
  CarouselNext, 
  CarouselPrevious 
} from '@/components/ui/carousel';
import MovieCard from './MovieCard';

import type { TMovie } from '@/types/movie.types';


type TMovieCarouselProps = { 
  description: string, 
  isNumbered?: boolean, 
  movieList: TMovie[],
}

function MovieCarousel ({ description, isNumbered = false, movieList }: TMovieCarouselProps) {
  return (
    <Carousel
      opts={{
        align: 'start',
        loop: false,
      }}
      className='w-full overflow-visible'
    >
      <div className='flex items-center justify-between space-x-4 mb-4'>
        <h3 className='text-2xl font-bold'>{description}</h3>
        <div className='relative flex items-center space-x-2'>
          <CarouselPrevious className='static translate-y-0 rounded-md' />
          <CarouselNext className='static translate-y-0 rounded-md' />
        </div>
      </div>
      <CarouselContent className='pt-3 pb-8'>
        {movieList.map((movie: TMovie, index: number) => (
          <CarouselItem key={movie.imdb_id} className='sm:basis-1/2 md:basis-1/3 lg:basis-1/5'>
            <MovieCard movie={movie} isNumbered={isNumbered} index={index} />
          </CarouselItem>
        ))}
      </CarouselContent>
    </Carousel>
  )
}

export default MovieCarousel;