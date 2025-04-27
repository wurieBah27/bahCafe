import { StarRating } from "../../components/StarRating";
import { format } from "date-fns";
import { Dropdown, DropdownItem } from "flowbite-react";
import ConfirmDeleteModal from "../../components/ConfirmDeleteModal";
import { useState } from "react";
import { getUser } from "../customers/customersHooks/useGetCurrentUser";

const SingleReview = ({ data = {} }) => {
  const [openModal, setOpenModal] = useState(false);

  const { uid } = getUser();
  const { user = {}, comment, createdAt, rating, title, userId, id } = data;
  const { name, profilePic } = user;
  console.log(data);
  const dateCreated = format(createdAt, "Pp");

  const handleOpenModal = () => setOpenModal(!openModal);

  return (
    <article className="mb-3 rounded-lg bg-white p-2 text-base dark:bg-gray-600">
      <footer className="mb-2 flex items-center justify-between">
        <div className="flex flex-wrap items-center">
          <div>
            <p className="mr-3 inline-flex items-center text-sm font-semibold text-gray-900 dark:text-white">
              <img
                className="mr-2 h-6 w-6 rounded-full"
                src={profilePic}
                alt="Michael Gough"
              />
              {name}
            </p>
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            <time dateTime={dateCreated} title="February 8th, 2022">
              {dateCreated}
            </time>
          </p>
        </div>
        <Dropdown
          label=""
          dismissOnClick={false}
          placement="left-start"
          renderTrigger={() => (
            <span>
              {" "}
              <button
                id="dropdownComment1Button"
                data-dropdown-toggle="dropdownComment1"
                className="inline-flex items-center rounded-lg bg-white p-2 text-center text-sm font-medium text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-50 dark:bg-gray-900 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
                type="button"
              >
                <svg
                  className="h-4 w-4"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="currentColor"
                  viewBox="0 0 16 3"
                >
                  <path d="M2 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Zm6.041 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM14 0a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3Z" />
                </svg>
                <span className="sr-only">Comment settings</span>
              </button>
            </span>
          )}
        >
          {uid === userId && (
            <>
              <DropdownItem>Edit</DropdownItem>
              <DropdownItem
                onClick={handleOpenModal}
                className="text-red-600 dark:text-red-500"
              >
                Delete
              </DropdownItem>
            </>
          )}
          <DropdownItem>Report</DropdownItem>
        </Dropdown>
      </footer>

      <div className="my-2">
        <StarRating defaultRating={rating} size="16" />
      </div>
      <p className="text-gray-500 dark:text-gray-400">
        <span className="block font-bold">{title}</span>
        <span>{comment}</span>
      </p>
      <div className="mt-4 flex items-center space-x-4">
        <button
          type="button"
          className="flex items-center text-sm font-medium text-gray-500 hover:underline dark:text-gray-400"
        >
          <svg
            className="mr-1.5 h-3.5 w-3.5"
            aria-hidden="true"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 20 18"
          >
            <path
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5 5h5M5 8h2m6-3h2m-5 3h6m2-7H2a1 1 0 0 0-1 1v9a1 1 0 0 0 1 1h3v5l5-5h8a1 1 0 0 0 1-1V2a1 1 0 0 0-1-1Z"
            />
          </svg>
          Reply
        </button>
      </div>
      <ConfirmDeleteModal
        openModal={openModal}
        handleOpenModal={handleOpenModal}
        reviewId={id}
      />
    </article>
  );
};

export default SingleReview;
