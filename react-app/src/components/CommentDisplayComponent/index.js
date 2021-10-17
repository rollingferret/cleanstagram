import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { getCommentByIdThunk } from "../../store/comments";
import EditCommentModal from "../EditCommentForm";
import DeleteCommentModal from "../DeleteCommentButton";

import css from './Comments.module.css'

function GetAllCommentsForSinglePhoto({ imageId }) {
  console.log(
    "we are in the feed, and now in the comment display comp, this is the imageId",
    imageId
  );
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.session.user);

  useEffect(() => {
    dispatch(getCommentByIdThunk(imageId));
  }, [dispatch, imageId]);

  const commentList = useSelector((state) => {
    return state.comments;
  });
  let currentComments;
  if (commentList) {
    currentComments = Object.values(commentList).filter(
      (comment) => comment.image_id === +imageId
    );

    const commentsSection = Object.values(currentComments)?.map((comment) => {
      const newDate = comment?.created_at.split(" ");

      return (
        <div key={comment.id} className={`single-comment ${css.outer_container}`}>
          <div className={css.comment_container}>
            <div class={css.inner_comment}>
              <img alt="user_profile_image"
                src={comment.user.profile_url}
                className={css.user_profile_pic}
              />
              <div className={css.username_content}>
                <Link to={`/users/${comment.user_id}`}
                  className={css.user_name}>
                  {comment.user.username}
                </Link>
                <div className={css.comment_content}>
                  {comment.content}
                </div>
              </div>
            </div>
            <div className={css.edit_del_buttons}>
              {currentUser && currentUser.id === comment.user_id && (
                <>
                  <EditCommentModal commentId={comment.id} />
                  <DeleteCommentModal commentId={comment.id} />
                </>
              )}
            </div>
          </div>
          <div className={css.comment_date}>
            {newDate[2]} {newDate[1]}, {newDate[3]}
          </div>
        </div >
      );
    });

    if (!commentList) {
      return <div>things went wrong</div>;
    } else {
      return <>{commentsSection}</>;
    }
  }
}

export default GetAllCommentsForSinglePhoto;
