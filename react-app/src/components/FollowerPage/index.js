import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { Modal } from "../../context/modal";
import { getUsers } from "../../store/users";
import FollowerPage from "./followerPage";
import styles from "./FollowerPage.module.css";

function FollowerPageModal({ user }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();

  const onClose = () => setShowModal(false);

  useEffect(() => {
    dispatch(getUsers());
  }, [showModal, dispatch]);

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
