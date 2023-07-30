import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { checkLikeStatus, dislikeImage, likeImage } from "../../store/images";

import css from "./LikeComponent.module.css";

// function LikeButton({ id }) {
//   const dispatch = useDispatch();

//   const [liked, setLiked] = useState(false);

//   const image = useSelector((state) => state.images[id]);
//   let isLiked;
//   if (image && Object.keys(image).length > 0) {
//     isLiked = image.isLiked;

//     if (isLiked !== liked) {
//       setLiked(isLiked);
//     }
//   }

//   useEffect(() => {
//     (async () => {
//       dispatch(checkLikeStatus(id));
//     })();
//   }, [dispatch, id]);

//   const handleDislike = async (e) => {
//     dispatch(dislikeImage(id));
//     image.isLiked = false;
//   };

//   const handleLike = async (e) => {
//     dispatch(likeImage(id));
//     image.isLiked = true;
//   };

//   return (
//     <div>
//       {image && image?.isLiked ? (
//         <button
//           className={`fas fa-heart ${css.redlikebutton}`}
//           onClick={handleDislike}
//         ></button>
//       ) : (
//         <button
//           className={`far fa-heart ${css.whitelikebutton}`}
//           onClick={handleLike}
//         ></button>
//       )}
//     </div>
//   );
// }

// export default LikeButton;

// function LikeButton({ id }) {
//   const dispatch = useDispatch();
//   const image = useSelector((state) => state.images[id]);

//   useEffect(() => {
//     dispatch(checkLikeStatus(id));
//   }, [dispatch, id]);

//   const handleDislike = async (e) => {
//     dispatch(dislikeImage(id));
//   };

//   const handleLike = async (e) => {
//     dispatch(likeImage(id));
//   };

//   return (
//     <div>
//       {image && image.isLiked ? (
//         <button
//           className={`fas fa-heart ${css.redlikebutton}`}
//           onClick={handleDislike}
//         ></button>
//       ) : (
//         <button
//           className={`far fa-heart ${css.whitelikebutton}`}
//           onClick={handleLike}
//         ></button>
//       )}
//     </div>
//   );
// }

// export default LikeButton;

function LikeButton({ id }) {
  const dispatch = useDispatch();
  const image = useSelector((state) => state.images[id]);

  const [isProcessing, setIsProcessing] = useState(false); // Add a state to track the button's processing state

  useEffect(() => {
    dispatch(checkLikeStatus(id));
  }, [dispatch, id]);

  const handleDislike = async (e) => {
    if (!isProcessing) {
      setIsProcessing(true); // Disable the button to prevent spamming

      try {
        await dispatch(dislikeImage(id));
        setIsProcessing(false); // Re-enable the button after the action is completed
      } catch (error) {
        setIsProcessing(false); // Re-enable the button if an error occurs
      }
    }
  };

  const handleLike = async (e) => {
    if (!isProcessing) {
      setIsProcessing(true); // Disable the button to prevent spamming

      try {
        await dispatch(likeImage(id));
        setIsProcessing(false); // Re-enable the button after the action is completed
      } catch (error) {
        setIsProcessing(false); // Re-enable the button if an error occurs
      }
    }
  };

  return (
    <div>
      {image && image.isLiked ? (
        <button
          className={`fas fa-heart ${css.redlikebutton}`}
          onClick={handleDislike}
          disabled={isProcessing} // Disable the button while processing
        ></button>
      ) : (
        <button
          className={`far fa-heart ${css.whitelikebutton}`}
          onClick={handleLike}
          disabled={isProcessing} // Disable the button while processing
        ></button>
      )}
    </div>
  );
}

export default LikeButton;
