from fastapi import APIRouter
from models.movie_models import MovieDesc
from scripts.movies import SearchMovie
from typing import List

router = APIRouter(
    prefix="/search",
    tags=["search"]
)

# movies = [
#     {
#     "imdb_id": "lkz43423",
#     "title": 'Dune: Part Two',
#     "release_year": 2024,
#     "rating": 8.8,
#     "genres": ['Science Fiction', 'Adventure', 'Drama'],
#     "overview": 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
#     "poster_path": 'https://image.tmdb.org/t/p/w500/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg'
#     },
#     {
#     "imdb_id": "xdfq43423",
#     "title": 'Dune: Part Two',
#     "release_year": 2024,
#     "rating": 8.8,
#     "genres": ['Science Fiction', 'Adventure', 'Drama'],
#     "overview": 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
#     "poster_path": 'https://image.tmdb.org/t/p/w500/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg'
#     },
#     {
#     imdb_id: "rdc43423",
#     title: 'Dune: Part Two',
#     release_year: 2024,
#     rating: 8.8,
#     genres: ['Science Fiction', 'Adventure', 'Drama'],
#     overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
#     poster_path: 'https://image.tmdb.org/t/p/w500/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg'
#   },
#     {
#     imdb_id: "dxp43423",
#     title: 'Dune: Part Two',
#     release_year: 2024,
#     rating: 8.8,
#     genres: ['Science Fiction', 'Adventure', 'Drama'],
#     overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
#     poster_path: 'https://image.tmdb.org/t/p/w500/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg'
#   },
#     {
#     imdb_id: "e3e43423",
#     title: 'Dune: Part Two',
#     release_year: 2024,
#     rating: 8.8,
#     genres: ['Science Fiction', 'Adventure', 'Drama'],
#     overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
#     poster_path: 'https://image.tmdb.org/t/p/w500/cBDoFHJVcZqAonkTyhN9sMEggi5.jpg'
#   },
#     {
#     imdb_id: "xc4342887",
#     title: 'Dune: Part Two',
#     release_year: 2024,
#     rating: 8.8,
#     genres: ['Science Fiction', 'Adventure', 'Drama'],
#     overview: 'Paul Atreides unites with Chani and the Fremen while seeking revenge against the conspirators who destroyed his family.',
#     poster_path: 'https://image.tmdb.org/t/p/w500/cBDoFHcqAonkTyhN9sMEggi5.jpg'
#   },
# ]

@router.get("/", response_model=List[MovieDesc])
async def search_movies(query: str):
    print(query)
    search_results = SearchMovie.search_movies(query)

    return search_results