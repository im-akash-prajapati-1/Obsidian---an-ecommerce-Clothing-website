import { useEffect, useMemo, useRef, useState } from "react";
import { FaFilter } from "react-icons/fa";
import FilterSidebar from "../components/Products/FilterSidebar";
import SortOptions from "../components/Products/SortOptions";
import ProductGrid from "../components/Products/ProductGrid";
import { useParams, useSearchParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchProductByFilters } from "../redux/Slices/productsSlice";

const CollectionPage = () => {
  const { collection } = useParams();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const {
    products,
    loading: { products: productsLoading },
    error,
  } = useSelector((state) => state.products);

  const queryParams = useMemo(() => {
    return Object.fromEntries([...searchParams]);
  }, [searchParams]);

  const SidebarRef = useRef(null);
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    if (!collection) return;
    dispatch(fetchProductByFilters({ collection, ...queryParams }));
  }, [collection, queryParams]);

  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  return (
    <div className="flex min-h-screen bg-white">
      {/* Sidebar */}
      <div
        ref={SidebarRef}
        className={`fixed inset-y-0 right-0 z-40 w-[32rem] bg-white border-l border-gray-400 transform transition-transform duration-300 ease-out shadow-2xl
        ${isSidebarVisible ? "translate-x-0" : "translate-x-full"}`}
      >
        {isSidebarVisible && <FilterSidebar onClose={toggleSidebar} />}
      </div>

      {/* Overlay (Mobile) */}
      {isSidebarVisible && (
        <div
          className="fixed inset-0 z-30 bg-black/20"
          onClick={() => setIsSidebarVisible(false)}
        />
      )}

      {/* Main Content */}
      <div className="flex-1 px-4 py-8 sm:px-6 lg:px-12">
        <div className="mb-8">
          <h2 className="text-xl sm:text-2xl font-light uppercase tracking-[0.25em] text-gray-900">
            All Collection
          </h2>
        </div>

        {/* FILTER + SORT BAR */}
        <div className="flex items-center justify-between h-12 mb-8 border-b border-gray-200">
          <div className="flex items-center h-full">
            <div className="flex items-center h-full text-xs tracking-widest text-gray-900 uppercase">
              <SortOptions />
            </div>
          </div>

          <button
            onClick={toggleSidebar}
            className="flex items-center h-full gap-2 text-xs tracking-widest text-gray-900 uppercase transition hover:opacity-70"
          >
            <FaFilter className="text-sm" />
            Filter
          </button>
        </div>

        {/* Product Grid */}
        <ProductGrid products={products} loading={productsLoading} error={error} />

      </div>
    </div>
  );
};

export default CollectionPage;
