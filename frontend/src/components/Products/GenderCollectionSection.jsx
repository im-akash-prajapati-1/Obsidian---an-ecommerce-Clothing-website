import MensCollectionImg from "../../assets/mens-collection.webp";
import WomensCollectionImg from "../../assets/womens-collection.webp";
import { Link } from "react-router-dom";

const GenderCollectionSection = () => {
  return (
    <section className="px-4 py-16 lg:px-0">
      <div className="container flex flex-col gap-8 mx-auto md:flex-row">
        {/* Mens Collection */}
        <div className="relative flex-1 ">
          <img
            src={MensCollectionImg} 
            alt="Men's Collection"
            className="w-full h-[700px] object-cover rounded-lg object-[0%+80%]"
          />
          <div className="absolute bottom-0 left-0 p-4 mb-4 ml-4 bg-white rounded bg-opacity-90">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Men's Collection
            </h2>
            <Link to="/collections/all?gender=Men" className="text-gray-900 underline">
            Shop Now
            </Link>
          </div>
        </div>
        {/* Womens Collection */}
        <div className="relative flex-1 ">
          <img
            src={WomensCollectionImg}
            alt="Women's Collection"
            className="w-full h-[700px] object-cover rounded-lg object-[0%+22%]"
          />
          <div className="absolute bottom-0 left-0 p-4 mb-4 ml-4 bg-white rounded bg-opacity-90">
            <h2 className="mb-3 text-2xl font-bold text-gray-900">
              Women's Collection
            </h2>
            <Link to="/collections/all?gender=Women" className="text-gray-900 underline">
            Shop Now
            </Link>
          </div>
        </div>
        
      </div>
    </section>
  );
};

export default GenderCollectionSection;
