import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  fetchAllOrders,
  updateOrderstatus,
} from "./../../redux/Slices/adminOrderSlice";

const OrderManagement = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [sortBy, setSortBy] = useState("recent");

  const { user } = useSelector((state) => state.auth);
  const { orders, loading, error } = useSelector((state) => state.adminOrder);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders());
    }
  }, [dispatch, user, navigate]);

  useEffect(() => {
    if (!user || user.role !== "admin") {
      navigate("/");
    } else {
      dispatch(fetchAllOrders(sortBy));
    }
  }, [dispatch, user, navigate, sortBy]);

  const [searchTerm, setSearchTerm] = useState("");
  const [activeStatus, setActiveStatus] = useState("All");

  const handleStatusChange = (orderId, status) => {
    dispatch(updateOrderstatus({ id: orderId, status }));
  };

  const formatDate = (date) =>
    new Date(date).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });

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

  const filteredOrders = orders.filter((order) => {
    const matchesSearch =
      order._id.toString().includes(searchTerm) ||
      order.user.name.toLowerCase().includes(searchTerm.toLowerCase());

    const matchesStatus =
      activeStatus === "All" || order.status === activeStatus;

    return matchesSearch && matchesStatus;
  });

  const statusBadge = (status) => {
    const base = "px-3 py-1 rounded-full text-xs font-semibold";
    switch (status) {
      case "Processing":
        return `${base} bg-yellow-100 text-yellow-700`;
      case "Delivered":
        return `${base} bg-green-100 text-green-700`;
      case "Cancelled":
        return `${base} bg-red-100 text-red-700`;
      case "Shipped":
        return `${base} bg-blue-100 text-blue-700`;
      default:
        return base;
    }
  };

  const statusTabs = ["All", "Processing", "Shipped", "Delivered", "Cancelled"];

  return (
    <div className="p-6 mx-auto max-w-7xl">
      {/* Header */}
      <h2 className="mb-6 text-4xl font-bold text-gray-800">
        Order Management
      </h2>

      {/* Search + Tabs Container */}
      <div className="flex flex-col gap-4 mb-6 md:flex-row md:items-center md:justify-between">
        {/* Search */}
        <div className="flex-1">
          <input
            type="text"
            placeholder="Search by Order ID or Customer..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full py-2 text-sm border rounded-lg tepx-4 focus:ring-2 focus:ring-blue-400 focus:outline-none"
          />
        </div>

        <select
          value={sortBy}
          onChange={(e) => setSortBy(e.target.value)}
          className="px-4 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400"
        >
          <option value="recent">Recent Orders</option>
          <option value="oldest">Oldest Orders</option>
        </select>

        {/* Status Tabs */}
        <div className="flex flex-wrap gap-2">
          {statusTabs.map((status) => (
            <button
              key={status}
              onClick={() => setActiveStatus(status)}
              className={`px-4 py-2 rounded-lg text-sm font-medium transition
                ${
                  activeStatus === status
                    ? "bg-blue-500 text-white"
                    : "bg-gray-100 text-gray-700 hover:bg-gray-200"
                }`}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="overflow-hidden bg-white shadow-md rounded-xl">
        <table className="min-w-full text-sm text-left text-gray-600">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th className="px-6 py-4">Order ID</th>
              <th className="px-6 py-4">Customer</th>
              <th className="px-6 py-4">Total</th>
              <th className="px-6 py-4">Order Date</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {filteredOrders.length > 0 ? (
              filteredOrders.map((order) => (
                <tr
                  key={order._id}
                  className="transition border-t hover:bg-gray-50"
                >
                  <td className="px-6 py-4 font-medium text-gray-900">
                    #{order._id}
                  </td>

                  <td className="px-6 py-4">{order.user.name}</td>

                  <td className="px-6 py-4 font-semibold text-gray-800">
                    ₹{order.totalPrice}
                  </td>

                  <td className="px-6 py-4">{formatDate(order.createdAt)}</td>

                  <td className="px-6 py-4">
                    <span className={statusBadge(order.status)}>
                      {order.status}
                    </span>
                  </td>

                  <td className="flex justify-end gap-2 px-6 py-4 text-right">
                    <select
                      value={order.status}
                      onChange={(e) =>
                        handleStatusChange(order._id, e.target.value)
                      }
                      className="px-3 py-2 text-sm border rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                    >
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    <button
                      onClick={() => handleStatusChange(order._id, "Delivered")}
                      className="bg-green-500 text-white px-3 py-1.5 rounded-lg text-xs font-medium hover:bg-green-600 transition"
                    >
                      Mark Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="py-10 text-center text-gray-500">
                  No orders match your filters
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default OrderManagement;
