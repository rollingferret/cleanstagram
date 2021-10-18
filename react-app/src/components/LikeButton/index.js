import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLikeStatus, dislikeImage, likeImage } from "../../store/images";

import css from "./LikeComponent.module.css";

function LikeButton({ id }) {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const image = useSelector((state) => state.images[id]);
  let isLiked;
  if (image && Object.keys(image).length > 0) {
    isLiked = image.isLiked;

    if (isLiked !== liked) {
      setLiked(isLiked);
    }
  }

  useEffect(() => {
    (async () => {
      dispatch(checkLikeStatus(id));
    })();
  }, [dispatch, id]);

  const handleDislike = async (e) => {
    dispatch(dislikeImage(id));
    image.isLiked = false;
  };

  const handleLike = async (e) => {
    dispatch(likeImage(id));
    image.isLiked = true;
  };

  return (
    <div>
      {image && image?.isLiked ? (
        <button
          className={`fas fa-heart ${css.redlikebutton}`}
          onClick={handleDislike}
        ></button>
      ) : (
        <button
          className={`far fa-heart ${css.whitelikebutton}`}
          onClick={handleLike}
        ></button>
      )}
    </div>
  );
}

export default LikeButton;
