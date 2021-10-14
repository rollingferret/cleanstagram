import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import EditCommentForm from './editcommentform';

function EditCommentModal() {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
