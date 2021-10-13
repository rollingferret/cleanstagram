import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { checkLikeStatus } from '../../store/images';

import css from './LikeComponent.module.css';

function LikeButton({ id }) {
	const dispatch = useDispatch();

	const image = useSelector((state) => {
		return state.images[id]
	});

	useEffect(() => {
		dispatch(checkLikeStatus(id));
	}, [dispatch, id]);

	return (
		<div>
			{image && image?.isLiked ? (
				<button className={css.redlikebutton}>Like</button>
			) : (
				<button className={css.whitelikebutton}>Like</button>
			)}
		</div>
	);
}

export default LikeButton;
