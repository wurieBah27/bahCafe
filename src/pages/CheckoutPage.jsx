import BackButton from "../components/BackButton";
import Checkout from "../features/checkout/Checkout";

const CheckoutPage = () => {
  return (
    <div className="mx-auto py-4 pb-32">
      <BackButton />
      <div>
        <Checkout />
      </div>
    </div>
  );
};

export default CheckoutPage;
