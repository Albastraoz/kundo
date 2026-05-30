import type { MovieDetails } from "../types/movie";

interface MovieDetailsPageProps {
  details: MovieDetails;
  onBack: () => void;
}

function DetailRow({ label, value }: { label: string; value: string }) {
  return (
    <div className="flex items-center gap-2">
      <p className="text-slate-400">{label}: </p>
      <p className="font-semibold tracking-tight">{value}</p>
    </div>
  );
}

export default function MovieDetailsPage({ details, onBack }: MovieDetailsPageProps) {
  return (
    <div>
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-md cursor-pointer"
        onClick={onBack}
      >
        Back to search
      </button>

      <div className="flex gap-4 mt-4">
        <div className="w-1/3 object-cover">
          <img src={details.Poster} alt={details.Title} />
        </div>

        <div className="flex flex-col gap-2 w-2/3">
          <div className="flex items-center gap-2">
            <h2 className="text-slate-400">Title: </h2>
            <h2 className="text-2xl font-semibold tracking-tight">{details.Title}</h2>
          </div>

          <DetailRow label="Year" value={details.Year} />
          <DetailRow label="Plot" value={details.Plot} />
          <DetailRow label="Director" value={details.Director} />
          <DetailRow label="Actors" value={details.Actors} />
          <DetailRow label="Genre" value={details.Genre} />
          <DetailRow label="Language" value={details.Language} />
          <DetailRow label="Country" value={details.Country} />
          <DetailRow label="Awards" value={details.Awards} />
          <DetailRow
            label="Ratings"
            value={details.Ratings.map((rating) => rating.Source).join(", ")}
          />
          <DetailRow label="Metascore" value={details.Metascore} />
          <DetailRow label="imdbRating" value={details.imdbRating} />
          <DetailRow label="imdbVotes" value={details.imdbVotes} />
          <DetailRow label="Type" value={details.Type} />
          {details.DVD && <DetailRow label="DVD" value={details.DVD} />}
          {details.BoxOffice && <DetailRow label="BoxOffice" value={details.BoxOffice} />}
          {details.Production && <DetailRow label="Production" value={details.Production} />}
          {details.Website && <DetailRow label="Website" value={details.Website} />}
        </div>
      </div>
    </div>
  );
}
