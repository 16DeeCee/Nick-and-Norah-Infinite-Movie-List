from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from routers import movie_router, search_router
import uvicorn

app = FastAPI(root_path="/")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allow all origins (use caution in production)
    allow_credentials=True,
    allow_methods=["*"],  # Allow all HTTP methods
    allow_headers=["*"],  # Allow all headers
)

app.include_router(movie_router.router)
app.include_router(search_router.router)

if "__name__" == "__main__":
    uvicorn.run("main:app", host="localhost", port=9991, reload=True)