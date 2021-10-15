import { useSelector } from "react-redux";
import FollowButton from "../FollowButton";
import styles from "./FollowingPageModal.module.css";

function FollowingPage({ user }) {
  const allUsers = useSelector((state) => state.users);
  let following;

  if (Object.keys(allUsers).length > 0) {
    following = user.following.map((followingId) => allUsers[followingId]);
  }

  return (
    <div className={styles.modal_body}>
      {following?.map((following) => (
        <>
          <h1>{following.username}</h1>
          <FollowButton userIdToFollow={following.id} />
        </>
      ))}
    </div>
  );
}

export default FollowingPage;