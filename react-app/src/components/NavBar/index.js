import React, { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/session";
import Search from "./Search";

import styles from "./NavBar.module.css";

const NavBar = () => {
  const currentUser = useSelector((state) => state.session.user);
  const dispatch = useDispatch();
  const [showMenu, setShowMenu] = useState(false);

  const onLogout = async (e) => {
    await dispatch(logout());
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
            <NavLink to="/add_image" exact={true} activeClassName="active">
              <i className={`far fa-plus-square ${styles.add_image}`}></i>
            </NavLink>
          </li>
          <li>
            <NavLink to="/" exact={true} activeClassName="active">
              <i className={`fas fa-home ${styles.home_icon}`}></i>
            </NavLink>
          </li>
          <li>
            <button onClick={openMenu}>
              <i className={`fas fa-user ${styles.test}`}></i>
            </button>
          </li>
          {showMenu && (
            <div className={`profile-dropdown ${styles.dropdown}`}>
              <ul className={styles.user_menu}>
                <li>
                  <NavLink to={`/users/${currentUser.id}`}>
                    username: {currentUser.username}
                  </NavLink>
                </li>
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
            <NavLink to="/sign-up" exact={true} activeClassName="active">
              Sign Up
            </NavLink>
          </li>
        </div>
      );
    } else if (window.location.pathname === "/sign-up") {
      return <div className={styles.buffer}></div>;
    }
  };

  return (
    <nav className={styles.nav}>
      <div className={styles.navbar}>
        <div className={styles.home_button}>
          <li>
            <a
              href="/"
              exact={true}
              activeClassName="active"
              className={styles.logobackground}
            ></a>
          </li>
        </div>
        <div>
          <Search />
        </div>
        {user_buttons()}
      </div>
    </nav>
  );
};

export default NavBar;
