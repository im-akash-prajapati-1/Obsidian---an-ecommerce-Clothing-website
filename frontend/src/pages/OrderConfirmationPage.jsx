import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/Slices/cartSlice";

const OrderConfirmationPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { checkout } = useSelector((state) => state.checkout);

  // Clear Cart after order confirmation
  useEffect(() => {
    if (checkout && checkout._id) {
      dispatch(clearCart());
      localStorage.removeItem("cart");
    } else {
      navigate("/my-orders");
    }
  }, [checkout, dispatch, navigate]);

  const calculateEstimatedDelivery = (createdAt) => {
    const d = new Date(createdAt);
    d.setDate(d.getDate() + 10);
    return d.toLocaleDateString();
  };

  const subtotal = checkout.checkoutItems.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0,
  );

  const shipping = 0;
  const total = subtotal + shipping;

  return (
    <div className="min-h-screen py-12 bg-gray-100">
      <div className="max-w-5xl px-4 mx-auto space-y-8">
        {/* SUCCESS HEADER */}
        <div className="flex items-center gap-4 p-6 bg-white border shadow-sm rounded-xl">
          <div className="flex items-center justify-center w-12 h-12 text-xl rounded-full bg-emerald-100 text-emerald-700">
            ✓
          </div>
          <div>
            <h1 className="text-lg font-semibold text-gray-900">
              Order placed successfully
            </h1>
            <p className="text-sm text-gray-500">
              Your order has been confirmed and is being processed
            </p>
          </div>
        </div>

        {/* ORDER STATUS */}
        <div className="p-6 bg-white border shadow-sm rounded-xl">
          <div className="flex justify-between text-sm">
            {["Order Placed", "Shipped", "Out for Delivery", "Delivered"].map(
              (step, i) => (
                <div key={i} className="flex-1 text-center">
                  <div
                    className={`mx-auto w-3 h-3 rounded-full ${
                      i === 0 ? "bg-emerald-600" : "bg-gray-300"
                    }`}
                  />
                  <p className="mt-2 text-gray-600">{step}</p>
                </div>
              ),
            )}
          </div>
        </div>

        {/* MAIN GRID */}
        <div className="grid gap-6 md:grid-cols-3">
          {/* LEFT CONTENT */}
          <div className="bg-white border shadow-sm md:col-span-2 rounded-xl">
            {/* ORDER META */}
            <div className="flex justify-between px-6 py-5 border-b bg-gray-50">
              <div>
                <p className="text-xs text-gray-500">ORDER ID</p>
                <p className="font-medium text-gray-900">#{checkout._id}</p>
                <p className="mt-1 text-xs text-gray-400">
                  Placed on {new Date(checkout.createdAt).toLocaleDateString()}
                </p>
              </div>

              <div className="px-4 py-2 text-sm font-medium rounded-lg bg-emerald-50 text-emerald-700">
                Est. Delivery: {calculateEstimatedDelivery(checkout.createdAt)}
              </div>
            </div>

            {/* ITEMS */}
            <div className="px-6 py-6 space-y-5">
              {checkout.checkoutItems.map((item) => (
                <div
                  key={item.productId}
                  className="flex items-center gap-4 pb-4 border-b last:border-none"
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="object-cover w-16 h-16 border rounded-lg"
                  />
 
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{item.name}</p>
                    <p className="text-sm text-gray-500">
                      {item.color} • Size {item.size}
                    </p>
                    <p className="text-xs text-gray-400">
                      Qty: {item.quantity}
                    </p>
                  </div>

                  <p className="font-semibold text-gray-900">₹{item.price}</p>
                </div>
              ))}
            </div>
          </div>

          {/* RIGHT SUMMARY */}
          <div className="p-6 space-y-4 bg-white border shadow-sm rounded-xl h-fit">
            <h3 className="font-semibold text-gray-900">Order Summary</h3>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Subtotal</span>
              <span>₹{subtotal}</span>
            </div>

            <div className="flex justify-between text-sm text-gray-600">
              <span>Shipping</span>
              <span className="text-emerald-600">Free</span>
            </div>

            <div className="flex justify-between pt-3 font-semibold border-t">
              <span>Total</span>
              <span>₹{total}</span>
            </div>

            <div className="pt-4 text-sm text-gray-600">
              <p className="mb-1 font-medium text-gray-900">Shipping Address</p>
              <p>{checkout.shippingAddress.address}</p>
              <p>
                {checkout.shippingAddress.city},{" "}
                {checkout.shippingAddress.state},{" "}
                {checkout.shippingAddress.country}
              </p>
            </div>

            <div className="pt-4">
              <button
                onClick={() => navigate("/")}
                className="w-full py-3 text-sm font-medium text-white transition bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                Continue Shopping
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default OrderConfirmationPage;
