import { Button } from "flowbite-react";
import { HiOutlineHeart } from "react-icons/hi";
import { HiMiniArrowPath, HiMiniEye, HiStar } from "react-icons/hi2";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addItemToCart } from "../cart/cartSlice";

const OrderItem = ({ data = {}, status }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id, name, unitPrice, totalPrice, image, quantity, options } = data;

  console.log(data);
  return (
    <div>
      <div
        className="relative rounded-md border bg-gray-50 px-4 pb-2 pt-4 text-gray-700 max-[380px]:px-1 sm:px-6 lg:px-8"
        aria-modal="true"
        role="dialog"
        tabIndex="-1"
      >
        <div>
          <ul>
            <li className="flex items-center gap-4">
              <img
                src={image}
                alt=""
                className="size-16 rounded-full object-cover max-[400px]:size-10"
              />

              <div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span>Title:</span>
                  <h3 className="text-sm text-gray-900">{name}</h3>
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span>Price:</span>
                  <span className="flex items-baseline gap-1 text-sm">
                    <span className="text-[0.5rem] text-gray-900">AED</span>{" "}
                    <b className="text-[#38ae04]">{unitPrice}</b>
                  </span>
                </div>

                <div className="mt-0.5 flex flex-wrap text-[10px] text-gray-600">
                  {options &&
                    Object.keys(options).map((key) => (
                      <div key={key} className="mr-1">
                        {options[key] !== null && (
                          <>
                            <dt className="mr-1 inline">{key}:</dt>
                            <dd className="inline">{options[key]}</dd> {" ,"}
                          </>
                        )}{" "}
                      </div>
                    ))}
                </div>
                <div className="flex items-center gap-3 text-gray-400">
                  <span>Sub total:</span>
                  <span className="flex items-baseline gap-1 text-sm">
                    <span className="text-[0.5rem] text-gray-900">AED</span>{" "}
                    <b className="text-[#38ae04]">{totalPrice}</b>
                  </span>
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div className="flex items-center gap-3 py-2">
          <Button.Group>
            <Button
              color="gray"
              size="xs"
              onClick={() => navigate(`/product/${id}`)}
            >
              <span className="flex items-center gap-1">
                View <HiMiniEye className="text-blue-700" />
              </span>
            </Button>
            <Button
              color="gray"
              size="xs"
              onClick={() => dispatch(addItemToCart(id, data))}
            >
              <span className="flex items-center gap-1">
                Re Order <HiMiniArrowPath className="text-blue-700" />
              </span>{" "}
            </Button>
            <Button
              color="gray"
              size="xs"
              onClick={() => navigate(`/review/${id}`)}
            >
              <span className="flex items-center gap-1">
                Review <HiStar color="#FCC419" size={10} />
              </span>
            </Button>
          </Button.Group>
        </div>
      </div>
    </div>
  );
};

export default OrderItem;
