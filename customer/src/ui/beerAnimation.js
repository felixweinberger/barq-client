import React from 'react';

import '../styles/beerAnimation.css';

// Many thanks to @herrbertling for this animation

const BeerAnimation = () => (
  <div className="wrapper">
    <div className="glass-wrapper">
      <div className="glass">
        <div className="beer">
          <div className="foam">
            <span className="foambubble" />
            <span className="foambubble" />
            <span className="foambubble" />
            <span className="foambubble" />
            <span className="foambubble" />
          </div>
          <div className="bubbles">
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
            <span className="bubble" />
          </div>
        </div>
      </div>
      <div className="foamtop">
        <span className="ft-bubble" />
        <span className="ft-bubble" />
        <span className="ft-bubble" />
        <span className="ft-bubble" />
      </div>
      <div className="coaster" />
    </div>
  </div>
);

export default BeerAnimation;
