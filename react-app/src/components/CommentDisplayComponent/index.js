import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import { getCommentByIdThunk } from "../../store/comments";
import { NavLink } from "react-router-dom";

function GetAllCommentsForSinglePhoto({ imageId }) {
  const dispatch = useDispatch();
  const history = useHistory();

  const commentList = useSelector((state) => {
    return state.comments;
  });
  let currentComments;
  if (commentList) {
    currentComments = Object.values(commentList).filter(
      (comment) => comment.image_id === +imageId
    );
  }
  console.log("this is commentList", commentList);
  const { pathname } = history.location;
  const singlePhotoId = pathname.split("/")[2];

  useEffect(() => {
    dispatch(getCommentByIdThunk(singlePhotoId));
  }, [dispatch]);
  const commentsSection = Object.values(currentComments)?.map((comment) => (
    <div key={comment.id} className="single-comment">
      <div>{comment.id}</div>
      <div>{comment.content}</div>
      <div>{comment.updated_at}</div>
    </div>
  ));

  if (!commentList) {
    return <div>things went wrong</div>;
  } else {
    return <>{commentsSection}</>;
  }
}

export default GetAllCommentsForSinglePhoto;
