const ADD_COMMENT = 'comments/ADD_COMMENT';
const GET_COMMENT = 'comments/GET_COMMENT';
const GET_COMMENTS = 'comments/GET_COMMENTS';
const EDIT_COMMENT = 'comments/EDIT_COMMENT';
const DEL_COMMENT = 'comments/DEL_COMMENT';

const addCommentAction = (comment) => ({
    type: ADD_COMMENT,
    payload: comment,
});

const getCommentAction = (comment) => ({
    type: GET_COMMENT,
    payload: comment,
});

const getAllCommentsAction = (comment) => ({
    type: GET_COMMENTS,
    payload: comment,
});

const editCommentsAction = (comment) => ({
    type: EDIT_COMMENT,
    payload: comment
})

const delCommentsAction = (comment) => ({
    type: DEL_COMMENT,
    payload: comment,
});

export const getCommentByIdThunk = (commentId) => async (dispatch) => {
    const res = await fetch(`/api/comments/${commentId}`);

    if (res.ok) {
        const query = await res.json();
        dispatch(getCommentAction(query));
    }
};

export const getAllCommentsThunk = () => async (dispatch) => {
    const res = await fetch('/api/comments');

    if (res.ok) {
        const query = await res.json();
        dispatch(getAllCommentsAction(query));
    }
};

export const addCommentThunk = (formData) => async (dispatch) => {

    const res = await fetch('/api/comments/new', {
        method: 'POST',
        body: formData,
    });

    if (res.ok) {

        const new_comment = await res.json();

        dispatch(addCommentAction(new_comment));

        return { ok: true, id: new_comment.id };
    }
};

export const updateCommentThunk = ({commentId, comment}) => async (dispatch) => {
    const res = await fetch(`/api/images/${commentId}`, {
        method: "PATCH",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({comment})
    });

    if (res.ok) {
        const query = await res.json();
        dispatch(editCommentsAction(query));
        return { ok: true }
    }
}

export const delCommentThunk = (commentId) => async (dispatch) => {

    const res = await fetch(`/api/comments/delete/${commentId}`, {
        method: "DELETE",
    });

    if (res.ok) {
        const query = await res.json();
        dispatch(delCommentsAction(query));
        return { ok: true }
    }
};

const initialState = {};

export default function reducer(state = initialState, action) {
    let newState;
    switch (action.type) {
        case ADD_COMMENT:
            newState = Object.assign({}, state);
            newState[action.id] = action.payload;
            newState.currentComment = action.payload;
            return newState;
        case GET_COMMENT:
            newState = Object.assign({}, state);
            newState.currentComment = action.payload;
            return newState;
        case GET_COMMENTS:
            newState = Object.assign({}, state);
            newState.currentComment = action.payload;
            return newState;
        case EDIT_COMMENT:
            newState = Object.assign({}, state);
            newState["currentComment"] = action.payload;
            return newState;
        case DEL_COMMENT:
            newState = Object.assign({}, state);
            delete newState["currentComment"]
            return newState;
        default:
            return state;
    }
}