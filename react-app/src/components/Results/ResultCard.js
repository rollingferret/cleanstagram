import React from "react";
import { Link } from "react-router-dom";

import styles from "./Results.module.css";

function ResultCard({ user }) {
  return (
    <div className={styles.card_container}>
      <img
        alt="user_profile_pic"
        src={user.profile_url}
        className={styles.profile_picture}
      />
      <div className={styles.user_info}>
        <Link to={`/users/${user.id}`} className={styles.user_name}>
          {user.username}
        </Link>
        <p className={styles.user_bio}>{user.bio}</p>
      </div>
    </div>
  );
}

export default ResultCard;
