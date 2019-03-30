import React from 'react';

import '../../styles/primaryButton.css';

const PrimaryButton = ({
  title, onClick, clickable = true, type, style,
}) => (
  <input
    type="submit"
    className={`primary-button--${type || 'success'} ${clickable ? '' : 'noclick'}`}
    onClick={clickable ? onClick : null}
    value={title || 'Submit'}
    style={{ ...style }}
  />
);

export default PrimaryButton;
