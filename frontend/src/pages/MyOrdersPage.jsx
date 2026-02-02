import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getUserOrders } from "../redux/Slices/orderSlice";

const MyOrdersPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const {orders, loading, error} = useSelector((state) => state.order);

  useEffect(() => {
    dispatch(getUserOrders());
  }, [dispatch]);

  const handleRowClick = (orderId) => {
    navigate(`/order/${orderId}`);
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
    <div className="p-4 mx-auto max-7xl sm:p-6">
      <h2 className="mb-6 text-xl font-bold sm:text-2xl">My Orders</h2>
      <div className="relative overflow-hidden shadow-md sm:rounded-lg">
        <table className="min-w-full text-sm text-left text-gray-500">
          <thead className="text-xs text-gray-900 uppercase bg-gray-100">
            <tr>
              <th className="px-4 py-2 sm:py-3">Image</th>
              <th className="px-4 py-2 sm:py-3">Order ID</th>
              <th className="px-4 py-2 sm:py-3">Created</th>
              <th className="px-4 py-2 sm:py-3">Shipping Address</th>
              <th className="px-4 py-2 sm:py-3">Items</th>
              <th className="px-4 py-2 sm:py-3">Price</th>
              <th className="px-4 py-2 sm:py-3">Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr
                  key={order._id}
                  onClick={() => handleRowClick(order._id)}
                  className="border-b cursor-pointer hover:border-gray-50"
                >
                  <td className="px-2 py-2 sm:px-4 sm:py-4">
                    <img
                      src={order.orderitems[0]?.image}
                      alt={order.orderitems[0].name}
                      className="object-cover w-10 h-10 rounded-lg sm:w-12 sm:h-12"
                    />
                  </td>
                  <td className="px-4 py-2 font-medium text-gray-900 sm:px-4 sm:py-4 whitespace-nowrap">
                    #{order._id}
                  </td>
                  <td className="px-4 py-2 sm:px-4 sm:py-4">
                    {new Date(order.createdAt).toLocaleDateString()}{" "}
                    {new Date(order.createdAt).toLocaleTimeString()}
                  </td>
                  <td className="px-4 py-2 sm:px-4 sm:py-4">
                    {order.shippingAddress
                      ? `${order.shippingAddress.address}, ${order.shippingAddress.city}, ${order.shippingAddress.postalCode}, ${order.shippingAddress.state}, ${order.shippingAddress.country}`
                      : "N/A"}
                  </td>
                  <td className="px-4 py-2 sm:px-4 sm:py-4">
                    {order.orderitems.length}
                  </td>
                  <td className="px-4 py-2 sm:px-4 sm:py-4">
                    ₹ {order.totalPrice.toFixed(2)}
                  </td>
                  <td className="px-4 py-2 sm:px-4 sm:py-4">
                    <span
                      className={`${
                        order.isPaid
                          ? "bg-green-100 text-green-800"
                          : "bg-red-100 text-red-800"
                      } px-2 py-1 rounded-full text-xs font-semibold`}
                    >
                      {order.isPaid ? "Paid" : "Pending"}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="px-4 py-4 text-center text-gray-500">
                  No orders found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyOrdersPage;
