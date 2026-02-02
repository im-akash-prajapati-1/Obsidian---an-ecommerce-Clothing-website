  import { useEffect, useState } from "react";
  import axios from "axios";
  import Hero from "../components/Layout/Hero";
  import FeaturedCollection from "../components/Products/FeaturedCollection";
  import FeaturesSection from "../components/Products/FeaturesSection";
  import GenderCollectionSection from "../components/Products/GenderCollectionSection";
  import NewArrivals from "../components/Products/NewArrivals";
  import ProductDetails from "../components/Products/ProductDetails";
  import ProductGrid from "../components/Products/ProductGrid";
  import ShopByCategory from "../components/Products/ShopByCategory";
  import { useDispatch, useSelector } from "react-redux";
  import { fetchProductByFilters } from "../redux/Slices/productsSlice";


  const Home = () => {
    const dispatch = useDispatch();
    const { products, error } = useSelector((state) => state.products);
    const loading = useSelector((state) => state.products.loading.products);
    const [bestSellerProduct, setBestSellerProduct] = useState(null);

    useEffect(() => {
      // fetch products for a specific collection
      dispatch(
        fetchProductByFilters({
          gender: "Women",
          category: "Top Wear",
          limit: 8,
        }),
      );
      // fetch best seller product
      const fetchBestSeller = async () => {
        try {
          const response = await axios.get(
            `${import.meta.env.VITE_BACKEND_URL}/api/products/best-seller`,
          );
          setBestSellerProduct(response.data);
        } catch (error) {
          console.error();
        }
      };
      fetchBestSeller();
    }, [dispatch]);

    return (
      <div className="bg-gray-50">
        <Hero />
        <GenderCollectionSection />
        <NewArrivals />
        <ShopByCategory />

        <h2 className="mt-10 text-3xl font-light tracking-wide text-center md:text-4xl">
          Best Seller
        </h2>
        {bestSellerProduct ? (
          <ProductDetails productId={bestSellerProduct._id} />
        ) : (
          <div className="flex items-center justify-center min-h-[300px]">
            <p className="text-base font-medium tracking-wider text-gray-700">
              Loading product details
            </p>
          </div>
        )}

        <div className="container mx-auto">
          <h2 className="mb-4 text-3xl font-light tracking-wide text-center md:text-4xl">
            Top Wears for Women
          </h2>
          <ProductGrid products={products} loading={loading} error={error} />
        </div>

        <FeaturedCollection />
        <FeaturesSection />
      </div>
    );
  };

  export default Home;
