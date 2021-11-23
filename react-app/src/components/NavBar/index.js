import React, { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import Search from "./Search";
import { useHistory } from "react-router";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  let history = useHistory();
  const onLogout = async (e) => {
    await dispatch(logout()).then(history.push("/"));
  };

  const openMenu = () => {
    if (showMenu) return;
    setShowMenu(true);
  };

  useEffect(() => {
    if (!showMenu) return;

    const closeMenu = () => {
      setShowMenu(false);
    };

    document.addEventListener("click", closeMenu);

    return () => document.removeEventListener("click", closeMenu);
  }, [showMenu]);

  const user_buttons = () => {
    if (currentUser) {
      return (
        <div className={styles.logged_in_buttons}>
          <li>
            <NavLink to="/add_image">
              <i className={`far fa-plus-square ${styles.add_image}`}></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/">
              <i className={`fas fa-home ${styles.home_icon}`}></i>
            </NavLink>
          </li>
          <li>
            <button onClick={openMenu}>
              <i className={`fas fa-user ${styles.profile}`}></i>
            </button>
          </li>
          {showMenu && (
            <div className={`profile-dropdown ${styles.dropdown}`}>
              <ul className={styles.user_menu}>
                <NavLink to={`/users/${currentUser.id}`}>
                  <li>My profile</li>
                </NavLink>
                <button className={styles.button} onClick={onLogout}>
                  Log Out
                </button>
              </ul>
            </div>
          )}
        </div>
      );
    } else if (window.location.pathname !== "/sign-up") {
      return (
        <div className={styles.logged_out_buttons}>
          <li>
            <NavLink to="/sign-up">Sign Up</NavLink>
          </li>
        </div>
      );
    } else if (window.location.pathname === "/sign-up") {
      return <div className={styles.buffer}></div>;
    }
  };

  return (
    <nav className={styles.navbar}>
      <div className={styles.home_button}>
        <li>
          <Link to="/" className={styles.logobackground}></Link>
        </li>
      </div>
      <div>
        <Search />
      </div>
      {user_buttons()}
    </nav>
  );
};

export default NavBar;
