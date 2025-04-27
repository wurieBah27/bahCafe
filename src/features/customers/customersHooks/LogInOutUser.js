import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signInUser, signOutUser } from "../../../apis/user";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

export const LogInUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signIn, isPending } = useMutation({
    mutationFn: signInUser,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
      queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
      navigate("/");
      toast.success("User logged in successfully!");
    },
    onError: () => {
      toast.error("We encountered an Error 🚫!");
    },
  });
  return { signIn, isPending };
};

export const LogOutUser = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: signOut, isPending } = useMutation({
    mutationFn: signOutUser,
    onSuccess: () => {
      queryClient.removeQueries({ queryKey: ["currentCustomer"], exact: true });
      queryClient.removeQueries({
        queryKey: ["currentLogCustomer"],
        exact: true,
      });
      navigate("/");
      toast.success("User logged out successfully!");
    },
    onError: (data) => {
      toast.error("We encountered an Error 🚫!");
      console.log(data);
    },
  });
  return { signOut, isPending };
};
