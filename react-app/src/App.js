import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";

import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ImageForm from "./components/ImageForm";
import ProfilePage from "./components/ProfilePage";
import SplashPage from "./components/SplashPage";
import { authenticate } from "./store/session";
import ImagePage from "./components/ImagePage";
import Results from "./components/Results";
import ErrorPage from "./components/ErrorPage";
import { loadImages } from "./store/images";
import Feed from "./components/Feed";
import loading from "./loading.module.css";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();
  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      // dispatch thunk to get all images
      await dispatch(loadImages());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return (
      <div className={loading.loading_screen}>
        <img
          src="https://c.tenor.com/wfEN4Vd_GYsAAAAC/loading.gif"
          alt="Loading..."
        ></img>
      </div>
    );
  }

  return (
    <BrowserRouter>
      <Switch>
        <ProtectedRoute path="/add_image" exact={true}>
          <NavBar />
          <ImageForm />
        </ProtectedRoute>
        <Route path="/sign-up" exact={true}>
          <NavBar />
          <SignUpForm />
        </Route>
        <Route path="/users/:userId" exact={true}>
          <NavBar />
          <ProfilePage />
        </Route>
        <Route path="/" exact>
          <SplashPage />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          <NavBar />
          <Feed />
        </ProtectedRoute>
        <Route path="/images/:imageId">
          <NavBar />
          <ImagePage />
        </Route>
        <Route path="/results/:term">
          <NavBar />
          <Results />
        </Route>
        <Route path="/errors">
          <NavBar />
          <ErrorPage />
        </Route>
        <Route>
          <Redirect to="/errors" />
        </Route>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
