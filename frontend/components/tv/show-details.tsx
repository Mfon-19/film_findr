import { ShowDetails as ShowDetailsType } from "@/lib/types";

interface ShowDetailsProps {
  show: ShowDetailsType;
}

export default function ShowDetails({ show }: ShowDetailsProps) {
  const creators =
    show.createdBy?.map((creator) => creator.name).join(", ") ?? "Unknown";

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "long",
      day: "numeric",
      year: "numeric",
    });
  };

  const formatStatus = (status: string) => {
    return status.charAt(0).toUpperCase() + status.slice(1).toLowerCase();
  };

  return (
    <div className="mb-10 grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-5">
      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Created by
        </h3>
        <p className="text-gray-200">{creators}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Genres
        </h3>
        <p className="text-gray-200">{show.genres.join(", ")}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          First Air Date
        </h3>
        <p className="text-gray-200">{formatDate(show.firstAirDate)}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Seasons
        </h3>
        <p className="text-gray-200">{show.numberOfSeasons}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Episodes
        </h3>
        <p className="text-gray-200">{show.numberOfEpisodes}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Status
        </h3>
        <p className="text-gray-200">{formatStatus(show.status)}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Last Air Date
        </h3>
        <p className="text-gray-200">
          {show.lastAirDate ? formatDate(show.lastAirDate) : "Ongoing"}
        </p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Rating
        </h3>
        <p className="text-gray-200">{show.voteAverage.toFixed(1)}/10</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Adult Content
        </h3>
        <p className="text-gray-200">{show.adult ? "Yes" : "No"}</p>
      </div>

      <div className="space-y-2">
        <h3 className="text-sm font-medium uppercase tracking-wide text-gray-400">
          Original Language
        </h3>
        <p className="text-gray-200">
          {show.originalLanguage?.toUpperCase() || "N/A"}
        </p>
      </div>
    </div>
  );
}