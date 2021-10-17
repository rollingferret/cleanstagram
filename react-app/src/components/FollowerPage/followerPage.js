import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import FollowButton from "../FollowButton";
import styles from "./followerPageModal.module.css";

function FollowerPage({ onClose, user }) {
  const allUsers = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.session.user);
  let followers;

  if (Object.keys(allUsers).length > 0) {
    followers = user.followers.map((followerId) => allUsers[followerId]);
  }

  return (
    <div className={styles.modal_body}>
      <div className={styles.header_bar}>
        <div className={styles.title_display}>
          <h2>Followers</h2>
          <i className="fas fa-times" onClick={() => onClose()}></i>
        </div>
      </div>
      {followers?.map((follower) => (
        <div className={styles.username_and_follow} key={follower.id}>
          <Link
            to={`/users/${follower.id}`}
            className={styles.username}
            onClick={() => onClose()}
          >
            {follower.username}
          </Link>
          {currentUser && currentUser.id !== follower.id && (
            <FollowButton userIdToFollow={follower.id} />
          )}
        </div>
      ))}
    </div>
  );
}

export default FollowerPage;
