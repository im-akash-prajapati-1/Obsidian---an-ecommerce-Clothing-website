import { IoMdClose } from "react-icons/io";
import { HiOutlineShoppingBag } from "react-icons/hi2";
import CartContent from "../Cart/CartContent";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const CartDrawer = ({ drawerOpen, toggleCartDrawer }) => {
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { cart } = useSelector((state) => state.cart);

  const hasItems = cart && cart?.products?.length > 0;

  const handleCheckout = () => {
    toggleCartDrawer();
    if (!user) {
      navigate("/login?redirect=checkout");
    } else {
      navigate("/checkout");
    }
  };

  return (
    <>
      {/* Overlay */}
      {drawerOpen && (
        <div
          onClick={toggleCartDrawer}
          className="fixed inset-0 z-40 bg-black/40 backdrop-blur-sm"
        />
      )}

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 z-50 flex h-full w-full flex-col bg-gray-100 shadow-2xl transition-transform duration-300 sm:w-[32rem]
        ${drawerOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b">
          <h2 className="text-xs font-semibold tracking-[0.35em] text-gray-800">
            YOUR CART
          </h2>

          <button
            onClick={toggleCartDrawer}
            className="p-2 transition rounded-full hover:bg-gray-100"
          >
            <IoMdClose className="w-5 h-5 text-gray-700" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 px-6 py-6 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300">
          {hasItems ? (
            <CartContent cart={cart.products} userId={user?._id} />
          ) : (
            <div className="flex flex-col items-center justify-center h-full">
              <div className="p-4 bg-gray-100 rounded-full">
                <HiOutlineShoppingBag className="text-gray-500 h-7 w-7" />
              </div>
              <p className="text-lg font-medium text-gray-800">
                Your cart is empty
              </p>
              <Link
                to="/collections/all"
                onClick={toggleCartDrawer}
                className="inline-block px-6 py-3 mt-6 text-sm text-white uppercase transition bg-black rounded-md tracking-[0.35rem] hover:bg-gray-900"
              >
                Browse Products
              </Link>
            </div>
          )}
        </div>

        {/* Footer */}
        {hasItems && (
          <div className="px-6 py-5 bg-white border-t">
            <button
              onClick={handleCheckout}
              className="w-full rounded-lg bg-black py-4 text-sm font-medium tracking-widest text-white shadow-sm transition-all hover:bg-gray-900 active:scale-[0.98]"
            >
              PROCEED TO CHECKOUT →
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
