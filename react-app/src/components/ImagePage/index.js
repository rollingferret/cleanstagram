import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, useHistory, Link } from 'react-router-dom';

import LikeButton from '../LikeButton/index';
import { getImageById, deleteImage, updateCaption } from '../../store/images';

import imageForm from './ImagePage.module.css';
import GetAllCommentsForSinglePhoto from '../CommentDisplayComponent';
import NewCommentForm from '../NewCommentForm';

function ImagePage() {
	const sessionUser = useSelector((state) => state.session.user);
	const images = useSelector((state) => state.images);
	const history = useHistory();
	const dispatch = useDispatch();
	const { imageId } = useParams();
	const comments = useSelector((state) => state.comments)

	const image = images[imageId]

	let imagefilter = Object.entries(comments).filter(x => x[1].image_id === +imageId)
	let commentlength = Object.keys(imagefilter).length;

	const imagelikes = useSelector((state) => state.images);

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

	if (Object.keys(images).length === 0) {
		return null;
	}
	if (Object.keys(images).length !== 0 && images[imageId] === undefined) {
		history.push("/errors");
	}

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
				<button className={imageForm.btns} onClick={onEdit}>
					Edit
				</button>
				<button className={imageForm.btns} onClick={onDelete}>
					Delete
				</button>
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
		<div className={imageForm.outercontainer}>
			<div className={imageForm.innercontainer}>
				<div className={imageForm.imgcontainer}>
					<img
						className={imageForm.img}
						src={image.image_url}
						alt={image.caption}
					/>
				</div>
				<div className={imageForm.rightcontainer}>
					<div className={imageForm.usercontainer}>
						<Link
							to={`/users/${image.user_id}`}
							className={imageForm.username}
						>
							{image.user.username}
						</Link>
						{editForm}
						{editDelBtns}
					</div>
					<div className={imageForm.commentcontainer}>
						<GetAllCommentsForSinglePhoto imageId={imageId} />
						<NewCommentForm />
					</div>
					<div className={imageForm.likecommentcontainer}>
						<div>
							<LikeButton id={image.id} />
							<span className={imageForm.likecomment}>
								{imagelikes[imageId].likes_count} likes
							</span>
							<span className={imageForm.likecomment}>
								{commentlength} comments
							</span>
						</div>
						<p>
							{newDate[2]} {newDate[1]}, {newDate[3]}
						</p>
					</div>
				</div>
			</div>
		</div>
	);
}

export default ImagePage;
