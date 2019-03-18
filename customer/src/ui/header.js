import React from 'react';

import SecondaryButton from './secondaryButton';

import '../styles/header.css';

const Header = ({ buttonName, onClick }) => (
  <div className="header">
    <SecondaryButton title={buttonName} onClick={onClick} />
  </div>
);

export default Header;
