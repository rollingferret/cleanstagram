import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { follow_user, unfollow_user } from "../../store/users";
import styles from "./FollowButton.module.css";

const FollowButton = ({ userIdToFollow }) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [isFollowing, setIsFollowing] = useState(
    currentUser?.following.includes(userIdToFollow)
  );
  const followUser = () => {
    dispatch(follow_user(userIdToFollow));
    setIsFollowing((_prevState) => true);
  };

  const unfollowUser = () => {
    dispatch(unfollow_user(userIdToFollow));
    setIsFollowing((_prevState) => false);
  };

  useEffect(() => {
    if (currentUser) {
      setIsFollowing((_prevState) =>
        currentUser.following.includes(+userIdToFollow)
      );
    }
  }, [currentUser, userIdToFollow]);

  return (
    <>
      {isFollowing && (
        <div className={styles.follow_button_div}>
          <button
            className={`${styles.follow_button} ${styles.following}`}
            onClick={unfollowUser}
          >
            Following
          </button>
        </div>
      )}
      {!isFollowing && (
        <div className={styles.follow_button_div}>
          <button className={styles.follow_button} onClick={followUser}>
            Follow
          </button>
        </div>
      )}
    </>
  );
};

export default FollowButton;
