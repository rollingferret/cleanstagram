import { useSelector } from "react-redux";
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
        // need to add a follow/unfollow button, making a component for the follow/unfollow button
        <h1>{following.username}</h1>
      ))}
    </div>
  );
}

export default FollowingPage;
