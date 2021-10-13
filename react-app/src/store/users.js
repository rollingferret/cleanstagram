const GET_USER = "users/GET_USER";
const GET_USER_POSTS = "users/GET_USER_POSTS";

// actions
const get = (user) => {
  return {
    type: GET_USER,
    payload: user,
  };
};

const getPosts = () => {
  return {
    // decide what to return to store
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
