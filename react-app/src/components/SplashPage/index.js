import React from "react";
import { Link } from "react-router-dom";
import splash_page from "./splash_page.css";
import LoginFormPage from "../LoginFormPage";
import phoneborder from './images/phoneborder.png'

function SplashPage() {

    return (
        <>
        <div className="splashpage_container_main">
        <div className="splashpage_container_main_left" style={{backgroundImage: `url(${phoneborder})`}}>
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
