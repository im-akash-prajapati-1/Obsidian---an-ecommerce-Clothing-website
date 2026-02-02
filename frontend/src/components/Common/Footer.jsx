import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { FiPhoneCall } from "react-icons/fi";
import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="bg-white border-t">
      <div className="w-full grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-14 px-6 sm:px-10 lg:px-16 py-16 items-start">
        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4">
            Shop
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {[
              "Men's Top Wear",
              "Women's Top Wear",
              "Men's Bottom Wear",
              "Women's Bottom Wear",
            ].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-black transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* SUPPORT */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4">
            Support
          </h3>
          <ul className="space-y-3 text-sm text-gray-600">
            {["Contact Us", "About Us", "FAQs", "Features"].map((item) => (
              <li key={item}>
                <Link to="#" className="hover:text-black transition-colors">
                  {item}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        {/* FOLLOW */}
        <div>
          <h3 className="text-sm uppercase tracking-widest text-gray-900 mb-4">
            Follow Us
          </h3>

          <div className="flex items-center gap-4 mb-6">
            {[TbBrandMeta, IoLogoInstagram, RiTwitterXLine].map(
              (Icon, index) => (
                <a
                  key={index}
                  href="#"
                  className="w-10 h-10 flex items-center justify-center border border-gray-300 rounded-full hover:bg-black hover:text-white transition"
                >
                  <Icon className="h-5 w-5" />
                </a>
              )
            )}
          </div>

          <p className="text-sm text-gray-500 mb-1">Customer Care</p>
          <p className="text-sm font-medium text-gray-800 flex items-center gap-2">
            <FiPhoneCall />
            123-456-7890
          </p>
        </div>
      </div>

      <div className="border-t border-gray-200 py-6 px-6 sm:px-10 lg:px-16">
        <p className="text-xs text-gray-500 tracking-wide text-center">
          © 2025 Obsidian. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
