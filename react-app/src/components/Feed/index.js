import ImageCard from '../ImageCard/index';
import css from './Feed.module.css';

function Feed() {
	return (
		<div className={css['feed-container']}>
			<ImageCard
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
			<ImageCard />
		</div>
	);
}

export default Feed;
