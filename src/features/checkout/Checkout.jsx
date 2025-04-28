import { HiBuildingLibrary, HiMapPin, HiMiniUserCircle } from "react-icons/hi2";
import TotalCartSummary from "../../components/TotalCartSummary";
import { HiMail, HiOutlineCash, HiPhoneOutgoing } from "react-icons/hi";
import {
  Button,
  Checkbox,
  Label,
  Radio,
  Textarea,
  TextInput,
} from "flowbite-react";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { FaCreditCard, FaPeopleCarry } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { emptyCart, getCart, totalCartPrice } from "../cart/cartSlice";
import { getUser } from "../customers/customersHooks/useGetCurrentUser";
import { serverTimestamp } from "firebase/firestore";
import SinglrCartItem from "../cart/SinglrCartItem";
import confirmOperation from "../../helpers/confirm";
import useCreateOrder from "./useCreateOrder";
import { useState } from "react";
import { fetchAddress } from "../customers/customerState/customerSlice";

const Checkout = () => {
  const dispatch = useDispatch();
  const totalPrice = useSelector(totalCartPrice);
  const cart = useSelector(getCart);
  const { data, uid } = getUser();
  const { createOrders, isCreatingOrder } = useCreateOrder();
  const deliveryCharge = 15;
  const navigate = useNavigate();

  const [setDeliveryCharge, setsetDeliveryCharge] = useState("Delivery");

  /* derived state calculations */
  const amountBeforeTax = (totalPrice + deliveryCharge) / 1.05;
  const tax = amountBeforeTax * 0.05;
  const total = amountBeforeTax + tax;

  /* getting user Data */
  const { phone, email, name, address = {}, profileUrl } = data;
  const {
    formatted,
    continent,
    country,
    county,
    position = {},
    town,
  } = address;
  const { lat, lng } = position;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const confirming = async () => {
    const result = await confirmOperation({
      title: "Place order?",
      confirmButtonText: "Yes, place order",
      orderText: "Your order has been placed successfully",
      confirText: "Order placed",
    });

    if (!result) return;
    return result;
  };

  const onSubmit = async (data) => {
    try {
      if (!uid) return;
      console.log(data.deliveryType);
      const newOrder = {
        Order_status: "Pending",
        createdAt: serverTimestamp(),
        updated_at: serverTimestamp(),
        images: [profileUrl],
        customer: {
          customerEmail: email,
          customer_id: uid,
          name: name,
          phone: data?.phoneNUmber,
        },
        soldBy: {
          employeeName: "",
          employeePhone: "",
          employee_id: "",
        },
        special_instructions: data.comment || "",
        notes: data.comment || "",
        payment_method: data.paymentMethod,
        order_type: data.deliveryType,
        payment_status: "Pending",
        delivery_address: {
          city: address,
          lat: lat || 0,
          lng: lng || 0,
          continent: continent || "",
          country: country || "",
          town: town || "",
          state: county || "",
          formatted: formatted || "",
          street: formatted || "",
        },
        sub_total: totalPrice,
        tax,
        total,
        deliveyCharge: data?.deliveryType === "Delivery" ? deliveryCharge : 0,
        items: cart,
        userId: uid,
      };

      const confirmOrder = await confirming();
      if (confirmOrder) {
        console.log(data.deliveryType);
        console.log(newOrder);
        await createOrders(newOrder);
      }
    } catch (error) {
      throw new Error(error);
    } finally {
      dispatch(emptyCart());
    }
  };

  console.log(setDeliveryCharge);
  if (!cart.length) navigate(-1);
  return (
    <div>
      <div>
        <div>
          <section className="min-h-screen">
            <div className="">
              <div>
                {cart?.map((item) => (
                  <SinglrCartItem data={item} key={item?.id} />
                ))}
              </div>
              <div className="flex items-center justify-center pb-8 lg:col-span-7 lg:py-12 xl:col-span-6">
                <div className="flex-1 px-5 sm:px-8">
                  <form
                    action="#"
                    onSubmit={handleSubmit(onSubmit)}
                    className="mt-8 grid w-full grid-cols-6 gap-6"
                  >
                    <div className="col-span-6 sm:col-span-3">
                      <div className="w-full">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="firstName"
                            value={`First Name ${errors?.firstName ? "(required)*" : ""}`}
                          />
                        </div>
                        <TextInput
                          id="firstName"
                          type="text"
                          defaultValue={name}
                          {...register("firstName", { required: true })}
                          icon={HiMiniUserCircle}
                          placeholder="John"
                        />
                      </div>
                    </div>

                    <div className="col-span-6">
                      <div className="w-full">
                        <div className="mb-2 block">
                          <Label htmlFor="lastName" value="Email address " />
                        </div>
                        <TextInput
                          id="lastName"
                          type="email"
                          defaultValue={data?.email}
                          {...register("email")}
                          icon={HiMail}
                          placeholder="Doe"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <div className="w-full">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="phoneNUmber"
                            value="Phone NUmber (required)*"
                          />
                        </div>
                        <TextInput
                          id="phoneNUmber"
                          type="text"
                          defaultValue={phone}
                          icon={HiPhoneOutgoing}
                          {...register("phoneNUmber", { required: true })}
                          placeholder="+123 45 678 5214"
                        />
                      </div>
                    </div>
                    <div className="col-span-6 sm:col-span-3">
                      <div className="relative w-full">
                        <div className="mb-2 block">
                          <Label
                            htmlFor="userAddress"
                            value="Last Name (optional)"
                          />
                        </div>
                        <TextInput
                          id="userAddress"
                          type="text"
                          defaultValue={formatted || ""}
                          icon={HiMapPin}
                          placeholder="Enter address"
                        />
                        {!formatted && (
                          <span
                            className="absolute right-1 top-[47%] cursor-pointer rounded-full bg-teal-500 px-3 py-2 text-sm text-gray-50"
                            onClick={() => dispatch(fetchAddress())}
                          >
                            Get Address
                          </span>
                        )}

                        <Link
                          to="/user/address"
                          className="inline-block py-1 text-blue-500 underline"
                        >
                          Change address
                        </Link>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <div className="mb-2 block">
                        <Label
                          htmlFor="comment"
                          value="Do you have any instructions ?"
                        />
                      </div>
                      <Textarea
                        id="comment"
                        className="p-2"
                        {...register("comment")}
                        placeholder="Leave a note about your order..."
                        rows={2}
                      />
                    </div>
                    <div className="col-span-6 text-gray-700">
                      <fieldset className="flex max-w-md flex-col gap-2">
                        <legend className="mb-4">
                          Choose your delivery type
                        </legend>
                        <div className="flex max-w-max items-center gap-3">
                          <Radio
                            id="pickup"
                            name="deliveryType"
                            value="Pick up"
                            {...register("deliveryType", { required: true })}
                            onChange={(e) =>
                              setsetDeliveryCharge(e.target.value)
                            }
                          />

                          <Label
                            htmlFor="pickup "
                            className="flex items-center gap-1"
                          >
                            <FaPeopleCarry className="h-6 w-6 text-blue-700" />
                            Pick up
                          </Label>
                        </div>
                        <div className="flex max-w-max items-center gap-3">
                          <Radio
                            id="delivery"
                            name="deliveryType"
                            {...register("deliveryType", { required: true })}
                            value="Delivery"
                            onChange={(e) =>
                              setsetDeliveryCharge(e.target.value)
                            }
                          />
                          <Label
                            htmlFor="delivery"
                            className="flex items-center gap-1"
                          >
                            <img
                              src="/car-95.png"
                              alt=""
                              className="h-8 w-8 object-contain"
                            />
                            <span>Delivery</span>{" "}
                          </Label>
                        </div>
                      </fieldset>
                    </div>

                    {
                      <div className="col-span-6">
                        <fieldset className="flex max-w-md flex-col gap-4">
                          <legend className="mb-4">
                            Choose your payment method
                          </legend>
                          <div className="flex items-center gap-2">
                            <Radio
                              id="CashOnDelivery"
                              name="paymentMethod"
                              value="Cash payment"
                              {...register("paymentMethod", { required: true })}
                            />
                            <Label
                              htmlFor="CashOnDelivery"
                              className="flex items-center gap-1"
                            >
                              <HiOutlineCash className="h-6 w-6 text-blue-700" />
                              Cash on delivery{" "}
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Radio
                              id="OnlinePayment"
                              name="paymentMethod"
                              {...register("paymentMethod", { required: true })}
                              value="Online payment"
                            />
                            <Label
                              htmlFor="OnlinePayment"
                              className="flex items-center gap-1"
                            >
                              <HiBuildingLibrary className="h-6 w-6 text-blue-700" />
                              Online Payment
                            </Label>
                          </div>
                          <div className="flex items-center gap-2">
                            <Radio
                              id="cardPayment"
                              name="paymentMethod"
                              {...register("paymentMethod", { required: true })}
                              value="Card payment"
                              defaultChecked
                            />
                            <Label
                              htmlFor="cardPayment"
                              className="flex items-center gap-1"
                            >
                              <FaCreditCard className="h-6 w-6 text-blue-700" />
                              Card Payment
                            </Label>
                          </div>
                        </fieldset>
                      </div>
                    }
                    <div className="col-span-6">
                      <div className="flex items-center gap-2">
                        <Checkbox id="accept" />
                        <Label htmlFor="accept" className="flex">
                          I agree with the&nbsp; terms and conditions
                        </Label>
                      </div>
                    </div>
                    <div className="col-span-6">
                      <TotalCartSummary
                        originalPrice={totalPrice}
                        deliveryCharge={
                          setDeliveryCharge === "Delivery" ? 15 : 0
                        }
                      />
                    </div>
                    <div className="col-span-6 mt-5">
                      <Button
                        gradientDuoTone="purpleToBlue"
                        type="submit"
                        isProcessing={isCreatingOrder}
                        disabled={isCreatingOrder}
                        className="w-full sm:w-1/2"
                      >
                        Place Order{" "}
                      </Button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
