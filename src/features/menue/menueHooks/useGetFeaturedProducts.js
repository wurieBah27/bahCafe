import { useQuery } from "@tanstack/react-query";
import { getFeaturedProducts } from "../../../apis/menueItemsApi";

const useGetFeaturedProducts = () => {
  const { data: featuredItems, isLoading: isFecthingItems } = useQuery({
    queryFn: getFeaturedProducts,
    queryKey: ["featuredProducts"],
  });
  return { featuredItems, isFecthingItems };
};

export default useGetFeaturedProducts;
