import { Button } from "flowbite-react";
import { useNavigate } from "react-router-dom";

const EmailVericationPAge = () => {
  const navigate = useNavigate();
  return (
    <div>
      <div>
        <h1 className="mt-10 text-center text-2xl font-bold text-gray-600 dark:text-gray-100">
          Email Verification
        </h1>
        <div className="flex flex-col items-center justify-center gap-6 px-4 text-center text-gray-500 dark:text-gray-100">
          <p className="mt-4 text-sm">
            It seems like you have created an account with us, but you haven't
            verify your Email. To access this page you first need to verify your
            Email and LOGIN IN. Please check your email to verify. We are sorry
            for the inconvenience.
          </p>

          <Button onClick={() => navigate("/login")}>Login in</Button>
        </div>
      </div>
    </div>
  );
};

export default EmailVericationPAge;
