import toast from "react-hot-toast";
import { removeFromFavorites } from "../../../apis/favoritesItems";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const useRemoveFromFavorites = () => {
  const queryClient = useQueryClient();

  const { mutate: deleteFromFavorites, isPending: isDeletingFavorite } =
    useMutation({
      mutationFn: removeFromFavorites,

      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["menueItems"] });
        toast.success("Removed from favorites successfully!");

        // Optionally, you can log the data or perform any other action here
        console.log("Removed from favorites successfully", data);
      },
      onError: (error) => {
        toast.error("We encountered an Error 🚫!");
        console.error("Error removing from favorites", error);
      },
    });

  return { deleteFromFavorites, isDeletingFavorite };
};

export default useRemoveFromFavorites;
