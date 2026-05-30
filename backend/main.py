from pathlib import Path

from fastapi import FastAPI
from fastapi.responses import HTMLResponse
from fastapi.staticfiles import StaticFiles

from .ssr import render_page

ROOT = Path(__file__).resolve().parent.parent
CLIENT_DIST = ROOT / "public" / "dist" / "client"

app = FastAPI()


@app.get("/", response_class=HTMLResponse)
async def index() -> HTMLResponse:
    return HTMLResponse(content=render_page())

if CLIENT_DIST.exists():
    assets_dir = CLIENT_DIST / "assets"
    if assets_dir.exists():
        app.mount("/assets", StaticFiles(directory=assets_dir), name="assets")