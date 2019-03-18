import React from 'react';

import PrimaryButton from './primaryButton';
import SecondaryButton from './secondaryButton';

import '../../styles/footer.css';

const Footer = ({
  primaryButtonName,
  onPrimaryClick,
  secondaryButtonName,
  onSecondaryClick,
}) => (
  <div className="footer">
    {
      onSecondaryClick
      && <SecondaryButton title={secondaryButtonName} onClick={onSecondaryClick} />
    }
    <PrimaryButton title={primaryButtonName} onClick={onPrimaryClick} />
  </div>
);

export default Footer;
