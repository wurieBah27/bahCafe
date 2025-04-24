import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserData } from "../../../apis/user";

const useUpdateUser = () => {
  const queryClient = useQueryClient();

  const { mutate: updateUserInformation, isPending: isUpdatingUser } =
    useMutation({
      mutationFn: updateUserData,
      onSuccess: () => {
        toast.success("Your information was updated successfully!");
        queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
        queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
      },
      onError: () => {
        toast.error("Failed to update!");
      },
    });
  return { updateUserInformation, isUpdatingUser };
};

export default useUpdateUser;
