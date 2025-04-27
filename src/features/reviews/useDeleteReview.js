import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteReviews } from "../../apis/itemsReviews";
import toast from "react-hot-toast";

const useDeleteReview = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteReview, isPending: isDeletingReview } = useMutation({
    mutationFn: deleteReviews,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["itemReviews"] });
      toast.success("Review deleted successfully!");
    },
    onError: (error) => {
      toast.error("We encountered an Error 🚫!");
      console.log(error);
    },
  });
  return { deleteReview, isDeletingReview };
};

export default useDeleteReview;
