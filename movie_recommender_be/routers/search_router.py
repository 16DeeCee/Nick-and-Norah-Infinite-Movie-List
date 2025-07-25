from fastapi import APIRouter
from models.movie_models import MovieDesc, ArtistDetails
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

@router.get("/artist/{artist_id}", response_model=ArtistDetails)
async def search_artist(artist_id: int):
    artist_details = SearchMovie.search_artist(artist_id)

    return artist_details