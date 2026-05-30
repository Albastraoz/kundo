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
          <button className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer" onClick={() => setDetails(null)}>Back to search</button>

          <div className="flex gap-4 mt-4">
            <div className="w-1/3 object-cover">
              <img src={details.Poster} alt={details.Title} />
            </div>
            
            <div className="flex flex-col gap-2 w-2/3">
              <div className="flex items-center gap-2">
                <h2 className="text-slate-400">Title: </h2>
                <h2 className="text-2xl font-semibold tracking-tight">{details.Title}</h2>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Year: </p>
                <p className="font-semibold tracking-tight">{details.Year}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Plot: </p>
                <p className="font-semibold tracking-tight">{details.Plot}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Director: </p>
                <p className="font-semibold tracking-tight">{details.Director}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Actors: </p>
                <p className="font-semibold tracking-tight">{details.Actors}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Genre: </p>
                <p className="font-semibold tracking-tight">{details.Genre}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Language: </p>
                <p className="font-semibold tracking-tight">{details.Language}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Country: </p>
                <p className="font-semibold tracking-tight">{details.Country}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Awards: </p>
                <p className="font-semibold tracking-tight">{details.Awards}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Ratings: </p>
                <p className="font-semibold tracking-tight">{details.Ratings.map((rating) => rating.Source).join(", ")}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Metascore: </p>
                <p className="font-semibold tracking-tight">{details.Metascore}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">imdbRating: </p>
                <p className="font-semibold tracking-tight">{details.imdbRating}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">imdbVotes: </p>
                <p className="font-semibold tracking-tight">{details.imdbVotes}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Type: </p>
                <p className="font-semibold tracking-tight">{details.Type}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">DVD: </p>
                <p className="font-semibold tracking-tight">{details.DVD}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">BoxOffice: </p>
                <p className="font-semibold tracking-tight">{details.BoxOffice}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Production: </p>
                <p className="font-semibold tracking-tight">{details.Production}</p>
              </div>

              <div className="flex items-center gap-2">
                <p className="text-slate-400">Website: </p>
                <p className="font-semibold tracking-tight">{details.Website}</p>
              </div>
            </div>
          </div>
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
