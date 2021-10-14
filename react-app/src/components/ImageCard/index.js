import css from './ImageCard.module.css';

function ImageCard(...props) {
	return (
		<div className={css['card-container']}>
			<div className={css['user-container']}>{props.userName}</div>
			<div className={css['image-container']}>Image Here</div>
			<div className={css['btn-container']}>Like Comment Buttons Div</div>
			<div className={css['like-display-container']}>Like Count</div>
			<div className={css['caption-container']}>{props.caption}</div>
			<div className={css['date-comment-container']}>
				First Three Comments Div/Date
			</div>
			<div className={css['add-comment-container']}>Add a Comment</div>
		</div>
	);
}

export default ImageCard;
