from pydantic import BaseModel
from typing import List, Optional

class Movie(BaseModel):
    # id: int
    imdb_id: str
    title: str
    release_year: int
    rating: float
    poster_path: str

class MovieDesc(Movie):
    overview: str
    genres: List[str]

class Crew(BaseModel):
    id: int
    name: str
    character: Optional[str] = None
    profile_path: Optional[str] = None

class MovieDetails(BaseModel):
    movie: MovieDesc
    director: List[Crew]
    cast: List[Crew]
    recommendations: List[Movie]

class ArtistDetails(BaseModel):
    biography: str
    birthdate: str
    place_of_birth: str
    deathday: Optional[str] = None