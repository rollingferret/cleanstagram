import { useSelector } from "react-redux";
import FollowButton from "../FollowButton";
import styles from "./followerPageModal.module.css";

function FollowerPage({ user }) {
  const allUsers = useSelector((state) => state.users);
  const currentUser = useSelector((state) => state.session.user);
  let followers;

  if (Object.keys(allUsers).length > 0) {
    followers = user.followers.map((followerId) => allUsers[followerId]);
  }

  return (
    <div className={styles.modal_body}>
      {followers?.map((follower) => (
        <>
          <h1>{follower.username}</h1>
          {currentUser && currentUser.id !== follower.id && (
            <FollowButton
              currentUser={currentUser}
              userIdToFollow={follower.id}
            />
          )}
        </>
      ))}
    </div>
  );
}

export default FollowerPage;
