import { useNavigate } from "react-router-dom";

function RestBanner({ info }) {
  const navigate = useNavigate();

  if (!info) return null;

  const {
    name,
    cloudinaryImageId,
    avgRating,
    totalRatingsString,
    costForTwoMessage,
    cuisines = [],
    areaName,
    availability,
    sla,
  } = info;

  const imageUrl = cloudinaryImageId
    ? `https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_1200,h_500,c_fill/${cloudinaryImageId}`
    : null;

  const isOpen = availability?.opened;

  return (
    <div className="bg-white">
      {/* Back button + name */}
      <div className="px-4 sm:px-6 pt-5">
        <button
          onClick={() => navigate(-1)}
          aria-label="Go back"
          className="mb-4 flex h-10 w-10 items-center justify-center rounded-full hover:bg-gray-100 active:scale-95 transition"
        >
          <svg
            className="h-6 w-6 text-gray-600"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M10 19l-7-7m0 0l7-7m-7 7h18"
            />
          </svg>
        </button>

        <h1 className="text-3xl sm:text-4xl font-extrabold text-gray-900 leading-tight">
          {name}
        </h1>
      </div>

      {/* Banner image */}
      <div className="mt-5 h-48 sm:h-72 w-full overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="h-full w-full object-cover"
          />
        ) : (
          <div className="flex h-full w-full items-center justify-center text-5xl">
            🍽️
          </div>
        )}
      </div>

      {/* Details */}
      <div className="px-4 sm:px-6 py-5 space-y-2">
        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-lg sm:text-xl font-extrabold text-gray-900">
          {avgRating && (
            <span className="flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-green-600 text-xs text-white">
                ★
              </span>
              {avgRating}
              {totalRatingsString && (
                <span className="font-bold">({totalRatingsString})</span>
              )}
            </span>
          )}

          {avgRating && costForTwoMessage && (
            <span className="text-gray-400">•</span>
          )}

          {costForTwoMessage && <span>{costForTwoMessage}</span>}
        </div>

        {cuisines.length > 0 && (
          <p className="text-sm sm:text-base font-bold text-orange-600 underline decoration-orange-300 underline-offset-2">
            {cuisines.join(", ")}
          </p>
        )}

        <div className="flex flex-wrap items-center gap-x-2 text-sm sm:text-base font-semibold">
          {availability && (
            <span className={isOpen ? "text-green-600" : "text-red-500"}>
              {isOpen ? "Open now" : "Closed"}
            </span>
          )}

          {sla?.slaString && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{sla.slaString}</span>
            </>
          )}

          {areaName && (
            <>
              <span className="text-gray-400">•</span>
              <span className="text-gray-500">{areaName}</span>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default RestBanner;