import MovieCarousel from "@/components/MovieCarousel";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Play, Search } from "lucide-react";

const movieList = [
  {
    imdb_id: "27205",
    title: "Inception",
    release_year: 2010,
    rating: 8.36,
    poster_path: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" 
  },
  {
    imdb_id: "157336",
    title: "Instertellar",
    release_year: 2014,
    rating: 8.41,
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" 
  },
  {
    imdb_id: "155",
    title: "The Dark Knight",
    release_year: 2008,
    rating: 8.51,
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" 
  },
  {
    imdb_id: "19995",
    title: "Avatar",
    release_year: 2009,
    rating: 7.57,
    poster_path: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" 
  },
  {
    imdb_id: "24428",
    title: "The Avengers",
    release_year: 2012,
    rating: 7.71,
    poster_path: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" 
  },
  {
    imdb_id: "293660",
    title: "Deadpool",
    release_year: 2016,
    rating: 7.6,
    poster_path: "https://image.tmdb.org/t/p/w500/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg" 
  },
  {
    imdb_id: "299536",
    title: "Avengers: Infinity War",
    release_year: 2018,
    rating: 8.25,
    poster_path: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" 
  },
]

function HomePage() {
  return (
    <>
      <section className="relative bg-gradient-to-r from-background to-muted/20">
        <div className="container mx-auto px-4 py-16 text-center">
          <div className="space-y-6 max-w-3xl mx-auto">
            <h2 className="text-5xl md:text-6xl font-bold">Discover Your Next Favorite Movie</h2>
            <p className="text-xl text-muted-foreground">
              Explore the greatest films of all time and discover the latest cinematic masterpieces
            </p>
            <div className="flex justify-center space-x-4">
              <a href="">
                <Button size="lg" className="space-x-2">
                  <Play className="h-4 w-4" />
                  <span>Explore Featured</span>
                </Button>
              </a>
              <a href="">
                <Button size="lg" variant="outline">
                  <Search className="h-4 w-4" />
                  <span>Search Movies</span>
                </Button>
              </a>
            </div>
          </div>
        </div>
      </section>
      
      <Separator />

      <div className=" container mx-auto px-4 py-16">
        <MovieCarousel 
          description="Top 10 GOAT Movies" 
          movieList={movieList} 
          isNumbered={true}
        />
      </div>

      <Separator />

      <div className=" container mx-auto px-4 py-16">
        <MovieCarousel
          description="Top 10 Most Recent Movies"
          movieList={movieList}
          isNumbered={true}
        />
      </div>
    </>
  )
}

export default HomePage