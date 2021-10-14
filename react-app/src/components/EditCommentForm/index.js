import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import EditCommentForm from './editcommentform';

function EditCommentModal(props) {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false)

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={onClose}>
          <EditCommentForm onClose={onClose} commentId={props.commentId}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
