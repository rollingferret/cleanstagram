import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./ProfileBody.module.css";

const ProfileBody = ({ userId }) => {
  const history = useHistory();
  const currentUser = useSelector((state) => state.users[+userId]);
  const allImages = useSelector((state) => state.images);
  let userImages;
  if (allImages) {
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
          onClick={() => {
            return history.push(`/images/${image.id}`);
          }}
        ></div>
      ))}
    </div>
  );
};

export default ProfileBody;
