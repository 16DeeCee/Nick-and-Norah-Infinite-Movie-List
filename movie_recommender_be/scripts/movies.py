from dotenv import load_dotenv
# from sentence_transformers import SentenceTransformer
from tmdbv3api import TMDb, Movie, Person

import faiss
import numpy as np
import os
import pandas as pd
import requests

load_dotenv()

movie_df = pd.read_csv("preprocessed_data/clean_movie_dataset.csv")
# model = SentenceTransformer("all-MiniLM-L6-v2")
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
    def search_movie_index(movie_id: str):
        movie_details = movie_df.loc[movie_df["imdb_id"] == movie_id]

        try:
            index = movie_details.index[0]
        except IndexError:
            return None
        
        movie_dict = movie_details.to_dict(orient="records")[0]

        # movie_dict = movie_details[[
        #     "id", 
        #     "imdb_id",
        #     "title", 
        #     "release_year",
        #     "rating",
        #     "poster_path",
        #     "overview",
        #     "genres"
        # ]].to_dict(orient="records")[0]

        return index, movie_dict

    @staticmethod
    def search_movie_in_tmdb(id):
        key = api_key
        response = requests.get(f"https://api.themoviedb.org/3/movie/{id}?api_key={key}")

        return response.json()
    

    # @staticmethod
    # def search_tmdb_id(movie_title: str, year: int):
    #     id = np.nan

    #     try:
    #         search = movie.search(str(movie_title))

    #         for result in search["results"]:
    #             release_year = int(result["release_date"].split("-")[0])

    #             if year == release_year:
    #                 id = int(result["id"])
    #                 break
    #         # id = search
    #     except:
    #         pass
        
    #     return id
    
    @staticmethod
    def search_movie_crew(id):
        key=api_key
        url = f"https://api.themoviedb.org/3/movie/{id}/credits?api_key={key}"
        
        response = requests.get(url).json()

        director_list = [{
            "id": director["id"],
            "name": director["name"],
            "profile_path": director["profile_path"],
        } for director in response.get("crew", []) if director["job"] == "Director"]

        cast_list = [{
            "id": cast["id"], 
            "name": cast["name"], 
            "character": cast["character"], 
            "profile_path": "https://image.tmdb.org/t/p/w185" + cast["profile_path"],
        } for cast in response.get("cast", [])[:6]]

        return director_list, cast_list
    
    def search_artist(id):
        artist = person.details(id)

        artist_dict = {
            "biography": artist["biography"],
            "birthdate": artist["birthday"],
            "place_of_birth": artist["place_of_birth"],
        }

        if artist["deathday"]:
            artist_dict["deathday"] = artist["deathday"]

        return artist_dict

    @staticmethod
    def search_video(id):
        key=api_key
        url = f"https://api.themoviedb.org/3/movie/{id}/videos?api_key={key}"

        response = requests.get(url).json()

        return response
    
    @staticmethod
    def recommend(movie_idx, top_n=31):
        
        # Generate embedding for the query
        # query_embedding = model.encode([query_text], convert_to_numpy=True).astype(np.float32)
        query_embedding = np.array([embeddings[movie_idx]]).astype(np.float32)
        
        # Search for similar texts
        distances, indices = index.search(query_embedding, top_n)

        data = pd.DataFrame({"index": indices[0][1:], "distances": distances[0]})

        data = data.join(movie_df.loc[data["index"], ["normalized_bayes_rating", "normalized_popularity"]].reset_index(drop=True)).reset_index(drop=True)

        data["weighted_average"] = (data["distance"] * SIMILARITY_WEIGHTED_SCORE) + \
        (data["normalized_bayes_rating"] * RATING_WEIGHTED_SCORE) + \
        (data["normalized_popularity"] * POPULARITY_WEIGHTED_SCORE)
        
        data.sort_values(by="weighted_average", ascending=False, inplace=True)

        return movie_df.loc[data["index"], :].to_dict(orient='records')

        # return data_df.loc[data["index"], :]

        # selected_movies = movie_df.loc[indices[0][0:], ["title", "poster_path"]].to_dict(orient='records')

        # return selected_movies

        # result_dict = [row.to_dict() for _, row in selected_movies.iterrows()]

        # return result_dict
        
        # Display recommendations
        # print(f"Query: {query_text}\n")
        # print("Recommendations:")
        # for i, idx in enumerate(indices[0]):
        #     movie_df.loc[idx, "movie_title"]
        #     print(f"{i + 1}: {movie_df.loc[idx, "movie_title"]} (Distance: {distances[0][i]:.4f})")