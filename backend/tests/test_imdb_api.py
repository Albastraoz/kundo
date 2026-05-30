def test_search_returns_results(client) -> None:
    response = client.get("/api/imdb/search", params={"q": "blade"})

    assert response.status_code == 200
    data = response.json()
    assert data["Response"] == "True"
    assert len(data["Search"]) > 0


def test_search_returns_404_when_no_match(client) -> None:
    response = client.get("/api/imdb/search", params={"q": "zzznomatch"})

    assert response.status_code == 404


def test_movie_details_returns_movie(client) -> None:
    imdb_id = "tt0083658"

    response = client.get(f"/api/imdb/movies/{imdb_id}")

    assert response.status_code == 200
    data = response.json()
    assert data["Title"] == "Blade Runner"
    assert data["Director"] == "Ridley Scott"
    assert data["imdbID"] == imdb_id


def test_movie_details_returns_404_for_unknown_id(client) -> None:
    response = client.get("/api/imdb/movies/tt9999999")

    assert response.status_code == 404
