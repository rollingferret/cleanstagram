import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { loadFeedThunk } from '../../store/userFeed';
import ImageCard from '../ImageCard/index';

import css from './Feed.module.css';

function Feed() {
	const dispatch = useDispatch();
	const [isLoaded, setIsLoaded] = useState(false);

	const feed = useSelector((state) => state.userFeed);
	console.log(feed);
	useEffect(() => {
		(async () => {
			await dispatch(loadFeedThunk());
		})();
		setIsLoaded(true);
	}, [dispatch]);

	if (!isLoaded) {
		return false;
	}

	const imageCards = Object.values(feed).map((image, idx) => {
		return <ImageCard image={image} key={idx} />;
	});

	console.log(imageCards);
	return (
		<>
			<p className={css.my_feed}>My Feed:</p>
			<div className={css['feed-container']}>
				{/* <ImageCard
				image={{
					caption: 'werfjiowefjiowerfjio;rge',
					comments_count: 0,
					created_at: 'Mon, 11 Oct 2021 18:08:31 GMT',
					id: 1,
					image_url:
						'https://cleanstagram.s3.amazonaws.com/97cdcad1963d4d73b38ae057b3bf4581.png',
					likes_count: 0,
					updated_at: 'Mon, 11 Oct 2021 18:08:31 GMT',
					user: {
						bio: null,
						email: 'demo@aa.io',
						followers: [],
						following: [],
						id: 1,
						image_ids: [2, 3, 4, 5, 1],
						profile_url: null,
						username: 'Demo',
					},
					user_id: 1,
				}}
			/>
			<ImageCard /> */}
				{imageCards}
			</div>
		</>
	);
}

export default Feed;
