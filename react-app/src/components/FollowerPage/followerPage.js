import { useSelector } from "react-redux";
import FollowButton from "../FollowButton";
import styles from "./followerPageModal.module.css";

function FollowerPage({ user }) {
  const allUsers = useSelector((state) => state.users);
  let followers;

  if (Object.keys(allUsers).length > 0) {
    followers = user.followers.map((followerId) => allUsers[followerId]);
  }

  return (
    <div className={styles.modal_body}>
      {followers?.map((follower) => (
        // need to add a follow/unfollow button, making a component for the follow/unfollow button
        <h1>{follower.username}</h1>
      ))}
    </div>
  );
}

export default FollowerPage;
