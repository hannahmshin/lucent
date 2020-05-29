import React from 'react';
import AppHeader from "../AppHeader";
import Slider from './Slider.js';
import { loadScript } from '../utils.js';
import './Preview.css';
import './Settings.css';
import './Slider.css';

function Preview(props) {
  const {color, size} = props.state

  return (
    <>
      <AppHeader />
      <div id="preview">
        <div className="container">
          <div className="path">
            <span id="elem" className="shape circle trail" style={{backgroundColor: color}}></span>
          </div>
        </div>
      {loadScript("./SliderConfig.js")}
      </div>
    </>
  );
}

export default Preview;
