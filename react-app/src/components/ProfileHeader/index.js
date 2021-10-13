import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ProfileHeader.module.css";
import { getUser } from "../../store/users";

function ProfileHeader() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  if (!user) return null;
  return (
    <div className={styles.profile_block}>
      <h1 className={styles.username}>{user.username}</h1>
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
  );
}

export default ProfileHeader;
