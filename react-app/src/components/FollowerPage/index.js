import { useState } from "react";

import { Modal } from "../../context/modal";
import FollowerPage from "./followerPage";
import styles from "./FollowerPage.module.css";

function FollowerPageModal({ user }) {
  const [showModal, setShowModal] = useState(false);

  const onClose = () => setShowModal(false);

  return (
    <>
      <div
        className={styles.following_stats}
        onClick={() => setShowModal(true)}
      >
        <h2>
          <span>{user.followers.length}</span> followers
        </h2>
      </div>
      {showModal && (
        <Modal onClose={onClose}>
          <FollowerPage onClose={onClose} user={user} />
        </Modal>
      )}
    </>
  );
}

export default FollowerPageModal;
