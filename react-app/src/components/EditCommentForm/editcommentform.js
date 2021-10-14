import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useHistory } from 'react-router-dom';
import { updateCommentThunk } from '../../store/comments';
// import { Modal } from '../../context/modal';


function EditCommentForm(props) {

  const dispatch = useDispatch();
  const history = useHistory();


	const [content, setContent] = useState('');
  // const [showModal,setShowModal] = useState(false);

//   function reloadPage(){ 
//       window.location.reload(); 
//   }

  const handleSubmit = (e) => {
      e.preventDefault();

      let edited_comment = {
        'id': props.commentId,
        'content': content
        }


      dispatch(updateCommentThunk(edited_comment));
      // setShowModal(false);
      }
  
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