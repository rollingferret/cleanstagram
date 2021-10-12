const ADD_IMAGE = 'images/ADD_IMAGE';
const GET_IMAGE = 'images/GET_IMAGE';

const add = (image) => ({
	type: ADD_IMAGE,
	payload: image,
});

const get = (image) => ({
	type: GET_IMAGE,
	payload: image,
});

export const addImage = (formData) => async (dispatch) => {
	// const { caption, image } = formData

	const res = await fetch('/api/images', {
		method: 'POST',
		body: formData,
	});

	if (res.ok) {
		// TODO: Finish stores/reducer
		const new_image = await res.json();
		console.log(new_image);
		dispatch(add(new_image));

		return { ok: true, id: new_image.id };
	}
};

export const getImageById = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}`);
	console.log('RES', res);
	if (res.ok) {
		const query = await res.json();
		dispatch(get(query));
		return query;
	}
};

// const initialState = { images: null, currentImage: null };
const initialState = {};

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ADD_IMAGE:
			newState = Object.assign({}, state);
			newState[action.payload.id] = action.payload;
			newState.currentImage = action.payload;
			return newState;
		case GET_IMAGE:
			newState = Object.assign({}, state);
			newState[action.payload.id] = action.payload;
			newState.currentImage = action.payload;
			return newState;

		default:
			return state;
	}
}
