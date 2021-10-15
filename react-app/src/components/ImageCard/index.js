import css from './ImageCard.module.css';

function ImageCard(...props) {
	return (
		<div className={css['card-container']}>
			<div className={css['user-container']}>{props.userName}</div>
			<div className={css['image-container']}>Image Here</div>
			<div className={css['btn-container']}>
				<btn className={css['interaction-btn']} id={css.red}></btn>
				<btn className={css['interaction-btn']} id={css.blue}></btn>
			</div>
			<div className={css['like-display-container']}>
				Liked by Bob and 414 others
			</div>
			<div className={css['caption-container']}>{props.caption}</div>
			<div className={css['date-comment-container']}>
				Posted X Hours Ago
			</div>
			<div className={css['add-comment-container']}>
				<form>
					{/* <textarea className={css['comment-input']} /> */}
					<input
						type="text"
						placeholder="Add a comment..."
						className={css['comment-input']}
					/>
					<button type="submit" className={css['comment-btn']}>
						Post
					</button>
				</form>
			</div>
		</div>
	);
}

export default ImageCard;
