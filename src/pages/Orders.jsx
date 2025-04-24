import BackButton from "../components/BackButton";
import OrdersPage from "../features/orders/OrdersPage";

const Orders = () => {
  return (
    <div>
      <div className="mx-auto py-4 pb-32">
        <BackButton />
        <div>
          <OrdersPage />
        </div>
      </div>
    </div>
  );
};

export default Orders;
