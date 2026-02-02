import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PayPalButton from "./PayPalButton";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "./../../redux/Slices/checkoutSlice";
import axios from "axios";
import PhoneInput from "react-phone-number-input";
import { isValidPhoneNumber } from "react-phone-number-input";

const Checkout = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);

  const [phone, setPhone] = useState("");
  const [phoneError, setPhoneError] = useState("");

  const [checkoutId, setCheckoutId] = useState(null);
  const [shippingAddress, setShippingAddress] = useState({
    firstName: "",
    lastName: "",
    address: "",
    city: "",
    postalCode: "",
    state: "",
    country: "",
    phone: "",
  });

  // Ensure cart is loaded before rendering
  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);

  const handleCreateCheckout = async (e) => {
    e.preventDefault();

    const updatedAddress = {
      ...shippingAddress,
      phone,
    };

    if (!isValidPhoneNumber(phone)) {
      setPhoneError("Please enter a valid phone number");
      return;
    }
    setPhoneError("");

    if (cart && cart.products.length > 0) {
      const res = await dispatch(
        createCheckout({
          checkoutItems: cart.products,
          shippingAddress: updatedAddress,
          paymentMethod: "PayPal",
          totalPrice: cart.totalPrice,
        }),
      );
      if (res.payload && res.payload._id) {
        setCheckoutId(res.payload._id);
      }
    }
  };

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "Paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      await handleFinalizeCheckout(checkoutId);
    } catch (error) {
      console.error("Payment processing failed:", error);
    }
  };

  const handleFinalizeCheckout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        },
      );
      navigate("/order-confirmation");
    } catch (error) {
      console.error("Finalizing checkout failed:", error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-base font-medium tracking-wider text-gray-700">
          Loading Cart...
        </p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-base font-medium tracking-wider text-red-700">
          Error: {error}
        </p>
      </div>
    );
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <p className="text-base font-medium tracking-wider text-red-700">
          Your cart is empty.
        </p>
      </div>
    );
  }

  const inputClass =
    "w-full rounded-md border border-gray-300 px-3 py-2 text-sm focus:border-black focus:ring-1 focus:ring-black outline-none";

  return (
    <div className="max-w-[1450px] mx-auto px-6 py-12">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
        {/* LEFT - CHECKOUT FORM */}
        <div className="p-8 bg-white shadow-sm rounded-xl">
          <h2 className="mb-8 text-2xl font-semibold">CHECKOUT</h2>
          <form onSubmit={handleCreateCheckout} className="space-y-8">
            {/* CONTACT */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-600 uppercase">
                Contact Information
              </h3>
              <input
                type="email"
                value={user ? user.email : ""}
                disabled
                className={`${inputClass} bg-gray-100 cursor-not-allowed`}
              />
            </div>

            {/* DELIVERY */}
            <div>
              <h3 className="mb-4 text-sm font-semibold text-gray-600 uppercase">
                Delivery Address
              </h3>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="First name"
                  value={shippingAddress.firstName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      firstName: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />

                <input
                  placeholder="Last name"
                  value={shippingAddress.lastName}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      lastName: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </div>

              <input
                placeholder="Street address"
                value={shippingAddress.address}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    address: e.target.value,
                  })
                }
                className={`${inputClass} mb-4`}
                required
              />

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="City"
                  value={shippingAddress.city}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      city: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />

                <input
                  placeholder="Postal code"
                  value={shippingAddress.postalCode}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      postalCode: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4 mb-4">
                <input
                  placeholder="State"
                  value={shippingAddress.state}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      state: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />

                <input
                  placeholder="Country"
                  value={shippingAddress.country}
                  onChange={(e) =>
                    setShippingAddress({
                      ...shippingAddress,
                      country: e.target.value,
                    })
                  }
                  className={inputClass}
                  required
                />
              </div>

              <div>
                <div
                  className={`phone-wrapper ${phoneError ? "phone-error" : ""}`}
                >
                  <PhoneInput
                    international
                    defaultCountry="IN"
                    value={phone}
                    onChange={(value) => {
                      setPhone(value);
                      setPhoneError("");
                    }}
                    required
                  />
                </div>

                {phoneError && (
                  <p className="mt-1 text-xs text-red-600">{phoneError}</p>
                )}
              </div>
              
            </div>

            {/* PAYMENT */}
            {!checkoutId ? (
              <button
                type="submit"
                className="w-full py-3 text-sm font-semibold text-white transition bg-black rounded-md hover:bg-gray-900"
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="mb-4 text-sm font-semibold text-gray-600 uppercase">
                  Payment
                </h3>
                <PayPalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={() => alert("Payment failed. Please try again.")}
                />
              </div>
            )}
          </form>
        </div>

        {/* RIGHT - ORDER SUMMARY */}
        <div className="p-8 bg-gray-50 rounded-xl h-fit lg:sticky lg:top-24">
          <div className="flex-shrink-0 mb-4">
            <h3 className="text-lg font-semibold">Order Summary</h3>
          </div>

          <div className="pb-6 mb-6 space-y-5 border-b">
            {cart.products.map((product, index) => (
              <div key={index} className="flex justify-between gap-4">
                <div className="flex gap-4">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover w-20 h-24 rounded-md"
                  />
                  <div>
                    <p className="font-medium">{product.name}</p>
                    <p className="text-sm text-gray-500">
                      {product.size} · {product.color}
                    </p>
                  </div>
                </div>
                <p className="font-medium">
                  ₹ {product.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>

          <div className="space-y-3 text-sm">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₹ {cart.totalPrice.toLocaleString()}</span>
            </div>

            <div className="flex justify-between">
              <span>Shipping</span>
              <span className="text-green-600">Free</span>
            </div>
          </div>

          <div className="flex justify-between pt-6 mt-6 text-lg font-semibold border-t">
            <span>Total</span>
            <span>₹ {cart.totalPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
