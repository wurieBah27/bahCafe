import { useQuery } from "@tanstack/react-query";
import { getItemReviews } from "../../apis/itemsReviews";

const usegetItemReview = (itemID) => {
  const { data: reviewsData, isLoading: isFetchingReviews } = useQuery({
    queryFn: () => getItemReviews({ id: itemID }),
    queryKey: ["itemReviews"],
  });
  return { reviewsData, isFetchingReviews };
};

export default usegetItemReview;
