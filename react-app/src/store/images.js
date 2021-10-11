const ADD_IMAGE = 'images/ADD_IMAGE'

const add = image => ({
    type: ADD_IMAGE,
    image
})

export const addImage = (formData) => async() => {

    // const { caption, image } = formData

    const res = await fetch('/api/images', {
        method: "POST",
        body: formData
    });

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
