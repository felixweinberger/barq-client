import React from 'react';

import PrimaryButton from './primaryButton';
import SecondaryButton from './secondaryButton';

import '../../styles/footer.css';

const Footer = ({
  primaryButtonName,
  primaryButtonType,
  primaryButtonClickable = true,
  onPrimaryClick,
  secondaryButtonName,
  onSecondaryClick,
}) => (
  <div className="footer">
    {
      onSecondaryClick
      && <SecondaryButton title={secondaryButtonName} onClick={onSecondaryClick} />
    }
    <PrimaryButton
      title={primaryButtonName}
      onClick={primaryButtonClickable ? onPrimaryClick : null}
      type={primaryButtonType}
    />
  </div>
);

export default Footer;
