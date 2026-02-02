import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
  FaTachometerAlt,
} from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { logout } from "../../redux/Slices/authSlice";
import { clearCart } from "../../redux/Slices/cartSlice";

const AdminSidebar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());
    navigate("/");
  };

  const navItem =
    "group flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200";
  const activeItem =
    "bg-gradient-to-r from-gray-700 to-gray-800 text-white shadow-md";
  const inactiveItem = "text-gray-400 hover:bg-gray-700 hover:text-white";

  return (
    <aside className="flex flex-col w-64 h-screen bg-gray-900 border-r border-gray-800">
      {/* Scrollable content */}
      <div className="flex flex-col flex-1 overflow-y-auto">
        {/* Brand */}
        <div className="px-6 py-6 border-b border-gray-800">
          <Link to="/" className="text-2xl font-bold tracking-wide text-white">
            Obsidian
          </Link>
          <p className="mt-1 text-sm text-gray-400">Admin Panel</p>
        </div>

        {/* Logged-in Admin Info */}
        <div className="px-6 py-4 border-b border-gray-800">
          <p className="text-2xl font-bold tracking-wide text-white">{user?.name}</p>
          <p className="mt-1 text-sm text-gray-400">{user?.email}</p>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2">
          {/* Dashboard */}
          <NavLink
            to="/admin"
            end
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <span className="text-lg">
              <FaTachometerAlt />
            </span>
            <span className="font-medium">Dashboard</span>
          </NavLink>

          <NavLink
            to="/admin/users"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <span className="text-lg">
              <FaUser />
            </span>
            <span className="font-medium">Users</span>
          </NavLink>

          <NavLink
            to="/admin/products"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <span className="text-lg">
              <FaBoxOpen />
            </span>
            <span className="font-medium">Products</span>
          </NavLink>

          <NavLink
            to="/admin/orders"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <span className="text-lg">
              <FaClipboardList />
            </span>
            <span className="font-medium">Orders</span>
          </NavLink>

          <NavLink
            to="/"
            className={({ isActive }) =>
              `${navItem} ${isActive ? activeItem : inactiveItem}`
            }
          >
            <span className="text-lg">
              <FaStore />
            </span>
            <span className="font-medium">Shop</span>
          </NavLink>
        </nav>

        {/* Logout */}
        <div className="px-4 py-5 border-t border-gray-800">
          <button
            onClick={handleLogout}
            className="flex items-center justify-center w-full gap-3 py-3 text-white transition-all duration-200 bg-red-500 rounded-lg shadow-md hover:bg-red-600"
          >
            <FaSignOutAlt />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>
    </aside>
  );
};

export default AdminSidebar;
