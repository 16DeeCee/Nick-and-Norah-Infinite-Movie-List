import type { TMovie } from "@/types/movie.types";

import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, Star } from "lucide-react";

const MovieItems = ( { movies, isNumbered }: { movies: TMovie[], isNumbered: boolean } ) => {
  return (
    <>
      {movies.map((movie: TMovie, index: number) => (
        <CarouselItem key={movie.imdb_id} className="sm:basis-1/2 md:basis-1/3 lg:basis-1/5">
          <Card className="group cursor-auto transition-all hover:scale-105 hover:shadow-lg p-0">
            <CardContent className="p-0">
              <div className="relative overflow-hidden rounded-lg">
                {isNumbered && <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground rounded-full w-8 h-8 flex items-center justify-center text-sm font-bold z-10">
                  {index + 1}
                </div>}
                <img 
                  src={movie.poster_path || "/placeholder.svg"}
                  alt={movie.title}
                  className="w-full h-fit object-cover transition-transform group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                  <Button variant="secondary">
                    <Play className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
              <div className="p-4 space-y-2">
                <h4 className="font-semibold leading-tight">{movie.title}</h4>
                <div className="flex items-center justify-between text-sm text-muted-foreground">
                  <span>{movie.release_year}</span>
                  <div className="flex items-center space-x-1">
                    <Star className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    <span>{movie.rating}</span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </CarouselItem>
      ))}
    </>
  )
}

function MovieCarousel ({ description, isNumbered = false, movieList }: { 
  description: string, 
  isNumbered: boolean, 
  movieList: TMovie[],
}) {
  return (
    <Carousel
      opts={{
        align: "start",
        loop: false,
      }}
      className="w-full overflow-visible"
    >
      <div className="flex items-center justify-between space-x-4 mb-4">
        <h3 className="text-2xl font-bold">{description}</h3>
        <div className="relative flex items-center space-x-2">
          <CarouselPrevious className="static translate-y-0 rounded-md" />
          <CarouselNext className="static translate-y-0 rounded-md" />
        </div>
      </div>
      <CarouselContent className="pt-3 pb-8">
        <MovieItems movies={movieList} isNumbered={isNumbered} />
      </CarouselContent>
    </Carousel>
  )
}

export default MovieCarousel;