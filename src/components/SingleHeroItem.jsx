import { Link } from "react-router-dom";

const SingleHeroItem = ({ data = {} }) => {
  const { descriptions, id, imgUrls, name, price, discountPercent = {} } = data;
  const { discount = 0 } = discountPercent;
  const itemPrice = (discount / 100) * +price;

  return (
    <div>
      <Link to={`/product/${id}`}>
        {/* <div class="bg-gradient-to-r from-indigo-500 from-10% via-sky-500 via-30% to-emerald-500 to-90% ..."></div> */}

        <div className="flex h-44 gap-3 bg-gradient-to-r from-gray-700 from-10% via-gray-500 via-30% to-gray-100 to-90% px-2 py-4 sm:h-56 sm:px-6">
          <div className="flex-[2]">
            <div className="max-h-40 sm:max-h-56 sm:w-[65%]">
              <h4 className="py-1 text-xl text-gray-100 dark:text-teal-500 sm:text-2xl">
                {name}
              </h4>
              <h2 className="line-clamp-2 pb-3 text-xs font-medium text-gray-200 dark:text-gray-500 sm:line-clamp-3">
                {descriptions}
                <br />
              </h2>
              <span className="mt-2 flex flex-wrap items-baseline font-bold text-slate-100 dark:text-white">
                {" "}
                <span>AED {(+price - itemPrice).toFixed(2)} </span>
                <span className="text-sm font-semibold text-[#82AE04] sm:text-xl">
                  {discount > 0 && (
                    <span className="inline-block w-full p-1 text-xs sm:text-sm">
                      <span className="mr-1 text-gray-100 line-through dark:text-gray-100">
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
              <Link
                to={"/cart"}
                className="btn-primary text mt-1 flex max-w-max items-center justify-center rounded-lg bg-teal-700 px-6 py-2 text-center text-sm font-bold text-gray-100 shadow-2xl transition-all hover:translate-y-1 hover:bg-teal-600 focus:ring-4"
              >
                Order Now
              </Link>
            </div>
          </div>
          <div className="flex-1 overflow-hidden rounded-full sm:max-h-56">
            <img
              src={imgUrls?.at(0) || "/take-out-cup2.jpg"}
              alt="Hero image"
              className="h-full w-full object-cover"
            />
          </div>
        </div>
      </Link>
    </div>
  );
};

export default SingleHeroItem;
