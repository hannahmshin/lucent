import React, { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import AppHeader, { toggleMenu } from "../../AppHeader";
import Slider from "./Slider.js";
import { loadScript } from "../../utils.js";
import "./Settings.css";
import "./Slider.css";

let lightElem = null;
const SHAPES = ["circle", "square"];
const COLORS = ["red", "blue", "yellow", "green", "black", "grey", "white"];

// adds shape class to light element
const changeShape = (elem, shape) => {
  SHAPES.forEach((shape) => elem.current.classList.remove(shape));
  elem.current.classList.add(shape);
};

const changeColor = (elem, color) => {
  COLORS.forEach((color) => elem.current.classList.remove(color));
  elem.current.classList.add(color);
};

// configures showing selection and what shape should be set
const highlightSelector = (event) => {
  const el = event.target;

  const settingsItems = el.parentNode.querySelectorAll("span");
  settingsItems.forEach((item) => {
    item.classList.remove("selected");
  });
  el.classList.add("selected");
};

function SettingsColor(props) {
  const { updateSettings } = props;
  const settingsColorHtml = COLORS.map((color, index) => {
    return (
      <span
        className={"shape-circle " + color}
        onClick={(event) => {
          highlightSelector(event);
          changeColor(lightElem, color);
          updateSettings({ color: color });
        }}
      ></span>
    );
  });

  return settingsColorHtml;
}

function SettingsMenu(props) {
  let lightSpeed = 2;
  const { color, size } = props.state;
  const { updateSettings } = props;

  const increaseSpeed = () => {
    let lightElem = document.getElementById("elem");
    if (lightSpeed > 1) {
      lightSpeed -= 1;
    }
    lightElem.style = "animation: ani " + lightSpeed + "s infinite";
  };

  const decreaseSpeed = () => {
    let lightElem = document.getElementById("elem");
    lightSpeed += 1;
    lightElem.style = "animation: ani " + lightSpeed + "s infinite";
  };

  const onClickColor = (event, update) => {
    highlightSelector(event);
    updateSettings(update);
  };

  return (
    <section id="settings">
      <section id="settings-configure">
        <h2>Settings</h2>

        <section className="configuration" id="shape">
          <h3>Shape</h3>
          <span
            className="shape-circle selected"
            data-shape="circle"
            onClick={(event) => {
              highlightSelector(event);
              changeShape(lightElem, "circle");
              updateSettings({ shape: "circle" });
            }}
          ></span>
          <span
            className="shape-square"
            data-shape="square"
            onClick={(event) => {
              highlightSelector(event);
              changeShape(lightElem, "square");
              updateSettings({ shape: "square" });
            }}
          ></span>

          <span className="shape-triangle"></span>
        </section>

        <section className="configuration" id="color">
          <h3>Color</h3>
          {<SettingsColor {...props} />}
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
            <label
              htmlFor="switch1"
              className="switch__label"
              role="presentation"
              aria-label="Toggle Audio"
            ></label>
          </div>
        </section>

        <section className="configuration" id="actions">
          <Link to="/preview">
            <button id="preview-btn" className="btn">
              Preview
            </button>
          </Link>
        </section>
      </section>

      {loadScript("../../SliderConfig.js")}
    </section>
  );
}

// Settings component
function Settings(props) {
  const { color, size, shape } = props.state;
  lightElem = useRef(null);

  // runs whenever values in array change
  useEffect(() => {
    // use color and shape from properties passed into state
    changeShape(lightElem, shape);
    changeColor(lightElem, color);
  }, [shape, color]);

  // run only once after first render
  useEffect(() => {
    // @todo update menu api for open/close
    toggleMenu();
  }, []);

  return (
    <>
      <AppHeader content={<SettingsMenu {...props} />} />
      <div className="container">
        <div className="path">
          <span id="elem" ref={lightElem} className="shape trail"></span>
        </div>
      </div>
    </>
  );
}

export default Settings;
