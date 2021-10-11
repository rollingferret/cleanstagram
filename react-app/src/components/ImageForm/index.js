import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { addImage } from '../../store/images'

import css from './ImageForm.module.css'

function ImageForm() {
    const history = useHistory();
    const dispatch = useDispatch();

    const [caption, setCaption] = useState("");
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // const formData = new FormData();
        // formData.append("image_url", image);
        // formData.append("caption", caption);

        const payload = {
            "image": image,
            "caption": caption
        }

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const response = await dispatch(addImage(payload))
        if (response.ok) {
            return history.push('/')
        } else {
            return "WE HIT AN ERROR"
        }

    }


    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }


    return (
        <>
            <form onSubmit={handleSubmit}
                className={css.container}
            >
                <div>
                    <label>Add Image</label>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={updateImage}
                    />
                </div>
                <div>
                    <label>Caption</label>
                    <input
                        type="text"
                        value={caption}
                        onChange={(e) => setCaption(e.target.value)}
                    />
                </div>
                <button type="submit">Submit</button>
                {(imageLoading) && <p>Loading...</p>}
            </form>
        </>
    )
}

export default ImageForm;
