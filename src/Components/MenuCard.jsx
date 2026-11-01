import { useState } from "react";
import RestInfo from "./RestInfo";

function filterItems(items, vegFilter) {
  const list = items || [];
  if (vegFilter === null || vegFilter === undefined) return list;

  return list.filter((food) => {
    const isVeg = Boolean(food?.card?.info?.isVeg);
    return isVeg === vegFilter;
  });
}

function Chevron({ open }) {
  return (
    <svg
      className={`w-5 h-5 text-gray-500 transition-transform duration-300 ${
        open ? "rotate-180" : ""
      }`}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.5"
      viewBox="0 0 24 24"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
    </svg>
  );
}

function MenuCard({ item, vegFilter }) {
  const cardData = item?.card?.card;
  const [isOpen, setIsOpen] = useState(true);

  if (!cardData) return null;

  const directItems = filterItems(cardData?.itemCards, vegFilter);
  const categories = cardData?.categories || [];

  return (
    <div className="w-full">
      {/* Direct Food Items */}
      {directItems.length > 0 && (
        <section className="border-b-[12px] border-gray-100 -mx-4 sm:-mx-6 px-4 sm:px-6 py-5">
          <button
            onClick={() => setIsOpen((prev) => !prev)}
            className="w-full flex justify-between items-center text-left group"
          >
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 group-hover:text-gray-950">
              {cardData?.title}{" "}
              <span className="text-gray-400 font-bold">
                ({directItems.length})
              </span>
            </h2>
            <Chevron open={isOpen} />
          </button>

          {isOpen && (
            <div className="mt-2">
              <RestInfo itemCards={directItems} />
            </div>
          )}
        </section>
      )}

      {/* Nested Categories */}
      {categories.length > 0 && (
        <div className="py-4">
          {cardData?.title && (
            <h2 className="text-lg sm:text-xl font-extrabold text-gray-800 mb-1">
              {cardData.title}
            </h2>
          )}
          {categories.map((category, index) => (
            <CategoryCard
              key={category?.categoryId || `${category?.title}-${index}`}
              category={category}
              vegFilter={vegFilter}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function CategoryCard({ category, vegFilter }) {
  const [isOpen, setIsOpen] = useState(false);

  const filteredItems = filterItems(category?.itemCards, vegFilter);

  if (filteredItems.length === 0) return null;

  return (
    <div className="border-b border-gray-200 last:border-b-0 py-4">
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="w-full flex justify-between items-center text-left group"
      >
        <h3 className="text-base sm:text-lg font-bold text-gray-700 group-hover:text-gray-900">
          {category?.title}{" "}
          <span className="text-gray-400 font-semibold">
            ({filteredItems.length})
          </span>
        </h3>
        <Chevron open={isOpen} />
      </button>

      {isOpen && (
        <div className="mt-2">
          <RestInfo itemCards={filteredItems} />
        </div>
      )}
    </div>
  );
}

export default MenuCard;