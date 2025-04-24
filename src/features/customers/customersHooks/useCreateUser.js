import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createUser } from "../../../apis/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useCreateUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const {
    mutate: createCustomer,
    isPending,
    isError,
  } = useMutation({
    mutationFn: createUser,
    onSuccess: (data) => {
      toast.success("user created successfully 👍");
      queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
      queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
      navigate("/");

      console.log(data);
    },
    onError: () => {
      toast.error("Error, user not created 🚫");
    },
  });

  return { createCustomer, isPending, isError };
};

export default useCreateUser;
