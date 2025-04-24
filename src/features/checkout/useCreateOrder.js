import { useMutation } from "@tanstack/react-query";
import { createOrder } from "../../apis/orders";
import { useNavigate } from "react-router-dom";

const useCreateOrder = () => {
  const navigate = useNavigate();
  const { mutate: createOrders, isPending: isCreatingOrder } = useMutation({
    mutationFn: createOrder,
    onSuccess: () => {
      navigate("/order");
    },
  });

  return { createOrders, isCreatingOrder };
};

export default useCreateOrder;
