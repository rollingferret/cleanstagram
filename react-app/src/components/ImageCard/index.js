import React, { useState } from 'react';
import { Link } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { addCommentThunk } from '../../store/comments';

import css from './ImageCard.module.css';

function ImageCard({ image }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const sessionUser = useSelector((state) => state.session.user);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (content) {
			let comment = {
				user_id: sessionUser.id,
				image_id: image.id,
				content: content,
			};

			let res = await dispatch(addCommentThunk(comment));

			if (res) {
				setContent('');
			} else {
				console.log('error');
			}
		} else {
			console.log('missing content');
		}
	};

	return (
		<div className={css['card-container']}>
			<div className={css['user-container']}>
				<img alt="profile_picture"
				src={image?.user.profile_pic} />
				<Link to={`/users/${image.user.id}`}>
					{image?.user.username}
				</Link>
			</div>
			<div className={css['image-container']}>
				<img
					src={image?.image_url}
					alt={`${image?.user.username}'s pic'`}
					className={css.image}
				/>
			</div>
			<div className={css['btn-container']}>
				{/* <btn className={css['interaction-btn']} id={css.red}></btn> */}
				<i className="far fa-heart"></i>
				<button
					className={css['interaction-button']}
					id={css.blue}
				></button>
			</div>
			<div className={css['like-display-container']}>
				Liked by Bob and 414 others
			</div>
			<div className={css['caption-container']}>{image?.caption}</div>
			<div className={css['date-comment-container']}>
				Posted {image?.created_at}
			</div>
			<div className={css['add-comment-container']}>
				<form onSubmit={handleSubmit}>
					{/* <textarea className={css['comment-input']} /> */}
					<input
						type="text"
						placeholder="Add a comment..."
						className={css['comment-input']}
						value={content}
						onChange={(e) => setContent(e.target.value)}
					/>
					<button type="submit" className={css['comment-btn']}>
						Post
					</button>
				</form>
			</div>
		</div>
	);
}

export default ImageCard;
