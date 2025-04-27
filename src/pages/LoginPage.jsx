import { HiChevronLeft } from "react-icons/hi";
import LoginForm from "../features/customers/LoginForm";
import { useNavigate } from "react-router-dom";
import AnimationWrapper from "../components/AnimationWrapper";

const LoginPage = () => {
  const navigate = useNavigate();
  return (
    <AnimationWrapper>
      <div className="mt-4">
        <div className="px-4 sm:px-8">
          <span
            onClick={() => navigate("/")}
            className="mb-1 inline-block cursor-pointer dark:bg-gray-600"
          >
            <HiChevronLeft className="size-10 font-bold text-gray-800 dark:text-gray-300" />
          </span>{" "}
        </div>
        <div>
          <LoginForm />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default LoginPage;
