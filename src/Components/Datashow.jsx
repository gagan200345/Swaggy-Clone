import { Link } from "react-router-dom";

function Datashow({ Datashow }) {
  return (
    <Link to={"/restaurant/" + Datashow.info.id}>
      <div className="group min-w-0 cursor-pointer">
        {/* Restaurant Image */}
        <div className="overflow-hidden rounded-2xl shadow-sm">
          <img
            className="h-48 w-full object-cover transition-transform duration-200 group-hover:scale-95"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/" +
              Datashow.info.cloudinaryImageId
            }
            alt={Datashow.info.name}
          />
        </div>

        {/* Restaurant Details */}
        <div className="px-3 pt-3">
          <h2 className="truncate text-lg font-bold text-gray-900">
            {Datashow.info.name}
          </h2>

          <p className="mt-0.5 flex items-center gap-1 font-semibold text-gray-800">
            <span className="flex h-5 w-5 items-center justify-center rounded-full bg-green-600 text-xs text-white">
              ★
            </span>

            {Datashow.info.avgRatingString}
            <span>·</span>
            {Datashow.info.sla?.slaString}
          </p>

          <p className="mt-1 truncate text-base text-gray-500">
            {Datashow.info.cuisines?.join(", ")}
          </p>

          <p className="mt-1 truncate text-base text-gray-500">
            {Datashow.info.areaName}
          </p>
        </div>
      </div>
    </Link>
  );
}

export default Datashow;