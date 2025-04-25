import CartPage from "../features/cart/CartPage";
import BackButton from "../components/BackButton";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { getCart, totalItemsInCart } from "../features/cart/cartSlice";

const Cart = () => {
  const totalCartItems = useSelector(totalItemsInCart);
  const cartItems = useSelector(getCart);

  const isItemsInCart = cartItems?.length === 0;
  return (
    <div>
      <div className="mx-auto py-4 pb-32">
        <BackButton />
        <div className="flex justify-between">
          <div className="mx-auto my-0 flex min-w-0 flex-1 flex-col gap-4">
            <div className="w-full px-7 max-[500px]:px-3">
              <div className="mb-6 flex items-center justify-start">
                <div className="hmbfbA flex items-center gap-3">
                  <strong className="title text-gray-500 dark:text-gray-300">
                    Cart
                  </strong>
                  <p className="text-gray-400">({totalCartItems} Items)</p>
                </div>
              </div>

              <CartPage />
            </div>
            <div>
              <div className="flex flex-col space-y-4 px-10 text-center">
                {!isItemsInCart && (
                  <Link
                    to="/checkout"
                    className="mx-auto inline-block w-full rounded-sm bg-gray-700 px-5 py-3 text-sm text-gray-100 transition hover:bg-gray-600 sm:w-1/2 dark:text-gray-200"
                  >
                    Checkout
                  </Link>
                )}

                <Link
                  to="/"
                  className="inline-block text-sm text-gray-500 underline underline-offset-4 transition hover:text-gray-600 dark:text-gray-200"
                >
                  Continue shopping
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>{" "}
    </div>
  );
};

export default Cart;
