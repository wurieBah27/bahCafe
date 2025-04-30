import { Link } from "react-router-dom";
import MenueActionBtns from "./MenueActionBtns";
import AddToCartBtn from "../../components/AddToCartBtn";
import ItemRating from "../../components/ItemRating";
import FavoritesBtn from "../../components/FavoritesBtn";
import { useSelector } from "react-redux";
import { getCurrentItemQuantityByID } from "../cart/cartSlice";
import { useEffect, useState } from "react";
import { getItemReviews } from "../../apis/itemsReviews";

const SingleMenueItems = ({ data = {} }) => {
  const {
    imgUrls,
    id,
    name,
    price,
    is_available,
    descriptions,
    discountPercent = {},
  } = data;
  const [singleItemReviews, setSingleItemReviews] = useState([]);
  const itemCurrentQuantity = useSelector(getCurrentItemQuantityByID(id));
  const item = itemCurrentQuantity > 0;

  const { discount: discountValue = 0, disCountName } = discountPercent || {};
  const itemPrice = (discountValue / 100) * +price;
  console.log(discountPercent);
  const totalReviews = singleItemReviews?.length || 0;
  const calculateAverage = singleItemReviews?.reduce(
    (acc, curr) => acc + curr?.rating || 0,
    0,
  );
  const averageRatings = calculateAverage ? calculateAverage / totalReviews : 0;

  useEffect(() => {
    async function name() {
      const reviews = await getItemReviews({ id: id });
      setSingleItemReviews(reviews);
    }
    name();
  }, []);

  return (
    <div className="mb-8">
      <div>
        {item ? (
          <div
            className={`${is_available ? "boxshadow bg-[#e1d5b9] dark:bg-gray-600" : "bg-gray-300 opacity-50"} relative flex -hidden w-full flex-col items-stretch justify-start rounded-lg p-3 shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0_2px_4px_-2px_rgba(0,_0,_0,_0.05)] transition-all hover:translate-y-[4px] active:translate-y-[4px]`}
          >
            <Link to={`/product/${id}`}>
              <div className="relative flex items-center gap-3">
                <img
                  src={imgUrls?.at(0) || "/logoo.jpeg"}
                  alt=""
                  className="inset-0 h-20 w-20 rounded-full object-cover sm:h-20 sm:w-20"
                />
                <div className="flex w-full flex-col gap-3">
                  <div>
                    <div className="flex flex-col gap-4 max-[380px]:gap-1">
                      <div className="title flex items-center gap-6 max-[380px]:flex-col max-[380px]:items-start max-[380px]:justify-start max-[380px]:gap-2">
                        <p className="title_name font-bold capitalize text-[#14152d] max-[380px]:text-xs dark:text-gray-200">
                          {name}
                        </p>
                      </div>

                      <div className="mt-2 line-clamp-2 max-h-11 text-xs text-gray-700 sm:text-base dark:text-gray-400">
                        {descriptions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>
            <div className="my-2 flex items-center justify-center">
              <span className="inline-block w-full text-center text-sm font-semibold text-[#82AE04] sm:text-xl">
                {discountValue > 0 && (
                  <span className="inline-block w-full p-1 text-xs sm:text-sm dark:bg-gray-800">
                    <span className="mr-1 text-gray-700 line-through dark:text-gray-100">
                      AED {price}
                    </span>{" "}
                    <span className="mr-1 text-red-600 dark:text-red-400">
                      {discountValue}% OFF
                    </span>
                    <span>({disCountName})</span>
                  </span>
                )}
              </span>
            </div>
            <div className="price-calories mr-2 flex items-center justify-between max-[380px]:mt-2">
              <div className="absolute right-2 top-0">
                <ItemRating
                  reviewCounts={totalReviews}
                  averageRating={averageRatings.toFixed(1)}
                />
              </div>
              <div>
                <FavoritesBtn />
              </div>
              {is_available ? (
                <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
                  <span className="text-xl font-bold text-slate-900 dark:text-white">
                    {" "}
                    AED {(+price - itemPrice).toFixed(2)}
                  </span>
                  <MenueActionBtns
                    itemCurrentQuantity={itemCurrentQuantity}
                    id={id}
                  />
                </div>
              ) : (
                <p className="text-gray-900">Out of stock</p>
              )}
            </div>
          </div>
        ) : (
          <Link to={`/product/${id}`}>
            <div
              className={`${is_available ? "boxshadow bg-[#e1d5b9] dark:bg-gray-600" : "bg-gray-300 opacity-50"} relative flex -hidden w-full flex-col items-stretch justify-start rounded-lg p-3 py-4 shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0_2px_4px_-2px_rgba(0,_0,_0,_0.05)] transition-all hover:translate-y-[4px] active:translate-y-[4px] sm:px-4`}
            >
              <div className="relative flex items-center gap-3">
                <img
                  src={imgUrls?.at(0) || "/logoo.jpeg"}
                  alt=""
                  className="inset-0 h-20 w-20 rounded-full object-cover sm:h-20 sm:w-20"
                />
                <div className="flex w-full flex-col gap-3">
                  <div>
                    <div className="flex flex-col max-[380px]:gap-1">
                      <div className="title flex flex-col gap-2 max-[380px]:flex-col max-[380px]:items-start max-[380px]:justify-start max-[380px]:gap-2">
                        <p className="title_name font-bold capitalize text-[#14152d] max-[380px]:text-xs dark:text-gray-200">
                          {name}
                        </p>
                      </div>

                      <div className="mt-2 line-clamp-2 max-h-11 text-xs text-gray-700 sm:text-base dark:text-gray-400">
                        {descriptions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="my-2 flex items-center justify-center">
                <span className="inline-block w-full text-center text-sm font-semibold text-[#82AE04] sm:text-xl">
                  {discountValue > 0 && (
                    <span className="inline-block w-full p-1 text-xs sm:text-sm dark:bg-gray-800">
                      <span className="mr-1 text-gray-700 line-through dark:text-gray-100">
                        AED {price}
                      </span>{" "}
                      <span className="mr-1 text-red-600 dark:text-red-400">
                        {discountValue}% OFF
                      </span>
                      <span>({disCountName})</span>
                    </span>
                  )}
                </span>
              </div>
              <div className="mr-2 flex items-center justify-between max-[380px]:mt-2">
                <div className="absolute right-2 top-0">
                  <ItemRating
                    reviewCounts={totalReviews}
                    averageRating={averageRatings.toFixed(1)}
                  />
                </div>
                <div>
                  <FavoritesBtn />
                </div>
                {is_available ? (
                  <div className="flex w-full items-center justify-between gap-2 sm:gap-4">
                    <span className="text-xl font-bold text-slate-900 dark:text-white">
                      {" "}
                      AED {(+price - itemPrice).toFixed(2)}
                    </span>
                    <AddToCartBtn type="primary" />
                  </div>
                ) : (
                  <p className="text-gray-900">Out of stock</p>
                )}
              </div>
            </div>
          </Link>
        )}
      </div>
    </div>
  );
};

export default SingleMenueItems;
