from fastapi import APIRouter
from pydantic import BaseModel
from scripts.movies import SearchMovie
from typing import List, Optional


router = APIRouter(
    prefix="/movie",
    tags=["movie"],
)


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


@router.get("/{movie_id}", response_model=MovieDetails)
async def search_movie(movie_id: str):
    movie_idx, movie_details = SearchMovie.search_movie_index(movie_id)
    movie_director, movie_cast = SearchMovie.search_movie_crew(movie_details["id"])
    recommendations = SearchMovie.recommend(movie_idx)

    movie_details["genres"] = movie_details["genres"].split(", ")

    return {
        "movie": movie_details,
        "director": movie_director,
        "cast": movie_cast,
        "recommendations": recommendations,
    }

# @router.post("/artist")
# async def search_artist(artist: Artist):
#     artist_details = SearchMovie.search_artist(artist.artist_id)

#     return artist_details