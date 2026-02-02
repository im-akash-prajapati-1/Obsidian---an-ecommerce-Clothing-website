import { useState } from "react";
import { HiMagnifyingGlass, HiMiniXMark } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchProductByFilters, setFilters } from "../../redux/Slices/productsSlice";

const popularSearches = [
  "Winter Jackets",
  "Oversized Shirts",
  "Denim Jeans",
  "Hoodies",
  "New Arrivals",
];

const Searchbar = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSearchToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    dispatch(setFilters({ search: searchTerm }));
    dispatch(fetchProductByFilters({ search: searchTerm }));
    navigate(`/collections/all?search=${searchTerm}`);
    setIsOpen(false);
  };

  return (
    <>
      <button
        onClick={handleSearchToggle}
        className="transition hover:opacity-70"
      >
        <HiMagnifyingGlass className="w-6 h-6 text-gray-800" />
      </button>

      {isOpen && (
        <div className="fixed inset-0 z-50">
          <div
            onClick={handleSearchToggle}
            className="absolute inset-0 transition-opacity duration-300 bg-black/40 backdrop-blur-sm"
          />

          <div className="relative mx-auto mt-32 w-[90%] max-w-5xl bg-white px-6 py-6 shadow-xl animate-searchFade">
            {/* Input */}
            <form onSubmit={handleSearch}>
              <div className="relative border-b border-black">
                <input
                  type="text"
                  placeholder="Search products"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  autoFocus
                  className="w-full py-4 pr-10 text-lg tracking-wide placeholder:text-gray-400 focus:outline-none"
                />
                <button
                  type="submit"
                  className="absolute right-0 -translate-y-1/2 top-1/2"
                >
                  <HiMagnifyingGlass className="w-6 h-6 text-black" />
                </button>
              </div>
            </form>

            {/* Popular Searches */}
            <div className="mt-6">
              <p className="mb-3 text-xs tracking-widest text-gray-500 uppercase">
                Suggestions
              </p>

              <div className="flex flex-wrap gap-3">
                {popularSearches.map((item) => (
                  <button
                    key={item}
                    onClick={() => {
                      setSearchTerm(item);
                      console.log("Searching for:", item);
                      setIsOpen(false);
                    }}
                    className="px-4 py-2 text-sm transition border border-gray-300 hover:border-black hover:text-black"
                  >
                    {item}
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Searchbar;
