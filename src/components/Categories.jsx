import { useSearchParams } from "react-router-dom";
import CategoriesFilterBtns from "./CategoriesFilterBtns";

const tempCategories = [
  {
    title: "All",
    url: "/all-Items-1.jpg",
  },
  {
    title: "Chocolates",
    url: "/chocolate-3.jpeg",
  },
  {
    title: "Coffee",
    url: "https://plus.unsplash.com/premium_photo-1719617327169-c7c1f3bd18c1?w=400&auto=format&fit=crop&q=60&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8bGF0dGUlMjBjb2xkfGVufDB8fDB8fHww",
  },
  {
    title: "Flowers",
    url: "/flowers.jpeg",
  },
];

const Categories = () => {
  const [searchParams, setSearchParams] = useSearchParams();

  const handleClick = (value) => {
    searchParams.set("category", value);

    setSearchParams(searchParams);
  };
  return (
    <div className="flex gap-5 overflow-auto py-4">
      {tempCategories.map((item, i) => (
        <CategoriesFilterBtns
          key={i}
          url={item.url}
          title={item.title}
          onClick={() => handleClick(item.title)}
        />
      ))}
    </div>
  );
};

export default Categories;
