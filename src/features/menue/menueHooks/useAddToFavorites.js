import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addToFavorites } from "../../../apis/favoritesItems";
import toast from "react-hot-toast";

const useAddToFavorites = () => {
  const queryClient = useQueryClient();

  const { mutate: addItemToFavorite, isPending: isAddingToFavorites } =
    useMutation({
      mutationFn: addToFavorites,
      onSuccess: (data) => {
        queryClient.invalidateQueries({ queryKey: ["favorites"] });
        queryClient.invalidateQueries({ queryKey: ["menueItems"] });
        toast.success("Added to favorites successfully!");

        // Optionally, you can log the data or perform any other action here
        console.log("Added to favorites successfully", data);
      },
      onError: (error) => {
        toast.error("We encountered an Error 🚫!");
        console.error("Error adding to favorites", error);
      },
    });
  return { addItemToFavorite, isAddingToFavorites };
};

export default useAddToFavorites;
