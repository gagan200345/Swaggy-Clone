
function Cardcard({ Cardcard }) {
  return (
    <div className="w-[410px] flex-none overflow-hidden rounded-2xl border border-gray-200 bg-white shadow-sm">
      <a
        target="_blank"
        rel="noreferrer"
        href={Cardcard?.cta?.link}
      >
        <div className="relative">
          <img
            className="h-[238px] w-full object-cover"
            src={
              "https://media-assets.swiggy.com/swiggy/image/upload/" +
              (Cardcard?.info?.mediaFiles?.[0]?.url || "")
            }
            alt={Cardcard?.info?.name || "Restaurant"}
          />

          <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-black to-transparent" />

          <p className="absolute bottom-4 left-4 z-10 text-xl font-bold text-white">
            {Cardcard?.info?.name}
          </p>

          <p className="absolute bottom-4 right-4 z-10 font-bold text-white">
            ⭐ {Cardcard?.info?.rating?.value}
          </p>

          {Cardcard?.info?.ribbon?.[0]?.text && (
            <p className="absolute left-0 top-7 bg-gradient-to-r from-red-500 to-yellow-400 px-2 py-1 text-xs font-bold text-white">
              {Cardcard.info.ribbon[0].text}
            </p>
          )}
        </div>
      </a>

      <div className="space-y-2 p-4 text-[15px] text-gray-600">
        <div className="flex justify-between gap-3">
          <p>{Cardcard?.info?.cuisines?.join(" • ")}</p>
          <p className="shrink-0">{Cardcard?.info?.costForTwo}</p>
        </div>

        <div className="flex justify-between gap-3">
          <p>
            {Cardcard?.info?.locality},{" "}
            {Cardcard?.info?.locationInfo?.city?.name}
          </p>
          <p className="shrink-0">
            {Cardcard?.info?.locationInfo?.distanceString}
          </p>
        </div>

        {Cardcard?.info?.offerInfoV3?.vendorOffer?.title && (
          <div className="flex items-center justify-between gap-2 rounded-lg bg-emerald-600 px-3 py-3 font-bold text-white">
            <span>
              {Cardcard.info.offerInfoV3.vendorOffer.title}
            </span>
            <span className="shrink-0 text-sm">
              {Cardcard.info.offerInfoV3.vendorOffer.subtext}
            </span>
          </div>
        )}

        {Cardcard?.info?.customerOffer?.info?.description && (
          <p className="rounded-lg bg-emerald-100 p-3 text-emerald-600">
            {Cardcard.info.customerOffer.info.description}
          </p>
        )}

        {Cardcard?.info?.offerInfoV3?.couponOffer?.title && (
          <p className="text-sm font-medium text-indigo-600">
            {Cardcard.info.offerInfoV3.couponOffer.title}
          </p>
        )}
      </div>
    </div>
  );
}

export default Cardcard;
