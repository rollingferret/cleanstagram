import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import EditCommentForm from './editcommentform';

function EditCommentModal(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Edit Comment</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <EditCommentForm commentId={props.commentId}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
