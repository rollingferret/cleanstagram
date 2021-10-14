import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ProfileHeader.module.css";
import { getUsers } from "../../store/users";

function ProfileHeader({ user }) {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  if (!user) return null;
  return (
    <div className={styles.profile_header}>
      <div className={styles.profile_header_display}>
        <div>
          <img
            className={styles.profile_picture}
            src={user.profile_url}
            alt="user_profile_picture"
          />
        </div>
        <div className={styles.username_and_buttons}>
          <div className={styles.username}>
            <h1>{user.username}</h1>
            <p>{user.bio}</p>
          </div>
          {currentUser && currentUser.id !== +userId && (
            // click the button and call function to call thunk to follow
            <button>Follow</button>
          )}
        </div>
        <div className={styles.profile_stats}>
          <div className={styles.following_stats}>
            <h2>
              <span>{user.followers.length}</span> followers
            </h2>
          </div>
          <div className={styles.following_stats}>
            <h2>
              <span>{user.following.length}</span> followers
            </h2>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
