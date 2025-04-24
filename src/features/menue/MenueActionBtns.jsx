import { HiMinus, HiPlus } from "react-icons/hi";
import { useDispatch } from "react-redux";
import {
  decrementItemQuantity,
  incrementItemQuantity,
} from "../cart/cartSlice";

function CustomBtn({ icon: Icon, onClick }) {
  return (
    <button
      onClick={onClick}
      type="button"
      className="inline-flex items-center rounded-full border border-teal-700 p-2 text-center text-sm font-medium text-teal-700 hover:bg-teal-700 hover:text-white focus:outline-none focus:ring-4 focus:ring-teal-300 dark:border-teal-500 dark:text-teal-500 dark:hover:bg-teal-500 dark:hover:text-white dark:focus:ring-teal-800"
    >
      <Icon className="h-4 w-4" />
      <span className="sr-only">Icon description</span>
    </button>
  );
}

const MenueActionBtns = ({ id, itemCurrentQuantity }) => {
  const itemQuantity = itemCurrentQuantity > 0;
  const items = JSON.parse(localStorage.getItem("cart")) || [];

  console.log(items);
  const dispatch = useDispatch();
  const handleInc = () => {
    dispatch(incrementItemQuantity(id));
  };
  const handleDec = () => {
    dispatch(decrementItemQuantity(id));
  };
  return (
    <>
      {itemQuantity && (
        <div className="flex items-center">
          <CustomBtn icon={HiMinus} onClick={handleDec} />
          <span className="mx-2 text-sm font-bold text-gray-800 dark:text-gray-100">
            {itemCurrentQuantity}
          </span>
          <CustomBtn icon={HiPlus} onClick={handleInc} />
        </div>
      )}
    </>
  );
};

export default MenueActionBtns;
