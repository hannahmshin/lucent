import React, { useEffect, useRef } from 'react';
import { Link } from "react-router-dom";
import AppHeader from "../../AppHeader";
import Slider from './Slider.js';
import { loadScript } from '../../utils.js';
import './Settings.css';
import './Slider.css';

let lightElem = null
const shapes = ['circle', 'square']

// adds shape class to light element
const changeShape = (elem, shape) => {
  shapes.forEach(shape => elem.current.classList.remove(shape))
  elem.current.classList.add(shape)
}

function SettingsMenu(props) {

  let lightSpeed = 2;
  const {color, size} = props.state
  const { updateSettings } = props

  const increaseSpeed = () => {
    let lightElem = document.getElementById("elem");
    if (lightSpeed > 1) {
      lightSpeed -= 1;
    }
    lightElem.style = 'animation: ani ' + lightSpeed + 's infinite';
  };

  const decreaseSpeed = () => {
    let lightElem = document.getElementById("elem");
    lightSpeed += 1;
    lightElem.style = 'animation: ani ' + lightSpeed + 's infinite';
  }
  
  // configures showing selection and what shape shoudl be set
  const onClickConfigure = (event) => {
    const el = event.target;

    const shapes = el.parentNode.querySelectorAll('span')
    shapes.forEach(item => {
      item.classList.remove('selected')
    });

    el.classList.add('selected');
    const shape = el.getAttribute('data-shape')
    changeShape(lightElem, shape)
  }

  const onClickColor = (event, update) => {
    onClickConfigure(event);
    updateSettings(update);
  }

  return (
    <section id="settings">
      <section id="settings-configure">
        <h2>Settings</h2>

        <section className="configuration" id="shape">
          <h3>Shape</h3>
          <span className="shape-circle selected" data-shape="circle" onClick={onClickConfigure}></span>
          <span className="shape-square" data-shape="square" onClick={onClickConfigure}></span>
        </section>

        <section className="configuration" id="color">
          <h3>Color</h3>
          <span className="shape-circle white selected" onClick={ e => { onClickColor(e, {color: '#fff'}) }}></span>
          <span className="shape-circle grey"></span>
          <span className="shape-circle blue"></span>
          <span className="shape-circle yellow"></span>
          <span className="shape-circle green"></span>
          <span className="shape-circle red" onClick={e => { onClickColor(e, {color: '#ff4848'}) }}></span>
          <span className="shape-circle black"></span>
        </section>

        <section className="configuration">
          <h3>Size</h3>
          <Slider />
        </section>

        <section className="configuration">
          <h3>Distance</h3>
          <Slider />
        </section>

        <section className="configuration">
          <h3>Speed</h3>
          <Slider />
        </section>

        <section className="configuration" id="audio">
          <h3>Audio</h3>
          <div className="switch">
            <input type="checkbox" id="switch1" className="switch__input" />
            <label htmlFor="switch1" className="switch__label" role="presentation" aria-label="Toggle Audio"></label>
          </div>
        </section>

        <section className="configuration" id="actions">
          <Link to="/preview">
            <button id="preview-btn" className="btn">Preview</button>
          </Link>
        </section>
      </section>

      {loadScript("../../SliderConfig.js")}
    </section>
  );
}


// Settings component
function Settings(props) {
  const {color, size} = props.state
  lightElem = useRef(null)

  useEffect(() => {
    changeShape(lightElem, 'circle')
  })

  return (
    <>
      <AppHeader  content={<SettingsMenu {...props}/>}/>
      <div className="container">
        <div className="path">
          <span id="elem" ref={lightElem} className="shape trail" style={{backgroundColor: color}}></span>
        </div>
      </div>
    </>
  );
}

export default Settings;
