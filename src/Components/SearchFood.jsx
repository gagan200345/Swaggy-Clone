import { useState, useMemo } from "react";
import { useLocation, Link } from "react-router-dom";

const SYNONYMS = {
  briyani: "biryani",
  biriyani: "biryani",
  panir: "paneer",
  chawmin: "chowmin",
  tandoori: "tandoori",
  tandori: "tandoori",
};

const normalize = (s = "") =>
  String(s)
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, " ")
    .split(/\s+/)
    .filter(Boolean)
    .map((w) => SYNONYMS[w] || w)
    .join(" ");

// Do words me kitna difference hai (typo tolerance)
const distance = (a, b) => {
  const dp = Array.from({ length: a.length + 1 }, (_, i) => [i]);
  for (let j = 1; j <= b.length; j++) dp[0][j] = j;
  for (let i = 1; i <= a.length; i++) {
    for (let j = 1; j <= b.length; j++) {
      dp[i][j] = Math.min(
        dp[i - 1][j] + 1,
        dp[i][j - 1] + 1,
        dp[i - 1][j - 1] + (a[i - 1] === b[j - 1] ? 0 : 1)
      );
    }
  }
  return dp[a.length][b.length];
};

// Ek query word, ek text ke saath kitna match karta hai (0 = match nahi)
const tokenScore = (token, words) => {
  const maxTypos = token.length <= 3 ? 0 : token.length <= 6 ? 1 : 2;
  let best = 0;
  for (const w of words) {
    if (w === token) best = Math.max(best, 10);
    else if (w.startsWith(token)) best = Math.max(best, 8);
    else if (w.includes(token)) best = Math.max(best, 6);
    else if (maxTypos > 0) {
      const d = Math.min(
        distance(token, w),
        distance(token, w.slice(0, token.length)) // prefix typo
      );
      if (d <= maxTypos) best = Math.max(best, 4 - d);
    }
  }
  return best;
};

const SearchFood = () => {
  const { state } = useLocation();

  // Link state se lo, warna sessionStorage se (refresh case)
  const foodItems = useMemo(() => {
    if (state?.foodItems?.length) {
      sessionStorage.setItem("foodItems", JSON.stringify(state.foodItems));
      return state.foodItems;
    }
    try {
      return JSON.parse(sessionStorage.getItem("foodItems") || "[]");
    } catch {
      return [];
    }
  }, [state]);

  const [inputValue, setInputValue] = useState("");
  const [searchValue, setSearchValue] = useState("");

  const handleSearch = (e) => {
    e.preventDefault();
    setSearchValue(inputValue); // button / Enter par bhi store
  };

  const handleChange = (e) => {
    setInputValue(e.target.value);
    setSearchValue(e.target.value); // live search
  };

  const results = useMemo(() => {
    const q = normalize(searchValue);
    if (!q) return foodItems; // empty query => saari dishes

    const tokens = q.split(" ");

    return foodItems
      .map((item) => {
        const nameWords = normalize(item.name).split(" ");
        const otherWords = normalize(`${item.category} ${item.description}`).split(" ");

        let total = 0;
        for (const t of tokens) {
          const inName = tokenScore(t, nameWords);
          const inOther = tokenScore(t, otherWords);
          const s = Math.max(inName * 2, inOther); // name ko zyada weight
          if (s === 0) return { item, score: 0 }; // har word match hona chahiye
          total += s;
        }
        return { item, score: total };
      })
      .filter((r) => r.score > 0)
      .sort((a, b) => b.score - a.score)
      .map((r) => r.item);
  }, [foodItems, searchValue]);

  if (foodItems.length === 0) {
    return (
      <div className="p-6">
        <p>Menu data nahi mila. Pehle kisi restaurant ka menu kholo.</p>
        <Link to="/" className="text-orange-500 underline">
          Home
        </Link>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4">
      <div className="flex items-center justify-between mb-3">
        <h2 className="text-xl font-bold">
          {state?.restaurantName ? `${state.restaurantName} - Search` : "Search Food"}
        </h2>
        <button
          onClick={() => window.history.back()}
          className="text-sm text-orange-500 underline"
        >
          ← Back to menu
        </button>
      </div>

      <form onSubmit={handleSearch} className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Search food... (e.g. paneer, biryani)"
          value={inputValue}
          onChange={handleChange}
          className="flex-1 rounded-full border border-gray-300 px-4 py-2 outline-none focus:border-orange-500"
        />
        <button
          type="submit"
          className="rounded-full bg-orange-500 px-5 py-2 font-bold text-white hover:bg-orange-600"
        >
          Search
        </button>
      </form>

      <p className="mb-3 text-sm text-gray-500">{results.length} dishes mili</p>

      {searchValue && results.length === 0 && (
        <p className="py-10 text-center text-gray-600">
          "{searchValue}" ke liye koi dish nahi mili.
        </p>
      )}

      <ul className="space-y-5">
        {results.map((item) => (
          <li key={item.id} className="flex gap-4 border-b border-gray-100 pb-5">
            <div className="flex-1">
              <h4 className="font-semibold">
                {item.isVeg ? "🟢" : "🔴"} {item.name}
              </h4>
              <p className="text-sm font-medium">₹{item.price}</p>
              {item.description && (
                <p className="mt-1 text-sm text-gray-500 line-clamp-2">
                  {item.description}
                </p>
              )}
            </div>
            {item.imageId && (
              <img
                src={`https://media-assets.swiggy.com/swiggy/image/upload/fl_lossy,f_auto,q_auto,w_208,h_208,c_fit/${item.imageId}`}
                alt={item.name}
                className="h-24 w-24 rounded-2xl object-cover"
                loading="lazy"
              />
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SearchFood;