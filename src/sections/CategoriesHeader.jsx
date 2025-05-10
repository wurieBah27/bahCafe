const CategoriesHeader = ({ category }) => {
  return (
    <div className="mb-3 mt-6 px-4">
      <div>
        <div className="flex items-center justify-between border-b-2 border-b-gray-400 p-3 dark:rounded-md dark:border-b-gray-700 dark:bg-gray-700">
          <div className="">
            <h4 className="text-center text-2xl font-bold uppercase text-teal-500 dark:text-teal-300 md:text-3xl">
              {category}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesHeader;
