import { useState } from "react";
import "./App.css";
import type { MovieDetails, MovieSummary } from "./types/movie";

export default function App() {
  const [search, setSearch] = useState("");
  const [movies, setMovies] = useState<MovieSummary[]>([]);
  const [details, setDetails] = useState<MovieDetails | null>(null);

  const searchMovies = async () => {
    // Do api call to search for movies
    const response = await fetch(`http://localhost:8000/api/imdb/search?q=${search}`);
    const data = await response.json();
    console.log('searchMovies response:', data);
    setMovies(data.Search);
  }

  const getMovieDetails = async (imdbID: string) => {
    // Do api call to get movie details
    const response = await fetch(`http://localhost:8000/api/imdb/movies/${imdbID}`);
    const data = await response.json();
    console.log('getMovieDetails response:', data);
    setDetails(data);
  }

  return (
    <main className="min-h-screen bg-slate-900 px-6 py-12 text-slate-100">
      <div className="mx-auto max-w-4xl">
        <h1 className="text-3xl font-semibold tracking-tight mb-4">Kundo Movies</h1>
      
        {details && <div>
          <h2 className="text-2xl font-semibold tracking-tight">This is the details page</h2>

          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => setDetails(null)}>Back to search</button>
        </div>}

        {!details && <div>
          <div className="mb-8">
            <input className="bg-slate-800 text-slate-100 px-4 py-2 rounded-md me-4" type="text" value={search} onChange={(e) => setSearch(e.target.value)} />
            <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => searchMovies()}>Search</button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {movies.map((movie) => (
              <div key={movie.imdbID} className="cursor-pointer" onClick={() => getMovieDetails(movie.imdbID)}>
                <img src={movie.Poster} alt={movie.Title} />
                <h3>{movie.Title}</h3>
                <p>{movie.Year}</p>
              </div>
            ))}
          </div>
        </div>}
      </div>
    </main>
  );
}
