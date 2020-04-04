import React from 'react';

const Slider = (props) => {
  let value = 10;

  return (
    <div className="budget-wrap">
      <div className="content">
        <input type="range" min="1" max="100" defaultValue={value} />
      </div>
    </div>
  )
};


export default Slider;
