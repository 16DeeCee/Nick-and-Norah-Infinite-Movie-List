import { api } from '@/lib/axios';
import { Badge } from '@/components/ui/badge';
import { Button, buttonVariants } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import ErrorText from '@/components/ErrorText';
import { Filter, Grid, List, Star, Play } from 'lucide-react';
import { Link, useSearchParams } from 'react-router-dom';
import MovieCard from '@/components/MovieCard';
import { 
  Select, 
  SelectContent, 
  SelectItem,
  SelectTrigger, 
  SelectValue, 
 } from '@/components/ui/select';
import { useEffect, useMemo, useReducer, useState } from 'react';

import type { ComponentProps } from 'react';
import type { TMovieDesc } from '@/types/movie.types';
import SearchSkeleton from '@/components/skeletons/SearchSkeleton';


type SelectProps = ComponentProps<typeof Select>


function generateYear(from = 1921): string[] {
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
                    <span className='font-medium'>{movie.rating.toFixed(2)}</span>
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

type TDefaultFilters = {
  sortByFilter: string, 
  genreFilter: string, 
  yearFilter: string
}

const defaultFilters : TDefaultFilters = {
  sortByFilter: 'Relevance',
  genreFilter: 'All Genres',
  yearFilter: 'All Years'
};

function filterReducer(state: TDefaultFilters, action: { type: string, [key: string]: string }) {
  switch (action.type) {
    case 'set_sortby_filter': {
      return {
        ...state,
        sortByFilter: action.sortByFilter
      };
    }
    case 'set_genre_filter': {
      return {
        ...state,
        genreFilter: action.genreFilter
      };
    }
    case 'set_year_filter': {
      return {
        ...state,
        yearFilter: action.yearFilter
      };
    }
    case 'reset_filters':{
      return defaultFilters;
    }
  }
  throw Error('Unknown Action: ' + action.type);
}

function SearchPage() {
  const [ searchResults, setSearchResults ] = useState<TMovieDesc[] | []>([]);
  const [ isLoading, setIsLoading ] = useState<boolean>(true)
  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('grid');
  const [ filterState, dispatch ] = useReducer(filterReducer, defaultFilters);

  const [ searchParams ] = useSearchParams();
  console.log('rendering...')
  const query = searchParams.get('q');

  const filteredResults = useMemo(() => {
    let results = [...searchResults]
    
    switch (filterState.sortByFilter) {
      case 'Rating':
        results.sort((a, b) => b.rating - a.rating)
        break;
      case 'Year':
        results.sort((a, b) => b.release_year - a.release_year)
        break;
      case 'Title':
        results.sort((a, b) => a.title.localeCompare(b.title))
        break;
      default:
        break;
    };

    if (filterState.genreFilter !== 'All Genres') {
      results = results.filter((movie) => movie.genres.some((g) => g.toLowerCase() === filterState.genreFilter.toLowerCase()))
    };

    if (filterState.yearFilter !== 'All Years') {
      results = results.filter((movie) => movie.release_year === +filterState.yearFilter)
    };

    return results

  }, [searchResults, filterState])

  function handleFilterChange(value: { [key: string]: string }, action: string) {
    console.log(value)
    dispatch({
      type: action,
      ...value, 
    })
  }

  useEffect(() => {
    if (!query || query.length < 3 ) return;

    api.get(`/search?query=${encodeURIComponent(query)}`)
    .then(res => {
      setSearchResults(res.data);
      // setFilteredResults(res.data);
    })
    .catch(err => console.log(err))
    .finally(() => setIsLoading);


  }, [query])



  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        {!filteredResults ? (
          <SearchSkeleton />
        ) : (
          <>
            {/* Search Header */}
            <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl font-bold'>Search Results for {query}</h2>
                <p>{filteredResults.length} {filteredResults.length <= 1 ? 'movie' : 'movies'} found</p> 
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
              {<SelectButton items={sortItems} value={filterState.sortByFilter} onValueChange={e => handleFilterChange({sortByFilter: e}, 'set_sortby_filter')} />}
              {<SelectButton items={genreItems} value={filterState.genreFilter} onValueChange={e => handleFilterChange({genreFilter: e}, 'set_genre_filter')} />}
              {<SelectButton items={yearItems} value={filterState.yearFilter} onValueChange={e => handleFilterChange({yearFilter: e}, 'set_year_filter')} />}
            
              {(filterState.sortByFilter !== 'Relevance' || filterState.genreFilter !== 'All Genres' || filterState.yearFilter !== 'All Years') && (
                <Button 
                  variant='outline'
                  size='sm'
                  onClick={() => {
                    dispatch({type: 'reset_filters'})
                  }}
                >
                  Clear Filters
                </Button>
              )}
            </div>

            {/* Search Results */}
            {!isLoading && filteredResults.length === 0 ? (
              <ErrorText primaryText='No movies found' secondaryText='Try adjusting your search terms or filters' /> 
            ) : (
              viewMode === 'grid' ? (
                <GridResults movieResults={filteredResults} />
              ) : (
                <ListResults movieResults={filteredResults} />
            ))}
          </>
        )}
      </div>
    </div>
  )
}

export default SearchPage;