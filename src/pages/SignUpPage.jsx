import AnimationWrapper from "../components/AnimationWrapper";
import BackButton from "../components/BackButton";
import SignUpForm from "../features/customers/SignUpForm";

const SignUpPage = () => {
  return (
    <AnimationWrapper>
      <div className="mt-4">
        <div className="px-4 sm:px-8">
          <BackButton />
        </div>
        <div>
          <SignUpForm />
        </div>
      </div>
    </AnimationWrapper>
  );
};

export default SignUpPage;
