import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

import { follow_user, unfollow_user } from "../../store/users";
import styles from "./FollowButton.module.css";

const FollowButton = ({ currentUser, userIdToFollow }) => {
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(currentUser.following.includes(+userIdToFollow));
    }
  }, []);

  const followUser = () => {
    dispatch(follow_user(userIdToFollow));
    setIsFollowing(true);
  };

  const unfollowUser = () => {
    dispatch(unfollow_user(userIdToFollow));
    setIsFollowing(false);
  };

  const followButton = !isFollowing ? (
    <div className={styles.follow_button_div}>
      <button className={styles.follow_button} onClick={followUser}>
        Follow
      </button>
    </div>
  ) : (
    <div className={styles.follow_button_div}>
      <button className={styles.follow_button} onClick={unfollowUser}>
        Unfollow
      </button>
    </div>
  );

  return followButton;
};

export default FollowButton;
