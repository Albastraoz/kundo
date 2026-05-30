import { useState } from "react";
import "./App.css";
import MovieDetailsPage from "./components/MovieDetailsPage";
import SearchPage from "./components/SearchPage";
import type { MovieDetails, MovieSummary } from "./types/movie";

export default function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [details, setDetails] = useState<MovieDetails | null>(null);

  const searchMovies = async () => {
    const response = await fetch(`http://localhost:8000/api/imdb/search?q=${search}`);

    if (!response.ok) {
      throw new Error("Failed to search movies");
    }

    const data = await response.json();
    setMovies(data.Search);
  };

  const getMovieDetails = async (imdbID: string) => {
    const response = await fetch(`http://localhost:8000/api/imdb/movies/${imdbID}`);

    if (!response.ok) {
      throw new Error("Failed to get movie details");
    }

    const data = await response.json();
    setDetails(data);
  };

  return (
    <main className="min-h-screen bg-slate-900 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">Kundo Movies</h1>

        {details ? (
          <MovieDetailsPage details={details} onBack={() => setDetails(null)} />
        ) : (
          <SearchPage
            search={search}
            movies={movies}
            onSearchChange={setSearch}
            onSearch={searchMovies}
            onSelectMovie={getMovieDetails}
          />
        )}
      </div>
    </main>
  );
}
