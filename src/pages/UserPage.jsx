import BackButton from "../components/BackButton";
import UserProfile from "../features/customers/UserProfile";

const UserPage = () => {
  return (
    <div className="my-4 px-4">
      <BackButton />
      <div>
        <UserProfile />
      </div>
    </div>
  );
};

export default UserPage;
