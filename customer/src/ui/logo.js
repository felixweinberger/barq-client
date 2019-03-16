import React from 'react';

import '../styles/logo.css';

const Logo = ({logo}) => {
  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo}/>
      </div>
    </div>
  );
}

export default Logo;