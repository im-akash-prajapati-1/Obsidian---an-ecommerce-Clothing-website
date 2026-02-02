import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  deleteProduct,
  fetchAdminProducts,
} from "../../redux/Slices/adminProductSlice";

const ProductManagement = () => {
  const dispatch = useDispatch();
  const { products, loading, error } = useSelector(
    (state) => state.adminProducts,
  );

  useEffect(() => {
    dispatch(fetchAdminProducts());
  }, [dispatch]);

  const [searchTerm, setSearchTerm] = useState("");
  const [priceFilter, setPriceFilter] = useState("all");

  const handleProductDeletion = (productId) => {
    if (window.confirm("Are you Sure You want to delete this Product?")) {
      dispatch(deleteProduct(productId));
    }
  };

  if (loading) {
    return (
      <p className="text-base font-medium tracking-wider text-gray-700">
        Loading...
      </p>
    );
  }

  if (error) {
    return (
      <p className="text-base font-medium tracking-wider text-gray-700">
        Error: {error}
      </p>
    );
  }

  const filteredProducts = products.filter((product) => {
    const matchesSearch =
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.sku.includes(searchTerm);

    const matchesPrice =
      priceFilter === "all"
        ? true
        : priceFilter === "low"
          ? product.price < 500
          : priceFilter === "mid"
            ? product.price >= 500 && product.price <= 1000
            : product.price > 1000;

    return matchesSearch && matchesPrice;
  });

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Header */}
      <div className="flex flex-col gap-4 mb-8 md:flex-row md:items-center md:justify-between">
        <h2 className="text-4xl font-bold text-gray-800">Product Management</h2>

        {/* Search & Filter */}
        <div className="flex flex-col gap-3 sm:flex-row">
          <input
            type="text"
            placeholder="Search by name or SKU..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full px-4 py-2 border rounded-lg sm:w-64 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />

          <select
            value={priceFilter}
            onChange={(e) => setPriceFilter(e.target.value)}
            className="px-4 py-2 bg-white border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
          >
            <option value="all">All Prices</option>
            <option value="low">Below ₹500</option>
            <option value="mid">₹500 - ₹1000</option>
            <option value="high">Above ₹1000</option>
          </select>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-hidden bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-4">Product</th>
              <th className="px-6 py-4">Price</th>
              <th className="px-6 py-4">SKU</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredProducts.length > 0 ? (
              filteredProducts.map((product) => (
                <tr
                  key={product._id}
                  className="transition border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    {product.name}
                  </td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{product.price}
                  </td>

                  <td className="px-6 py-4 text-gray-500">{product.sku}</td>

                  <td className="px-6 py-4 space-x-2 text-right">
                    <Link
                      to={`/admin/products/${product._id}/edit`}
                      className="inline-block bg-yellow-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-yellow-600 transition"
                    >
                      Edit
                    </Link>

                    <button
                      onClick={() => handleProductDeletion(product._id)}
                      className="bg-red-500 text-white px-4 py-1.5 rounded-lg text-xs font-medium hover:bg-red-600 transition"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="py-10 text-center text-gray-500">
                  No products match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ProductManagement;
