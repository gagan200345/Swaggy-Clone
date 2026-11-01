
import { useRef } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import dineoutRestaurants from "../utils/CardData";
import Cardcard from "./Cardcard";

function CardOption() {
  const listRef = useRef(null);

  function scroll(direction) {
    listRef.current?.scrollBy({
      left: direction === "left" ? -430 : 430,
      behavior: "smooth",
    });
  }

  return (
    <div className="mx-auto my-20 w-[80%]">
      {/* Heading and arrows */}
      <div className="mb-6 flex items-center justify-between gap-4">
        <h2 className="text-2xl font-bold text-gray-900 sm:text-3xl">
          Discover best restaurants on Dineout
        </h2>

        <div className="flex shrink-0 gap-3">
          <button
            onClick={() => scroll("left")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100 text-gray-500 transition hover:bg-gray-200"
            aria-label="Scroll left"
          >
            <ChevronLeft size={22} />
          </button>

          <button
            onClick={() => scroll("right")}
            className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-200 text-gray-800 transition hover:bg-gray-300"
            aria-label="Scroll right"
          >
            <ChevronRight size={22} />
          </button>
        </div>
      </div>

      {/* Restaurant cards */}
      <div
        ref={listRef}
        className="flex snap-x snap-mandatory gap-5 overflow-x-auto scroll-smooth pb-3 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden"
      >
        {dineoutRestaurants.map((item) => (
          <div key={item?.info?.id} className="snap-start">
            <Cardcard Cardcard={item} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default CardOption;
