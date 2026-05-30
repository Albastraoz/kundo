import type { MovieSummary } from "../types/movie";

interface SearchPageProps {
  search: string;
  movies: MovieSummary[];
  onSearchChange: (value: string) => void;
  onSearch: () => void;
  onSelectMovie: (imdbID: string) => void;
}

export default function SearchPage({
  search,
  movies,
  onSearchChange,
  onSearch,
  onSelectMovie,
}: SearchPageProps) {
  return (
    <div>
      <div className="mb-8">
        <input
          className="bg-slate-800 text-slate-100 px-4 py-2 rounded-md me-4"
          type="text"
          value={search}
          onChange={(e) => onSearchChange(e.target.value)}
        />
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
          onClick={onSearch}
        >
          Search
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        {movies.map((movie) => (
          <div
            key={movie.imdbID}
            className="cursor-pointer"
            onClick={() => onSelectMovie(movie.imdbID)}
          >
            <img src={movie.Poster} alt={movie.Title} />
            <h3>{movie.Title}</h3>
            <p>{movie.Year}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
