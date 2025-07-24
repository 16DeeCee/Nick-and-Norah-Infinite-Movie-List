export type TMovie = {
  // id: number
  imdb_id: string
  title: string
  release_year: number
  rating: number
  poster_path: string
}

export type TMovieDesc = TMovie & {
  overview: string
  genres: string[]
}

export type TPerson = {
  id: number
  name: string
  profile_path?: string
  character?: string
}

export type TArtist = TPerson & {
  biography: string
  birthdate: string
  place_of_birth: string
  deathday?: string
}

export type TMovieDetails = {
  movie: TMovieDesc
  director: TPerson[]
  cast: TPerson[]
  recommendations: TMovie[]
}