import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCommentThunk } from "../../store/comments";

import css from "./NewCommentForm.module.css";

function CommentForm() {
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const { pathname } = history.location;
  const imageId = pathname.split("/")[2];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!sessionUser) {
      history.push("/");
    } else {
      if (content) {
        let comment = {
          user_id: sessionUser.id,
          image_id: imageId,
          content: content,
        };

        let res = await dispatch(addCommentThunk(comment));

        if (res) {
          setContent("");
        } else {
          //FIXME
          console.log("error");
        }
      } else {
        //FIXME
        console.log("missing content");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className={css.comment_container}>
          <input
            type="content"
            value={content}
            placeholder="Add a comment..."
            onChange={(e) => setContent(e.target.value)}
            className={css.comment_text}
          />
          <button type="submit" className={css.comment_btn}>
            Post
          </button>
        </div>
      </form>
    </>
  );
}

export default CommentForm;
