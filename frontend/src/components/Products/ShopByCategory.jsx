import { Link } from "react-router-dom";

import newArrivals from "../../assets/newArrivals.webp";
import henley from "../../assets/HenleyTshirts.webp";
import shirts from "../../assets/Shirts.webp";
import selfDesign from "../../assets/Self-DesignTShirts.webp";
import PremiumPolo from "../../assets/PremiumPolo.webp";
import Hooded from "../../assets/Hooded.webp";
import CoOrds from "../../assets/Co-ords.webp";
import polo from "../../assets/PoloTShirts.webp";

const categories = [
  {
    title: "New Arrivals",
    image: newArrivals,
    link: "/collections/new-arrivals",
  },
  {
    title: "Henley T-Shirts",
    image: henley,
    link: "/collections/henley",
  },
  {
    title: "Shirts",
    image: shirts,
    link: "/collections/shirts",
  },
  {
    title: "Self-Design T-Shirts",
    image: selfDesign,
    link: "/collections/self-design",
  },
  {
    title: "Flat - Knit Premium Polo",
    image: PremiumPolo,
    link: "/collections/premium-polo",
  },
  {
    title: "Hooded T-Shirts",
    image: Hooded,
    link: "/collections/hooded-Tshirts",
  },
  {
    title: "Co-ords",
    image: CoOrds,
    link: "/collections/co-ords",
  },
  {
    title: "Polo T-Shirts",
    image: polo,
    link: "/collections/polo",
  },
];

const ShopByCategory = () => {
  return (
    <section className="py-10 lg:px-0">
      <div className="container mx-auto">
        <h2 className="text-3xl md:text-4xl font-semibold text-center mb-12 tracking-tight">
          Shop by Category
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.title}
              to={cat.link}
              className="group relative overflow-hidden rounded-lg"
            >
              <img
                src={cat.image}
                alt={cat.title}
                className="w-full h-[500px] object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition" />
              <div className="absolute bottom-12 shadow-md">
                <span className="bg-black text-white text-sm px-5 py-2 uppercase rounded-r tracking-widest">
                  {cat.title}
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShopByCategory;
