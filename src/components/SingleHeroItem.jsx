import { Link } from "react-router-dom";

const SingleHeroItem = () => {
  return (
    <div>
      <div className="max-h-40 sm:max-h-56">
        <div className="flex h-full w-full items-center justify-end bg-gray-100">
          <img
            src="/take-out-cup2.jpg"
            alt="Hero image"
            className="max-h-40 w-full object-cover sm:max-h-56"
          />
        </div>
        <div className="text-content absolute bottom-[0%] top-[0%] z-10 flex h-full w-full flex-col justify-center pl-5 shadow-2xl">
          <h4 className="mb-2 bg-opacity-100 text-xl font-bold capitalize text-gray-800 sm:mb-1">
            Premium Matcha
          </h4>
          <h2 className="line-clamp-3 w-[100%] text-xs font-medium text-gray-800 sm:w-[70%]">
            Hello Lorem, ipsum dolor sit amet consectetur adipisicing elit.
            Possimus dolorem accusamus molestiae maxime quasi consectetur Lorem
            ipsum dolor sit, amet consectetur adipisicing elit. Assumenda illum
            illo neque voluptate a, impedit rem reprehenderit dolorum modi
            labore, inventore vel, non eaque. Rerum nemo voluptatem labore
            sapiente harum?
            <br />
          </h2>
          <Link
            to={"/cart"}
            className="btn-primary text mt-3 flex max-w-max items-center justify-center rounded-lg bg-teal-700 px-6 py-2 text-center text-sm font-bold text-gray-100 shadow-2xl transition-all hover:translate-y-1 hover:bg-teal-600 focus:ring-4"
          >
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
};

export default SingleHeroItem;
