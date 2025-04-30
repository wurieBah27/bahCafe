import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Categories from "../components/Categories";
import HeroSection from "../components/HeroSection";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";
import useGetAllItems from "../features/menue/menueHooks/useGetAllItems";
import MenueItems from "../features/menue/MenueItems";
import CategoriesHeader from "../sections/CategoriesHeader";
import FilterCategoryBtns from "../components/FilterCategoryBtns";
import { useNavigate } from "react-router-dom";

/*==== helper funxtion to reduce itemsMenue==== */
const handleReduceItems = (array) =>
  array?.reduce((acc, item) => {
    const category = item?.subCategories?.[0]?.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});
/* ========================================== */

const Home = () => {
  const { menueItems, isFetchingMenue } = useGetAllItems();
  const [filterByCategory, setFilterByCategory] = useState([]);
  const navigate = useNavigate();

  const handleOnFocus = () => {
    navigate("/search-products");
  };
  useEffect(() => {
    if (menueItems.length > 0) {
      setFilterByCategory(menueItems); // Only set state if it's not already set
    }
  }, [menueItems]);

  const groupedItems = handleReduceItems(filterByCategory);
  const groupedItems1 = handleReduceItems(menueItems);

  const handleFilteredItems = (category) => {
    setFilterByCategory(groupedItems1[`${category}`]);
  };

  if (!groupedItems || isFetchingMenue) return <Spinner />;
  return (
    <div>
      <div className="">
        <div>
          <HeroSection />
        </div>
        {/* <AnimationWrapper> */}
        <div>
          <SearchInput handleOnFocus={handleOnFocus} />
        </div>
        {/* </AnimationWrapper> */}

        <div className="mt-5 px-2">
          <Categories />
          <FilterCategoryBtns
            groupedItems={groupedItems1}
            onClickBtn={handleFilteredItems}
          />
        </div>
        {menueItems.length > 0 && (
          <div>
            {Object?.keys(groupedItems).map((category) => (
              <motion.div
                key={category}
                id={category}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 1 }}
              >
                <CategoriesHeader category={category} />
                <MenueItems items={groupedItems[category]} />
              </motion.div>
            ))}
          </div>
        )}
        <div>
          {menueItems?.length === 0 && (
            <p className="text-center text-xl text-gray-600">
              No items found in this category.
            </p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
