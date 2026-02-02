import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { fetchAdminProducts } from "./../redux/Slices/adminProductSlice";
import { fetchAllOrders } from "./../redux/Slices/adminOrderSlice";

const AdminHomePage = () => {
  const dispatch = useDispatch();
  const {
    products,
    loading: productsLoading,
    error: productsError,
  } = useSelector((state) => state.adminProducts);
  const {
    orders,
    totalOrders,
    totalSales,
    loading: ordersLoading,
    error: ordersError,
  } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    dispatch(fetchAdminProducts());
    dispatch(fetchAllOrders());
  }, [dispatch]);

  return (
    <div className="min-h-screen p-6 mx-auto max-w-7xl bg-gray-50">
      {/* Header */}
      <h1 className="mb-8 text-4xl font-bold text-black">Admin Dashboard</h1>
      {productsLoading || ordersLoading ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-base font-medium tracking-wider text-gray-700">
            Loading...
          </p>
        </div>
      ) : productsError ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-base font-medium tracking-wider text-gray-700">
            Error fetching products: {productsError}
          </p>
        </div>
      ) : ordersError ? (
        <div className="flex items-center justify-center min-h-[300px]">
          <p className="text-base font-medium tracking-wider text-gray-700">
            Error fetching orders: {ordersError}
          </p>  
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <div className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
            <h2 className="mb-2 text-sm text-gray-500 uppercase">Revenue</h2>
            <p className="text-3xl font-bold text-green-600">₹ {totalSales.toFixed(2)}</p>
          </div>

          <div className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
            <h2 className="mb-2 text-sm text-gray-500 uppercase">
              Total Orders
            </h2>
            <p className="mb-2 text-3xl font-bold text-gray-800">{totalOrders}</p>
            <Link
              to="/admin/orders"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Manage Orders →
            </Link>
          </div>

          <div className="p-6 transition bg-white shadow rounded-xl hover:shadow-lg">
            <h2 className="mb-2 text-sm text-gray-500 uppercase">
              Total Products
            </h2>
            <p className="mb-2 text-3xl font-bold text-gray-800">{products.length}</p>
            <Link
              to="/admin/products"
              className="text-sm font-medium text-blue-600 hover:underline"
            >
              Manage Products →
            </Link>
          </div>
        </div>
      )}

      {/* Recent Orders */}
      <div className="mt-10 bg-white shadow rounded-xl">
        <div className="p-6 border-b">
          <h2 className="text-2xl font-semibold text-gray-800">
            Recent Orders
          </h2>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-full text-sm">
            <thead className="text-xs text-gray-600 uppercase bg-gray-100">
              <tr>
                <th className="px-6 py-4">Order ID</th>
                <th className="px-6 py-4">User</th>
                <th className="px-6 py-4">Total Price</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>

            <tbody>
              {orders.length > 0 ? (
                orders.map((order) => (
                  <tr
                    key={order._id}
                    className="transition border-b hover:bg-gray-50"
                  >
                    <td className="px-6 py-4 font-medium text-gray-800">
                      #{order._id}
                    </td>
                    <td className="px-6 py-4">{order.user?.name}</td>
                    <td className="px-6 py-4">₹ {order.totalPrice.toFixed(2)}</td>
                    <td className="px-6 py-4">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold
                          ${
                            order.status === "Delivered"
                              ? "bg-green-100 text-green-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                      >
                        {order.status}
                      </span>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={4}
                    className="px-6 py-6 text-center text-gray-500"
                  >
                    No Recent Order Found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminHomePage;
