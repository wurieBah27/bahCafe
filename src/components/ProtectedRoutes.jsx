import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import useGetCurrentUser from "../features/customers/customersHooks/useGetCurrentUser";

const ProtectedRoutes = ({ children }) => {
  const { emailVerified: isAuthenticated, uid } = useGetCurrentUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [isAuthenticated, navigate]);

  return isAuthenticated ? <>{children}</> : null;
};

export default ProtectedRoutes;
