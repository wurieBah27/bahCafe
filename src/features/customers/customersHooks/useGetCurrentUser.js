import { useQuery } from "@tanstack/react-query";
import {
  getCurrentLoggedInUse,
  getCurrentLoggedInUser,
} from "../../../apis/user";
import toast from "react-hot-toast";
import { LogOutUser } from "./LogInOutUser";

export const useGetCurrentUser = () => {
  const { signOut } = LogOutUser();
  const { data: currentCustomerData = {}, isLoading } = useQuery({
    queryFn: getCurrentLoggedInUser,
    queryKey: ["currentLogCustomer"],
  });
  if (currentCustomerData?.isEmployee) {
    toast.error(
      "Employees are not authorized to log in with same EMAIL as the admin website!",
    );
    signOut();
    return;
  }
  const { emailVerified, uid } = currentCustomerData;

  return { uid, emailVerified, isLoading };
};

export const getUser = () => {
  const { uid, emailVerified } = useGetCurrentUser();

  const { data = {}, isLoading } = useQuery({
    queryFn: () => getCurrentLoggedInUse({ id: uid }),
    queryKey: ["currentCustomer"],
    enabled: !!uid,
  });

  return { data, emailVerified, isLoading, uid };
};
export default useGetCurrentUser;
