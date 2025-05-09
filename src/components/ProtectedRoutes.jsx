import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetCurrentUser from "../features/customers/customersHooks/useGetCurrentUser";
import Spinner from "./Spinner";

const ProtectedRoutes = ({ children }) => {
  const {
    emailVerified: isAuthenticated,
    uid,
    isLoading,
  } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated && !isLoading) {
      // Redirect to the login page if the user is not authenticated
      navigate("/login");
    }
    if (uid && !isAuthenticated && !isLoading) {
      // If the user is authenticated but email is not verified, redirect to the email verification page
      navigate("/email-verification");
    }
  }, [isAuthenticated, navigate, isLoading]);
  if (isLoading) return <Spinner />; // Optionally, you can show a loading spinner or placeholder while checking authentication

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoutes;
