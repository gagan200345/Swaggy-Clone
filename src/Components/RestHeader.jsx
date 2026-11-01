function RestHeader({ vegFilter, setVegFilter }) {
  const base =
    "flex items-center gap-2.5 rounded-full border px-4 py-2 text-sm font-semibold transition-all duration-200 active:scale-95";

  return (
    <div className="sticky top-0 z-20 bg-white/90 backdrop-blur border-b border-gray-100 px-4 sm:px-6 py-4">
      <div className="flex items-center gap-3">
        {/* Veg */}
        <button
          onClick={() => setVegFilter(vegFilter === true ? null : true)}
          className={`${base} ${
            vegFilter === true
              ? "bg-green-50 border-green-600 text-green-700 shadow-sm"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span className="w-4 h-4 border-2 border-green-600 rounded-sm flex items-center justify-center">
            <span className="w-2 h-2 bg-green-600 rounded-full" />
          </span>
          Veg
        </button>

        {/* Non-Veg */}
        <button
          onClick={() => setVegFilter(vegFilter === false ? null : false)}
          className={`${base} ${
            vegFilter === false
              ? "bg-red-50 border-red-500 text-red-600 shadow-sm"
              : "bg-white border-gray-200 text-gray-600 hover:border-gray-300 hover:bg-gray-50"
          }`}
        >
          <span className="w-4 h-4 border-2 border-red-500 rounded-sm flex items-center justify-center">
            <span className="w-2 h-2 bg-red-500 rounded-full" />
          </span>
          Non-Veg
        </button>
      </div>
    </div>
  );
}

export default RestHeader;