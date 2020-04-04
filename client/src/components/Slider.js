import React from 'react';

const Slider = (props) => {
  let value = 10;

  return (
    <div className="wrapper">
      <input type="range" min="1" max="30" step="1" defaultValue={value} unit="" />
    </div>
  )
};


export default Slider;
