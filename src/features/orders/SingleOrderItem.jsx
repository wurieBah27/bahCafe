import { HiClock, HiOutlineCog, HiThumbUp } from "react-icons/hi";
import { format } from "date-fns";
import { Button } from "flowbite-react";
import { IoHomeOutline } from "react-icons/io5";
import OrderItem from "./OrderItem";
import { HiUserCircle } from "react-icons/hi2";

const SingleOrderItem = ({ order = {} }) => {
  const {
    id,
    order_number,
    createdAt,
    updated_at,
    Order_status,
    payment_status,
    soldBy = {},
    items = [],
  } = order;

  const { employeeName } = soldBy;

  const orderDate = format(new Date(createdAt), "Pp");
  const updateDate = format(new Date(updated_at), "Pp");
  return (
    <div className="dark:bg-gray-700">
      <div className="mb-10 flex flex-col gap-3 rounded-xl px-4 py-10 sm:px-6">
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-200">
          <span className="font-bold text-gray-600 dark:text-gray-100">
            Order ID:{" "}
          </span>{" "}
          <span className="text-sm">{id}</span>
        </div>
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-100">
          <span className="font-bold">Order #: </span>{" "}
          <span>{order_number}</span>
        </div>
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-100">
          <span className="font-bold">
            {payment_status === "Pending" && "Payment status"}
            {payment_status === "On Credit" && "Payment Pending"}
            {payment_status !== "On Credit" &&
              payment_status !== "Pending" &&
              "Paid By"}
            :{" "}
          </span>{" "}
          <span>{payment_status}</span>
        </div>
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-100">
          <span className="flex items-center gap-1 font-bold">
            Date <HiClock className="text-blue-700 dark:text-gray-300" /> :
          </span>
          <span className="text-sm">{orderDate}</span>
        </div>
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-100">
          <span className="flex items-center gap-1 font-bold">
            Last update <HiClock className="text-blue-700 dark:text-gray-300" />{" "}
            :
          </span>
          <span className="text-sm">{updateDate}</span>
        </div>
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-100">
          <span className="flex items-center gap-1 font-bold">
            Employee{" "}
            <HiUserCircle className="text-blue-700 dark:text-gray-300" /> :
          </span>
          <span className="text-sm">{employeeName || ""}</span>
        </div>
        <div className="flex items-center gap-2 max-[400px]:text-xs dark:text-gray-100">
          <span className="flex items-center gap-1 font-bold">
            Order Status:
          </span>
          {Order_status === "Pending" && (
            <Button size="xs" gradientDuoTone="pinkToOrange">
              Pending
            </Button>
          )}
          {Order_status === "Approved" && (
            <Button size="xs">
              <span className="flex items-center gap-1">
                <HiThumbUp /> Approved
              </span>{" "}
            </Button>
          )}
          {Order_status === "Processing" && (
            <Button size="xs" outline gradientDuoTone="cyanToBlue">
              <span className="flex items-center gap-1">
                <HiOutlineCog className="animate-spin" /> Processing
              </span>{" "}
            </Button>
          )}
          {Order_status === "Delivering" && (
            <Button size="xs" gradientMonochrome="lime">
              <span className="flex items-center gap-1">
                <img
                  src="/car-95.png"
                  alt=""
                  className="h-5 w-5 object-contain"
                />{" "}
                Delivering
              </span>{" "}
            </Button>
          )}
          {Order_status === "Delivered" && (
            <Button size="xs" color="success">
              <span className="flex items-center gap-1">
                <IoHomeOutline /> Delivered
              </span>{" "}
            </Button>
          )}
          {Order_status === "Declined" && (
            <Button size="xs" color="failure">
              <span className="flex items-center gap-1">
                <IoHomeOutline /> Declined
              </span>{" "}
            </Button>
          )}
        </div>
        <div className="shadow-lg">
          {items.map((item) => (
            <OrderItem data={item} status={Order_status} key={item.id} />
          ))}
        </div>
        <Button>Re Order</Button>
      </div>
    </div>
  );
};

export default SingleOrderItem;
