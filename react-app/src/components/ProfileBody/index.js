import { useSelector } from "react-redux";

import styles from "./ProfileBody.module.css";

const ProfileBody = ({ userId }) => {
  const currentUser = useSelector((state) => state.users[+userId]);
  const allImages = useSelector((state) => state.images);
  let userImages;
  if (allImages) {
    // save in var and render
    userImages = currentUser.image_ids.map((id) => allImages[id]);
  }
  return (
    <div className={styles.profileBody}>
      {userImages?.map((image) => (
        <div
          key={image.id}
          className={styles.image_box}
          style={{
            backgroundImage: `url(${image.image_url})`,
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProfileBody;
