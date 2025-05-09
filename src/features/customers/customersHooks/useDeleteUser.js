import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deleteUserAccount } from "../../../apis/user";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: deleteUser, isPending: isDeletingUserAccount } = useMutation({
    mutationFn: deleteUserAccount,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
      queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
      console.log("User account deleted successfully.");
      toast.success("User account deleted successfully.");
      navigate(0);
    },
    onError: (error) => {
      toast.error("Error deleting user account.");
      console.error("Error deleting user account:", error);
    },
  });
  return { deleteUser, isDeletingUserAccount };
};

export default useDeleteUser;
