import { useQuery } from "@tanstack/react-query";
import { getSingleMenueItem } from "../../../apis/menueItemsApi";
import { useParams } from "react-router-dom";

const useGetSingleItem = () => {
  const { itemID } = useParams();

  const { data: singleMenueItem = {}, isLoading: isGettingSingleItem } =
    useQuery({
      queryFn: () => getSingleMenueItem({ id: itemID }),
      queryKey: ["singleMenueItem"],
      enabled: !!itemID,
    });
  return { singleMenueItem, isGettingSingleItem, itemID };
};

export default useGetSingleItem;
