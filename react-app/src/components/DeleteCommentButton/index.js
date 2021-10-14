import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import DeleteCommentButton from './deletecommentbutton';

function DeleteCommentModal(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button onClick={() => setShowModal(true)}>Delete Comment!</button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentButton commentId={props.commentId}/>
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
