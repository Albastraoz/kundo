import pytest
from fastapi.testclient import TestClient

from backend.main import app


@pytest.fixture
def client() -> TestClient:
    return TestClient(app)


@pytest.fixture(autouse=True)
def no_api_key(monkeypatch: pytest.MonkeyPatch) -> None:
    """Use local fixture data instead of the live OMDb API."""
    monkeypatch.delenv("OMDB_API_KEY", raising=False)
