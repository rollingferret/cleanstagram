import React from "react";
import { Link } from "react-router-dom";
import splash_page from "./splash_page.css";
import LoginFormPage from "../LoginFormPage";
import phoneborder from '../../assets/images/phoneborder.png'
import logo from '../../assets/images/CleanstaGram.png'

function SplashPage() {

    //test
    return (
        <>
        <div className="splashpage_container_main">
        <div className="splashpage_container_main_left" style={{backgroundImage: `url(${phoneborder})`}}>
        </div>
        <div className="splashpage_container_main_right">
            <div className="splashpage_container_logo" style={{backgroundImage: `url(${logo})`}}></div>
            {/* <div class="fas fa-chevron-circle-left"></div>
            <div class="fas fa-chevron-circle-right"></div> */}
            <LoginFormPage />
            <Link className="splash_page_link_to_sign_up" to='/sign-up'>Click here to Sign Up!</Link>
        </div>
        </div>
        </>
    );
}

export default SplashPage;
