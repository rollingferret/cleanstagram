import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Redirect } from "react-router-dom";
import { login } from "../../store/session";
import styles from "./LoginForm.module.css";

const LoginForm = () => {
  const [errors, setErrors] = useState({});
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

  const enabled_submit = login_param && password;

  return (
    <div className={styles.authloginform_outter_container}>
      <form onSubmit={onLogin}>
        {/* <div className={styles.authloginform_errors}>
          {errors.map((error, ind) => (
            <div key={ind}>{error}</div>
          ))}
        </div> */}
        <div className={styles.authloginform_inner_container}>
          <div>
            <input
              name="login_param"
              type="text"
              placeholder="Username or Email"
              value={login_param}
              onChange={updateLoginParam}
              className={styles.input_div}
            />
            {errors && <p className={styles.errors}>{errors["login_param"]}</p>}
          </div>
          <div>
            <input
              name="password"
              type="password"
              placeholder="Password"
              value={password}
              onChange={updatePassword}
              className={styles.input_div}
            />
            {errors && <p className={styles.errors}>{errors["password"]}</p>}
          </div>
          <div>
            <button
              className={`${styles.button} ${
                enabled_submit ? null : styles.disabled
              }`}
              disabled={!enabled_submit}
              type="submit"
            >
              Login
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
