import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory } from "react-router-dom";

import styles from "./ProfilePage.module.css";
import { getUsers } from "../../store/users";
import ProfileHeader from "../ProfileHeader";
import ProfileBody from "../ProfileBody";

function ProfilePage() {
  const { userId } = useParams();
  const history = useHistory();
  const dispatch = useDispatch();
  const users = useSelector((state) => state.users);

  useEffect(() => {
    dispatch(getUsers());
  }, [dispatch]);

  if (Object.keys(users).length === 0) {
    return null;
  }
  if (Object.keys(users).length !== 0 && users[userId] === undefined) {
    history.push("/errors");
  }



  return (
    <div className={styles.profile_block}>
      {users && users[userId] && (
        <>
          <ProfileHeader user={users[userId]} />
          <ProfileBody user={users[userId]} />
        </>
      )}
    </div>
  );
}

export default ProfilePage;
