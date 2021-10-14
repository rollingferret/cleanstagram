import css from './ImageCard.module.css';

function ImageCard(...props) {
	return (
		<div>
			<div>{props.userName}</div>
			<div>Image Here</div>
			<div>Like Comment Buttons Div</div>
			<div>{props.caption}</div>
			<div>First Three Comments Div</div>
			<div>Add A Coment Div (Textbox + Button)</div>
		</div>
	);
}

export default ImageCard;
