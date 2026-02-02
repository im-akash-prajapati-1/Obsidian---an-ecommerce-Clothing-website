import { Link } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineShoppingBag,
  HiBars3BottomRight,
} from "react-icons/hi2";
import Searchbar from "./Searchbar";
import CartDrawer from "../Layout/CartDrawer";
import { useState } from "react";
import { IoMdClose } from "react-icons/io";
import { IoLogoInstagram } from "react-icons/io5";
import { TbBrandMeta } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import logo from "../../assets/Obsidian.png";
import { useSelector } from "react-redux";

const Navbar = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false);
  const { cart } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth);

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  const toggleNavDrawer = () => {
    setNavDrawerOpen(!navDrawerOpen);
  };

  const toggleCartDrawer = () => {
    setDrawerOpen(!drawerOpen);
  };

  return (
    <>
      <nav className="flex items-center justify-between w-full px-4 py-5 sm:px-6 lg:px-10 xl:px-16">
        {/* Logo */}
        <Link to="/" className="text-2xl font-light tracking-wide">
          <img
            src={logo}
            alt="logo"
            className="object-contain w-auto h-8 sm:h-9 md:h-10"
          />
        </Link>

        {/* Center - Navigation links */}
        <div className="hidden gap-8 md:flex">
          <Link
            to="/collections/all?gender=Men"
            className="text-sm uppercase tracking-[0.15rem] border-b text-gray-700 hover:text-orange-500"
          >
            Men
          </Link>

          <Link
            to="/collections/all?gender=Women"
            className="text-sm uppercase tracking-[0.15rem] border-b text-gray-700 hover:text-orange-500"
          >
            Women
          </Link>

          <Link
            to="/collections/all?category=Top Wear"
            className="text-sm uppercase tracking-[0.15rem] border-b text-gray-700 hover:text-orange-500"
          >
            Top Wear
          </Link>

          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-sm uppercase tracking-[0.15rem] border-b text-gray-700 hover:text-orange-500"
          >
            Bottom Wear
          </Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-5">
          {user && user.role === "admin" && (
            <Link
              to="/admin"
              className="px-3 py-1 text-xs tracking-widest uppercase transition border hover:bg-black hover:text-white"
            >
              Admin
            </Link>
          )}

          <Link to="/profile">
            <HiOutlineUser className="w-5 h-5 text-gray-700 hover:text-black" />
          </Link>

          <button onClick={toggleCartDrawer} className="relative">
            <HiOutlineShoppingBag className="w-5 h-5 text-gray-700 hover:text-black" />
            {cartItemCount > 0 && (
              <span className="absolute -top-2 -right-2 text-[10px] bg-black text-white px-1.5 rounded-full">
                {cartItemCount}
              </span>
            )}
          </button>

          <Searchbar />

          <button onClick={toggleNavDrawer} className="md:hidden">
            <HiBars3BottomRight className="w-6 h-6 text-gray-700" />
          </button>
        </div>
      </nav>

      <CartDrawer drawerOpen={drawerOpen} toggleCartDrawer={toggleCartDrawer} />

      <div
        className={`fixed top-0 left-0 h-full w-4/5 sm:w-1/2 lg:w-[420px] bg-white z-50 transform transition-transform duration-300 ${
          navDrawerOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex justify-end px-6 py-5 border-b">
          <button onClick={toggleNavDrawer}>
            <IoMdClose className="w-6 h-6 text-gray-800" />
          </button>
        </div>

        {/* Mobile Navigation Links */}
        <nav className="px-6">
          <Link
            to="/collections/all?gender=Men"
            onClick={toggleNavDrawer}
            className="block py-5 text-sm uppercase tracking-[0.25em] border-b hover:text-orange-500"
          >
            Men
          </Link>

          <Link
            to="/collections/all?gender=Women"
            onClick={toggleNavDrawer}
            className="block py-5 text-sm uppercase tracking-[0.25em] border-b hover:text-orange-500"
          >
            Women
          </Link>

          <Link
            to="/collections/all?category=Top Wear"
            onClick={toggleNavDrawer}
            className="block py-5 text-sm uppercase tracking-[0.25em] border-b hover:text-orange-500"
          >
            Top Wear
          </Link>

          <Link
            to="/collections/all?category=Bottom Wear"
            onClick={toggleNavDrawer}
            className="block py-5 text-sm uppercase tracking-[0.25em] border-b hover:text-orange-500"
          >
            Bottom Wear
          </Link>
        </nav>

        <div className="grid grid-cols-2 px-6 py-6 text-sm text-gray-800 gap-y-4">
          <Link to="#" onClick={toggleNavDrawer}>
            Return / Exchange
          </Link>
          <Link to="#" onClick={toggleNavDrawer}>
            Size Guide
          </Link>
          <Link to="#" onClick={toggleNavDrawer}>
            Track Your Order
          </Link>
          <Link to="#" onClick={toggleNavDrawer}>
            Customer Care
          </Link>
          <Link to="#" onClick={toggleNavDrawer}>
            Log in
          </Link>
        </div>

        <div className="grid grid-cols-4 gap-0 px-6 border-t">
          <a className="flex items-center justify-center py-4 border-r">
            <IoLogoInstagram className="w-5 h-5" />
          </a>
          <a className="flex items-center justify-center py-4 border-r">
            <TbBrandMeta className="w-5 h-5" />
          </a>
          <a className="flex items-center justify-center py-4 border-r">
            <RiTwitterXLine className="w-5 h-5" />
          </a>
          <a className="flex items-center justify-center py-4">
            <span className="text-lg font-bold">in</span>
          </a>
        </div>
      </div>
    </>
  );
};

export default Navbar;
