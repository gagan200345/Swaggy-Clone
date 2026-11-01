import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom"; // NEW: Link
import RestHeader from "./RestHeader";
import RestBanner from "./RestBanner";
import MenuCard from "./MenuCard";
import { countMatches } from "../utils/filterItems";
import { extractFoodItems } from "../utils/extractFoodItems"; // NEW

function ResturentMenu() {
  const { id } = useParams();

  const [data, setData] = useState([]);
  const [restInfo, setRestInfo] = useState(null);
  const [foodItems, setFoodItems] = useState([]); // NEW: search ke liye flat array
  const [vegFilter, setVegFilter] = useState(null);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(
          `/swiggy-api/mapi/menu/pl?page-type=REGULAR_MENU&complete-menu=true&lat=26.9136&lng=75.7858&restaurantId=${id}`
        );
        const json = await response.json();
        const cards = json?.data?.cards || [];

        const infoCard = cards.find(
          (c) => c?.card?.card?.info?.name && c?.card?.card?.info?.id
        );
        setRestInfo(infoCard?.card?.card?.info || null);

        // Menu
        const menuCards =
          cards.find((c) => c?.groupedCard)?.groupedCard?.cardGroupMap
            ?.REGULAR?.cards || [];

        setData(menuCards.filter((item) => item?.card?.card?.title));

        // NEW: itemCards + nested categories se unique food items (API dobara hit nahi hogi)
        const items = extractFoodItems(menuCards);
        setFoodItems(items);
        sessionStorage.setItem("foodItems", JSON.stringify(items)); // refresh backup
      } catch (error) {
        console.error("Menu fetch failed:", error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [id]);

  const totalMatches = countMatches(data, vegFilter, search);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-5xl mx-auto bg-white min-h-screen shadow-sm">
        {loading ? (
          <div className="animate-pulse">
            <div className="px-6 pt-8 space-y-4">
              <div className="h-10 w-10 rounded-full bg-gray-200" />
              <div className="h-9 w-2/3 rounded bg-gray-200" />
            </div>
            <div className="mt-5 h-48 sm:h-72 bg-gray-200" />
            <div className="px-6 py-5 space-y-3">
              <div className="h-5 w-1/2 rounded bg-gray-200" />
              <div className="h-4 w-1/3 rounded bg-gray-200" />
            </div>
          </div>
        ) : (
          <RestBanner info={restInfo} />
        )}

        {/* NEW: Search Food button */}
        {!loading && foodItems.length > 0 && (
          <div className="px-4 sm:px-6 pt-4">
            <Link
              to="/search"
              state={{ foodItems, restaurantName: restInfo?.name }}
              className="inline-flex items-center gap-2 rounded-full bg-orange-500 px-5 py-2 text-sm font-bold text-white hover:bg-orange-600 active:scale-95 transition"
            >
              🔍 Search Food
            </Link>
          </div>
        )}

        <RestHeader
          vegFilter={vegFilter}
          setVegFilter={setVegFilter}
          search={search}
          setSearch={setSearch}
        />

        {loading ? (
          <div className="px-5 py-6 space-y-6 animate-pulse">
            {[1, 2, 3, 4].map((n) => (
              <div key={n} className="flex gap-4">
                <div className="flex-1 space-y-3">
                  <div className="h-4 w-1/2 bg-gray-200 rounded" />
                  <div className="h-3 w-1/4 bg-gray-200 rounded" />
                  <div className="h-3 w-3/4 bg-gray-200 rounded" />
                </div>
                <div className="w-28 h-28 bg-gray-200 rounded-2xl" />
              </div>
            ))}
          </div>
        ) : totalMatches === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center px-4">
            <span className="text-5xl mb-4">🍽️</span>
            <h3 className="text-lg font-bold text-gray-800">
              No dishes found
            </h3>
            <p className="mt-1 text-sm text-gray-500">
              {search
                 ? `No results for "${search}". Try a different name.`
      : "There are no dishes for this filter."}
            </p>
            <button
              onClick={() => {
                setSearch("");
                setVegFilter(null);
              }}
              className="mt-5 rounded-full bg-orange-500 px-6 py-2 text-sm font-bold text-white hover:bg-orange-600 active:scale-95 transition"
            >
               Clear filters
            </button>
          </div>
        ) : (
          <div className="px-4 sm:px-6 pb-16">
            {data.map((item, index) => (
              <MenuCard
                key={`${item?.card?.card?.title}-${index}`}
                item={item}
                vegFilter={vegFilter}
                search={search}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default ResturentMenu;