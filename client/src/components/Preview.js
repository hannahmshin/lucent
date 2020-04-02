import React from 'react';

function Preview() {
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
    <div>
      <h2>Preview</h2>

      <nav>
        <button id="increase-speed" onClick={increaseSpeed}> + Increase speed</button>
        <button id="decrease-speed" onClick={decreaseSpeed}> - Decrease speed</button>
      </nav>

      <div className="container">
        <div className="path">
          <span id="elem" className="shape trail"></span>
        </div>
      </div>

    </div>
  );
}

export default Preview;
