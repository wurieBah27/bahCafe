import { Button, Label, Modal, Textarea } from "flowbite-react";

const AddNotes = ({ openModal, setOpenModal, notes, setOrderNote }) => {
  const handleAddNotes = () => {
    if (!notes) return;
    setOpenModal(false);
  };

  const handleDeclineNotes = () => {
    setOpenModal(false);
    setOrderNote("");
  };

  return (
    <>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)}>
        <Modal.Header>
          <div className="mb-2 block">
            <Label htmlFor="comment" value="Your message" />
          </div>
        </Modal.Header>
        <Modal.Body>
          <div className="-6">
            <Textarea
              id="comment"
              placeholder="Leave a comment..."
              required
              rows={4}
              value={notes}
              onChange={(e) => setOrderNote(e.target.value)}
              className="p-4"
            />
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button disabled={!notes} onClick={handleAddNotes}>
            I accept
          </Button>
          <Button color="gray" onClick={handleDeclineNotes}>
            Decline
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AddNotes;
