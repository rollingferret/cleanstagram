import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import styles from "./ProfilePage.module.css";
import { getUser } from "../../store/users";
import ProfileHeader from "../ProfileHeader";
import ProfileBody from "../ProfileBody";

function ProfilePage() {
  const { userId } = useParams();
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users[userId]);

  useEffect(() => {
    dispatch(getUser(userId));
  }, [dispatch, userId]);

  if (!user) return null;
  return (
    <div className={styles.profile_block}>
      <ProfileHeader />
      <ProfileBody userId={userId} />
    </div>
  );
}

export default ProfilePage;
