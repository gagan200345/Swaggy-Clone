import Footer from "./Footer";
import { useEffect, useState } from "react";
import Datashow from "./Datashow";
import Shimmer from "./Shimmer";
function Restuarent() {
  const [Restdata, setData] = useState([]);

  useEffect(() => {
    async function bro() {
      const response = await fetch(
        "/swiggy-api/dapi/restaurants/list/v5?lat=26.9136&lng=75.7858&is-seo-homepage-enabled=true&page_type=DESKTOP_WEB_LISTING"
      );

      const data = await response.json();

      setData(
        data?.data?.cards?.[1]?.card?.card?.gridElements?.infoWithStyle
          ?.restaurants
      );
    }

    bro();
  }, []);

  console.log(Restdata);

//shimmer Effect
if (Restdata.length === 0) return <Shimmer />;


  return (
    <div className="min-h-screen bg-white">


      {/* Restaurant Section */}
      <main className="mx-auto w-[90%] max-w-[1300px] py-9">
        <h1 className="mb-5 text-2xl font-extrabold text-gray-900">
          Restaurants with online food delivery in Jaipur
        </h1>

        {/* Restaurant Cards */}
        <div className="grid grid-cols-1 gap-x-8 gap-y-9 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {Restdata.map((item) => (
            <Datashow key={item.info.id} Datashow={item} />
          ))}
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default Restuarent;