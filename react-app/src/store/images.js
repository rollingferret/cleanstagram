const ADD_IMAGE = 'images/ADD_IMAGE';
const GET_IMAGE = 'images/GET_IMAGE';

const add = (image) => ({
	type: ADD_IMAGE,
	image,
});

const get = (image) => ({
	type: GET_IMAGE,
	image,
});

export const addImage = (formData) => async () => {
	// const { caption, image } = formData

	const res = await fetch('/api/images', {
		method: 'POST',
		body: formData,
	});

	if (res.ok) {
		// TODO: Finish stores/reducer
		// dispatch(add());

		return { ok: true };
	}
};

export const getImageById = (imageId) => async (dispatch) => {
	const res = await fetch(`/api/images/${imageId}`);

	if (res.ok) {
		const query = await res.json();
		dispatch(get(query));
	}
};

const initialState = { images: null, currentImage: null };

export default function reducer(state = initialState, action) {
	let newState;
	switch (action.type) {
		case ADD_IMAGE:
			return;
		case GET_IMAGE:
			newState = Object.assign({}, state);
			newState.currentImage = action.payload;
			return newState;
		default:
			return state;
	}
}
