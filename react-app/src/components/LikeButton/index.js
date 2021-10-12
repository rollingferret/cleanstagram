import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';

import css from './LikeComponent.module.css';

function LikeButton({ id }) {
	const dispatch = useDispatch();
	const { likeCount, commentCount, isLiked } = useSelector;
	useEffect(() => {
		dispatch(getLikeAndCommentInfo(id));
	}, [dispatch, id]);

	let buttonCSS = css.redlikebutton;

	if (isLiked) {
		buttonCSS = css.whitelikebutton;
	}

	return (
		<div>
			<button className={buttonCSS}>Like</button>
			<div>{likeCount}</div>
			<div>{commentCount}</div>
		</div>
	);
}

export default LikeButton;
