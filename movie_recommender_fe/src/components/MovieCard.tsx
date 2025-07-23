import { buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from "@/components/ui/card";
import type { TMovie } from "@/types/movie.types";
import type { ReactNode } from "react";
import { Play, Star } from 'lucide-react';
import { Link } from 'react-router-dom';

type TMovieCardProps = {
    movie: TMovie
    isNumbered?: boolean
    index?: number
    children?: ReactNode
}

function MovieCard( {movie, isNumbered = false, index = 0, children } : TMovieCardProps ) {
  return (
    <Card className='group cursor-auto transition-all hover:scale-105 hover:shadow-lg p-0'>
      <CardContent className='p-0'>
        <div className='relative overflow-hidden rounded-lg'>
          {isNumbered && (
            <div className='absolute top-2 left-2 z-10
              bg-secondary text-secondary-foreground 
              rounded-full w-8 h-8 
              flex items-center justify-center 
              text-sm font-bold'
            >
              {index + 1}
            </div>
          )}
          <img
            src={movie.poster_path || '/placeholder.svg'}
            alt={movie.title}
            className='w-full h-fit object-cover transition-transform group-hover:scale-110'
          />
          <div className='bg-black/60
            absolute inset-0 
            opacity-0 group-hover:opacity-100 transition-opacity 
            flex items-center justify-center'
          >
            <Link 
              to={`/movie/${movie.imdb_id}`} 
              className={buttonVariants({variant: 'secondary'})}
            >
              <Play className='h-4 w-4 mr-1' />
              View Details
            </Link>
          </div>
        </div>
        <div className='p-4 space-y-2'>
          <h4 className='font-semibold leading-tight'>{movie.title}</h4>
          <div className='flex items-center justify-between text-sm text-muted-foreground'>
            <span>{movie.release_year}</span>
            <div className='flex items-center space-x-1'>
              <Star className='h-3 w-3 fill-yellow-400 text-yellow-400' />
              <span>{movie.rating}</span>
            </div>
          </div>
          {children}
        </div>
      </CardContent>
    </Card>
  )
}

export default MovieCard;