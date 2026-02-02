  import { useEffect, useState } from "react";
  import { toast, Toaster } from "sonner";
  import ProductGrid from "./ProductGrid";
  import { useParams } from "react-router-dom";
  import { useDispatch, useSelector } from "react-redux";
  import { addToCart } from "../../redux/Slices/cartSlice";
  import {
    fetchProductDetails,
    fetchSimilarProducts,
  } from "../../redux/Slices/productsSlice";

  const ProductDetails = ({ productId }) => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { user, guestId } = useSelector((state) => state.auth);
    const [mainImage, setMainImage] = useState(null);
    const [selectedSize, setSelectedSize] = useState(null);
    const [selectedColor, setSelectedColor] = useState(null);
    const [quantity, setQuantity] = useState(1);
    const [isButtonDisabled, setIsButtonDisabled] = useState(false);

    const productFetchId = productId || id;
    const selectedProduct = useSelector(
      (state) => state.products.selectedProduct,
    );
    const similarProducts = useSelector(
      (state) => state.products.similarProducts,
    );
    const error = useSelector((state) => state.products.error);
    const loading = useSelector((state) => state.products.loading.productDetails);

    useEffect(() => {
      if (productFetchId) {
        dispatch(fetchProductDetails(productFetchId));
        dispatch(fetchSimilarProducts({ productId: productFetchId }));
      }
    }, [dispatch, productFetchId]);

    useEffect(() => {
      if (selectedProduct?.images?.length > 0) {
        setMainImage(selectedProduct.images[0].url);
      }
    }, [selectedProduct]);

    useEffect(() => {
      // Reset UI state when product changes
      setMainImage(null);
      setSelectedSize(null);
      setSelectedColor(null);
      setQuantity(1);
    }, [productFetchId]);

    useEffect(() => {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }, [productFetchId]);

    const handleAddToCart = () => {
      if (!selectedSize || !selectedColor) {
        toast.error("Select size & color first", { duration: 1000 });
        return;
      }
      setIsButtonDisabled(true);
      dispatch(
        addToCart({
          productId: productFetchId,
          quantity,
          size: selectedSize,
          color: selectedColor,
          guestId,
          userId: user?._id,
        }),
      )
        .then(() => {
          toast.success("Product added to the cart!", { duration: 1000 });
        })
        .finally(() => {
          setIsButtonDisabled(false);
        });
    };

    if (loading) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-base font-medium tracking-wider text-gray-700">
            Loading...
          </p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-base font-medium tracking-wider text-gray-700">
            Error: {error}
          </p>
        </div>
      );
    }

    return (
      <div className="px-4 py-10 bg-gray-50">
        {selectedProduct && (
          <div className="p-6 mx-auto shadow-sm max-w-7xl rounded-xl md:p-10">
            <div className="grid gap-10 md:grid-cols-2">
              {/* Images */}
              <div className="flex gap-4">
                <div className="flex-col hidden gap-3 md:flex">
                  {selectedProduct.images?.map((img, index) => (
                    <img
                      key={index}
                      src={img.url}
                      onClick={() => setMainImage(img.url)}
                      className={`w-20 h-20 rounded-lg object-cover cursor-pointer border 
                      ${
                        mainImage === img.url ? "border-black" : "border-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <div className="flex-1">
                  <img
                    src={mainImage}
                    className="w-full h-[450px] object-cover rounded-xl"
                  />
                </div>
              </div>

              {/* Info */}
              <div>
                <h1 className="mb-2 text-3xl font-semibold">
                  {selectedProduct.name}
                </h1>

                <div className="flex items-center gap-3 mb-4">
                  <span className="text-gray-400 line-through">
                    ₹{selectedProduct.originalPrice}
                  </span>
                  <span className="text-2xl font-medium text-black">
                    ₹{selectedProduct.price}
                  </span>
                  <span className="text-sm font-medium text-green-600">
                    (
                    {Math.round(
                      ((selectedProduct.originalPrice - selectedProduct.price) /
                        selectedProduct.originalPrice) *
                        100,
                    )}
                    % OFF)
                  </span>
                </div>

                <p className="mb-6 leading-relaxed text-gray-600">
                  {selectedProduct.description}
                </p>

                {/* Colors */}
                <div className="mb-6">
                  <p className="mb-2 font-medium">Color</p>
                  <div className="flex gap-2">
                    {selectedProduct.colors?.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-9 h-9 rounded-full border-2 transition
                        ${
                          selectedColor === color
                            ? "border-black scale-110"
                            : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                {/* Sizes */}
                <div className="mb-6">
                  <p className="mb-2 font-medium">Size</p>
                  <div className="flex flex-wrap gap-2">
                    {selectedProduct.sizes?.map((size) => (
                      <button
                        key={size}
                        onClick={() => setSelectedSize(size)}
                        className={`px-4 py-2 border rounded-md text-sm font-medium transition
                        ${
                          selectedSize === size
                            ? "bg-black text-white"
                            : "hover:border-black"
                        }`}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Quantity */}
                <div className="mb-6">
                  <p className="mb-2 font-medium">Quantity</p>
                  <div className="flex items-center gap-4">
                    <button
                      onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                      className="border rounded-md w-9 h-9"
                    >
                      −
                    </button>
                    <span className="text-lg font-medium">{quantity}</span>
                    <button
                      onClick={() => setQuantity((q) => q + 1)}
                      className="border rounded-md w-9 h-9"
                    >
                      +
                    </button>
                  </div>
                </div>

                {/* CTA */}
                <button
                  onClick={handleAddToCart}
                  disabled={isButtonDisabled}
                  className={`w-full py-3 rounded-lg font-medium tracking-wide transition
                  ${
                    isButtonDisabled
                      ? "bg-gray-400"
                      : "bg-black hover:bg-gray-900 text-white"
                  }`}
                >
                  {isButtonDisabled ? "ADDING..." : "ADD TO CART"}
                </button>

                {/* Characteristics */}
                <div className="pt-6 mt-10 border-t">
                  <h3 className="mb-4 font-semibold">Product Details</h3>
                  <div className="grid grid-cols-2 text-sm text-gray-600 gap-y-2">
                    <span>Brand</span>
                    <span>{selectedProduct.brand}</span>
                    <span>Material</span>
                    <span>{selectedProduct.material}</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Similar Products */}
            <div className="mt-20">
              <h2 className="mb-8 text-2xl font-light tracking-wide text-center md:text-4xl">
                You may also like
              </h2>
              <ProductGrid
                products={similarProducts}
                loading={loading}
                error={error}
              />
            </div>
          </div>
        )}
      </div>
    );
  };

  export default ProductDetails;
