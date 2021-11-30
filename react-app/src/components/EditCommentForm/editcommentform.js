import { useState } from "react";
import { useDispatch } from "react-redux";
import { updateCommentThunk } from "../../store/comments";
import "./editcommentform.css";

function EditCommentForm({ onClose, commentId, comment }) {
  const dispatch = useDispatch();
  console.log("\n\n\n\n\n", comment, "\n\n\n\n\n");

  const [content, setContent] = useState(comment.content);

  const handleSubmit = (e) => {
    e.preventDefault();

    let edited_comment = {
      id: commentId,
      content: content,
    };

    return dispatch(updateCommentThunk(edited_comment)).then(async () =>
      onClose()
    );
  };

  return (
    <>
      <div className="outtereditcommentdiv">
        <form onSubmit={handleSubmit} className="commentdivform">
          <div className="innercommentdivs-2">
            <label>Edit Comment</label>
          </div>
          <div className="innercommentdivs" id="topborderlinecommentdiv">
            <input
              type="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="contentcommentdiv"
            />
          </div>
          <div className="innercommentdivs-2" id="topborderlinecommentdiv">
            <button type="submit" className="buttoncommentdivmodal">
              Edit!
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

export default EditCommentForm;
