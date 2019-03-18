import React from 'react';

import '../styles/logo.css';

const Logo = ({ logo }) => (
  <div className="wrapper">
    <div className="logo">
      <img src={logo} alt="logo" />
    </div>
  </div>
);

export default Logo;
