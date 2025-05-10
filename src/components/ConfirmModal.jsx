import { Modal, ModalBody, ModalHeader } from "flowbite-react";

const ConfirmModal = ({ children, openModal, handleOpenModal }) => {
  return (
    <>
      <Modal show={openModal} size="md" onClose={handleOpenModal} popup>
        <ModalHeader />
        <ModalBody>{children}</ModalBody>
      </Modal>
    </>
  );
};

export default ConfirmModal;
