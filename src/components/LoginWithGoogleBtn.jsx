import { Button } from "flowbite-react";

const LoginWithGoogleBtn = ({ isDisable = false, onClick }) => {
  return (
    <Button
      color="dark"
      className="w-full"
      disabled={isDisable}
      onClick={onClick}
    >
      <span className="flex items-center justify-center gap-2">
        <img
          src={`https://www.material-tailwind.com/logos/logo-google.png`}
          alt="google"
          className="h-6 w-6"
        />{" "}
        Log in with google <span>{isDisable && "..."}</span>
      </span>
    </Button>
  );
};

export default LoginWithGoogleBtn;
