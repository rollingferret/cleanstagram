import { useHistory } from "react-router";
import { useDispatch, useSelector } from "react-redux";

import { login } from "../../store/session";
import LoginForm from "../auth/LoginForm";
import LoginFormPageCSS from './LoginFormPage.css'

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
    <div className="login_form_main_container">
    <div>
      <LoginForm />
    </div>
    <div className="login_form_inner_container_bot">
    <div className="login_form_demo_user_container">
      <button onClick={demoUser}>Demo User</button>
    </div>
    </div>
    </div>
    </>
  );
};

export default LoginFormPage;
