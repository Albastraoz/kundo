/** Single result from OMDb search (`?s=...`). */
export interface MovieSummary {
  Title: string;
  Year: string;
  imdbID: string;
  Type: string;
  Poster: string;
}

export interface MovieSearchResponse {
  Search: MovieSummary[];
  totalResults: string;
  Response: "True";
}

/** Full movie from OMDb details (`?i=...`). */
export interface MovieDetails {
  Title: string;
  Year: string;
  Rated: string;
  Released: string;
  Runtime: string;
  Genre: string;
  Director: string;
  Writer: string;
  Actors: string;
  Plot: string;
  Language: string;
  Country: string;
  Awards: string;
  Poster: string;
  Ratings: MovieRating[];
  Metascore: string;
  imdbRating: string;
  imdbVotes: string;
  imdbID: string;
  Type: string;
  DVD: string;
  BoxOffice: string;
  Production: string;
  Website: string;
  Response: "True";
}

export interface MovieRating {
  Source: string;
  Value: string;
}

export interface OmdbErrorResponse {
  Response: "False";
  Error: string;
}
