import React from 'react';

import '../styles/logo.css';

<<<<<<< HEAD
const Logo = ({ title }) => (
  <div className="logo">{ title }</div>
);
=======
const Logo = ({logo}) => {
  return (
    <div className="wrapper">
      <div className="logo">
        <img src={logo}/>
      </div>
    </div>
  );
}
>>>>>>> f0d271fda69a91a068784b9b53e936a01f017e69

export default Logo;
