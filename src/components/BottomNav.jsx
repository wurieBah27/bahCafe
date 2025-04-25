import { FaCartPlus } from "react-icons/fa";
import { HiHeart, HiHome, HiOutlineUserCircle } from "react-icons/hi";
import { MdFastfood } from "react-icons/md";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { totalItemsInCart } from "../features/cart/cartSlice";

const BottomNav = () => {
  const totalItems = useSelector(totalItemsInCart);

  return (
    <div className="fixed bottom-4 left-1/2 z-[1000] h-16 w-full max-w-xl -translate-x-1/2 rounded-full border border-gray-200 bg-[#0d9488]">
      <div className="mx-auto grid h-full max-w-lg grid-cols-5">
        <Link
          to="/"
          data-tooltip-target="tooltip-home"
          type="button"
          className="group inline-flex flex-col items-center justify-center rounded-s-full px-5"
        >
          <HiHome className="mb-1 size-7 text-gray-50 transition-all hover:scale-125 hover:text-gray-400 group-hover:text-gray-300" />

          <span className="sr-only">Home</span>
        </Link>
        <div
          id="tooltip-home"
          role="tooltip"
          className="shadow-xs tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300"
        >
          Home
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link
          to="/cart"
          data-tooltip-target="tooltip-wallet"
          type="button"
          className="group relative inline-flex flex-col items-center justify-center px-5"
        >
          <FaCartPlus className="mb-1 size-7 text-gray-50 transition-all hover:scale-125 hover:text-gray-300 group-hover:text-gray-300" />
          {totalItems > 0 && (
            <span className="absolute right-0 top-[-30%] flex h-8 min-w-8 max-w-max items-center justify-center rounded-full bg-gray-50 p-2 text-xl text-gray-900">
              {totalItems}
            </span>
          )}
          <span className="sr-only">Wallet</span>
        </Link>
        <div
          id="tooltip-wallet"
          role="tooltip"
          className="shadow-xs tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300"
        >
          Wallet
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <div className="flex items-center justify-center">
          <button
            data-tooltip-target="tooltip-new"
            type="button"
            className="group inline-flex h-10 w-10 items-center justify-center rounded-full font-medium focus:outline-none focus:ring-4 focus:ring-blue-300"
          >
            <HiHeart className="mb-1 size-7 text-gray-50 transition-all hover:scale-125 group-hover:text-gray-300" />

            <span className="sr-only">New item</span>
          </button>
        </div>
        <div
          id="tooltip-new"
          role="tooltip"
          className="shadow-xs tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300"
        >
          Create new item
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link
          to="/order"
          data-tooltip-target="tooltip-settings"
          type="button"
          className="group inline-flex flex-col items-center justify-center rounded-s-full px-5"
        >
          <MdFastfood className="mb-1 size-7 text-gray-50 transition-all hover:scale-125 group-hover:text-gray-300" />

          <span className="sr-only">Settings</span>
        </Link>
        <div
          id="tooltip-settings"
          role="tooltip"
          className="shadow-xs tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300"
        >
          Settings
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
        <Link
          to="/user"
          data-tooltip-target="tooltip-profile"
          type="button"
          className="group inline-flex flex-col items-center justify-center rounded-s-full px-5"
        >
          <HiOutlineUserCircle className="mb-1 size-7 text-gray-50 transition-all hover:scale-125 group-hover:text-gray-300" />

          <span className="sr-only">Profile</span>
        </Link>
        <div
          id="tooltip-profile"
          role="tooltip"
          className="shadow-xs tooltip invisible absolute z-10 inline-block rounded-lg bg-gray-900 px-3 py-2 text-sm font-medium text-white opacity-0 transition-opacity duration-300"
        >
          Profile
          <div className="tooltip-arrow" data-popper-arrow></div>
        </div>
      </div>
    </div>
  );
};

export default BottomNav;
