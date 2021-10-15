const LOAD_FEED = 'userFeed/LOAD_FEED';

const load_feed = (images) => {
	return {
		type: LOAD_FEED,
		payload: images,
	};
};

export const loadFeedThunk = () => async (dispatch) => {
	const res = await fetch('/api/images/feed');

	if (res.ok) {
		const feedObject = await res.json();
		const feedArr = feedObject['ordered_feed'];
		await dispatch(load_feed(feedArr));
	}
};

const initialState = {};

export default function reducer(state = initialState, action) {
	let newState = Object.assign({}, state);
	switch (action.type) {
		case LOAD_FEED:
			Object.entries(action.payload).forEach(([id, image]) => {
				newState[id] = image;
			});
			return newState;
		default:
			return state;
	}
}
