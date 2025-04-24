import BackButton from "../components/BackButton";
import ItemDetails from "../features/menue/ItemDetails";

const SingleItemDetails = () => {
  return (
    <div className="my-4 px-4">
      <div>
        <div>
          <BackButton />
        </div>
        <ItemDetails />
      </div>
    </div>
  );
};

export default SingleItemDetails;
