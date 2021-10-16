import React from "react";
import { Link } from "react-router-dom";
import splash_page from "./splash_page.css";
import LoginFormPage from "../LoginFormPage";
import phoneborder from '../../assets/images/phoneborder.png'
import logo from '../../assets/images/CleanstaGram.png'
import logoBig from '../../assets/images/cleanstagramBig.png'
import animatedLogo from '../../assets/images/cleanstagramBig.gif'
import githublogo from '../../assets/images/github.png'

function SplashPage() {

    //test
    return (
        <>
        <div className="splashpage_container_main">
        <div>
        <div className="splashpage_container_main_left" style={{backgroundImage: `url(${phoneborder})`}}>
        <div className='carousel'>
        <div className='inner_carousel' style={{backgroundImage: `url(https://cleanstagram.s3.amazonaws.com/d8183d8e9fcc4484b3656b060f9665f6.jpg)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://cleanstagram.s3.amazonaws.com/385692a0d7df4522a758e55beb106d93.jpg)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://cleanstagram.s3.amazonaws.com/7bcb7dd1ca1e41579d8fd36f8abfb668.jpg)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://cleanstagram.s3.amazonaws.com/a8b78c941d0d49a59ee18252dca056fb.jpg)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://cleanstagram.s3.amazonaws.com/2a52403dbff841b69bc954e20aef1997.jpg)`}}></div>
        </div>
        </div>
        </div>
        <div className="splashpage_container_main_right">
            <div className="splashpage_container_inner_right">
                            <div className="splashpage_container_logo"></div>

            {/* <div className="splashpage_container_logo" style={{backgroundImage: `url(${logoBig})`}}></div> */}
            {/* <div class="fas fa-chevron-circle-left"></div>
            <div class="fas fa-chevron-circle-right"></div> */}
            <LoginFormPage />
            </div>
            <Link className="splash_page_link_to_sign_up" to='/sign-up'>Click here to Sign Up!</Link>
        </div>
        <div className="splashpage_container_footer">
            <div className="splashpage_container_footer_buffer"></div>
            <a link href="https://github.com/taylor-b-02" className='githubfooter'>Taylor Barnabic</a>
            <a link href="https://github.com/Xalyume" className='githubfooter'>William Jang</a>
            {/* <img src={githublogo}></img> */}
            <a link href="https://github.com" className="splashpage_github_logo" style={{backgroundImage: `url(${githublogo})`}}></a>
            <a link href="https://github.com/rollingferret" className='githubfooter'>Peter Joh</a>
            <a link href="https://github.com/kennethmanhonglee" className='githubfooter'>Kenneth Lee</a>
            <div className="splashpage_container_footer_buffer"></div>
        </div>
        </div>
        </>
    );
}

export default SplashPage;
