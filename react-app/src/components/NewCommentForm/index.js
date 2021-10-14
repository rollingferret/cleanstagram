import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addCommentThunk } from '../../store/comments';

function CommentForm() {
	const sessionUser = useSelector((state) => state.session.user);

	const history = useHistory();
	const dispatch = useDispatch();

	const [content, setContent] = useState('');


    const {pathname} = history.location
    const imageId = pathname.split("/")[2]

	const handleSubmit = async (e) => {
		e.preventDefault();

		// const formData = new FormData();
		// formData.append('user_id', sessionUser.id);
        // formData.append('image_id', imageId);
		// formData.append('content', content);

		let comment = {
			'user_id': sessionUser.id,
			'image_id': imageId,
			'content': content
		  }

		let res = await dispatch(addCommentThunk(comment));

        // console.log(res, '888888888888888888888888888888888888888')
		if (res) {
			// window.alert('hi')
			setContent('')
			// history.push(`/images/${imageId}`);
		} else {
			console.log('error');
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
				<button type="submit">Submit</button>
			</form>
		</>
	);
}

export default CommentForm;
