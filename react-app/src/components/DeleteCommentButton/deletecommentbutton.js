import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { delCommentThunk } from '../../store/comments';
// import { Modal } from '../../context/modal';


function DeleteCommentButton(props) {

  const dispatch = useDispatch();
  // const [showModal,setShowModal] = useState(false);

//   function reloadPage(){ 
//       window.location.reload(); 
//   }

  const handleSubmit = (e) => {
      e.preventDefault();

    //   console.log(props.commentId)
      dispatch(delCommentThunk(props.commentId));
      // setShowModal(false);
      }
  
  return (
    <>
    <form onSubmit={handleSubmit}>
        <button type="submit">Delete!</button>
	</form>
    </>
  );
}

export default DeleteCommentButton;