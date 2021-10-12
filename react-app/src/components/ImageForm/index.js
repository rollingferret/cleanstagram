import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { addImage } from '../../store/images';

import css from './ImageForm.module.css';

function ImageForm() {
	const sessionUser = useSelector((state) => state.session.user);

	const history = useHistory();
	const dispatch = useDispatch();

	const [caption, setCaption] = useState('');
	const [image, setImage] = useState(null);
	const [imageLoading, setImageLoading] = useState(false);

	const handleSubmit = async (e) => {
		e.preventDefault();

		const formData = new FormData();
		formData.append('image', image);
		formData.append('caption', caption);
		formData.append('user_id', sessionUser.id);

		// aws uploads can be a bit slow—displaying
		// some sort of loading message is a good idea
		setImageLoading(true);
		let res = await dispatch(addImage(formData));

		if (res.ok) {
			setImageLoading(false);
			history.push(`/images/${res.id}`);
		} else {
			setImageLoading(false);
			// a real app would probably use more advanced
			// error handling
			console.log('error');
		}
	};

	const updateImage = (e) => {
		const file = e.target.files[0];
		setImage(file);
	};

	return (
		<>
			<form onSubmit={handleSubmit} className={css.container}>
				<div>
					<label>Add Image</label>
					<input
						type="file"
						accept="image/*"
						onChange={updateImage}
					/>
				</div>
				<div>
					<label>Caption</label>
					<input
						type="text"
						value={caption}
						onChange={(e) => setCaption(e.target.value)}
					/>
				</div>
				<button type="submit">Submit</button>
				{imageLoading && <p>Loading...</p>}
			</form>
		</>
	);
}

export default ImageForm;
