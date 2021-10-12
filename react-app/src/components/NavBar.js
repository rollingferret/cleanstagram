import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector } from "react-redux";
import LogoutButton from "./auth/LogoutButton";

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);

  const user_buttons = () => {
    if (currentUser) {
      return (
        <>
          <li>
            <NavLink to="/users" exact={true} activeClassName="active">
              Users
            </NavLink>
          </li>
          <li>
            <LogoutButton />
          </li>
        </>
      );
    } else {
      return (
        <>
          <li>
            <NavLink to="/login" exact={true} activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </>
      );
    }
  };

  return (
    <nav>
      <ul>
        <li>
          <NavLink to="/" exact={true} activeClassName="active">
            Home
          </NavLink>
        </li>
        {user_buttons()}
      </ul>
    </nav>
  );
};

export default NavBar;
