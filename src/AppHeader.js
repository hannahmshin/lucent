import React from "react";
import logoUrl from "./static/logo-header.png";
import profilePicUrl from "./static/welcome-back-james.png";
import "./AppHeader.css";
import "./AppHeaderMenu.css";

const AppHeader = ({ content }) => {
  let isActive = false;

  const toggleMenu = (event) => {
    const el = document.getElementById("hamburger-menu");
    const menuElement = document.getElementById("client-menu");
    el.classList.toggle("is-active");
    menuElement.classList.toggle("change");
  };

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

export default AppHeader;
