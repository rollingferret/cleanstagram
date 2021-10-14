const ADD_COMMENT = "comments/ADD_COMMENT";
const GET_COMMENTS = "comments/GET_COMMENTS";
const EDIT_COMMENT = "comments/EDIT_COMMENT";
const DEL_COMMENT = "comments/DEL_COMMENT";

const addCommentAction = (comment) => ({
  type: ADD_COMMENT,
  payload: comment,
});

const getAllCommentsAction = (comment) => ({
  type: GET_COMMENTS,
  payload: comment,
});

const editCommentsAction = (comment) => ({
  type: EDIT_COMMENT,
  payload: comment,
});

const delCommentsAction = (comment) => ({
  type: DEL_COMMENT,
  payload: comment,
});

export const getCommentByIdThunk = (imageId) => async (dispatch) => {
  const res = await fetch(`/api/comments/${imageId}`);

  if (res.ok) {
    const query = await res.json();
    dispatch(getAllCommentsAction(query));
  }
};

export const getAllCommentsThunk = () => async (dispatch) => {
  const res = await fetch("/api/comments");

  if (res.ok) {
    const query = await res.json();
    dispatch(getAllCommentsAction(query));
  }
};

export const addCommentThunk = (comment) => async (dispatch) => {
  const res = await fetch("/api/comments/new", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(comment),
  });

  if (res.ok) {
    const new_comment = await res.json();

    dispatch(addCommentAction(new_comment));

    return { ok: true };
  }
};

export const updateCommentThunk =
  ({ id, content }) =>
  async (dispatch) => {
    const res = await fetch(`/api/comments/edit/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ content }),
    });

    if (res.ok) {
      const query = await res.json();
      dispatch(editCommentsAction(query));
      return { ok: true };
    }
  };

export const delCommentThunk = (commentId) => async (dispatch) => {
  const res = await fetch(`/api/comments/delete/${commentId}`, {
    method: "DELETE",
  });

  if (res.ok) {
    const query = await res.json();
    dispatch(delCommentsAction(query));
    return { ok: true };
  }
};

const initialState = {};

export default function reducer(state = initialState, action) {
  let newState;
  switch (action.type) {
    case ADD_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case GET_COMMENTS:
      newState = Object.assign({}, state);
      newState = action.payload;
      return newState;
    case EDIT_COMMENT:
      newState = Object.assign({}, state);
      newState[action.payload.id] = action.payload;
      return newState;
    case DEL_COMMENT:
      newState = Object.assign({}, state);
      delete newState[action.payload.id];
      return newState;
    default:
      return state;
  }
}
