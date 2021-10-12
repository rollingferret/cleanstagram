import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import { getImageById } from '../../store/images';

function ImagePage() {
	const { imageId } = useParams();
	const dispatch = useDispatch();
	const image = useSelector((state) => state.images.currentImage);

	const newDate = image?.created_at.split(" ")

	useEffect(() => {
		dispatch(getImageById(imageId));
	}, [dispatch, imageId]);


	if (!image) return null;

	return (
		<>
			<h1>Welcome to the picture</h1>
			<img src={image.image_url} alt={image.caption} />
			<p>{image.caption}</p>
			<Link to={`/users/${image.user_id}`}>{image.user.username}</Link>
			<p>{newDate[2]} {newDate[1]}, {newDate[3]}</p>
			<p>{image.likes_count} likes</p>
			<p>{image.comments_count} comments</p>
		</>
	);
}

export default ImagePage;
