import { Link } from "react-router-dom";

const ProductGrid = ({ products, loading, error }) => {
  
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-base font-medium tracking-wider text-gray-700">
          Loading products...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-base font-medium tracking-wider text-red-700">
          Error loading products: {error}
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
      {products.map((product, index) => (
        <Link
          key={index}
          to={`/product/${product._id}`}
          className="block group"
        > 
          <div className="overflow-hidden transition-shadow duration-300 bg-white shadow-sm rounded-xl hover:shadow-md">
            {/* Image */}
            <div className="w-full overflow-hidden bg-gray-100 h-96">
              <img
                src={product.images?.[0]?.url}
                alt={product.images?.[0]?.altText || product.name}
                className="object-cover w-full h-full transition-transform duration-300 transform group-hover:scale-105"
              />
            </div>

            {/* Content */}
            <div className="p-4 space-y-1">
              <h3 className="text-sm font-medium text-gray-900 line-clamp-2">
                {product.name}
              </h3>

              <p className="text-sm font-semibold tracking-tight text-gray-800">
                ₹ {product.price}
              </p>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
};

export default ProductGrid;
