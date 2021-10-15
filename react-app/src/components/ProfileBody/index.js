import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";

import styles from "./ProfileBody.module.css";

const ProfileBody = ({ user }) => {
  const history = useHistory();
  const allImages = useSelector((state) => state.images);
  let userImages;
  if (allImages) {
    userImages = user.image_ids.map((id) => allImages[id]);
    let sortedUserImages = userImages.sort((a, b) => {
      return Date.parse(b.created_at) - Date.parse(a.created_at)
    })

    console.log(sortedUserImages)
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
