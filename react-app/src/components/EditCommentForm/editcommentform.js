import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentThunk } from "../../store/comments";

function EditCommentForm({...props}) {
  const dispatch = useDispatch();

  const [content, setContent] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // console.log(props, ' 2222222222222222222222222222222222222222222')
    // console.log(props.commentId, ' 99999999999999999999999999999999999999999')
    // console.log(props.onClose, ' 88888888888888888888888888888888888888888')

    let edited_comment = {
      id: props.commentId,
      content: content,
    };

    // dispatch(updateCommentThunk(edited_comment));
    return dispatch(updateCommentThunk(edited_comment))
    .then(async () => props.onClose())
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
