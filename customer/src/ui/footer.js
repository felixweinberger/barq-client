import React from 'react';

import PrimaryButton from './primaryButton';

import '../styles/footer.css';

const Footer = ({ buttonName, onClick }) => (
  <div className="footer">
    <PrimaryButton title={buttonName} onClick={onClick} />
  </div>
);

export default Footer;
