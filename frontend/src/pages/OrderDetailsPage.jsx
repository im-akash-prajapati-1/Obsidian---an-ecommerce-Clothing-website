import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { getOrderDetails } from "../redux/Slices/orderSlice";

const OrderDetailsPage = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { orderDetails, loading, error } = useSelector((state) => state.order);
  const [animatedStep, setAnimatedStep] = useState(-1);
  
  const STATUS_STEPS = ["Processing", "Shipped", "Delivered", "Cancelled"];
  const currentStepIndex = STATUS_STEPS.indexOf(orderDetails?.status);

  useEffect(() => {
    dispatch(getOrderDetails(id));
  }, [id, dispatch]);

  useEffect(() => {
    if (!orderDetails) return;

    if (orderDetails.status === "Cancelled") {
      setAnimatedStep(STATUS_STEPS.length - 1);
      return;
    }

    let i = 0;
    const interval = setInterval(() => {
      setAnimatedStep((prev) => {
        if (prev >= currentStepIndex) {
          clearInterval(interval);
          return prev;
        }
        return prev + 1;
      });
      i++;
    }, 600);

    return () => clearInterval(interval);
  }, [currentStepIndex, orderDetails?.status]);

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

  const subtotal =
    orderDetails?.orderitems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0,
    ) || 0;



  return (
    <div className="min-h-screen py-10 bg-gray-100">
      <div className="max-w-5xl px-4 mx-auto space-y-8">
        {/* HEADER */}
        <div className="flex flex-wrap justify-between gap-4 p-6 bg-white border shadow-sm rounded-xl">
          <div>
            <h2 className="text-xl font-semibold text-gray-900">
              Order Details
            </h2>
            <p className="text-sm text-gray-800">Order #{orderDetails?._id}</p>
            <p className="mt-1 text-xs text-gray-600">
              Placed on{" "}
              {orderDetails?.createdAt &&
                new Date(orderDetails.createdAt).toLocaleDateString()}{" "}
              at{" "}
              {orderDetails?.createdAt &&
                new Date(orderDetails.createdAt).toLocaleTimeString()}
            </p>
          </div>

          {orderDetails && (
            <div className="inline-flex flex-wrap items-center gap-2 sm:flex-nowrap">
              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  orderDetails.isPaid
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-red-100 text-red-800"
                }`}
              >
                {orderDetails.isPaid ? "Paid" : "Unpaid"}
              </span>

              <span
                className={`px-2 py-1 rounded-full text-sm font-semibold ${
                  orderDetails.isDelivered
                    ? "bg-emerald-100 text-emerald-800"
                    : "bg-yellow-100 text-yellow-800"
                }`}
              >
                {orderDetails.isDelivered ? "Delivered" : "Pending"}
              </span>
            </div>
          )}
        </div>

        {!orderDetails ? (
          <p className="text-center text-gray-500">No order details found.</p>
        ) : (
          <>
            {/* STATUS TIMELINE */}
            <div className="p-6 bg-white border rounded-xl">
              <div className="flex justify-between">
                {STATUS_STEPS.map((step, index) => {
                  const isCancelled = orderDetails.status === "Cancelled" && step === "Cancelled";
                  const isActive = orderDetails.status !== "Cancelled" && index === animatedStep;
                  const isCompleted = orderDetails.status !== "Cancelled" && index < animatedStep;

                  return (
                    <div key={step} className="flex-1 text-center">
                      <p
                        className={`text-sm font-medium transition-colors ${
                            isCancelled
                              ? "text-red-600"
                              : isCompleted
                              ? "text-emerald-700"
                              : isActive
                              ? "text-emerald-600"
                              : "text-gray-400"
                          }`}
                      >
                        {step}
                      </p>
                      <div
                        className={`mx-auto mt-2 h-0.5 w-6 rounded transition-all ${
                            isCancelled
                              ? "bg-red-500"
                              : isCompleted
                              ? "bg-emerald-500"
                              : isActive
                              ? "bg-emerald-400"
                              : "bg-gray-200"
                          }`}
                      />
                    </div>
                  );
                })}
              </div>
            </div>


            {/* INFO CARDS */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="p-6 bg-white border shadow-sm rounded-xl">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Payment Information
                </h4>
                <p className="text-sm text-gray-600">
                  Method: {orderDetails.paymentMethod}
                </p>
                <p className="text-sm text-gray-600">
                  Status: {orderDetails.isPaid ? "Paid" : "Unpaid"}
                </p>
              </div>

              <div className="p-6 bg-white border shadow-sm rounded-xl">
                <h4 className="mb-3 font-semibold text-gray-900">
                  Shipping Information
                </h4>
                <p className="text-sm text-gray-600">
                  Method: {orderDetails.shippingMethod}
                </p>
                <p className="mt-1 text-sm text-gray-600">
                  {orderDetails.shippingAddress.address},{" "}
                  {orderDetails.shippingAddress.city},{" "}
                  {orderDetails.shippingAddress.postalCode},{" "}
                  {orderDetails.shippingAddress.state}
                  {orderDetails.shippingAddress.country},{" "}
                </p>
              </div>
            </div>

            {/* PRODUCTS */}
            <div className="p-6 bg-white border shadow-sm rounded-xl">
              <h4 className="mb-4 font-semibold text-gray-900">
                Ordered Products
              </h4>

              <div className="space-y-4">
                {orderDetails.orderitems.map((item) => (
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
                      <Link
                        to={`/product/${item.productId}`}
                        className="font-medium text-gray-900 hover:underline"
                      >
                        {item.name}
                      </Link>
                      <p className="text-sm text-gray-500">
                        {item.color && `Color: ${item.color}`}{" "}
                        {item.size && `• Size: ${item.size}`}
                      </p>

                      <p className="text-sm text-gray-500">
                        Qty: {item.quantity}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold text-gray-900">
                        ₹ {item.price * item.quantity}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* SUBTOTAL */}
            <div className="p-6 bg-white border shadow-sm rounded-xl">
              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Subtotal</span>
                <span>₹ {subtotal}</span>
              </div>

              <div className="flex justify-between mb-2 text-sm text-gray-600">
                <span>Shipping</span>
                <span className="text-emerald-600">Free</span>
              </div>

              <div className="flex justify-between pt-3 font-semibold text-gray-900 border-t">
                <span>Total</span>
                <span>₹ {subtotal}</span>
              </div>
            </div>

            {/* BACK CTA */}
            <div className="flex justify-center mt-8">
              <Link
                to="/my-orders"
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-medium text-white transition bg-gray-900 rounded-lg hover:bg-gray-800"
              >
                ← Back to My Orders
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default OrderDetailsPage;
