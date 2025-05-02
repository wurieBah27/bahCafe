const CategoriesHeader = ({ category }) => {
  return (
    <div className="mt-4 px-4">
      <div>
        <div className="flex items-center justify-between rounded-md py-3 dark:bg-gray-700">
          <div className="">
            <h4 className="text-center text-xl font-bold uppercase text-gray-700 dark:text-gray-100">
              {category}
            </h4>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoriesHeader;
