import { useQuery } from "@tanstack/react-query";
import { getAllMenueItems } from "../../../apis/menueItemsApi";
import { useSearchParams } from "react-router-dom";

const useGetAllItems = () => {
  const [searchParams] = useSearchParams();
  let filterByCategory;

  const filterValue = searchParams.get("category") || "All";

  const {
    data: menueItems = [],
    isLoading: isFetchingMenue,
    isError: menueError,
  } = useQuery({
    queryFn: () => getAllMenueItems({ queryValue: filterValue?.toLowerCase() }),
    queryKey: ["menue", filterValue],
    // refetchInterval: 5000, // Poll every 5 seconds
  });

  // if (filterValue === "All") filterByCategory = menueItems;

  // if (filterValue !== "All")
  //   filterByCategory = menueItems.filter(
  //     (item) => item?.category?.toLowerCase() === filterValue.toLowerCase(),
  //   );
  return { menueItems, isFetchingMenue, menueError, filterByCategory };
};

export default useGetAllItems;
