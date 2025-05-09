import { Button, Modal, ModalBody, ModalHeader } from "flowbite-react";
import useDeleteUser from "../features/customers/customersHooks/useDeleteUser";
import { HiOutlineExclamationCircle } from "react-icons/hi2";

const ConfirmDeleteUserAccount = ({ openModal, handleOpenModal }) => {
  const { deleteUser, isDeletingUserAccount } = useDeleteUser();

  const handleDelete = () => {
    deleteUser();
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
              We are sad to see you go 🥲, Are you sure you want to delete your
              Account?
            </h3>
            <div className="flex justify-center gap-4 max-[350px]:flex-col">
              <Button
                color="failure"
                onClick={handleDelete}
                disabled={isDeletingUserAccount}
              >
                {"Yes, I'm sure"}
              </Button>
              <Button
                color="gray"
                onClick={handleOpenModal}
                disabled={isDeletingUserAccount}
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

export default ConfirmDeleteUserAccount;
