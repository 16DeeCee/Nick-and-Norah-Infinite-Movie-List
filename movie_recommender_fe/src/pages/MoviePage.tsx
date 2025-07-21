import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Heart, Play, Star } from "lucide-react";
import { useEffect, useState } from "react";
import type { TPerson, TMovieDetails } from "../types/movie.types";
import { Separator } from "@/components/ui/separator";
import MovieCarousel from "@/components/MovieCarousel";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useParams } from "react-router-dom";
import { api } from "@/lib/axios";

const movieList = [
  {
    id: 27205,
    imdb_id: "re",
    title: "Inception",
    release_year: 2010,
    rating: 8.36,
    poster_path: "https://image.tmdb.org/t/p/w500/oYuLEt3zVCKq57qu2F8dT7NIa6f.jpg" 
  },
  {
    id: 157336,
    imdb_id: "red",
    title: "Instertellar",
    release_year: 2014,
    rating: 8.41,
    poster_path: "https://image.tmdb.org/t/p/w500/gEU2QniE6E77NI6lCU6MxlNBvIx.jpg" 
  },
  {
    id: 155,
    imdb_id: "rez",
    title: "The Dark Knight",
    release_year: 2008,
    rating: 8.51,
    poster_path: "https://image.tmdb.org/t/p/w500/qJ2tW6WMUDux911r6m7haRef0WH.jpg" 
  },
  {
    id: 19995,
    imdb_id: "fds",
    title: "Avatar",
    release_year: 2009,
    rating: 7.57,
    poster_path: "https://image.tmdb.org/t/p/w500/kyeqWdyUXW608qlYkRqosgbbJyK.jpg" 
  },
  {
    id: 24428,
    imdb_id: "fds1",
    title: "The Avengers",
    release_year: 2012,
    rating: 7.71,
    poster_path: "https://image.tmdb.org/t/p/w500/RYMX2wcKCBAr24UyPD7xwmjaTn.jpg" 
  },
  {
    id: 293660,
    imdb_id: "fds7",
    title: "Deadpool",
    release_year: 2016,
    rating: 7.6,
    poster_path: "https://image.tmdb.org/t/p/w500/zq8Cl3PNIDGU3iWNRoc5nEZ6pCe.jpg" 
  },
  {
    id: 299536,
    imdb_id: "fsdjhg",
    title: "Avengers: Infinity War",
    release_year: 2018,
    rating: 8.25,
    poster_path: "https://image.tmdb.org/t/p/w500/7WsyChQLEftFiDOVTGkv3hFpyyt.jpg" 
  },
]

const movieDirector = {
  id: 6193,
  name: "Leonardo DiCaprio",
  profile_path: "https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg"
}

// const movieCasts = [
//   {
//     'id': 6193,
//     'name': 'Leonardo DiCaprio',
//     'character': 'Dom Cobb',
//     'profile_path': 'https://image.tmdb.org/t/p/w185/wo2hJpn04vbtmh0B9utCFdsQhxM.jpg'
//   },
//   {
//     'id': 24045,
//     'name': 'Joseph Gordon-Levitt',
//     'character': 'Arthur',
//     'profile_path': 'https://image.tmdb.org/t/p/w185/4U9G4YwTlIEbAymBaseltS38eH4.jpg'
//   },
//   {
//     'id': 3899,
//     'name': 'Ken Watanabe',
//     'character': 'Saito',
//     'profile_path': 'https://image.tmdb.org/t/p/w185/w2t30L5Cmr34myAaUobLoSgsLfS.jpg'
//   },
//   {
//     'id': 2524,
//     'name': 'Tom Hardy',
//     'character': 'Eames',
//     'profile_path': 'https://image.tmdb.org/t/p/w185/d81K0RH8UX7tZj49tZaQhZ9ewH.jpg'
//   },
//  {
//     'id': 27578,
//     'name': 'Elliot Page',
//     'character': 'Ariadne',
//     'profile_path': 'https://image.tmdb.org/t/p/w185/eCeFgzS8dYHnMfWQT0oQitCrsSz.jpg'
//   },
//   {
//     'id': 95697,
//     'name': 'Dileep Rao',
//     'character': 'Yusuf',
//     'profile_path': 'https://image.tmdb.org/t/p/w185/jRNn8SZqFXuI5wOOlHwYsWh0hXs.jpg'
//   },
// ]


