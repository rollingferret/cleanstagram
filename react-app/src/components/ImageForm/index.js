import React, { useState } from "react";
import { useHistory, Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addImage } from "../../store/images";

import css from "./ImageForm.module.css";

function ImageForm() {
  const sessionUser = useSelector((state) => state.session.user);

  const history = useHistory();
  const dispatch = useDispatch();

  const [caption, setCaption] = useState("");
  const [image, setImage] = useState(null);
  const [imageLoading, setImageLoading] = useState(false);
  const [error, setError] = useState("");
  const [imageFile, setImageFile] = useState("Current Image: ")

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("caption", caption);
    formData.append("user_id", sessionUser.id);

    // aws uploads can be a bit slow—displaying
    // some sort of loading message is a good idea
    setImageLoading(true);
    let res = await dispatch(addImage(formData));
    if (res.ok) {
      setImageLoading(false);
      return history.push(`/images/${res.id}`);
    } else {
      setImageLoading(false);
      // res returns an errors stirng, display it
      const { errors } = res;
      setError(errors);
      return;
    }
  };

  const updateImage = (e) => {
    const file = e.target.files[0];
    setImage(file);
    const path = e.target.value.split("\\")
    const fileName = path[path.length - 1]
    setImageFile("Current Image: " + fileName)
  };

  return (
    <div className={css.form_page_body}>
      <form onSubmit={handleSubmit} className={css.container}>
        <div className={css.container_logo} />
        <h3>Make a Post</h3>
        {error && <h3 className={css.error}>{error}</h3>}
        <div className={css.add_image}>
          <div className={css.add_image_label}>
            <label className={`fas fa-plus ${css.file_input}`}
              for="pic_upload"
            ></label>
          </div>
          <div>
            <input
              className={css.file_input}
              id="pic_upload"
              type="file"
              accept="image/*"
              onChange={updateImage}
            />
          </div>
        </div>
        <div className={css.img_file}>{imageFile}</div>
        <div>
          <textarea
            type="text"
            value={caption}
            onChange={(e) => setCaption(e.target.value)}
            className={css.caption_text}
            placeholder="Add a caption..."
          />
        </div>
        <div>
          <button type="submit"
            className={css.btns}
          >Share</button>
          <Link to="/"
            className={css.btns}
          >Cancel</Link>
          {imageLoading && <p>Loading...</p>}
        </div>
      </form>
    </div>
  );
}

export default ImageForm;
