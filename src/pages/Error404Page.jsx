import { Link } from "react-router-dom";

const Error404Page = () => {
  return (
    <div>
      <div className="grid h-screen place-content-center bg-white px-4">
        <div className="text-center">
          <h1 className="text-9xl font-black text-gray-200">404</h1>

          <p className="text-2xl font-bold tracking-tight text-gray-900 sm:text-4xl">
            Uh-oh!
          </p>

          <p className="mt-4 text-gray-500">We can't find that page.</p>

          <Link
            to={"/"}
            className="focus:ring-3 focus:outline-hidden mt-6 inline-block rounded-sm bg-indigo-600 px-5 py-3 text-sm font-medium text-white hover:bg-indigo-700"
          >
            Go Back Home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Error404Page;
