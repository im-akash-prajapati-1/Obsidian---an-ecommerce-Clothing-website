import axios from "axios";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { RiDeleteBin3Line } from "react-icons/ri";
import {
  fetchProductDetails,
  updateProduct,
} from "../../redux/Slices/productsSlice";

const EditProductPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { selectedProduct, loading, error } = useSelector(
    (state) => state.products,
  );

  const [productData, setProductData] = useState({
    name: "",
    description: "",
    price: 0,
    countInStock: 0,
    sku: "",
    category: "",
    brand: "",
    sizes: [],
    colors: [],
    collections: "",
    material: "",
    gender: "",
    images: [],
  });

  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (id) {
      dispatch(fetchProductDetails(id));
    }
  }, [dispatch, id]);

  useEffect(() => {
    if (selectedProduct) {
      setProductData(selectedProduct);
    }
  }, [selectedProduct]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData((prev) => ({ ...prev, [name]: value }));
  };

  const handleImgUpload = async (e) => {
    const file = e.target.files[0];
    const formData = new FormData();
    formData.append("image", file);

    try {
      setUploading(true);
      const { data } = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/upload`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        },
      );
      setProductData((prevData) => ({
        ...prevData,
        images: [...prevData.images, { url: data.imageUrl, altText: "" }],
      }));
      setUploading(false);
    } catch (error) {
      console.error(error);
      setUploading(false);
    }
  };

  const handleRemoveImage = (index) => {
    setProductData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(updateProduct({ productId: id, productData }));
    navigate("/admin/products");
  };

  if (loading.productDetails) {
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
    <div className="max-w-5xl p-6 mx-auto shadow-md bg-gray-50 rounded-xl">
      <h2 className="mb-8 text-4xl font-bold text-gray-800">Edit Product</h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Product Name */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Product Name
          </label>
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Description */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Description
          </label>
          <textarea
            name="description"
            value={productData.description}
            onChange={handleChange}
            rows={4}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            required
          />
        </div>

        {/* Price & Stock */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Price
            </label>
            <input
              type="number"
              name="price"
              value={productData.price}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Count in Stock
            </label>
            <input
              type="number"
              name="countInStock"
              value={productData.countInStock}
              onChange={handleChange}
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
            />
          </div>
        </div>

        {/* SKU */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">SKU</label>
          <input
            type="text"
            name="sku"
            value={productData.sku}
            onChange={handleChange}
            className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        {/* Sizes & Colors */}
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Sizes (comma-separated)
            </label>
            <input
              type="text"
              name="sizes"
              value={productData.sizes.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  sizes: e.target.value.split(",").map((s) => s.trim()),
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>

          <div>
            <label className="block mb-2 font-semibold text-gray-700">
              Colors (comma-separated)
            </label>
            <input
              type="text"
              name="colors"
              value={productData.colors.join(", ")}
              onChange={(e) =>
                setProductData({
                  ...productData,
                  colors: e.target.value.split(",").map((c) => c.trim()),
                })
              }
              className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
              required
            />
          </div>
        </div>

        {/* Image Upload */}
        <div>
          <label className="block mb-2 font-semibold text-gray-700">
            Upload Images
          </label>
          <input type="file" onChange={handleImgUpload} className="mb-4" />
          {uploading && (
            <p className="text-base tracking-wider text-gray-700">
              Uploading image...
            </p>
          )}
          {/* Render Images */}
          <div className="flex flex-wrap gap-4">
            {productData.images.map((img, idx) => {
              const imageUrl = typeof img === "string" ? img : img.url;

              return (
                <div
                  key={idx}
                  className="relative w-24 h-24 overflow-hidden rounded-lg shadow-md group"
                >
                  <img
                    src={imageUrl}
                    alt={`Product ${idx + 1}`}
                    className="object-cover w-full h-full"
                  />

                  {/* Hover Overlay */}
                  <div className="absolute inset-0 flex items-center justify-center transition-opacity opacity-0 bg-black/30 group-hover:opacity-100">
                    <button
                      type="button"
                      onClick={() => handleRemoveImage(idx)}
                      className="text-gray-300 transition hover:text-red-600"
                    >
                      <RiDeleteBin3Line className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full py-3 font-semibold text-white transition-colors bg-green-500 rounded-lg hover:bg-green-600"
        >
          Save Product
        </button>
      </form>
    </div>
  );
};

export default EditProductPage;
