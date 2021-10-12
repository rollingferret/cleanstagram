import React, { useEffect } from "react";
import { useParams } from "react-router-dom";

function ProfilePage() {
  const { userId } = useParams();

  useEffect(() => {
    // make thunk call to get the user to show
  });

  return (
    <>
      <h1>Welcome {userId}</h1>
    </>
  );
}

export default ProfilePage;
