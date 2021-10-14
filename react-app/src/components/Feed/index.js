import ImageCard from '../ImageCard/index';
import css from './Feed.module.css';

function Feed() {
	return (
		<div className={css['feed-container']}>
			<ImageCard />
		</div>
	);
}

export default Feed;
