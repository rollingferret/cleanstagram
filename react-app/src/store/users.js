const GET_USER = "users/GET_USER";

// actions
const get = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

// thunks
export const getUser = (id) => async (dispatch) => {
  const res = await fetch(`/api/users/${id}`);
  const user = await res.json();
  dispatch(get(user));

  return user;
};

const initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  const newState = Object.assign({}, state);
  switch (action.type) {
    case GET_USER:
      const user = action.payload;
      newState[user.id] = user;
      return newState;
    default:
      return newState;
  }
}
