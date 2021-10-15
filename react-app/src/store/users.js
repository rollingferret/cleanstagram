const GET_USERS = "users/GET_USERS";
const FOLLOW_USER = "users/FOLLOW_USERS";
const UNFOLLOW_USER = "users/UNFOLLOW_USERS";

// actions
const get = (users) => {
  return {
    type: GET_USERS,
    payload: users,
  };
};

const followUser = (follower, following) => {
  return {
    type: FOLLOW_USER,
    payload: {
      follower,
      following,
    },
  };
};

const unfollowUser = (follower, following) => {
  return {
    type: UNFOLLOW_USER,
    payload: {
      follower,
      following,
    },
  };
};

// thunks
export const getUsers = () => async (dispatch) => {
  const res = await fetch("/api/users");
  const users = await res.json();
  dispatch(get(users));

  return users;
};

export const follow_user = (userId) => async (dispatch) => {
  const res = await fetch(
    `${window.location.origin}/api/users/${userId}/follow`
  );
  if (res.ok) {
    const { follower, following } = await res.json();
    await dispatch(followUser(follower, following));
  }
};

export const unfollow_user = (userId) => async (dispatch) => {
  const res = await fetch(
    `${window.location.origin}/api/users/${userId}/follow`,
    {
      method: "DELETE",
    }
  );
  if (res.ok) {
    const { follower, following } = await res.json();
    await dispatch(unfollowUser(follower, following));
  }
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
    case FOLLOW_USER:
      const { follower, following } = action.payload;
      newState[follower.id] = follower;
      newState[following.id] = following;
      return newState;
    case UNFOLLOW_USER:
      const { follower: unfollower, following: unfollowing } = action.payload;
      newState[unfollower.id] = unfollower;
      newState[unfollowing.id] = unfollowing;
      return newState;
    default:
      return newState;
  }
}
