import React from 'react';
import logoUrl from './static/logo-header.png'
import './AppHeader.css';
import './AppHeaderMenu.css';

const AppHeader = () => {
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
        <div id="hamburger-menu" className="hamburger hamburger--arrow js-hamburger" onClick={toggleMenu}>
          <div className="hamburger-box">
            <div className="hamburger-inner"></div>
          </div>
        </div>
        <img className="logo-header" src={logoUrl} alt="LUCENT logo" />
        <section className="client-menu" id="client-menu"></section>
      </header>
    </>
  )
};

export default AppHeader;
