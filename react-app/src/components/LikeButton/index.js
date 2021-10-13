import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLikeStatus } from '../../store/images';

import css from './LikeComponent.module.css';

function LikeButton({ id }) {
	const dispatch = useDispatch();

	const isLiked = useSelector((state) => {
		return state.images[id].isLiked;
	});

	useEffect(() => {
		dispatch(checkLikeStatus(id));
	}, [dispatch, id]);

	return (
		<div>
			{isLiked ? (
				<button className={css.redlikebutton}>Like</button>
			) : (
				<button className={css.whitelikebutton}>Like</button>
			)}
		</div>
	);
}

export default LikeButton;
