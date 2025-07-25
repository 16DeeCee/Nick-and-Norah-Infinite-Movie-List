from dotenv import load_dotenv
from models.movie_models import Crew
from rapidfuzz import process
from rapidfuzz.distance import Levenshtein
from tmdbv3api import TMDb, Movie, Person
from typing import List, Dict, Tuple

import faiss
import numpy as np
import os
import pandas as pd
import requests


load_dotenv()

movie_df = pd.read_csv("preprocessed_data/clean_movie_dataset.csv")
movie_title_list = movie_df["title"].to_list()
embeddings = np.load("embeddings.npy")
index = faiss.read_index("faiss_index.idx")

tmdb = TMDb()
api_key = os.getenv("TMDB_API")
tmdb.api_key = api_key

movie = Movie()
person = Person()

SIMILARITY_WEIGHTED_SCORE = 0.6
POPULARITY_WEIGHTED_SCORE = 0.20
RATING_WEIGHTED_SCORE = 0.20

class SearchMovie:
    @staticmethod
    def search_movie_index(movie_id: str) -> Tuple[int, Dict[str, str]]:
        movie_details = movie_df.loc[movie_df["imdb_id"] == movie_id]

        try:
            index = movie_details.index[0]
        except IndexError:
            return None
        
        movie_dict = movie_details.to_dict(orient="records")[0]

        return index, movie_dict


    @staticmethod
    def search_movie_crew(id: int) -> Tuple[List[Crew], List[Crew]]:
        url = f"https://api.themoviedb.org/3/movie/{id}/credits?api_key={api_key}"
        
        response = requests.get(url).json()

        director_list = []
        cast_list = []

        for director in response.get("crew", []):
            if director["job"] == "Director":
                try:
                    director_list.append({
                        "id": director["id"],
                        "name": director["name"],
                        "profile_path": "https://image.tmdb.org/t/p/w185" + director["profile_path"],
                    })
                except:
                    director_list.append({"id": director["id"], "name": director["name"]})


        for cast in response.get("cast", [])[:6]:
            if cast.get("profile_path"):
                cast_list.append({
                    "id": cast["id"], 
                    "name": cast["name"],
                    "character": cast["character"], 
                    "profile_path": "https://image.tmdb.org/t/p/w185" + cast["profile_path"],
                })
            else:
                cast_list.append({
                    "id": cast["id"], 
                    "name": cast["name"],
                    "character": cast["character"],
                })

        return director_list, cast_list
    
    
    @staticmethod
    def search_artist(id):
        artist = person.details(id)

        artist_dict = {
            "biography": artist["biography"],
            "birthdate": artist["birthday"],
            "place_of_birth": artist["place_of_birth"],
        }

        if artist.get("deathday"):
            artist_dict["deathday"] = artist["deathday"]

        return artist_dict
    

    @staticmethod
    def search_video(id):
        key=api_key
        url = f"https://api.themoviedb.org/3/movie/{id}/videos?api_key={key}"

        response = requests.get(url).json()

        return response
    
    
    @staticmethod
    def recommend(movie_idx: int, top_n: int = 31) -> List[Dict[str, str]]:
        query_embedding = np.array([embeddings[movie_idx]]).astype(np.float32)
        
        # Search for similar texts
        distances, indices = index.search(query_embedding, top_n)

        data = pd.DataFrame({"index": indices[0][1:], "distances": distances[0][1:]})

        data = data.join(movie_df.loc[
            data["index"], 
            ["normalized_bayes_rating", "normalized_popularity"]
        ].reset_index(drop=True))

        data["weighted_average"] = (data["distances"] * SIMILARITY_WEIGHTED_SCORE) + \
        (data["normalized_bayes_rating"] * RATING_WEIGHTED_SCORE) + \
        (data["normalized_popularity"] * POPULARITY_WEIGHTED_SCORE)
        
        data.sort_values(by="weighted_average", ascending=False, inplace=True)

        return movie_df.loc[data["index"], :][:10].to_dict(orient='records')


    @staticmethod
    def search_movies(query: str) -> List[Dict[str, str]]:
        search_results = process.extract(
            query, 
            movie_title_list, 
            scorer=Levenshtein.normalized_distance, 
            processor=lambda x: x.lower(), 
            limit=15
        )

        search_index = [result[2] for result in search_results]
        movie_results_df = movie_df.iloc[search_index]
        movie_results_df.loc[:, "genres"] = movie_results_df["genres"].apply(lambda x: x.split(", "))

        return movie_results_df.to_dict(orient="records")