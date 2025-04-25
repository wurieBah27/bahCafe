const CategoriesHeader = ({ category }) => {
  return (
    <div className="mb-2 mt-4 px-10">
      <div>
        <div className="flex items-center justify-between rounded-md bg-[#dbd2b6] px-4 py-3 dark:bg-gray-700">
          <div className="">
            <h4 className="text-center text-xl font-bold capitalize text-gray-700 dark:text-gray-100">
              {category}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesHeader;
