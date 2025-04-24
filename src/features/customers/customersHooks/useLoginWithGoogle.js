import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginInWithGoogle, signupWithGoogle } from "../../../apis/user";

const useLoginWithGoogle = () => {
  const queryClient = useQueryClient();
  const { mutate: createUserWithGoogle, isPending: isCreatingWithGoogle } =
    useMutation({
      mutationFn: loginInWithGoogle,
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
        queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
        navigate("/");
        toast.success("User created successfully!");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  return { createUserWithGoogle, isCreatingWithGoogle };
};
export const useSignInWithGoogle = () => {
  const queryClient = useQueryClient();
  const { mutate: signInUserWithGoogle, isPending: isSigningWithGoogle } =
    useMutation({
      mutationFn: signupWithGoogle,
      onSuccess: async () => {
        queryClient.invalidateQueries({ queryKey: ["currentCustomer"] });
        queryClient.invalidateQueries({ queryKey: ["currentLogCustomer"] });
        navigate("/");
        toast.success("User logged in successfully!");
      },
      onError: (error) => {
        console.log(error);
      },
    });
  return { signInUserWithGoogle, isSigningWithGoogle };
};

export default useLoginWithGoogle;
