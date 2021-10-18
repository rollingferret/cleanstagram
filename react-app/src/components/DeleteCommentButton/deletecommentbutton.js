import { useDispatch } from "react-redux";
import { delCommentThunk } from "../../store/comments";
import deletecommentbutton from "./deletecommentbutton.css"


function DeleteCommentButton(props) {
  const dispatch = useDispatch();
  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(delCommentThunk(props.commentId));
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="deletecommentbuttoncss">
        <div className="deletebuttoninnercss">Are you sure you want to delete?</div>
        <button type="submit" className='deletebuttonsubmitcss'>Delete!</button>
      </form>
    </>
  );
}

export default DeleteCommentButton;
