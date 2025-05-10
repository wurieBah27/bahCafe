import { Link } from "react-router-dom";

const SingleHeroItem = ({ data = {} }) => {
  const { descriptions, id, imgUrls, name, price, discountPercent = {} } = data;
  const { discount = 0 } = discountPercent;
  const itemPrice = (discount / 100) * +price;

  return (
    <div>
      <Link to={`/product/${id}`}>
        {/* <div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div> */}

        <div className="text-content flex h-44 gap-3 from-gray-700 from-10% via-gray-600 via-30% to-gray-300 to-90% px-2 py-4 dark:bg-gradient-to-r sm:h-60 sm:max-h-60 sm:px-6">
          <div className="flex-[2]">
            <div className="max-h-40 sm:max-h-56 sm:w-[65%]">
              <h4 className="py-1 text-xl text-gray-900 dark:text-gray-100 max-[340px]:text-base sm:text-2xl">
                {name}
              </h4>
              <h2 className="line-clamp-2 text-xs font-medium text-gray-600 dark:text-gray-300 sm:line-clamp-3">
                {descriptions}
                <br />
              </h2>
              <span className="mt-2 flex flex-wrap items-baseline font-bold text-gray-700 dark:text-white">
                {" "}
                <span>AED {(+price - itemPrice).toFixed(2)} </span>
                <span className="text-sm font-semibold text-[#82AE04] sm:text-xl">
                  {discount > 0 && (
                    <span className="inline-block w-full p-1 text-xs sm:text-sm">
                      <span className="mr-1 text-gray-700 line-through dark:text-gray-100">
                        AED {price}
                      </span>{" "}
                      <span className="mr-1 text-red-600 dark:text-red-400">
                        {discount}% OFF
                      </span>
                      {/* <span>({disCountName})</span> */}
                    </span>
                  )}
                </span>
              </span>
              <span className="btn-primary mt-2 flex max-w-max items-center justify-center rounded-lg bg-teal-700 px-6 py-2 text-center text-sm font-bold text-gray-100 shadow-2xl transition-all hover:translate-y-1 hover:bg-teal-600 focus:ring-4 max-[350px]:px-4 max-[350px]:py-1">
                Order Now
              </span>
            </div>
          </div>
          <div className="flex flex-1 items-center justify-center overflow-hidden rounded-full sm:max-h-56">
            <img
              src={imgUrls?.at(0) || "/take-out-cup2.jpg"}
              alt="Hero image"
              className="w-full rounded-full"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleHeroItem;
