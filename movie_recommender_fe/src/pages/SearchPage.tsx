import { api } from '@/lib/axios';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ErrorText from '@/components/ErrorText';
import { Filter, Grid, List, Star, Play } from 'lucide-react';
import MovieCard from '@/components/MovieCard';
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue, 
 } from '@/components/ui/select';
import { useEffect, useState } from 'react';

import { Link, useSearchParams } from 'react-router-dom';

import type { ComponentProps } from 'react';
import type { TMovieDesc } from '@/types/movie.types';


type SelectProps = ComponentProps<typeof Select>
type TString = string


function generateYear(from = 1960): string[] {
  const currentYear = new Date().getFullYear()
  const years = []

  years.push('All Years')

  for (let year = currentYear; year >= from; year--) {
    years.push(year.toString())
  }

  return years
}

const yearItems = generateYear()

const genreItems = [
  'All Genres',
  'Action',
  'Adventure',
  'Animation',
  'Biography',
  'Comedy',
  'Crime',
  'Drama',
  'Fantasy',
  'Science Fiction',
  'Horror',
  'Thriller',
]

const sortItems = [
  'Relevance',
  'Rating',
  'Year',
  'Title'
]

const SelectButton = ({items, ...props} : {items: string[]} & SelectProps) => {
  return (
    <Select {...props}>
      <SelectTrigger className='w-40'>
        <SelectValue placeholder='Genre' />
      </SelectTrigger>
      <SelectContent>
        {items.map((item) => (
          <SelectItem key={item} value={item}>{item}</SelectItem>
        ))}
      </SelectContent>
    </Select>
  )
}

const GridResults = ({ movieResults } : { movieResults: TMovieDesc[] }) => {
  return (
    <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6'>
      {movieResults.map((movie: TMovieDesc) =>(
        <MovieCard movie={movie}>
          <div className='flex flex-wrap gap-1'>
            {movie.genres.slice(0, 2).map((genre: string) => (
              <Badge key={genre} variant='secondary' className='text-xs'>{genre}</Badge>
            ))}
          </div>
        </MovieCard>
      ))}
    </div>
  )
}

const ListResults = ({ movieResults } : { movieResults: TMovieDesc[] }) => {
  return (
    <div className='space-y-4'>
      {movieResults.map((movie: TMovieDesc) =>(
        <Card key={movie.imdb_id} className='group cursor-auto transition-all hover:shadow-lg'>
          <CardContent className='p-0'>
            <div className='flex gap-4 p-4'>
              <div className='flex-shrink-0'>
                <img 
                  src={movie.poster_path || '/placeholder.svg'} 
                  alt={movie.title}
                  className='w-24 h-36 object-cover rounded-lg'
                />
              </div>
              <div className='flex-1 space-y-2'>
                <div className='flex items-start justify-between'>
                  <div>
                    <h4 className='font-semibold text-lg'>{movie.title}</h4>
                    <p className='text-sm text-muted-foreground'>{movie.release_year}</p>
                  </div>
                  <div className='flex items-center space-x-1'>
                    <Star className='h-4 w-4 fill-yellow-400 text-yellow-400' />
                    <span className='font-medium'>{movie.rating}</span>
                  </div>
                </div>
                <div className='flex flex-wrap gap-1'>
                  {movie.genres.map((genre: string) => (
                    <Badge key={genre} variant='outline' className='text-xs'>{genre}</Badge>
                  ))}
                </div>
                <p className='text-sm text-muted-foreground line-clamp-2'>{movie.overview}</p>
                <Link 
                  to={`/movie/${movie.imdb_id}`} 
                  className={buttonVariants({variant: 'secondary'})}
                >
                  <Play className='h-4 w-4 mr-1' />
                  View Details
                </Link>
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}


function SearchPage() {
  // const [ searchResults, setSearchResults ] = useState<TMovie[] | []>([])
  const [ searchResults, setSearchResults ] = useState<TMovieDesc[] | []>([]);
  const [ sortByFilter, setSortByFilter ] = useState<TString | 'Relevance'>('Relevance');
  const [ genreFilter, setGenreFilter ] = useState<TString | 'All Genres'>('All Genres');
  const [ yearFilter, setYearFilter ] = useState<TString | 'All Years'>('All Years');
  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('grid');

  const [ searchParams ] = useSearchParams();
  const query = searchParams.get('q');

  useEffect(() => {
    if (!query || query.length < 3 ) return;

    api.get(`/search?query=${encodeURIComponent(query)}`)
    .then(res => {
      setSearchResults(res.data)
      console.log(res.data)
    })
    .catch(err => console.log(err))

  }, [query])

  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='space-y-6'>

        {/* Search Header */}
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <h2 className='text-2xl font-bold'>Search Results for {query}</h2>
            <p>{searchResults.length} {searchResults.length <= 1 ? 'movie' : 'movies'} found</p> 
          </div>
          <div className='space-x-2'>
            <Button variant={viewMode === 'grid' ? 'default' : 'outline'} size='sm' onClick={() => setViewMode('grid')}>
              <Grid className='h-4 w-4' />
            </Button>
            <Button variant={viewMode === 'list' ? 'default' : 'outline'} size='sm' onClick={() => setViewMode('list')}>
              <List className='h4 w-4' />
            </Button>
          </div>
        </div>

        {/* Search Filter */}
        <div className='flex flex-wrap gap-4 p-4 bg-muted/20 rounded-lg'>
          <div className='flex items-center space-x-2'>
            <Filter className='h-4 w-4' />
            <span className='text-sm font-medium'>Filters:</span>
          </div>
          {<SelectButton items={sortItems} value={sortByFilter} onValueChange={setSortByFilter} />}
          {<SelectButton items={genreItems} value={genreFilter} onValueChange={setGenreFilter} />}
          {<SelectButton items={yearItems} value={yearFilter} onValueChange={setYearFilter} />}
        
          {(sortByFilter !== 'Relevance' || genreFilter !== 'All Genres' || yearFilter !== 'All Years') && (
            <Button 
              variant='outline'
              size='sm'
              onClick={() => {
                setSortByFilter('Relevance')
                setGenreFilter('All Genres')
                setYearFilter('All Years')
              }}
            >
              Clear Filters
            </Button>
          )}
        </div>

        {/* Search Results */}
        {searchResults.length === 0 ? (
          <ErrorText primaryText='No movies found' secondaryText='Try adjusting your search terms or filters' /> 
        ) : (
          viewMode === 'grid' ? (
            <GridResults movieResults={searchResults} />
          ) : (
            <ListResults movieResults={searchResults} />
          )
        )}
      </div>
    </div>
  )
}

export default SearchPage;