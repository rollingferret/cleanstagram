import React, { useState } from 'react';
import { Modal } from '../../context/modal';
import EditCommentForm from './editcommentform';

function EditCommentModal(props) {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false)

  return (
    <>
      <button
        className={`far fa-edit`}
      onClick={() => setShowModal(true)}></button>
      {showModal && (
        <Modal onClose={onClose}>
          <EditCommentForm onClose={onClose} commentId={props.commentId}/>
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
