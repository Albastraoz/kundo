import json
import os
from pathlib import Path

import httpx

ROOT = Path(__file__).resolve().parent.parent.parent
DATA_DIR = ROOT / "data"
OMDB_URL = "http://www.omdbapi.com/"


def _load_fixture(name: str) -> dict:
    return json.loads((DATA_DIR / name).read_text(encoding="utf-8"))

async def search_movies(query: str) -> dict:
    api_key = os.getenv("OMDB_API_KEY")
    if api_key:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                OMDB_URL,
                params={"apikey": api_key, "s": query},
            )
            response.raise_for_status()
            return response.json()

    data = _load_fixture("search.json")
    needle = query.casefold()
    results = [
        movie
        for movie in data.get("Search", [])
        if needle in movie["Title"].casefold()
    ]
    if not results:
        return {"Response": "False", "Error": "Movie not found!"}

    return {
        "Search": results,
        "totalResults": str(len(results)),
        "Response": "True",
    }


async def get_movie(imdb_id: str) -> dict:
    api_key = os.getenv("OMDB_API_KEY")
    if api_key:
        async with httpx.AsyncClient() as client:
            response = await client.get(
                OMDB_URL,
                params={"apikey": api_key, "i": imdb_id},
            )
            response.raise_for_status()
            return response.json()

    data = _load_fixture("details.json")
    if data.get("imdbID") == imdb_id:
        return data

    return {"Response": "False", "Error": "Incorrect IMDb ID."}
