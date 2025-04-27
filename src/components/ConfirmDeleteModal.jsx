import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import { useState } from "react";
import { HiOutlineExclamationCircle } from "react-icons/hi";
import useDeleteReview from "../features/reviews/useDeleteReview";

const ConfirmDeleteModal = ({ openModal, handleOpenModal, reviewId }) => {
  const { deleteReview, isDeletingReview } = useDeleteReview();

  const handleDelete = () => {
    deleteReview({ id: reviewId });
    handleOpenModal();
  };
  return (
    <>
      <Modal show={openModal} size="md" onClose={handleOpenModal} popup>
        <ModalHeader />
        <ModalBody>
          <div className="text-center">
            <HiOutlineExclamationCircle className="mx-auto mb-4 h-14 w-14 text-gray-400 dark:text-gray-200" />
            <h3 className="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">
              Are you sure you want to delete this your review?
            </h3>
            <div className="flex justify-center gap-4 max-[350px]:flex-col">
              <Button
                color="failure"
                onClick={handleDelete}
                disabled={isDeletingReview}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={handleOpenModal}
                disabled={isDeletingReview}
              >
                No, cancel
              </Button>
            </div>
          </div>
        </ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmDeleteModal;
