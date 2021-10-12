import React, { useState, useEffect } from "react";
import { BrowserRouter, Route, Switch } from "react-router-dom";
import { useDispatch } from "react-redux";

import SignUpForm from "./components/auth/SignUpForm";
import NavBar from "./components/NavBar";
import ProtectedRoute from "./components/auth/ProtectedRoute";
import UsersList from "./components/UsersList";
import User from "./components/User";
import ImageForm from "./components/ImageForm";
import ProfilePage from "./components/ProfilePage";
import LoginFormPage from "./components/LoginFormPage";
import { authenticate } from "./store/session";
import ImagePage from "./components/ImagePage";

function App() {
  const [loaded, setLoaded] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    (async () => {
      await dispatch(authenticate());
      setLoaded(true);
    })();
  }, [dispatch]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <ProtectedRoute path="/add_image" exact={true}>
          <ImageForm />
        </ProtectedRoute>
        <Route path="/sign-up" exact={true}>
          <SignUpForm />
        </Route>
        <ProtectedRoute path="/users" exact={true}>
          <UsersList />
        </ProtectedRoute>
        <Route path="/users/:userId" exact={true}>
          <ProfilePage />
        </Route>
        <Route path="/" exact>
          {/* login form page */}
          <LoginFormPage />
        </Route>
        <ProtectedRoute path="/home" exact={true}>
          {/* home page if logged in show photo feed */}
          <h1>My Home Page</h1>
        </ProtectedRoute>
        <ProtectedRoute path="/images/:imageId">
          <ImagePage />
        </ProtectedRoute>
      </Switch>
    </BrowserRouter>
  );
}

export default App;
