import React from 'react';

function Settings() {
  let lightSpeed = 2;

  const increaseSpeed = () => {
    const lightElem = document.getElementById("elem");
    if (lightSpeed > 1) {
      lightSpeed -= 1;
    }
    lightElem.style = 'animation: ani ' + lightSpeed + 's infinite';
  };


  const decreaseSpeed = () => {
    const lightElem = document.getElementById("elem");
    lightSpeed += 1;
    lightElem.style = 'animation: ani ' + lightSpeed + 's infinite';
  }

  return (
    <section id="settings">
      <section id="settings-configure">
        <h2>Settings</h2>

        <section className="configuration">
          <h3>Shape</h3>
          <span className="shape-circle"></span>
        </section>

        <section className="configuration">
          <h3>Color</h3>
        </section>

        <section className="configuration">
          <h3>Size</h3>
        </section>

        <section className="configuration">
          <h3>Distance</h3>
        </section>

        <section className="configuration">
          <h3>Speed</h3>

          <button id="increase-speed" onClick={increaseSpeed}> + Increase speed</button>
          <button id="decrease-speed" onClick={decreaseSpeed}> - Decrease speed</button>
        </section>

        <section className="configuration">
          <h3>Audio</h3>
        </section>
      </section>


      <div className="container">
        <div className="path">
          <span id="elem" className="shape trail"></span>
        </div>
      </div>
    </section>
  );
}

export default Settings;
