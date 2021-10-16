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
        <div className='inner_carousel' style={{backgroundImage: `url(https://cdn.pixabay.com/photo/2015/04/04/19/13/one-706897_960_720.jpg)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://fox2now.com/wp-content/uploads/sites/14/2020/02/cropped-FOX2NOW.png)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://images.macrumors.com/t/dWZC3bgM6yoTMTkvYPaxNXvIr5k=/800x0/article-new/2021/01/AirPods-Gen-3-Feature.jpg?lossy)`}}></div>
        <div className='inner_carousel' style={{backgroundImage: `url(https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQL9B8MDp84PJcyb_FK1Yo5JkJg66bvYW-OKg&usqp=CAU)`}}></div>
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
