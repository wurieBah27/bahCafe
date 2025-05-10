import { TextInput } from "flowbite-react";
import Spinner from "../components/Spinner";
import useGetAllItems from "../features/menue/menueHooks/useGetAllItems";
import MenueItems from "../features/menue/MenueItems";
import { IoFilter, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { useEffect, useRef } from "react";
import Filter from "../components/Filter";
import { useNavigate, useSearchParams } from "react-router-dom";
import { HiChevronLeft } from "react-icons/hi2";
import BackButton from "../components/BackButton";

const filterOptions = [
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "name-asc", label: "Name: A-Z" },
  { value: "name-desc", label: "Name: Z-A" },
];
const ProductsPage = () => {
  const { menueItems, isFetchingMenue } = useGetAllItems();
  const [searchTerm, setSearchTerm] = useState("");
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();

  const currentFilterValue = searchParams.get("sortBy") || "";
  console.log(currentFilterValue);
  const inputRef = useRef(null);

  const filteredItems = menueItems.filter((item) =>
    item?.name?.toLowerCase().includes(searchTerm.toLowerCase()),
  );
  const sortedItems = filteredItems.sort((a, b) => {
    const sortBy = currentFilterValue.split("-")[0];
    const order = currentFilterValue.split("-")[1];

    if (sortBy === "price") {
      return order === "asc" ? a.price - b.price : b.price - a.price;
    } else if (sortBy === "name") {
      return order === "asc"
        ? a.name.localeCompare(b.name)
        : b.name.localeCompare(a.name);
    }
  });
  console.log(sortedItems);
  const handleOnChange = (e) => {
    setSearchTerm(e.target.value);
  };

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  if (isFetchingMenue) return <Spinner />;
  return (
    <div className="z-[1001] px-0 py-2 sm:px-4 sm:py-8">
      <div className="my-3 flex items-center justify-between px-4 sm:my-6">
        <BackButton />
        <div className="flex items-center gap-2">
          <Filter
            filterField="sortBy"
            title={"Sort By"}
            Icon={IoFilter}
            options={filterOptions}
          />
        </div>
      </div>

      <div className="px-4 shadow-md">
        <TextInput
          placeholder="Search for any products"
          icon={IoSearch}
          onChange={handleOnChange}
          value={searchTerm}
          ref={inputRef}
        />
      </div>
      <div className="flex items-center justify-between px-4 py-2 shadow-md">
        <h1 className="text-lg font-semibold">Products</h1>
        <h1 className="text-lg font-semibold">Total: {filteredItems.length}</h1>
      </div>

      <div>
        <MenueItems items={filteredItems} />
      </div>
      <div>
        {filteredItems?.length === 0 && (
          <div className="flex flex-col items-center justify-center gap-6">
            <h1 className="text-2xl font-semibold text-gray-500 dark:text-gray-400">
              No products found
            </h1>
            <img
              src="/noProductFound.avif"
              alt="no product was foound image."
              className="w-40"
            />{" "}
            <p className="p-4 text-center text-gray-600 dark:text-gray-300">
              Sorry, we currently don't offer the product you're looking for.
              Please try searching for something else or explore our available
              products.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductsPage;
