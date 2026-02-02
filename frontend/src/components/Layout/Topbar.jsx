import { TbBrandMeta } from "react-icons/tb";
import { IoLogoInstagram } from "react-icons/io5";
import { RiTwitterXLine } from "react-icons/ri";

const Topbar = () => {
  return (
    <div className="bg-black text-white text-xs w-full h-8">
      <div className="w-full flex items-center justify-between px-4 sm:px-6 lg:px-10 xl:px-16 py-2">
        <div className="hidden md:flex items-center gap-4">
          <TbBrandMeta className="h-4 w-4 hover:opacity-70 cursor-pointer" />
          <IoLogoInstagram className="h-4 w-4 hover:opacity-70 cursor-pointer" />
          <RiTwitterXLine className="h-4 w-4 hover:opacity-70 cursor-pointer" />
        </div>

        <p className="uppercase tracking-widest text-center flex-1">
          We ship worldwide — fast & reliable
        </p>

        <div className="hidden md:block">
          <a
            href="tel:+1234567890"
            className="hover:underline underline-offset-4"
          >
            +1 (234) 567-890
          </a>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
