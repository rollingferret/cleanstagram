const ADD_IMAGE = 'images/ADD_IMAGE';
const GET_IMAGE = 'images/GET_IMAGE';
const EDIT_IMAGE = 'images/EDIT_IMAGE';
const DEL_IMAGE = 'images/DEL_IMAGE';
const DISPLAY_LIKED = 'images/DISPLAY_LIKED';
const DISLIKE_IMAGE = 'images/DISLIKE_IMAGE';
const LIKE_IMAGE = 'images/LIKE_IMAGE';

const add = (image) => ({
	type: ADD_IMAGE,
	payload: image,
});

const get = (image) => ({
	type: GET_IMAGE,
	payload: image,
});

const del = (image) => ({
	type: DEL_IMAGE,
	payload: image,
});

const edit = (image) => ({
	type: EDIT_IMAGE,
	payload: image,
});

const displayLikeStatus = (likeStatus) => {
	return {
		type: DISPLAY_LIKED,
		payload: likeStatus,
	};
};

const displayLike = (imageId) => ({
	type: LIKE_IMAGE,
	payload: imageId,
});

const displayDislike = (imageId) => ({
	type: DISLIKE_IMAGE,
	payload: imageId,
});

export const likeImage = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}/like`, {
		method: 'POST',
	});

	if (res.ok) {
		const like = await res.json();
		dispatch(displayLike(like.image_id));
	}
};

export const dislikeImage = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}/dislike`, {
		method: 'DELETE',
	});

	if (res.ok) {
		const dislike = await res.json();
		dispatch(displayDislike(dislike.image_id));
	}
};

export const addImage = (formData) => async (dispatch) => {
	// const { caption, image } = formData

	const res = await fetch('/api/images', {
		method: 'POST',
		body: formData,
	});

	if (res.ok) {
		// TODO: Finish stores/reducer
		const new_image = await res.json();

		dispatch(add(new_image));

		return { ok: true, id: new_image.id };
	}
};

export const getImageById = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}`);

	if (res.ok) {
		const query = await res.json();
		dispatch(get(query));
	}
};

export const deleteImage = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}`, {
		method: 'DELETE',
	});

	if (res.ok) {
		const query = await res.json();
		dispatch(del(query));
		return { ok: true };
	}
};

export const updateCaption = (data) => async (dispatch) => {
	console.log('data id from edit button', data.id);
	const res = await fetch(`/api/images/${data.id}`, {
		method: 'PATCH',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(data.caption),
	});

	console.log('RES FROM BACKEND FLASK', res);

	if (res.ok) {
		const query = await res.json();
		dispatch(edit(query));
		return { ok: true };
	}
};

export const checkLikeStatus = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}/is-liked`);

	if (res.ok) {
		const status = await res.json();
		console.log('STATUS', status);
		// status.id = imageId;
		dispatch(displayLikeStatus(status));
		return status;
	}
};

const initialState = {};

export default function reducer(state = initialState, action) {
	const newState = { ...state };
	switch (action.type) {
		case ADD_IMAGE:
			newState[action.payload.id] = action.payload;
			newState.currentImage = action.payload; //refactor later
			return newState;
		case GET_IMAGE:
			newState.currentImage = action.payload;
			newState[action.payload.id] = action.payload;
			return newState;
		case DEL_IMAGE:
			delete newState['currentImage'];
			return newState;
		case EDIT_IMAGE:
			newState['currentImage']['caption'] = action.payload.caption;
			return newState;
		case DISPLAY_LIKED:
			newState[action.payload.id].isLiked = action.payload.isLiked;
			return newState;
		case DISLIKE_IMAGE:
			newState[action.payload].isLiked = false;
			return newState;
		case LIKE_IMAGE:
			newState[action.payload].isLiked = true;
			return newState;
		default:
			return state;
	}
}
