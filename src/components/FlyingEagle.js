import React from 'react';
import './FlyingEagle.css';
import leftWing from '../assets/leftwing.png';
import rightWing from '../assets/rightwing.png';
import body from '../assets/bird.png';

const FlyingEagle = () => {
  return (
    <div className="eagle-container">
      <div className="eagle">
        <img src={leftWing} className="wing left-wing" alt="left wing" />
        <img src={body} className="eagle-body" alt="eagle body" />
        <img src={rightWing} className="wing right-wing" alt="right wing" />
      </div>
    </div>
  );
};

export default FlyingEagle;