const DisplayGenre = ({ genres } : { genres: string[] }) => {
  return (
    <>
      {genres.map((genre) => (
        <Badge key={genre} variant="outline">
          {genre}
        </Badge>
      ))}
    </>
  )
}

const ImageAvatar = ({ person } : { person: TPerson }) => {
  return (
    <div className="cursor-pointer group">
      <Avatar className="w-20 h-20 mx-auto mb-2 group-hover:scale-105 transition-transform">
        <AvatarImage src={person.profile_path || "/placeholder.svg"} alt={person.name} />
        <AvatarFallback>{person.name.split(" ").map((n) => n[0]).join("")}</AvatarFallback>
      </Avatar>
      <div className="text-center">
        <p className="font-semibold text-sm group-hover:text-primary transition-colors">
          {person.name}
        </p>
        {person.character && (
          <p className="text-xs text-muted-foreground">{person.character}</p>
        )}
      </div>
    </div>
  )
}

const CastAvatars = ({ casts } : { casts: TPerson[] }) => {
  return (
    <>
      {casts.map((cast: TPerson) => (
        <ImageAvatar key={cast.id} person={cast} />
      ))}
    </>
  )
}



function MoviePage() {
  const { movieId } = useParams();
  // const [ movieDetails, setMovieDetails] = useState<TMovieDetails>({
  //   id: 43423,
  //   title: "Dune: Part Two",
  //   release_year: 2024,
  //   rating: 8.8,
  //   genres: ["Science Fiction", "Adventure", "Drama"],
  //   overview: "Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.",
  //   poster_path: "https://image.tmdb.org/t/p/w500/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg"
  //   // poster_path: "/"
  // });
  const [ movieDetails, setMovieDetails ] = useState<TMovieDetails | null>(null)

  useEffect(() => {
    console.log("ayooo!")
    if (!movieId) return;
    console.log("whyyyy!")
    
    api.get(`/movie/${movieId}`)
      .then(res => {
        setMovieDetails(res.data)
        console.log(res.data)
      })
      .catch(err => console.log(err))
  }, [movieId])

  return (
    <>
      <section className="relative">
        <div className="container mx-auto px-4 py-12">
          { movieDetails && (
            <div className="grid md:grid-cols-2 gap-8 items-center">
              <div className="space-y-6">
                <div className="space-y-2">
                  {/* <Badge variant="secondary">{movieDetails.movie.release_year}</Badge> */}
                  <h2 className="text-4xl font-bold">{movieDetails.movie.title}</h2>
                  <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium">{movieDetails.movie.rating}</span>
                      </div>
                      <div className="flex space-x-2">
                        <DisplayGenre genres={movieDetails.movie.genres} />
                      </div>
                  </div>
                </div>
                <p className="text-muted-foreground text-lg leading-relaxed">{movieDetails.movie.overview}</p>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-2">DIRECTOR</h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                    <ImageAvatar person={movieDirector} />
                    </div>
                  </div>
                  <div>
                    <h4 className="font-semibold text-sm text-muted-foreground mb-3">CAST</h4>
                    <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
                      <CastAvatars casts={movieDetails.cast} />
                    </div>
                    
                    {/* Insert Director and Artists here */}
                  </div>
                </div>
                <div className="flex space-x-4">
                  <Button size="lg" className="space-x-2">
                    <Play className="h-4 w-4" />
                    <span>Watch Trailer</span>
                  </Button>
                  <Button variant="outline" size="lg" className="space-x-2">
                    <Heart className="h-4 w-4" />
                    <span>Add to List</span>
                  </Button>
                </div>
              </div>
              <div className="flex justify-center">
                <Card className="overflow-hidden py-0">
                  <img
                    src={movieDetails.movie.poster_path || "/placeholder.svg"}
                    alt={movieDetails.movie.title}
                    className="w-full max-w-sm h-fit aspect-2/3 object-cover"
                  />
                </Card>
              </div>
            </div>
          )}
        </div>
      </section>

      <Separator />

      <div className="container mx-auto px-4 py-12">
        <MovieCarousel 
          description="More Like This" 
          isNumbered={false}
          movieList={movieList}
        />
      </div>
    </>
  )
}

export default MoviePage;