import MenueActionBtns from "../menue/MenueActionBtns";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineTrash } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { deleteItem } from "./cartSlice";

const SinglrCartItem = ({ data = {} }) => {
  const { id, name, unitPrice, totalPrice, image, quantity, options } = data;

  const dispatch = useDispatch();
  console.log(options);
  const haandleDeleteItem = () => {
    dispatch(deleteItem(id));
  };

  return (
    <div>
      <div
        className="relative mb-4 rounded-md border bg-gray-50 px-4 pb-2 pt-4 text-gray-700 shadow-lg max-[380px]:px-1 sm:px-6 lg:px-8 dark:bg-gray-600 dark:text-gray-100"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <button
          data-qa="cart-remove_item"
          className="sc-31fee6c0-17 emumkq dark:text-fray-500 absolute end-1 top-1 rounded-full bg-red-100 p-4 text-red-700 transition hover:scale-110 max-sm:bg-red-50 dark:bg-red-600 dark:text-gray-100"
          onClick={haandleDeleteItem}
        >
          <HiOutlineTrash className="yWWjo" />
          <span className="sc-31fee6c0-31 caHRdX">Delete</span>
        </button>

        <div className="mt-5 space-y-6">
          <ul className="space-y-4">
            <li className="flex items-center gap-4">
              <img
                src={image || "/edama-icon.jpg"}
                alt=""
                className="size-16 rounded-sm object-cover max-[400px]:size-10"
              />

              <div>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-100">
                  <span>Title:</span>
                  <h3 className="text-sm text-gray-900 dark:text-gray-100">
                    {name}
                  </h3>
                </div>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-100">
                  <span>Price:</span>
                  <span className="flex items-baseline gap-1 text-sm">
                    <span className="text-[0.5rem] text-gray-900 dark:text-gray-100">
                      AED
                    </span>{" "}
                    <b className="text-[#38ae04] dark:text-[#9aee76]">
                      {unitPrice}
                    </b>
                  </span>
                </div>

                <div className="mt-0.5 flex flex-wrap text-[10px] text-gray-600 dark:text-gray-100">
                  {options &&
                    Object.keys(options).map((key) => (
                      <div key={key} className="mr-1">
                        {options[key] !== null && (
                          <>
                            <dt className="mr-1 inline">{key}:</dt>
                            <dd className="mt-1 inline">{options[key]}</dd>{" "}
                            {","}
                          </>
                        )}{" "}
                      </div>
                    ))}
                </div>
                <div className="flex items-center gap-3 text-gray-400 dark:text-gray-100">
                  <span>Sub total:</span>
                  <span className="flex items-baseline gap-1 text-sm">
                    <span className="text-[0.5rem] text-gray-900 dark:text-gray-100">
                      AED
                    </span>{" "}
                    <b className="text-[#38ae04] dark:text-[#9aee76]">
                      {totalPrice.toFixed(2)}
                    </b>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="py-2">
          <div className="flex flex-wrap items-center justify-end gap-4 max-[500px]:justify-evenly">
            <button className="sc-31fee6c0-17 emumkq add-to-wishlist-btn bg-teal-400 text-gray-50 dark:text-gray-100">
              <HiOutlineHeart className="yWWjo" />
              <span
                data-qa="cart-move_to_wishlist"
                className="sc-31fee6c0-31 caHRdX cart-move_to_wishlist"
              >
                Add to favorites
              </span>
            </button>

            <MenueActionBtns itemCurrentQuantity={quantity} id={id} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SinglrCartItem;
