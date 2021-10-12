import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { getLikeAndCommentInfo, checkLikeStatus } from '../../store/images';
import { checkLikeStatus } from '../../store/images';

import css from './LikeComponent.module.css';

function LikeButton({ id }) {
	const dispatch = useDispatch();
	// const { likeCount, commentCount, isLiked } = useSelector(
	const { isLiked } = useSelector((state) => state.images[id]);
	const [isLiked2, setIsLiked2] = useState(false);
	// const image = useSelector((state) => state.images[id]);

	useEffect(() => {
		// dispatch(getLikeAndCommentInfo(id));
		dispatch(checkLikeStatus(id));
		setIsLiked2(isLiked);
	}, [dispatch, id, isLiked]);

	return (
		<div>
			{isLiked2 ? (
				<button className={css.redlikebutton}>Like</button>
			) : (
				<button className={css.whitelikebutton}>Like</button>
			)}
		</div>
		// <div>
		// 	{/* <button className={buttonCSS}>Like</button> */}
		// 	{button}
		// 	{/* <div>{likeCount}</div> */}
		// 	{/* <div>{commentCount}</div> */}
		// </div>
	);
}

export default LikeButton;
