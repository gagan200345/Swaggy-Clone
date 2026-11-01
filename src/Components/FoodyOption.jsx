import imageGridCardss from "../utils/FoodyData";
import FoodyCard from "./FoodyCard";
function FoodyOption() {
  return (
    <div className="mt-20 w-[80%] container mx-auto mt-20">
      <h1 className="text-2xl font-bold">Shop Groceries on Instamart</h1>
      
      <div className="mt-5 container mx-auto flex flex-nowrap  gap-3 overflow-x-auto">
        {imageGridCardss.map((item) => (
          <FoodyCard key={item.id} FoodyCard={item} />
        ))}
      </div>
    </div>
  );
}
export default FoodyOption;
