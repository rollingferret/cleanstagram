import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/session";
import LoginForm from "../auth/LoginForm";
import styles from "./LoginFormPage.module.css";

const LoginFormPage = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const user = useSelector((state) => state.session.user);

  const demoUser = async () => {
    await dispatch(login("Demo", "password"));
    history.push("/home");
  };

  if (user) history.push("/home");

  return (
    <>
      <div>placeholder FOR THE STUPID IMAGE LOOOOOOOOOOOOOOOOL</div>
      <LoginForm />
      <button onClick={demoUser}>Demo User</button>
    </>
  );
};

export default LoginFormPage;
