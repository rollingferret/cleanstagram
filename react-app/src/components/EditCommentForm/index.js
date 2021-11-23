import React, { useState } from "react";

import { Modal } from "../../context/modal";
import EditCommentForm from "./editcommentform";
import styles from "./EditCommentButton.module.css";

function EditCommentModal(props) {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);

  return (
    <>
      <button onClick={() => setShowModal(true)} className={styles.btns}>
        Edit
      </button>
      {showModal && (
        <Modal onClose={onClose}>
          <EditCommentForm onClose={onClose} commentId={props.commentId} />
        </Modal>
      )}
    </>
  );
}

export default EditCommentModal;
