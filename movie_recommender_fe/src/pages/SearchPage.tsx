import { Button } from '@/components/ui/button';
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from '@/components/ui/select';
import type { TMovie } from '@/types/movie.types';
import { Filter, Grid, List } from 'lucide-react';
import { useState } from 'react';
import type { ComponentProps } from 'react';


type TString = string
// type TDefaultFilters = string | 'Relevance' | 'All Years' | 'All Genres'
type SelectProps = ComponentProps<typeof Select>

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

function SearchPage() {
  const [ searchResults, setSearchResults ] = useState<TMovie[] | []>([])
  const [ sortByFilter, setSortByFilter ] = useState<TString | 'Relevance'>('Relevance')
  const [ genreFilter, setGenreFilter ] = useState<TString | 'All Genres'>('All Genres')
  const [ yearFilter, setYearFilter ] = useState<TString | 'All Years'>('All Years')
  const [ viewMode, setViewMode ] = useState<'grid' | 'list'>('grid')
  return (
    <div className='container mx-auto px-4 py-8'>
      <div className='space-y-6'>
        <div className='flex flex-col md:flex-row md:items-center justify-between gap-4'>
          <div>
            <h2 className='text-2xl font-bold'>Search Results for {'Dune'}</h2>
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
      </div>
    </div>
  )
}

export default SearchPage;