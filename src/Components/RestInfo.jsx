import AddButton from "./AddButton";

function RestInfo({ itemCards = [] }) {
  return (
    <div className="divide-y divide-gray-100">
      {itemCards.map((food) => {
        const info = food?.card?.info;
        if (!info) return null;

        const price = (info.price ?? info.defaultPrice ?? 0) / 100;
        const isVeg = Boolean(info.isVeg);
        const rating = info?.ratings?.aggregatedRating?.rating;
        const isBestseller = info?.isBestseller;

        return (
          <div key={info.id} className="flex justify-between gap-4 py-6">
            {/* Left: details */}
            <div className="flex-1 min-w-0">
              {/* Veg / Non-veg icon */}
              <span
                className={`inline-flex w-4 h-4 border-2 rounded-sm items-center justify-center ${
                  isVeg ? "border-green-600" : "border-red-500"
                }`}
              >
                <span
                  className={`w-2 h-2 rounded-full ${
                    isVeg ? "bg-green-600" : "bg-red-500"
                  }`}
                />
              </span>

              {isBestseller && (
                <span className="ml-2 text-xs font-bold text-orange-500">
                  ★ Bestseller
                </span>
              )}

              <h3 className="mt-1.5 text-base sm:text-lg font-bold text-gray-800 leading-snug">
                {info.name}
              </h3>

              <p className="mt-1 text-sm sm:text-base font-semibold text-gray-700">
                ₹{price}
              </p>

              {rating && (
                <p className="mt-1.5 text-xs font-semibold text-green-700">
                  ★ {rating}
                </p>
              )}

              {info.description && (
                <p className="mt-2.5 text-sm text-gray-500 leading-relaxed line-clamp-2">
                  {info.description}
                </p>
              )}
            </div>

            {/* Right: image + ADD */}
            <div className="relative w-28 sm:w-36 shrink-0 self-start pb-4">
              {info.imageId ? (
                <img
                  src={`https://media-assets.swiggy.com/swiggy/image/upload/${info.imageId}`}
                  alt={info.name}
                  loading="lazy"
                  className="w-full h-28 sm:h-36 object-cover rounded-2xl shadow-sm"
                />
              ) : (
                <div className="w-full h-28 sm:h-36 rounded-2xl bg-gray-100" />
              )}

              <div className="absolute bottom-0 left-1/2 -translate-x-1/2">
                <AddButton info={info} />
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
}

export default RestInfo;