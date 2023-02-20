import React, { useState } from "react";
import { Link, NavLink } from "react-router-dom";
import "./Header.css";
import "../theme.css";
// LEVEL2
import { useContext } from "react";
import ThemeContext from "../context/ThemeContext";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "../firebase/config";
import { signOut } from "firebase/auth";
import { useTranslation } from 'react-i18next';


const Header = () => {
  const [user] = useAuthState(auth);
  const { t, i18n } = useTranslation();
  // const [checkicon,setcheckicon] = useState(true)

  const { theme, toggleTheme } = useContext(ThemeContext);
  return (
    <div className="myheader">
      <header className="hide-when-mobile ali ">
        <h1>
          <Link to="/"> c4a.dev </Link>
        </h1>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-moon"
        ></i>
        <i
          onClick={() => {
            toggleTheme(theme === "Light" ? "Dark" : "Light");
          }}
          className="fa-solid fa-sun"
        ></i>

        <ul className="flex">
          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signin">
                {t("signin")}
              </NavLink>
            </li>
          )}

          {!user && (
            <li className="main-list">
              <NavLink className="main-link" to="/signup">
                {t('signup')}
              </NavLink>
            </li>
          )}

          {user && (
            <>
              <li className="language main-list">
                {t("lang")}
                <ul className="dropdown">
                  <li onClick={()=>{
                    i18n.changeLanguage("ar");
                  }} dir="rtl">
                    <p>العربيه</p>
                    {i18n.language === "ar" && <i className="fa-solid fa-check"></i>}
                  </li>
                  <li onClick={()=>{
                    i18n.changeLanguage("en")}} >
                    English {i18n.language === "en" && <i className="fa-solid fa-check"></i>}
                  </li>
                  <li onClick={()=>{
                    i18n.changeLanguage("fr")}}>
                    France {i18n.language === "fr" && <i className="fa-solid fa-check"></i>}
                  </li>
                </ul>
              </li>

              <li
                onClick={() => {
                  signOut(auth)
                    .then(() => {
                      console.log("Sign-out successful.");
                    })
                    .catch((error) => {
                      // An error happened.
                    });
                }}
                className="main-list"
              >
                <button className="main-link signout">
                


                {t('signout')}

                </button>
              </li>

              <li className="main-list">
                <NavLink className="main-link" to="/about">
                  {t("support")
}                </NavLink>
              </li>

              <li className="main-list">
                <NavLink className="main-link" to="/profile">
                  {t("profile")}
                </NavLink>
              </li>
            </>
          )}
        </ul>
      </header>
    </div>
  );
};

export default Header;
