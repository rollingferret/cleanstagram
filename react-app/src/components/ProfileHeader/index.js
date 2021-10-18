import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";

import FollowButton from "../FollowButton";
import FollowerPageModal from "../FollowerPage";
import FollowingPageModal from "../FollowingPage";

import styles from "./ProfileHeader.module.css";

function ProfileHeader({ user }) {
  const { userId } = useParams();
  const currentUser = useSelector((state) => state.session.user);

  if (!user) return null;
  return (
    <div className={styles.profile_header}>
      <div className={styles.profile_header_display}>
        <div className={styles.avatar_div}>
          <img
            className={styles.profile_picture}
            src={
              user.profile_url
                ? user.profile_url
                : "https://icon-library.com/images/cat-icon-gif/cat-icon-gif-19.jpg"
            }
            alt="user_profile_picture"
          />
        </div>
        <div className={styles.user_info}>
          <div className={styles.username_and_buttons}>
            <div className={styles.username}>
              <h1>{user.username}</h1>
            </div>
            {currentUser && currentUser.id !== +userId && (
              <FollowButton currentUser={currentUser} userIdToFollow={userId} />
            )}
          </div>
          <div className={styles.bio}>
            <p>{user.bio}</p>
          </div>
          <div className={styles.profile_stats}>
            <div className={styles.following_stats}>
              <h2>
                <span>{user.image_ids.length}</span> posts
              </h2>
            </div>
            <FollowerPageModal user={user} />
            <FollowingPageModal user={user} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileHeader;
