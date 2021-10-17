import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";

import { loadFeedThunk } from "../../store/userFeed";
import ImageCard from "../ImageCard/index";

import css from "./Feed.module.css";

function Feed() {
  const dispatch = useDispatch();
  const [isLoaded, setIsLoaded] = useState(false);
  const currentUser = useSelector((state) => state.session.user);
  let feed;

  feed = useSelector((state) =>
    Object.values(state.userFeed).filter(
      (image) =>
        currentUser?.following.includes(image.user_id) ||
        image.user_id === currentUser.id
    )
  );

  useEffect(() => {
    (async () => {
      await dispatch(loadFeedThunk());
    })();
    setIsLoaded(true);
  }, [dispatch, currentUser.id]);

  if (!isLoaded) {
    return false;
  }

  const imageCards = Object.values(feed).map((image, idx) => {
    return <ImageCard image={image} key={idx} />;
  });

  return (
    <>
      {imageCards.length ? (
        <div className={css["feed-container"]}>{imageCards}</div>
      ) : (
        <div className={css.vertalign}>
        <div className={css.centernoposts}>
        <Link to="/add_image" className={css.noposts}>Start Posting</Link>
        </div>
        </div>
      )}
    </>
  );
}

export default Feed;
