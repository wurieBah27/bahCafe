import { useQuery } from "@tanstack/react-query";
import { getAllOrders } from "../../apis/orders";
import useGetCurrentUser from "../customers/customersHooks/useGetCurrentUser";

const useGetAllOrders = () => {
  const { uid } = useGetCurrentUser();
  console.log(uid);
  const {
    data: allCustomerOrders,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["all-orders"],
    queryFn: () => getAllOrders({ uid }),
    enabled: !!uid,
  });
  return { allCustomerOrders, isLoading, refetch };
};

export default useGetAllOrders;
