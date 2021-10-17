import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLikeStatus, dislikeImage, likeImage } from "../../store/images";

import css from "./LikeComponent.module.css";

function LikeButton({ id }) {
  const dispatch = useDispatch();

  const [liked, setLiked] = useState(false);

  const image = useSelector((state) => {
    const isLiked = state.images[id].isLiked;

    if (isLiked !== liked) {
      setLiked(isLiked);
    }

    return state.images[id];
  });

  useEffect(() => {
    (async () => {
      await dispatch(checkLikeStatus(id));
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
