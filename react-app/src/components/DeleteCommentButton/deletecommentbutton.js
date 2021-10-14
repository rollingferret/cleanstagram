import { useDispatch } from "react-redux";
import { delCommentThunk } from "../../store/comments";

function DeleteCommentButton(props) {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(delCommentThunk(props.commentId));
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <button type="submit">Delete!</button>
      </form>
    </>
  );
}

export default DeleteCommentButton;
