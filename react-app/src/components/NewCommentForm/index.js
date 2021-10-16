import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addCommentThunk } from "../../store/comments";

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
      history.push("/")
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
          console.log("error");
        }
      } else {
        console.log("missing content");
      }
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Comment</label>
          <input
            type="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Post!</button>
      </form>
    </>
  );
}

export default CommentForm;
