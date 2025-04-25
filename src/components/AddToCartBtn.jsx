import { HiOutlineShoppingCart } from "react-icons/hi";

const base =
  " hover:bg-teak-800 flex items-center bg-teal-600 font-medium text-white focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-teal-600 dark:hover:bg-teal-700 rounded-lg dark:focus:ring-blue-800 px-3 py-2 ";
const styles = {
  primary: base + " gap-2 rounded-lg text-center text-sm ",
  secondary: base + " justify-center text-xl  sm:text-2xl py-3 sm:py-5 w-1/2",
};

const AddToCartBtn = ({ type, onClick, btnType }) => {
  return (
    <button
      type={btnType ? btnType : "button"}
      className={styles[type]}
      onClick={onClick}
    >
      <HiOutlineShoppingCart className="" /> Add to cart
    </button>
  );
};

export default AddToCartBtn;
