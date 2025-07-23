from fastapi import APIRouter
from scripts.movies import SearchMovie
from models.movie_models import MovieDetails


router = APIRouter(
    prefix="/movie",
    tags=["movie"],
)


@router.get("/{movie_id}", response_model=MovieDetails)
async def get_movie_details(movie_id: str):
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