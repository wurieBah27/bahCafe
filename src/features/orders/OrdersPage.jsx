import { Button } from "flowbite-react";
import useGetAllOrders from "./useGetAllOrders";
import SingleOrderItem from "./SingleOrderItem";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { FaSyncAlt } from "react-icons/fa";

const OrdersPage = () => {
  const [orderStatus, setOrderStatus] = useState("Pending");
  const { allCustomerOrders, isLoading, refetch } = useGetAllOrders({
    status: orderStatus,
  });

  let filteredOrders = [];

  if (orderStatus === "Pending") {
    filteredOrders = allCustomerOrders?.filter(
      (order) => order.Order_status !== "Delivered",
    );
  } else {
    filteredOrders = allCustomerOrders?.filter(
      (order) => order.Order_status === "Delivered",
    );
  }

  if (isLoading) return <Spinner />;
  return (
    <div className="py-4 text-gray-800 sm:px-6 dark:bg-gray-800">
      <h1 className="py-4 text-center text-2xl dark:text-gray-200">
        {orderStatus} Orders
      </h1>
      <div className="flex items-center justify-between gap-4 py-4">
        <Button
          className="w-1/2"
          color="failure"
          onClick={() => setOrderStatus("Pending")}
        >
          Pending
        </Button>
        <Button className="w-1/2" onClick={() => setOrderStatus("Delivered")}>
          Completed
        </Button>
      </div>

      {orderStatus === "Pending" && filteredOrders?.length !== 0 && (
        <div className="py-4">
          <Button outline onClick={refetch}>
            <span className="flex items-center justify-center gap-3">
              <FaSyncAlt
                className={`h-6 w-6 ${isLoading ? "animate-spin" : ""}`}
              />{" "}
              <span>Sync data</span>
            </span>
          </Button>
        </div>
      )}
      <div className="">
        {filteredOrders?.map((order) => (
          <SingleOrderItem key={order.id} order={order} />
        ))}
      </div>
    </div>
  );
};

export default OrdersPage;
