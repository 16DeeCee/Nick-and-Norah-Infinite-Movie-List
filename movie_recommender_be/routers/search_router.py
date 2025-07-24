from fastapi import APIRouter
from models.movie_models import MovieDesc
from scripts.movies import SearchMovie
from typing import List

router = APIRouter(
    prefix="/search",
    tags=["search"]
)
@router.get("/", response_model=List[MovieDesc])
async def search_movies(query: str):
    print(query)
    search_results = SearchMovie.search_movies(query)

    return search_results

# @router.post("/artist")
# async def search_artist(artist: Artist):
#     artist_details = SearchMovie.search_artist(artist.artist_id)

#     return artist_details