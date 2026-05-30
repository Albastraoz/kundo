from fastapi import APIRouter, HTTPException, Query

from .client import get_movie, search_movies

router = APIRouter(prefix="/api/imdb", tags=["imdb"])


@router.get("/search")
async def search(q: str = Query(..., min_length=1)) -> dict:
    data = await search_movies(q)
    if data.get("Response") == "False":
        raise HTTPException(status_code=404, detail=data.get("Error", "Not found"))
    return data


@router.get("/movies/{imdb_id}")
async def movie_details(imdb_id: str) -> dict:
    data = await get_movie(imdb_id)
    if data.get("Response") == "False":
        raise HTTPException(status_code=404, detail=data.get("Error", "Not found"))
    return data
