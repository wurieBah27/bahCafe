import { useQuery } from "@tanstack/react-query";
import { getAllFavoritesItems } from "../../../apis/favoritesItems";
import useGetCurrentUser from "../../customers/customersHooks/useGetCurrentUser";

const getFavorites = () => {
  const { uid } = useGetCurrentUser();
  const { data: favorites, isLoading } = useQuery({
    queryKey: ["favorites"],
    queryFn: () => getAllFavoritesItems({ uid }),
    enabled: !!uid,
  });
  return { favorites, isLoading };
};

export default getFavorites;
