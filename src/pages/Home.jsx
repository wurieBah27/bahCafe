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
import Footer from "../components/Footer";
import { useRef } from "react";

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
  const itemsContainerRef = useRef(null);

  const navigate = useNavigate();

  const handleOnFocus = () => {
    navigate("/search-products");
  };
  useEffect(() => {
    if (menueItems.length > 0) {
      setFilterByCategory(menueItems); // Only set state if it's not already set
    }
  }, [menueItems]);

  /* getUsers permission to send notification */

  const groupedItems = handleReduceItems(filterByCategory);
  const groupedItems1 = handleReduceItems(menueItems);

  // const handleFilteredItems = (category) => {
  //   setFilterByCategory(groupedItems1[`${category}`]);
  // };
  console.log(groupedItems);
  if (!groupedItems || isFetchingMenue) return <Spinner />;
  // Ref for the items container

  // Update handleFilteredItems to scroll to top
  const handleFilteredItems = (category) => {
    setFilterByCategory(groupedItems1[`${category}`]);
    setTimeout(() => {
      if (itemsContainerRef.current) {
        const y =
          itemsContainerRef.current.getBoundingClientRect().top +
          window.pageYOffset -
          100;
        window.scrollTo({ top: y, behavior: "smooth" });
      }
    }, 0);
  };

  return (
    <div>
      <div className="">
        <div>
          <HeroSection />
        </div>
        <div>
          <SearchInput handleOnFocus={handleOnFocus} />
        </div>
        <div className="mt-5 px-2">
          <Categories />
          <FilterCategoryBtns
            groupedItems={groupedItems1}
            onClickBtn={handleFilteredItems}
          />
        </div>
        {menueItems.length > 0 && (
          <div className="itemsContainer" ref={itemsContainerRef}>
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
      <Footer />
    </div>
  );
};

export default Home;
