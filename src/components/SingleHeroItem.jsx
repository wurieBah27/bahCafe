import { Link } from "react-router-dom";

const SingleHeroItem = () => {
  return (
    <div>
      <div className="max-h-56">
        <div className="flex h-full w-full items-center justify-end bg-gray-100">
          <img
            src="/take-out-cup.jpg"
            alt="Hero image"
            className="h-[100%] w-full object-cover"
          />
        </div>
        <div className="text-content absolute bottom-[0%] top-[0%] z-10 flex h-full w-full flex-col justify-center pl-5 shadow-2xl">
          <h4 className="mb-2 bg-opacity-100 text-xl font-bold capitalize text-gray-800 sm:mb-1">
            Premium Matcha
          </h4>
          <h2 className="w-[70%] text-xs font-medium text-gray-800">
            Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Possimus dolorem accusamus molestiae maxime quasi consectetur
            <br />
          </h2>
          <Link
            to={"/cart"}
            className="btn-primary text mt-3 flex max-w-max items-center justify-center rounded-lg bg-teal-700 px-6 py-2 text-center text-sm font-bold text-gray-100 shadow-2xl transition-all hover:translate-y-1 hover:bg-[rgba(0,0,0,0.4)] focus:ring-4"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleHeroItem;
