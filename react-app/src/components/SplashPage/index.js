import React from "react";
import { Link } from "react-router-dom";
import splash_page from "./splash_page.css";
import LoginFormPage from "../LoginFormPage";


function SplashPage() {

    return (
        <>
        <div className="splashpage_container_main">
        <div className="splashpage_container_main_left">
            <img src="/phoneborder.png" />
        </div>
        <div className="splashpage_container_main_right">
            <h1>We've hit the right side!</h1>
            <LoginFormPage />
        </div>
        </div>
        </>
    );
}

export default SplashPage;
