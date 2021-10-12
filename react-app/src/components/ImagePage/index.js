import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import LikeButton from '../LikeButton/index';
import { getImageById, deleteImage, updateCaption } from '../../store/images';

function ImagePage() {
	const sessionUser = useSelector((state) => state.session.user);
	const image = useSelector((state) => state.images.currentImage);
	const history = useHistory();
	const dispatch = useDispatch();
	const { imageId } = useParams();

	const [editButtons, setEditButtons] = useState(false);
	const [edit, setEdit] = useState(false);
	const [caption, setCaption] = useState(image?.caption);

	const newDate = image?.created_at.split(' ');

	useEffect(() => {
		dispatch(getImageById(imageId));
	}, [dispatch, imageId]);

	useEffect(() => {
		if (sessionUser.id === image?.user_id) {
			setEditButtons(true);
		}
	}, [sessionUser.id, image?.user_id]);

	const updateSubmit = async (e) => {
		e.preventDefault();

		const payload = {
			id: image.id,
			caption,
		};

		let res = await dispatch(updateCaption(payload));
		if (res.ok) {
			setEdit(false);
		}
	};

	const onDelete = async () => {
		const toDelete = image.id;

		let res = await dispatch(deleteImage(toDelete));
		if (res.ok) {
			history.push(`/home`);
		}
	};

	const onEdit = () => {
		setEdit(!edit);
	};

	let editDelBtns;
	if (editButtons) {
		editDelBtns = (
			<div>
				<button onClick={onEdit}>Edit</button>
				<button onClick={onDelete}>Delete</button>
			</div>
		);
	}

	let editForm;
	if (edit) {
		editForm = (
			<form onSubmit={updateSubmit}>
				<input
					type="text"
					value={caption}
					onChange={(e) => setCaption(e.target.value)}
				/>
				<button type="submit">Update</button>
				<button onClick={() => setEdit(false)}>Cancel</button>
			</form>
		);
	} else {
		editForm = <p>{image?.caption}</p>;
	}

	if (!image) return null;

	return (
		<>
			<h1>Welcome to the picture</h1>
			<img src={image.image_url} alt={image.caption} />
			<Link to={`/users/${image.user_id}`}>{image.user.username}</Link>
			<LikeButton id={image.id} />
			<p>{image.likes_count} likes</p>
			<p>{image.comments_count} comments</p>
			<div>{editForm}</div>
			<p>
				{newDate[2]} {newDate[1]}, {newDate[3]}
			</p>
			<div>{editDelBtns}</div>
		</>
	);
}

export default ImagePage;
