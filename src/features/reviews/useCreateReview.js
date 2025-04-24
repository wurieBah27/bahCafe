import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createReview } from "../../apis/itemsReviews";
import toast from "react-hot-toast";

const useCreateReview = () => {
  const queryClient = useQueryClient();

  const { mutate: createNewReview, isPending: isCreatingReview } = useMutation({
    mutationFn: createReview,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["itemReviews"] });
      toast.success("Your comment was cretaed successfully!");
    },
    onError: () => {
      toast.error("Failed to create comment 🚫!");
    },
  });
  return { createNewReview, isCreatingReview };
};

export default useCreateReview;
