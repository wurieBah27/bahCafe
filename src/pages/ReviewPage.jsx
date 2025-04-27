import BackButton from "../components/BackButton";
import Reviews from "../features/reviews/Reviews";

const ReviewPage = () => {
  return (
    <div className="px-2 py-8 pb-32">
      <div>
        <BackButton />
      </div>
      <div>
        <Reviews />
      </div>
    </div>
  );
};

export default ReviewPage;
