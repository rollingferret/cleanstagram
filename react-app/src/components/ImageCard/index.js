import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import CommentDisplayComponent from '../CommentDisplayComponent';
import LikeButton from '../LikeButton';
import { addCommentThunk } from '../../store/comments';

import css from './ImageCard.module.css';

function ImageCard({ image }) {
	const dispatch = useDispatch();
	const [content, setContent] = useState('');
	const sessionUser = useSelector((state) => state.session.user);
	const updatedAllImages = useSelector((state) => state.images);
	let updatedImageForLikesDisplay;
	if (Object.keys(updatedAllImages).length > 0) {
		updatedImageForLikesDisplay = updatedAllImages[image.id];
	}

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
				//FIXME
				console.log('error');
			}
		} else {
			//FIXME
			console.log('missing content');
		}
	};

	if (!image) {
		return null;
	} else {
		return (
			<div className={css['card-container']}>
				<div className={css['user-container']}>
					<Link
						to={`/users/${image.user.id}`}
						className={css.profilepiclink}
					>
{/* 
style={{ backgroundImage: `url(${githublogo})` }}
image.user.profile_url
									? image.user.profile_url
									: 'https://img.freepik.com/free-vector/cute-welsh-corgi-dog-waving-paw-cartoon_42750-623.jpg?size=338&ext=jpg'
							} */}

						<div
							alt="profile_picture"
							style={{ backgroundImage: `url(${image.user.profile_url})` }}

							className={css.profile_pic}
						/>
					</Link>
					<Link
						to={`/users/${image.user.id}`}
						className={css.link_to_user}
					>
						{image?.user.username}
					</Link>
				</div>
				<div className={css['image-container']}>
					<Link to={`/images/${image.id}`}>
						{/* <div
							style={{
								backgroundImage: `url(${image?.image_url})`,
							}}
							alt={`${image?.user.username}'s pic'`}
							className={css.image}
						/> */}
						<img
							src={image.image_url}
							alt={`${image?.user.username}'s pic'`}
							className={css.image}
						/>
					</Link>
				</div>
				<div className={css['btn-container']}>
					<LikeButton id={image.id} />
					{/* <button className={css["interaction-button"]} id={css.blue}></button> */}
				</div>
				<div className={css['like-display-container']}>
					{/* refactor later! only images slice of state is currently updated, and userFeed likes count is not updated. */}
					{updatedImageForLikesDisplay.likes_count} likes
				</div>
				<div className={css['caption-container']}>
					<Link
						to={`/users/${image.user.id}`}
						className={css.card_name}
					>
						{image?.user.username}
					</Link>{' '}
					{image?.caption}
				</div>
				<div className={css.comment_container}>
					<CommentDisplayComponent imageId={image.id.toString()} />
				</div>
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
}
export default ImageCard;
