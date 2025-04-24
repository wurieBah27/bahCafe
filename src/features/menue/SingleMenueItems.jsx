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

  const { discount: discountValue = 0 } = discountPercent || {};
  const itemPrice = (discountValue / 100) * +price;

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
    <div className="mb-6">
      <div>
        {item ? (
          <div
            className={`${is_available ? "bg-primary" : "bg-gray-300 opacity-50"} relative flex -hidden w-full flex-col items-stretch justify-start rounded-lg py-3 shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0_2px_4px_-2px_rgba(0,_0,_0,_0.05)] transition-all hover:translate-y-[4px] active:translate-y-[4px]`}
          >
            <Link to={`/product/${id}`}>
              <div className="contentss item relative flex items-center gap-3">
                <img
                  src={imgUrls?.at(0) || "/logoo.jpeg"}
                  alt=""
                  className="inset-0 h-20 w-20 rounded-full object-cover sm:h-20 sm:w-20"
                />
                <div className="flex w-full flex-col gap-3">
                  <div>
                    <div className="flex flex-col gap-4 max-[380px]:gap-1">
                      <div className="title flex items-center gap-6 max-[380px]:flex-col max-[380px]:items-start max-[380px]:justify-start max-[380px]:gap-2">
                        <p className="title_name font-bold capitalize text-[#14152d] max-[380px]:text-xs">
                          {name}
                        </p>
                        <span className="price font-semibold text-[#82AE04] sm:text-sm">
                          AED {(+price - itemPrice).toFixed(2)}
                          {discountValue > 0 && (
                            <span className="text-sm">
                              <span className="ml-3 mr-1 text-gray-700 line-through">
                                AED {price}
                              </span>{" "}
                              <span className="text-red-600">
                                {discountValue}% OFF
                              </span>
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="description line-clamp-2 max-h-20 w-[80%] text-gray-700 dark:text-gray-100">
                        {descriptions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Link>

            <div className="price-calories mr-2 flex items-center justify-between max-[380px]:mt-2">
              <div className="absolute -top-4 right-2">
                <ItemRating
                  reviewCounts={totalReviews}
                  averageRating={averageRatings.toFixed(1)}
                />
              </div>
              <div>
                <FavoritesBtn />
              </div>
              {is_available ? (
                <div className="ma-[380px]:justify-between flex w-full items-center justify-end gap-2 sm:gap-4">
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
              className={`${is_available ? "bg-primary" : "bg-gray-300 opacity-50"} relative flex -hidden w-full flex-col items-stretch justify-start rounded-lg py-3 shadow-[0_4px_6px_-1px_rgba(0,_0,_0,_0.1),_0_2px_4px_-2px_rgba(0,_0,_0,_0.05)] transition-all hover:translate-y-[4px] active:translate-y-[4px]`}
            >
              <div className="contentss item relative flex items-center gap-3">
                <img
                  src={imgUrls?.at(0) || "/logoo.jpeg"}
                  alt=""
                  className="inset-0 h-20 w-20 rounded-full object-cover sm:h-20 sm:w-20"
                />
                <div className="flex w-full flex-col gap-3">
                  <div>
                    <div className="flex flex-col max-[380px]:gap-1">
                      <div className="title flex flex-col gap-2 max-[380px]:flex-col max-[380px]:items-start max-[380px]:justify-start max-[380px]:gap-2">
                        <p className="title_name font-bold capitalize text-[#14152d] max-[380px]:text-xs">
                          {name}
                        </p>
                        <span className="text-sm font-semibold text-[#82AE04] sm:text-xl">
                          AED {(+price - itemPrice).toFixed(2)}
                          {discountValue > 0 && (
                            <span className="text-sm">
                              <span className="ml-3 mr-1 text-gray-700 line-through">
                                AED {price}
                              </span>{" "}
                              <span className="text-red-600">
                                {discountValue}% OFF
                              </span>
                            </span>
                          )}
                        </span>
                      </div>

                      <div className="description mt-2 line-clamp-2 max-h-20 w-[80%] text-gray-700 dark:text-gray-100">
                        {descriptions}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="price-calories mr-2 flex items-center justify-between max-[380px]:mt-2">
                <div className="absolute -top-4 right-2">
                  <ItemRating
                    reviewCounts={totalReviews}
                    averageRating={averageRatings.toFixed(1)}
                  />
                </div>
                <div>
                  <FavoritesBtn />
                </div>
                {is_available ? (
                  <div className="ma-[380px]:justify-between flex w-full items-center justify-end gap-2 sm:gap-4">
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
