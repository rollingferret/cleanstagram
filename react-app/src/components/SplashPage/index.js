import React from "react";
import { Link } from "react-router-dom";
import LoginFormPage from "../LoginFormPage";
import phoneborder from "../../assets/images/phoneborder.png";
import githublogo from "../../assets/images/github.png";
// these 4 following lines seem like they were not used, but they are needed
// import logo from "../../assets/images/CleanstaGram.png";
import "./splash_page.css";
import "../../assets/images/cleanstagramBig.png";
import "../../assets/images/cleanstagramBig.gif";
import bunbun from "../../assets/images/bunbun.jpg";
import cat from "../../assets/images/cat.jpg";
import prin from "../../assets/images/princessdoggo.jpg";
import raccoon from "../../assets/images/raccoon.jpg";
import sparkz from "../../assets/images/sparkzwind.jpg";

function SplashPage() {
  //test
  return (
    <>
      <div className="splashpage_container_main">
        <div>
          <div
            className="splashpage_container_main_left"
            style={{ backgroundImage: `url(${phoneborder})` }}
          >
            <div className="carousel">
              <div
                className="inner_carousel"
                style={{
                  backgroundImage: `url(${bunbun})`,
                }}
              ></div>
              <div
                className="inner_carousel"
                style={{
                  backgroundImage: `url(${cat})`,
                }}
              ></div>
              <div
                className="inner_carousel"
                style={{
                  backgroundImage: `url(${prin})`,
                }}
              ></div>
              <div
                className="inner_carousel"
                style={{
                  backgroundImage: `url(${raccoon})`,
                }}
              ></div>
              <div
                className="inner_carousel"
                style={{
                  backgroundImage: `url(${sparkz})`,
                }}
              ></div>
            </div>
          </div>
        </div>
        <div className="splashpage_container_main_right">
          <div className="splashpage_container_inner_right">
            <div className="splashpage_container_logo"></div>
            <LoginFormPage />
          </div>
          <Link className="splash_page_link_to_sign_up" to="/sign-up">
            Click here to Sign Up!
          </Link>
        </div>
        <div className="splashpage_container_footer">
          <div className="splashpage_container_footer_buffer"></div>
          <a href="https://github.com/taylor-b-02" className="githubfooter">
            Taylor Barnabic
          </a>
          <a href="https://github.com/Xalyume" className="githubfooter">
            William Jang
          </a>
          {/* <img src={githublogo}></img> */}
          <a
            href="https://github.com"
            className="splashpage_github_logo"
            style={{
              backgroundImage: `url(${githublogo})`,
              color: "transparent",
            }}
          >
            GitHub Link
          </a>
          <a href="https://github.com/rollingferret" className="githubfooter">
            Peter Joh
          </a>
          <a
            href="https://github.com/kennethmanhonglee"
            className="githubfooter"
          >
            Kenneth Lee
          </a>
          <div className="splashpage_container_footer_buffer"></div>
        </div>
      </div>
    </>
  );
}

export default SplashPage;
