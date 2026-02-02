import React from "react";
import { Link } from "react-router-dom";
import featuredImage from "../../assets/featured-collection.webp";

const FeaturedCollection = () => {
  return (
    <section className="py-32 px-6 lg:px-20 bg-gray-50">
      <div className="max-w-[1600px] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-20 items-center">

        {/* TEXT */}
        <div className="text-center lg:text-left rounded-r">
          <p className="text-xs uppercase tracking-[0.35em] text-gray-500 mb-6">
            Featured Collection
          </p>

          <h2 className="text-5xl sm:text-6xl lg:text-7xl font-light leading-[1.1] mb-10">
            Curated styles<br />
            for modern living
          </h2>

          <p className="text-lg text-gray-600 leading-relaxed max-w-2xl mx-auto lg:mx-0 mb-12">
            Discover a refined selection of pieces crafted with attention to
            detail, quality materials, and effortless style. Timeless designs
            made to elevate your everyday wardrobe.
          </p>

          <Link
            to="/collections/all"
            className="inline-block text-sm uppercase tracking-widest border-b border-black pb-1 hover:opacity-60 transition"
          >
            Shop the collection
          </Link>
        </div>

        {/* IMAGE */}
        <div className="relative overflow-hidden rounded-3xl rounded-l">
          <img
            src={featuredImage}
            alt="Featured Collection"
            className="w-full h-[680px] sm:h-[760px] lg:h-[820px] object-cover"
          />
        </div>

      </div>
    </section>
  );
};

export default FeaturedCollection;
