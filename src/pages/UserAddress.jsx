import BackButton from "../components/BackButton";
import CusromerAddress from "../features/customers/CusromerAddress";

const UserAddress = () => {
  return (
    <div className="my-4 px-4">
      <div>
        <BackButton />
        <div>
          <CusromerAddress />
        </div>
      </div>
    </div>
  );
};

export default UserAddress;
