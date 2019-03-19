import React from 'react';

import PrimaryHead from './primaryHead';

import '../styles/logo.css';

const Logo = ({ logoPath, barName }) => (
  <div className="logo">
    <PrimaryHead title={barName} />
    <div
      className="logo__image"
      style={{
        backgroundImage: `url(${logoPath})`,
      }}
    />
  </div>
);

export default Logo;
