import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import { getImageById } from '../../store/images';

function ImagePage() {
	const { imageId } = useParams();
	const dispatch = useDispatch();
	const image = useSelector((state) => state.images.currentImage);

	useEffect(() => {
		dispatch(getImageById(imageId));
	}, [dispatch, imageId]);

	if (!image) return null;

	return (
		<>
			<h1>Welcome to the picture</h1>
			<img src={image.image_url} alt={image.caption} />
			<p>{image.caption}</p>
			<p>{image.user_id}</p>
			<p>{image.created_at}</p>
			<p>{image.likes_count} likes</p>
			<p>{image.comments_count} comments</p>
		</>
	);
}

export default ImagePage;
