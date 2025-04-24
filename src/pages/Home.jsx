import Categories from "../components/Categories";
import HeroSection from "../components/HeroSection";
import SearchInput from "../components/SearchInput";
import Spinner from "../components/Spinner";
import useGetAllItems from "../features/menue/menueHooks/useGetAllItems";
import MenueItems from "../features/menue/MenueItems";
import CategoriesHeader from "../sections/CategoriesHeader";
import FilterCategoryBtns from "../components/FilterCategoryBtns";

const Home = () => {
  const { menueItems, isFetchingMenue } = useGetAllItems();

  const groupedItems = menueItems?.reduce((acc, item) => {
    const category = item?.subCategories?.[0]?.name || "Uncategorized";
    if (!acc[category]) {
      acc[category] = [];
    }
    acc[category].push(item);
    return acc;
  }, {});

  if (!groupedItems || isFetchingMenue) return <Spinner />;
  return (
    <div>
      <div className="pb-20">
        <div>
          <HeroSection />
        </div>
        {/* <AnimationWrapper> */}
        <div>
          <SearchInput />
        </div>
        {/* </AnimationWrapper> */}

        <div className="mt-5 px-2">
          <Categories />
          <FilterCategoryBtns groupedItems={groupedItems} />
        </div>
        <div>
          {Object?.keys(groupedItems).map((category) => (
            <div key={category} id={category}>
              <CategoriesHeader category={category} />
              <MenueItems items={groupedItems[category]} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
