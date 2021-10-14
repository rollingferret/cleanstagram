const GET_USERS = "users/GET_USERS";

// actions
const get = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

// thunks
export const getUsers = () => async (dispatch) => {
  const res = await fetch(`/api/users`);
  const users = await res.json();
  dispatch(get(users));

  return users;
};

const initialState = {};

// reducer
export default function reducer(state = initialState, action) {
  let newState = Object.assign({}, state);
  switch (action.type) {
    case GET_USERS:
      const users = action.payload;
      newState = { ...newState, ...users };
      return newState;
    default:
      return newState;
  }
}
