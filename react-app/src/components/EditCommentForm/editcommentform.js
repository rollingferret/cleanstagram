import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentThunk } from "../../store/comments";

function EditCommentForm(props) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    let edited_comment = {
      id: props.commentId,
      content: content,
    };

    dispatch(updateCommentThunk(edited_comment));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div>
          <label>Edit Comment</label>
          <input
            type="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
        </div>
        <button type="submit">Edit!</button>
      </form>
    </>
  );
}

export default EditCommentForm;
