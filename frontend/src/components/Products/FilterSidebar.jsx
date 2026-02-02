import { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

const FilterSidebar = ({ onClose }) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  const [Filters, setFilters] = useState({
    category: "",
    gender: "",
    color: "",
    size: [],
    Materials: [],
    brand: [],
    minPrice: 0,
    maxPrice: 10000,
  });

  const [priceRange, setPriceRange] = useState([0, 10000]);

  const categories = ["Top Wear", "Bottom Wear"];
  const genders = ["Men", "Women"];
  const colors = ["Red", "Blue", "Green", "Black", "White", "Yellow"];
  const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL", "3XL", "4XL"];
  const materials = ["Cotton", "Denim", "Leather", "Wool"];
  const brands = ["Zara", "H&M", "Uniqlo", "Levi's"];

  useEffect(() => {
    const params = Object.fromEntries([...searchParams]);

    setFilters({
      category: params.category || "",
      gender: params.gender || "",
      color: params.color || "",
      size: params.size ? params.size.split(",") : [],
      Materials: params.Materials ? params.Materials.split(",") : [],
      brand: params.brand ? params.brand.split(",") : [],
      minPrice: params.minPrice || 0,
      maxPrice: params.maxPrice || 10000,
    });

    setPriceRange([0, params.maxPrice || 10000]);
  }, [searchParams]);

  const updateURLParams = (newFilters) => {
    const params = new URLSearchParams();

    Object.keys(newFilters).forEach((key) => {
      if (Array.isArray(newFilters[key]) && newFilters[key].length) {
        params.set(key, newFilters[key].join(","));
      } else if (newFilters[key]) {
        params.set(key, newFilters[key]);
      }
    });

    setSearchParams(params);
    navigate(`?${params.toString()}`, { replace: true });
  };

  const handleBoxChange = (name, value, type) => {
    let newFilters = { ...Filters };

    if (type === "checkbox") {
      newFilters[name] = newFilters[name].includes(value)
        ? newFilters[name].filter((v) => v !== value)
        : [...newFilters[name], value];
    } else {
      newFilters[name] = value;
    }

    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handlePriceRangeChange = (e) => {
    const value = e.target.value;
    const newFilters = { ...Filters, minPrice: 0, maxPrice: value };
    setPriceRange([0, value]);
    setFilters(newFilters);
    updateURLParams(newFilters);
  };

  const handleClear = () => {
    setFilters({
      category: "",
      gender: "",
      color: "",
      size: [],
      Materials: [],
      brand: [],
      minPrice: 0,
      maxPrice: 10000,
    });
    setSearchParams({});
    navigate("", { replace: true });
    onClose();
  };

  const renderBoxes = (options, name, type) => (
    <div className="flex flex-wrap gap-3">
      {options.map((opt) => {
        const isActive =
          type === "checkbox"
            ? Filters[name].includes(opt)
            : Filters[name] === opt;

        return (
          <button
            key={opt}
            type="button"
            onClick={() => handleBoxChange(name, opt, type)}
            className={`min-w-[48px] px-4 py-2 text-sm uppercase border transition
            ${
              isActive
                ? "border-black text-black"
                : "border-gray-300 text-gray-700 hover:border-black"
            }`}
          >
            {opt}
          </button>
        );
      })}
    </div>
  );

  return (
    <div className="p-5 h-full flex flex-col bg-white">
      {/* HEADER */}
      <div className="flex justify-between items-center mb-5 border-b">
        <h3 className="text-xl font-medium text-gray-800">Filters</h3>
        <button onClick={onClose} className="text-2xl">
          ×
        </button>
      </div>

      <div className="flex-1 overflow-y-auto">
        {/* PRICE */}
        <div className="mb-8">
          <label className="block text-gray-600 font-medium mb-2">
            Price Range
          </label>
          <input
            type="range"
            min={0}
            max={10000}
            value={priceRange[1]}
            onChange={handlePriceRangeChange}
            className="w-full h-2 price-range"
          />
          <div className="flex justify-between text-gray-600 mt-1">
            <span>₹0</span>
            <span>₹{priceRange[1]}</span>
          </div>
        </div>

        {/* CATEGORY */}
        <div className="mb-5 ">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Category
          </label>
          {renderBoxes(categories, "category", "radio")}
        </div>

        {/* GENDER */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Gender
          </label>
          {renderBoxes(genders, "gender", "radio")}
        </div>

        {/* COLOR */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Color
          </label>
          {renderBoxes(colors, "color", "radio")}
        </div>

        {/* SIZE */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Size
          </label>
          {renderBoxes(sizes, "size", "checkbox")}
        </div>

        {/* MATERIAL */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Materials
          </label>
          {renderBoxes(materials, "Materials", "checkbox")}
        </div>

        {/* BRAND */}
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700 mb-3">
            Brand
          </label>
          {renderBoxes(brands, "brand", "checkbox")}
        </div>
      </div>

      {/* FOOTER */}
      <div className="flex gap-4 pt-4 border-t">
        <button
          onClick={handleClear}
          className="flex-1 py-3 bg-gray-200 text-sm uppercase"
        >
          Clear
        </button>
        <button
          onClick={onClose}
          className="flex-1 py-3 bg-black text-white text-sm uppercase"
        >
          View Results
        </button>
      </div>
    </div>
  );
};

export default FilterSidebar;
