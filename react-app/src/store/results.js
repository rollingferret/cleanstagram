const GET_RESULT = 'results/GET_RESULT';

const get = (results) => ({
    type: GET_RESULT,
    payload: results,
});

export const getResults = () => async (dispatch) => {
    const res = await fetch('/api/results');

    if (res.ok) {
        const query = await res.json();
        console.log(query)
        dispatch(get(query));
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState = Object.assign({}, state);
    switch (action.type) {
        case GET_RESULT:
            newState = {...newState, ...action.payload}
            return newState;
        default:
            return state;
    }
}
