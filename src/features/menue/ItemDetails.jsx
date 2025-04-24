import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { HiOutlineHeart } from "react-icons/hi";
import { HiOutlineChatBubbleLeft } from "react-icons/hi2";

import useGetSingleItem from "./menueHooks/useGetSingleItem";
import ItemRating from "../../components/ItemRating";
import Spinner from "../../components/Spinner";
import { Link, useLocation, useNavigate } from "react-router-dom";
import RadioInput from "../../components/RadioInput";
import MenueActionBtns from "./MenueActionBtns";
import AddToCartBtn from "../../components/AddToCartBtn";
import AddNotes from "../../components/AddNotes";
import { addItemToCart, getCurrentItemQuantityByID } from "../cart/cartSlice";
import { useForm } from "react-hook-form";
import usegetItemReview from "../reviews/usegetItemReview";
import { Rating } from "flowbite-react";

const ItemDetails = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [openModal, setOpenModal] = useState(false);
  const [orderNote, setOrderNote] = useState("");
  const dispatch = useDispatch();

  const { singleMenueItem, isGettingSingleItem, itemID } = useGetSingleItem();

  const itemCurrentQuantity = useSelector(getCurrentItemQuantityByID(itemID));
  const { reviewsData, isFetchingReviews } = usegetItemReview(itemID);
  const totalReviews = reviewsData?.length || 0;
  const averageRatings =
    reviewsData?.reduce((acc, curr) => acc + curr?.rating, 0) / totalReviews;

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const {
    name,
    notes,
    imgUrls,
    descriptions,
    price,
    is_available,
    discountPercent,
    options,
  } = singleMenueItem;

  const { discount: discountValue = 0 } = discountPercent || {};
  const itemPrice = (discountValue / 100) * +price;
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [location]);

  const handleAddToCart = (data) => {
    const selectedOptions = options.map((option) => data[option.title]);
    let optionPrices = [];
    if (selectedOptions) {
      const testt = selectedOptions?.filter((option) => option !== null);

      optionPrices = testt?.map((option) => {
        const [_, itemPrice] = option?.split(" = ");
        return parseFloat(itemPrice);
      });
    }
    const totalOptionPrice = optionPrices?.reduce((acc, curr) => acc + curr, 0);
    const totalPrice = +price - itemPrice + totalOptionPrice;
    console.log(totalPrice);
    const newItem = {
      name: name,
      id: itemID,
      optionPrice: totalOptionPrice,
      totalOptionPrice: totalOptionPrice,
      quantity: 1,
      unitPrice: +price - itemPrice,
      price: totalPrice,
      totalPrice: +totalPrice,
      specialNote: orderNote,
      options: data, // Add selected options to the item
      image: imgUrls?.at(0),
    };

    dispatch(addItemToCart(itemID, newItem));
    navigate(-1);
  };

  const onSubmit = (data) => {
    handleAddToCart(data);
  };

  if (isGettingSingleItem) return <Spinner />;
  return (
    <div>
      <div>
        <div
          id="menu_details_screen"
          className="animate-slideInDown flex h-full min-h-52 w-full flex-col"
        >
          <div className="animate-fadeInDown relative flex h-full min-h-full w-full flex-col lg:h-max lg:min-h-max">
            <div className="flex max-h-fit items-center justify-center overflow-hidden drop-shadow-xl">
              <img
                src={imgUrls}
                alt=""
                className="h-full w-full object-contain"
              />
            </div>
            <form
              action="#"
              onSubmit={handleSubmit(onSubmit)}
              className="bg-primary bg-primary relative flex h-full min-h-[95vh] w-full flex-col gap-y-4 rounded-t-3xl pb-44 pt-6"
            >
              <div className="flex w-full flex-col gap-y-8 sm:px-4">
                <div className="absolute -top-4 right-2">
                  <ItemRating reviewCounts={totalReviews} />
                </div>
                <div className="flex flex-col gap-y-2">
                  <div className="flex items-start justify-between gap-x-1">
                    <span className="text-primary flex flex-wrap gap-x-1 text-2xl font-bold">
                      {name}
                    </span>
                    <button type="button">
                      <HiOutlineHeart className="h-8 w-8" />
                    </button>
                  </div>
                  <div className="text-primary">{descriptions}</div>
                  <div className="flex items-baseline">
                    <span className="text-highlight_color flex items-baseline gap-2 text-base font-bold">
                      AED{" "}
                      <span className="text-2xl">
                        {(+price - itemPrice).toFixed(2)}
                      </span>
                    </span>
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
                  </div>
                  <Link
                    to={`/review/${itemID}`}
                    className="bg-highlight_color-800 animate-fadeInDown my-4 flex w-full items-center justify-between gap-x-3 rounded-md bg-[#bfb083] p-4 text-white shadow transition-all active:scale-[.99]"
                  >
                    {totalReviews > 0 && (
                      <Rating>
                        <Rating.Star />
                        <p className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                          {averageRatings?.toFixed(1)}
                        </p>
                        <span className="mx-1.5 h-1 w-1 rounded-full bg-gray-500 dark:bg-gray-400" />
                        <span className="text-sm font-medium text-gray-900 underline hover:no-underline dark:text-white">
                          {totalReviews} reviews
                        </span>
                      </Rating>
                    )}
                    {totalReviews === 0 && (
                      <span className="line-clamp-1 text-start text-sm font-bold">
                        Doesn’t have any review yet.
                      </span>
                    )}
                    {totalReviews === 0 && (
                      <span className="flex flex-shrink-0 text-end text-sm font-bold underline">
                        Add Review
                      </span>
                    )}
                  </Link>
                  <div className="flex w-full flex-col gap-y-8">
                    <div className="animate-fadeInDown flex w-full flex-col gap-y-8">
                      <div className="flex flex-col gap-y-4"></div>
                      {options.map((option) => (
                        <RadioInput
                          key={option.id}
                          arrayObjs={option?.items}
                          name={option?.title}
                          register={register}
                          isRequired={option?.isRequired}
                          errors={errors}
                        />
                      ))}

                      <div
                        id="6697879eea96cf234a2a6e4a"
                        className="flex flex-col gap-y-4"
                      >
                        <div className="flex flex-col gap-y-2">
                          <div className="flex w-full items-center justify-between">
                            <div className="flex w-full items-center space-x-1.5">
                              <p className="text-primary text-lg font-semibold">
                                notes
                              </p>
                            </div>
                          </div>
                          {notes?.map((note, index) => (
                            <div
                              key={note.id}
                              className="text-primary flex w-full flex-col gap-y-2 px-4"
                            >
                              {`${index + 1}. ${note.name}`}
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="fixed bottom-0 left-1/2 z-[1100] mx-auto w-full max-w-5xl -translate-x-1/2 items-center justify-center bg-gray-50 px-5 py-4 text-sm">
                {is_available ? (
                  <div className="flex h-full flex-col gap-3 sm:gap-4">
                    <div className="flex items-center justify-between">
                      <span className="flex items-center gap-1 text-xs text-gray-700">
                        <HiOutlineChatBubbleLeft /> You have any Message?
                      </span>
                      <span
                        className="cursor-pointer p-1 underline"
                        onClick={() => setOpenModal((modal) => !modal)}
                      >
                        Add Message
                      </span>

                      <AddNotes
                        setOpenModal={setOpenModal}
                        openModal={openModal}
                        notes={orderNote}
                        setOrderNote={setOrderNote}
                      />
                    </div>
                    <div className="flex items-center justify-end">
                      <MenueActionBtns
                        id={itemID}
                        itemCurrentQuantity={itemCurrentQuantity}
                      />
                      {itemCurrentQuantity === 0 && (
                        <AddToCartBtn
                          btnType={"submit"}
                          type={"secondary"}
                          onClick={handleSubmit}
                        />
                      )}
                    </div>{" "}
                  </div>
                ) : (
                  <p className="text-gray-900">Out of stock</p>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ItemDetails;
