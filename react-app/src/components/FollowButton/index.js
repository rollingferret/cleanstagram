import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useDispatch } from "react-redux";

import { follow_user, unfollow_user } from "../../store/users";
import styles from "./FollowButton.module.css";

const FollowButton = ({ currentUser }) => {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const [isFollowing, setIsFollowing] = useState();

  useEffect(() => {
    if (currentUser) {
      setIsFollowing(currentUser.following.includes(+userId));
    }
  }, []);

  const followUser = () => {
    // call thunk to make request to /api/users/:userId/follow
    dispatch(follow_user(userId));
    setIsFollowing(true);
  };

  const unfollowUser = () => {
    // call thunk to make request to /api/users/:userId/unfollow
    dispatch(unfollow_user(userId));
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
