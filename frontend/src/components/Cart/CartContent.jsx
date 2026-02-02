import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch } from "react-redux";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/Slices/cartSlice";

const CartContent = ({ cart = [], userId, guestId }) => {
  const dispatch = useDispatch();

  // handle adding or removing items from cart
  const handleAddtoCart = (productId, delta, quantity, size, color) => {
    const newQuantity = quantity + delta;
    if (newQuantity < 1) return;
    dispatch(
      updateCartItemQuantity({
        userId,
        guestId,
        productId,
        quantity: newQuantity,
        size,
        color,
      }),
    );
  };

  const handleRemoveFromCart = (productId, size, color) => {
    dispatch(removeFromCart({ userId, guestId, productId, size, color }));
  };

  const subtotal = cart.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  return (
    <div className="space-y-6">
      {cart.map((product, index) => (
        <div
          key={index}
          className="flex gap-4 pb-6 border-b border-gray-200 last:border-none"
        >
          {/* Image */}
          <img
            src={product.image}
            alt={product.name}
            className="object-cover w-20 rounded h-28"
          />

          {/* Content */}
          <div className="flex-1">
            <h3 className="text-sm font-medium leading-snug">{product.name}</h3>

            <p className="mt-1 text-sm text-gray-600">
              <span className="font-semibold">Size:</span> {product.size}
            </p>

            {/* Quantity */}
            <div className="flex items-center gap-2 mt-4">
              <div className="flex items-center border rounded-md bg-gray-50">
                <button onClick={() => handleAddtoCart(product.productId, -1, product.quantity, product.size, product.color)}
                className="px-3 py-1 text-sm transition hover:bg-gray-200">
                  -
                </button>
                <span className="px-4 text-sm text-black">
                  {product.quantity}
                </span>
                <button onClick={() => handleAddtoCart(product.productId, 1, product.quantity, product.size, product.color)}
                className="px-3 py-1 text-sm transition hover:bg-gray-200">
                  +
                </button>
              </div>
            </div>
          </div>

          {/* Price & Delete */}
          <div className="flex flex-col items-end justify-between">
            <p className="text-base font-semibold text-gray-900">
              ₹ {product.price.toLocaleString()}
            </p>

            <button onClick={() => handleRemoveFromCart(product.productId, product.size, product.color)}
            className="text-gray-300 transition hover:text-red-700">
              <RiDeleteBin3Line className="w-5 h-5" />
            </button>
          </div>
        </div>
      ))}

      {/* Subtotal */}
      <div className="flex justify-between pt-4 border-t border-gray-300">
        <span className="text-sm tracking-widest text-gray-600">SUBTOTAL</span>
        <span className="font-semibold">Rs. {subtotal.toLocaleString()}</span>
      </div>
    </div>
  );
};

export default CartContent;
