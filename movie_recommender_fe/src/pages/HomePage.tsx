import MovieCarousel from '@/components/MovieCarousel';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Play, Search } from 'lucide-react';

const goatMovieList = [
  {
    imdb_id: 'tt0068646',
    title: 'The Godfather',
    release_year: 1972,
    rating: 8.70,
    poster_path: 'https://image.tmdb.org/t/p/w500/3bhkrj58Vtu7enYsRolD1fZdja1.jpg',
  },
  {
    imdb_id: 'tt0111161',
    title: 'The Shawshank Redemption',
    release_year: 1994,
    rating: 8.70,
    poster_path: 'https://image.tmdb.org/t/p/w500/lyQBXzOQSuE59IsHyhrp0qIiPAz.jpg',
  },
  {
    imdb_id: 'tt0071562',
    title: 'The Godfather Part II',
    release_year: 1974,
    rating: 8.59,
    poster_path: 'https://image.tmdb.org/t/p/w500/hek3koDUyRQk7FIhPXsa6mT2Zc3.jpg',
  },
  {
    imdb_id: 'tt0108052',
    title: "Schindler's List",
    release_year: 1993,
    rating: 8.57,
    poster_path: 'https://image.tmdb.org/t/p/w500/sF1U4EUQS8YHUYjNl3pMGNIQyr0.jpg',
  },
  {
    imdb_id: 'tt0245429',
    title: 'Spirited Away',
    release_year: 2001,
    rating: 8.53,
    poster_path: 'https://image.tmdb.org/t/p/w500/39wmItIWsg5sZMyRUHLkWBcuVCM.jpg',
  },
  {
    imdb_id: 'tt0468569',
    title: 'The Dark Knight',
    release_year: 2008,
    rating: 8.51,
    poster_path: 'https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg',
  },
  {
    imdb_id: 'tt6751668',
    title: 'Parasite',
    release_year: 2019,
    rating: 8.51,
    poster_path: 'https://image.tmdb.org/t/p/w500/7IiTTgloJzvGI1TAYymCfbfl3vT.jpg',
  },
  {
    imdb_id: 'tt0050083',
    title: '12 Angry Men',
    release_year: 1957,
    rating: 8.54,
    poster_path: 'https://image.tmdb.org/t/p/w500/ow3wq89wM8qd5X7hWKxiRfsFf9C.jpg',
  },
  {
    imdb_id: 'tt0120689',
    title: 'The Green Mile',
    release_year: 1999,
    rating: 8.50,
    poster_path: 'https://image.tmdb.org/t/p/w500/8VG8fDNiy50H4FedGwdSVUPoaJe.jpg',
  },
  {
    imdb_id: 'tt5311514',
    title: 'Your Name.',
    release_year: 2016,
    rating: 8.51,
    poster_path: 'https://image.tmdb.org/t/p/w500/q719jXXEzOoYaps6babgKnONONX.jpg',
  },
]

const mostRecentList = [
  {
    imdb_id: 'tt9362722',
    title: 'Spider-Man: Across the Spider-Verse',
    release_year: 2023,
    rating: 8.44,
    poster_path: 'https://image.tmdb.org/t/p/w500/8Vt6mWEReuy4Of61Lnj5Xj704m8.jpg',
  },
  {
    imdb_id: 'tt15398776',
    title: 'Oppenheimer',
    release_year: 2023,
    rating: 8.26,
    poster_path: 'https://image.tmdb.org/t/p/w500/8Gxv8gSFCU0XGDykEGv7zR1n2ua.jpg',
  },
  {
    imdb_id: 'tt6791350',
    title: 'Guardians of the Galaxy Vol. 3',
    release_year: 2023,
    rating: 8.02,
    poster_path: 'https://image.tmdb.org/t/p/w500/r2J02Z2OpNTctfOSN1Ydgii51I3.jpg',
  },
  {
    imdb_id: 'tt21909764',
    title: 'My Fault',
    release_year: 2023,
    rating: 8.11,
    poster_path: 'https://image.tmdb.org/t/p/w500/w46Vw536HwNnEzOa7J24YH9DPRS.jpg',
  },
  {
    imdb_id: 'tt10172266',
    title: 'Red, White & Royal Blue',
    release_year: 2023,
    rating: 8.168,
    poster_path: 'https://image.tmdb.org/t/p/w500/uffOY4W354o9RTRmercFyVvl56Z.jpg',
  },
  {
    imdb_id: 'tt10366206',
    title: 'John Wick: Chapter 4',
    release_year: 2023,
    rating: 7.814,
    poster_path: 'https://image.tmdb.org/t/p/w500/vZloFAK7NmvMGKE7VkF5UHaz0I.jpg',
  },
  {
    imdb_id: 'tt6718170',
    title: 'The Super Mario Bros. Movie',
    release_year: 2023,
    rating: 7.78,
    poster_path: 'https://image.tmdb.org/t/p/w500/qNBAXBIQlnOThrVvA6mA2B5ggV6.jpg',
  },
  {
    imdb_id: 'tt4495098',
    title: 'Gran Turismo',
    release_year: 2023,
    rating: 8.07,
    poster_path: 'https://image.tmdb.org/t/p/w500/51tqzRtKMMZEYUpSYkrUE7v9ehm.jpg',
  },
  {
    imdb_id: 'tt4873118',
    title: "Guy Ritchie's The Covenant",
    release_year: 2023,
    rating: 7.81,
    poster_path: 'https://image.tmdb.org/t/p/w500/kVG8zFFYrpyYLoHChuEeOGAd6Ru.jpg',
  },
  {
    imdb_id: 'tt15789038',
    title: 'Elemental',
    release_year: 2023,
    rating: 7.76,
    poster_path: 'https://image.tmdb.org/t/p/w500/4Y1WNkd88JXmGfhtWR7dmDAo1T2.jpg',
  }
]

function HomePage() {
  return (
    <>
      <section className='relative bg-gradient-to-r from-background to-muted/20'>
        <div className='container mx-auto px-4 py-16 text-center'>
          <div className='space-y-6 max-w-3xl mx-auto'>
            <h2 className='text-5xl md:text-6xl font-bold'>Discover Your Next Favorite Movie</h2>
            <p className='text-xl text-muted-foreground'>
              Explore the greatest films of all time and discover the latest cinematic masterpieces
            </p>
            <div className='flex justify-center space-x-4'>
              <a href=''>
                <Button size='lg' className='space-x-2'>
                  <Play className='h-4 w-4' />
                  <span>Explore Featured</span>
                </Button>
              </a>
              <a href=''>
                <Button size='lg' variant='outline'>
                  <Search className='h-4 w-4' />
                  <span>Search Movies</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Separator />

      <div className=' container mx-auto px-4 py-16'>
        <MovieCarousel 
          description='Top 10 GOAT Movies' 
          movieList={goatMovieList} 
          isNumbered={true}
        />
      </div>

      <Separator />

      <div className=' container mx-auto px-4 py-16'>
        <MovieCarousel
          description='Top 10 Most Recent Movies'
          movieList={mostRecentList}
          isNumbered={true}
        />
      </div>
    </>
  )
}

export default HomePage