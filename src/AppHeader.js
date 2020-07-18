import React from "react";
import gsap from "gsap";
import logoUrl from "./static/logo-header.png";
import profilePicUrl from "./static/welcome-back-james.png";
import "./AppHeader.css";
import "./AppHeaderMenu.css";

const timeline = gsap.timeline({ defaults: { duration: 1, ease: "out" } });
let isMenuOpen = false;

const toggleMenu = (event) => {
  const el = document.getElementById("hamburger-menu");
  el.classList.toggle("is-active");
  if (isMenuOpen === true) {
    timeline.to("#client-menu", { x: "0%" });
    isMenuOpen = false;
    console.log(isMenuOpen);
  } else {
    timeline.to("#client-menu", { x: "100%" });
    isMenuOpen = true;
    console.log(isMenuOpen);
  }
};

const AppHeader = ({ content }) => {
  let isActive = false;

  return (
    <>
      <section className="top-header"></section>
      <header className="App-header">
        <section className="leftHeader">
          <div
            id="hamburger-menu"
            className="hamburger hamburger--arrow js-hamburger"
            onClick={toggleMenu}
          >
            <div className="hamburger-box">
              <div className="hamburger-inner"></div>
            </div>
          </div>
          <img className="logo-header" src={logoUrl} alt="LUCENT logo" />
        </section>
        <section className="rightHeader">
          <p id="placeHolder">Welcome back user</p>
          <div className="userContainer">
            <span className="userCircle"></span>
          </div>
          <div id="threeDotMenu" className="threeDot_container">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </section>
        <section className="client-menu" id="client-menu">
          {content}
        </section>
      </header>
    </>
  );
};

export { toggleMenu };
export default AppHeader;
