import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect, useHistory } from "react-router-dom";

import { signUp } from "../../store/session";
import { login } from "../../store/session";

const SignUpForm = () => {
  const [errors, setErrors] = useState([]);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [bio, setBio] = useState("");
  const [profile_url, setProfile_Url] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const history = useHistory();

  const demoUser = async () => {
    await dispatch(login("Demo", "password"));
    history.push("/home");
  };

  const onSignUp = async (e) => {
    e.preventDefault();
    if (password === repeatPassword) {
      const data = await dispatch(signUp(username, email, bio, profile_url, password));
      if (data) {
        setErrors(data);
      }
    } else {
      setErrors(["Password must be the same as confirm password."]);
    }
  };

  const updateUsername = (e) => {
    setUsername(e.target.value);
  };

  const updateEmail = (e) => {
    setEmail(e.target.value);
  };
  
  const updateBio = (e) => {
    setBio(e.target.value);
  };

  const updateProfile_Url = (e) => {
    setProfile_Url(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  const updateRepeatPassword = (e) => {
    setRepeatPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/" />;
  }

  return (
    <>
      <form onSubmit={onSignUp}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div>
          <label>User Name</label>
          <input
            type="text"
            name="username"
            onChange={updateUsername}
            value={username}
            required={true}
          ></input>
        </div>
        <div>
          <label>Bio</label>
          <input
            type="text"
            name="bio"
            onChange={updateBio}
            value={bio}
          ></input>
        </div>
        <div>
          <label>Profile Image</label>
          <input
            type="text"
            name="profile_url"
            onChange={updateProfile_Url}
            value={profile_url}
          ></input>
        </div>
        <div>
          <label>Email</label>
          <input
            type="text"
            name="email"
            onChange={updateEmail}
            value={email}
            required={true}
          ></input>
        </div>
        <div>
          <label>Password</label>
          <input
            type="password"
            name="password"
            onChange={updatePassword}
            value={password}
            required={true}
          ></input>
        </div>
        <div>
          <label>Repeat Password</label>
          <input
            type="password"
            name="repeat_password"
            onChange={updateRepeatPassword}
            value={repeatPassword}
            required={true}
          ></input>
        </div>
        <button type="submit">Sign Up</button>
      </form>
      <button onClick={demoUser}>Demo User</button>
    </>
  );
};

export default SignUpForm;
