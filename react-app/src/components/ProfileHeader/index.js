import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { follow_user } from "../../store/users";

import styles from "./ProfileHeader.module.css";

function ProfileHeader({ user }) {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);
  const [currentUserFollowingUser, setCurrentUserFollowingUser] =
    useState(false);

  useEffect(() => {
    if (currentUser) {
      console.log(
        "i am logged in, please change state to check if i am following"
      );
      if (
        currentUser.following.includes(+userId) !== currentUserFollowingUser
      ) {
        console.log("who i am currently following", currentUser.following);
        setCurrentUserFollowingUser(currentUser.following.includes(userId));
      }
    }
  });

  const followButton = () => {
    if (!currentUserFollowingUser) {
      console.log("curent user not folliwg this user, show foloow button");
      return (
        <div className={styles.follow_button_div}>
          <button className={styles.follow_button} onClick={followUser}>
            Follow
          </button>
        </div>
      );
    } else {
      console.log(
        "I AM ALKREADY FOLLOWING THIS PERSON! check onclick function thouh"
      );
      return (
        <div className={styles.follow_button_div}>
          <button className={styles.follow_button} onClick={followUser}>
            Unfollow
          </button>
        </div>
      );
    }
  };

  const followUser = () => {
    // call thunk to make request to /api/users/:userId/follow
    dispatch(follow_user(userId));
  };

  if (!user) return null;
  return (
    <div className={styles.profile_header}>
      <div className={styles.profile_header_display}>
        <div className={styles.avatar_div}>
          <img
            className={styles.profile_picture}
            src={user.profile_url}
            alt="user_profile_picture"
          />
        </div>
        <div>
          <div className={styles.username_and_buttons}>
            <div className={styles.username}>
              <h1>{user.username}</h1>
              <p>{user.bio}</p>
            </div>
            {currentUser && currentUser.id !== +userId && followButton()}
          </div>
          <div className={styles.profile_stats}>
            <div className={styles.following_stats}>
              <h2>
                <span>{user.image_ids.length}</span> posts
              </h2>
            </div>
            <div className={styles.following_stats}>
              <h2>
                <span>{user.followers.length}</span> followers
              </h2>
            </div>
            <div className={styles.following_stats}>
              <h2>
                <span>{user.following.length}</span> following
              </h2>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
