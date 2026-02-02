import { useEffect, useRef, useState } from "react";
import axios from "axios";
import { FiChevronsLeft, FiChevronsRight } from "react-icons/fi";
import { Link } from "react-router-dom";

const NewArrivals = () => {
  const scrollRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startScrollLeft, setStartScrollLeft] = useState(0);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const [newArrivals, setNewArrivals] = useState([]);

  useEffect(() => {
    const fetchNewArrivals = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_BACKEND_URL}/api/products/new-arrivals`,
        );
        setNewArrivals(response.data);
      } catch (error) {
        console.error(error);
      }
    };
    fetchNewArrivals();
  }, []);

  const handleMouseDown = (e) => {
    if (!scrollRef.current) return;
    setIsDragging(true);
    setStartX(e.pageX - scrollRef.current.offsetLeft);
    setStartScrollLeft(scrollRef.current.scrollLeft);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !scrollRef.current) return;
    const x = e.pageX - scrollRef.current.offsetLeft;
    const walk = x - startX;
    scrollRef.current.scrollLeft = startScrollLeft - walk;
  };

  const handleMouseUpOrLeave = () => setIsDragging(false);

  const scroll = (direction) => {
    if (!scrollRef.current) return;
    const amount = scrollRef.current.clientWidth * 0.85;
    scrollRef.current.scrollBy({
      left: direction === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  const updateScrollButtons = () => {
    if (!scrollRef.current) return;
    const el = scrollRef.current;
    setCanScrollLeft(el.scrollLeft > 0);
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 5);
  };

  useEffect(() => {
    if (!scrollRef.current) return;
    updateScrollButtons();
    const el = scrollRef.current;
    el.addEventListener("scroll", updateScrollButtons);
    return () => el.removeEventListener("scroll", updateScrollButtons);
  }, []);

  return (
    <section className="py-24 bg-gray-50">
      <div className="container relative px-6 mx-auto mb-12">
        <h2 className="mb-4 text-3xl font-light tracking-wide md:text-4xl">
          New Arrivals
        </h2>
        <p className="max-w-2xl text-base leading-relaxed text-gray-500">
          Discover our newest pieces — thoughtfully designed, modern essentials
          crafted for everyday style.
        </p>

        <div className="absolute hidden gap-3 -translate-y-1/2 right-6 top-1/2 md:flex">
          <button
            onClick={() => scroll("left")}
            disabled={!canScrollLeft}
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition ${
              canScrollLeft
                ? "border-black hover:bg-black hover:text-white"
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            <FiChevronsLeft className="text-xl" />
          </button>

          <button
            onClick={() => scroll("right")}
            disabled={!canScrollRight}
            className={`w-11 h-11 flex items-center justify-center rounded-full border transition ${
              canScrollRight
                ? "border-black hover:bg-black hover:text-white"
                : "border-gray-200 text-gray-300 cursor-not-allowed"
            }`}
          >
            <FiChevronsRight className="text-xl" />
          </button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className={`container mx-auto flex gap-8 overflow-x-scroll px-6 scrollbar-hide ${
          isDragging ? "cursor-grabbing" : "cursor-grab"
        }`}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUpOrLeave}
        onMouseLeave={handleMouseUpOrLeave}
      >
        {newArrivals.map((product) => (
          <div
            key={product._id}
            className="min-w-[85%] sm:min-w-[45%] lg:min-w-[28%] group relative"
          >
            <div className="overflow-hidden rounded-lg">
              <Link to={`/product/${product._id}`}>
              <img
                src={product.images?.[0]?.url}
                alt={product.name}
                draggable="false"
                className="w-full h-[520px] object-cover transition-transform duration-500 group-hover:scale-105"
              /></Link>
            </div>

            <div className="mt-4">
              <Link to={`/product/${product._id}`}>
                <h3 className="text-base font-medium tracking-wide text-gray-900">
                  {product.name}
                </h3>
                <p className="mt-1 text-sm text-gray-600">
                  ₹{product.price}
                </p>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default NewArrivals;
