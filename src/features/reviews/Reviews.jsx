import {
  Button,
  Drawer,
  Label,
  Rating,
  Textarea,
  TextInput,
} from "flowbite-react";
import { useState } from "react";
import { StarRating } from "../../components/StarRating";
import { useParams } from "react-router-dom";
import { getUser } from "../customers/customersHooks/useGetCurrentUser";
import useCreateReview from "./useCreateReview";
import { serverTimestamp } from "firebase/firestore";
import usegetItemReview from "./usegetItemReview";
import SingleReview from "./SingleReview";
import Spinner from "../../components/Spinner";

const Reviews = () => {
  const { itemID } = useParams();

  const [isOpen, setIsOpen] = useState(false);
  const [userRating, setUserRating] = useState("");

  const { reviewsData, isFetchingReviews } = usegetItemReview(itemID);
  const handleClose = () => setIsOpen(false);

  if (isFetchingReviews) return <Spinner />;
  return (
    <div>
      <div className="bg-gray-50 p-5">
        <Rating className="mb-2">
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star />
          <Rating.Star filled={false} />
          <p className="ml-2 text-sm font-medium text-gray-500 dark:text-gray-400">
            4.95 out of 5
          </p>
        </Rating>
        <p className="mb-4 text-sm font-medium text-gray-500 dark:text-gray-400">
          1,745 global ratings
        </p>
        <Rating.Advanced percentFilled={70} className="mb-2">
          5 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={17} className="mb-2">
          4 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={8} className="mb-2">
          3 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={5} className="mb-2">
          2 star
        </Rating.Advanced>
        <Rating.Advanced percentFilled={0}>1 star</Rating.Advanced>
      </div>
      <div className="mt-10 flex items-center justify-center bg-red-300">
        <Button onClick={() => setIsOpen(true)} className="w-full">
          Write a review
        </Button>
      </div>
      <div>
        <WriteReview
          isOpen={isOpen}
          handleClose={handleClose}
          setUserRating={setUserRating}
        />
      </div>
      <section className="py-8 antialiased lg:py-16 dark:bg-gray-900">
        <div className="mx-auto max-w-2xl sm:px-4">
          <div className="mb-6 flex items-center justify-between">
            <h2 className="text-lg font-bold text-gray-900 lg:text-2xl dark:text-white">
              Discussion ({reviewsData?.length})
            </h2>
          </div>
          {reviewsData?.map((data) => (
            <SingleReview data={data} key={data?.id} />
          ))}
        </div>
      </section>
    </div>
  );
};

function WriteReview({ handleClose, isOpen }) {
  const { itemID } = useParams();
  const [title, setTitle] = useState("");
  const [message, setMessage] = useState("");
  const [userRating, setUserRating] = useState("");

  const { createNewReview } = useCreateReview();
  /* user info */
  const { data, uid } = getUser();
  const { name, profileUrl } = data;

  const createNewComment = async () => {
    if (!itemID || !userRating || !uid) {
      handleClose();
      return;
    }
    const newComment = {
      title: title,
      comment: message,
      rating: userRating,
      menuItemId: itemID,
      userId: uid,
      createdAt: serverTimestamp(),
      user: {
        name: name,
        profilePic: profileUrl,
      },
    };

    await createNewReview({ data: newComment });
    handleClose();
  };
  return (
    <>
      <Drawer open={isOpen} onClose={handleClose} position="bottom">
        <Drawer.Items>
          <div className="mx-auto flex min-h-[30vh] max-w-3xl flex-col pb-24 pt-10">
            <div className="mb-6 flex items-center justify-center rounded-full bg-[#00312C] py-3 text-sm text-gray-500 sm:py-7 dark:text-gray-400">
              <StarRating onSetRating={setUserRating} size="28" />
            </div>
            <div className="">
              <div>
                <div className="mb-2 block">
                  <Label htmlFor="small" value="Write you review!" />
                </div>
                <TextInput
                  id="small"
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  sizing="sm"
                  placeholder="Title"
                />
              </div>
              <div className="mt-2 w-full">
                <Textarea
                  className="p-4"
                  id="comment"
                  placeholder="Write your review..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  rows={2}
                />
              </div>
            </div>
            <div className="mt-10 flex items-center justify-center">
              <Button onClick={createNewComment} className="w-full">
                {!userRating && "Cancel Review"}
                {userRating && "Submit review"}
              </Button>
            </div>
          </div>
        </Drawer.Items>
      </Drawer>
    </>
  );
}

export default Reviews;
