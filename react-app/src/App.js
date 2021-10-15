import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch, Redirect } from "react-router-dom";
import { useDispatch } from "react-redux";
import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import ImageForm from "./components/ImageForm";
import ProfilePage from "./components/ProfilePage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import ImagePage from "./components/ImagePage";
import Results from "./components/Results"
import SplashPage from "./components/SplashPage"
import ErrorPage from "./components/ErrorPage"
import { loadImages } from "./store/images";

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
    return null;
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
          {/* home page if logged in show photo feed */}
          <NavBar />
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/images/:imageId">
          <NavBar />
          <ImagePage />
        </ProtectedRoute>
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
