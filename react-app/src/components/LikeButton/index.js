import React, { useEffect, useState, useRef, useContext } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { useParams, Link } from 'react-router-dom';
// import { getLikeAndCommentInfo, checkLikeStatus } from '../../store/images';
import { checkLikeStatus } from '../../store/images';

import css from './LikeComponent.module.css';

function LikeButton({ id }) {
	const dispatch = useDispatch();

	const [isLiked2, setIsLiked2] = useState(false);

	const { isLiked } = useSelector((state) => {
		const likeStatus = state.images[id].isLiked;
		if (isLiked2 !== likeStatus) {
			setIsLiked2(likeStatus);
		}
		return state.images[id];
	});

	useEffect(() => {
		dispatch(checkLikeStatus(id));
	}, [dispatch, id]);

	return (
		<div>
			{isLiked2 ? (
				<button className={css.redlikebutton}>Like</button>
			) : (
				<button className={css.whitelikebutton}>Like</button>
			)}
		</div>
	);
}

export default LikeButton;
