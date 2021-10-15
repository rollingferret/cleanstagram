import { useState } from "react";

import { Modal } from "../../context/modal";
import FollowingPage from "./followingPage";
import styles from "./FollowingPage.module.css";

function FollowingPageModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);

  return (
    <>
      <div
        className={styles.following_stats}
        onClick={() => setShowModal(true)}
      >
        <h2>
          <span>{user.following.length}</span> following
        </h2>
      </div>
      {showModal && (
        <Modal onClose={onClose}>
          <FollowingPage onClose={onClose} user={user} />
        </Modal>
      )}
    </>
  );
}

export default FollowingPageModal;
