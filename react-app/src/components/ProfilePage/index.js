import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ProfilePage.module.css";
import { getUser } from "../../store/users";

function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [userId]);

  if (!user) return null;
  return (
    <>
      <div className={styles.profile_block}>
        <h1>{user.username}</h1>
        <h2>
          <span>{user.followers.length}</span> followers
        </h2>
        <h2>
          <span>{user.following.length}</span> followers
        </h2>
      </div>
    </>
  );
}

export default ProfilePage;
