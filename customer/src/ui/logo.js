import React from 'react';

import PrimaryHead from './primaryHead';

import '../styles/logo.css';

const Logo = ({ logoPath, barName }) => (
  <div className="logo">
    <PrimaryHead title={barName} />
    <div
      className="logo__image"
    />
  </div>
);

export default Logo;
