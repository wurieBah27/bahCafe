import { useSelector } from "react-redux";
import { getCart, totalCartPrice } from "./cartSlice";
import SinglrCartItem from "./SinglrCartItem";
import EmptyCartPage from "./EmptyCartPage";
import TotalCartSummary from "../../components/TotalCartSummary";

const CartPage = () => {
  const cartItems = useSelector(getCart);
  const totalPrice = useSelector(totalCartPrice);

  const isItemsInCart = cartItems?.length === 0;

  if (isItemsInCart) return <EmptyCartPage />;
  return (
    <div>
      <div>
        {cartItems?.map((item) => (
          <SinglrCartItem data={item} key={item?.id} />
        ))}
      </div>
      <TotalCartSummary originalPrice={totalPrice} />
    </div>
  );
};

export default CartPage;
