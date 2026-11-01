
import banners from "../utils/CitiesData";
import Citycard from "./Citycard";

function City() {
  const cities = banners?.[0]?.categories || [];

  return (
    <section className="mx-auto my-16 w-[80%]">
      <h2 className="mb-4 text-2xl font-bold tracking-tight text-gray-900">
        Cities with food delivery
      </h2>

      <div className="grid grid-cols-2 gap-4 md:grid-cols-3 lg:grid-cols-4">
        {cities.slice(0, 11).map((item) => (
          <Citycard key={item.link} Citycard={item} />
        ))}

        <button
          onClick={() => {}}
          className="rounded-xl border border-gray-300 px-4 py-4 font-semibold text-orange-600 transition hover:bg-orange-50"
        >
          Show More⌄
        </button>
      </div>
    </section>
  );
}

export default City;
