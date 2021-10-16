import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FollowButton from "../FollowButton";
import styles from "./FollowingPageModal.module.css";

function FollowingPage({ onClose, user }) {
  const allUsers = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.session.user);

  let following;

  if (Object.keys(allUsers).length > 0) {
    following = user.following.map((followingId) => allUsers[followingId]);
  }

  return (
    <div className={styles.modal_body}>
      <div className={styles.header_bar}>
        <div className={styles.title_display}>
          <h2>Following</h2>
          <i className="fas fa-times" onClick={() => onClose()}></i>
        </div>
      </div>
      {following?.map((following) => (
        <div className={styles.username_and_follow} key={following.id}>
          <Link
            to={`/users/${following.id}`}
            className={styles.username}
            onClick={() => onClose()}
          >
            {following.username}
          </Link>
          {currentUser && currentUser.id !== following.id && (
            <FollowButton userIdToFollow={following.id} />
          )}
        </div>
      ))}
    </div>
  );
}

export default FollowingPage;
