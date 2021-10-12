import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";

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
      <h1>{user.id}</h1>
      <h1>{user.username}</h1>
      <h1>{user.email}</h1>
    </>
  );
}

export default ProfilePage;
