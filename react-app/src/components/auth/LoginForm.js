import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [errors, setErrors] = useState([]);
  const [login_param, setLoginParam] = useState("");
  const [password, setPassword] = useState("");
  const user = useSelector((state) => state.session.user);
  const dispatch = useDispatch();

  const onLogin = async (e) => {
    e.preventDefault();
    const data = await dispatch(login(login_param, password));
    if (data) {
      setErrors(data);
    }
  };

  const updateLoginParam = (e) => {
    setLoginParam(e.target.value);
  };

  const updatePassword = (e) => {
    setPassword(e.target.value);
  };

  if (user) {
    return <Redirect to="/home" />;
  }

  return (
    <div className={styles.authloginform_outter_container}>
      <form onSubmit={onLogin}>
        <div>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div>
        <div className={styles.authloginform_inner_container}>
          <div>
            <label htmlFor="login_param">tester</label>
            <input
              name="login_param"
              type="text"
              placeholder="login_param"
              value={login_param}
              onChange={updateLoginParam}
            />
          </div>
          <div>
            <label htmlFor="password">Password</label>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
            />
          </div>
          <div>
            <button type="submit">Login</button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
