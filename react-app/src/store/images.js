const ADD_IMAGE = 'images/ADD_IMAGE'

const add = image => ({
    type: ADD_IMAGE,
    image
})

export const addImage = (payload) => async() => {
    // const { caption, image }

    const res = await fetch('/api/images', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            payload
        }),
    });

    console.log("res in thunk", res)

    if (res.ok) {
        return { ok: true }
    }

}

const initialState = {};

export default function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_IMAGE:
            return
        default:
            return state;
    }
}
