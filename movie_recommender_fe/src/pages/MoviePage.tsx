import { api } from '@/lib/axios';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Heart, Play, Star } from 'lucide-react';
import MovieCarousel from '@/components/MovieCarousel';
import { Separator } from '@/components/ui/separator';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import type { TPerson, TMovieDetails } from '../types/movie.types';
import ArtistDialogBox from '@/components/ArtistDialogBox';


const DisplayGenre = ({ genres } : { genres: string[] }) => {
  return (
    <>
      {genres.map((genre) => (
        <Badge key={genre} variant='outline'>
          {genre}
        </Badge>
      ))}
    </>
  )
}


const ImageAvatar = ({ person } : { person: TPerson }) => {
  return (
    <>
      <Avatar className='w-20 h-20 mx-auto mb-2 group-hover:scale-105 transition-transform'>
        <AvatarImage src={person.profile_path || '/placeholder.svg'} alt={person.name} />
        <AvatarFallback>{person.name.split(' ').map((n) => n[0]).join('')}</AvatarFallback>
      </Avatar>
      <div className='text-center'>
        <p className='font-semibold text-sm group-hover:text-primary transition-colors'>
          {person.name}
        </p>
        {person.character && (
          <p className='text-xs text-muted-foreground'>{person.character}</p>
        )}
      </div>
    </>
  )
}


const CrewAvatars = ({ crew } : { crew: TPerson[] }) => {
  return (
    <>
      {crew.map((cast: TPerson) => (
        <ArtistDialogBox key={cast.id} crew={cast}>
          <div className='cursor-pointer group'>
            <ImageAvatar person={cast} />
          </div>
        </ArtistDialogBox>
      ))}
    </>
  )
}


function MoviePage() {
  const { movieId } = useParams();
  const [ movieDetails, setMovieDetails ] = useState<TMovieDetails | null>(null)

  useEffect(() => {
    if (!movieId) return;
    
    api.get(`/movie/${movieId}`)
    .then(res => {
      if (res.data) setMovieDetails(res.data)
    })
    .catch(err => console.log(err))

    window.scrollTo(0, 0)
    
  }, [movieId])

  return (
    <>
      <section className='relative'>
        <div className='container mx-auto px-4 py-12'>
          { movieDetails && (
            <div className='grid md:grid-cols-2 gap-8 items-center'>
              <div className='space-y-6'>

                {/* Film Description Section */}
                <div className='space-y-2'>
                  <Badge variant='secondary'>{movieDetails.movie.release_year}</Badge>
                  <h2 className='text-4xl font-bold'>{movieDetails.movie.title}</h2>
                  <div className='flex items-center space-x-4'>
                      <div className='flex items-center space-x-1'>
                        <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                        <span className='font-medium'>{movieDetails.movie.rating.toFixed(2)}</span>
                      </div>
                      <div className='flex space-x-2'>
                        <DisplayGenre genres={movieDetails.movie.genres} />
                      </div>
                  </div>
                </div>
                <p className='text-muted-foreground text-lg leading-relaxed'>
                  {movieDetails.movie.overview}
                </p>

                {/* Film Director and Cast Section*/}
                <div className='space-y-4'>
                  <div>
                    <h4 className='font-semibold text-sm text-muted-foreground mb-2'>DIRECTOR</h4>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                    <CrewAvatars crew={movieDetails.director} />
                    </div>
                  </div>
                  <div>
                    <h4 className='font-semibold text-sm text-muted-foreground mb-3'>CAST</h4>
                    <div className='grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4'>
                      <CrewAvatars crew={movieDetails.cast} />
                    </div>
                  </div>
                </div>

                {/* Actions Button Section */}
                <div className='flex space-x-4'>
                  <Button size='lg' className='space-x-2'>
                    <Play className='h-4 w-4' />
                    <span>Watch Trailer</span>
                  </Button>
                  <Button variant='outline' size='lg' className='space-x-2'>
                    <Heart className='h-4 w-4' />
                    <span>Add to List</span>
                  </Button>
                </div>

              </div>
              <div className='flex justify-center'>
                <Card className='overflow-hidden py-0'>
                  <img
                    src={movieDetails.movie.poster_path || '/placeholder.svg'}
                    alt={movieDetails.movie.title}
                    className='w-full max-w-sm h-fit aspect-2/3 object-cover'
                  />
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Separator />
      
      {/* Recommendation Section */}
      {movieDetails && (
        <div className='container mx-auto px-4 py-12'>
          <MovieCarousel 
            description='More Like This'
            movieList={movieDetails.recommendations}
          />
        </div>
      )}
    </>
  )
}

export default MoviePage;