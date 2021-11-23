import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useParams, useHistory, Link } from "react-router-dom";

import LikeButton from "../LikeButton/index";
import {
  getImageById,
  deleteImage,
  updateCaption,
  checkLikeStatus,
} from "../../store/images";

import styles from "./ImagePage.module.css";
import GetAllCommentsForSinglePhoto from "../CommentDisplayComponent";
import NewCommentForm from "../NewCommentForm";

function ImagePage() {
  const history = useHistory();
  const dispatch = useDispatch();
  const { imageId } = useParams();

  const comments = useSelector((state) => state.comments);
  const sessionUser = useSelector((state) => state.session.user);
  const images = useSelector((state) => state.images);
  let image;
  if (Object.keys(images).length > 0) {
    image = images[imageId];
  }

  const [editButtons, setEditButtons] = useState(false);
  const [edit, setEdit] = useState(false);
  const [caption, setCaption] = useState(image?.caption ? image.caption : "");

  let imagefilter = Object.entries(comments).filter(
    (x) => x[1].image_id === +imageId
  );
  let commentlength = Object.keys(imagefilter).length;

  const newDate = image?.created_at.split(" ");

  useEffect(() => {
    dispatch(getImageById(imageId));
  }, [dispatch, imageId]);

  useEffect(() => {
    dispatch(checkLikeStatus(imageId));
  }, [dispatch, imageId, image]);

  useEffect(() => {
    if (sessionUser?.id) {
      if (sessionUser?.id === image?.user_id) {
        setEditButtons(true);
      }
    }
  }, [sessionUser?.id, image?.user_id]);

  if (Object.keys(images).length === 0) {
    return null;
  }
  if (Object.keys(images).length !== 0 && images[imageId] === undefined) {
    history.push("/errors");
  }

  const updateSubmit = async (e) => {
    e.preventDefault();

    const payload = {
      id: image.id,
      caption,
    };

    let res = await dispatch(updateCaption(payload));
    if (res.ok) {
      setEdit(false);
    }
  };

  const onDelete = async () => {
    const toDelete = image.id;

    let res = await dispatch(deleteImage(toDelete));
    if (res.ok) {
      history.push(`/home`);
    }
  };

  const onEdit = () => {
    setEdit(!edit);
  };

  let editDelBtns;
  if (editButtons) {
    editDelBtns = (
      <div className={styles.edit_delete}>
        <button className={`${styles.btns}`} onClick={onEdit}>
          Edit
        </button>
        <button className={`${styles.btns}`} onClick={onDelete}>
          Delete
        </button>
      </div>
    );
  }

  let editForm;

  if (edit) {
    editForm = (
      <form className={styles.editForm} onSubmit={updateSubmit}>
        <input
          type="text"
          value={caption}
          onChange={(e) => setCaption(e.target.value)}
        />
        <button className={styles.btns} type="submit">
          Update
        </button>
        <button className={styles.btns} onClick={() => setEdit(false)}>
          Cancel
        </button>
      </form>
    );
  } else {
    editForm = <p>{image?.caption}</p>;
  }

  let addComments;
  if (sessionUser) {
    addComments = <NewCommentForm />;
  } else {
    addComments = (
      <div>
        <Link className={styles.login_btn} to="/">
          Log In
        </Link>{" "}
        to post a comment
      </div>
    );
  }

  if (!image) return null;

  return (
    <div className={styles.outercontainer}>
      <div className={styles.innercontainer}>
        <div className={styles.imgcontainer}>
          <div
            style={{
              backgroundImage: `url(${image.image_url})`,
            }}
            className={styles.img}
          ></div>
        </div>
        <div className={styles.rightcontainer}>
          <div className={styles.usercontainer}>
            <div>
              <div className={styles.rowtest}>
                <div
                  alt="user_profile_picture"
                  className={styles.user_profile_pic}
                  style={{ backgroundImage: `url(${image.user.profile_url})` }}
                />
                <Link
                  to={`/users/${image.user_id}`}
                  className={styles.username}
                >
                  {image.user.username}
                </Link>
              </div>
              {editForm}
            </div>
            {editDelBtns}
          </div>
          <div className={styles.commentcontainer}>
            <GetAllCommentsForSinglePhoto imageId={imageId} />
          </div>
          <div className={styles.likecommentcontainer}>
            <div>
              <LikeButton id={image.id} />
              <span className={styles.likecomment}>
                {image.likes_count} likes
              </span>
              <span className={styles.likecomment}>
                {commentlength} comments
              </span>
            </div>
            <p className={styles.dates}>
              {newDate[2]} {newDate[1]}, {newDate[3]}
            </p>
            <div className={styles.new_comment}>{addComments}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ImagePage;
