import React, { useState } from "react";

import { Modal } from "../../context/modal";
import DeleteCommentButton from "./deletecommentbutton";
import styles from "./DeleteButton.module.css";

function DeleteCommentModal(props) {
  const [showModal, setShowModal] = useState(false);

  return (
    <>
      <button className={styles.btns} onClick={() => setShowModal(true)}>
        Delete
      </button>
      {showModal && (
        <Modal onClose={() => setShowModal(false)}>
          <DeleteCommentButton commentId={props.commentId} />
        </Modal>
      )}
    </>
  );
}

export default DeleteCommentModal;
