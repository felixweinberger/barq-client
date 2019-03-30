import React from 'react';

import '../styles/iconButton.css';

const IconButton = ({
  iconUrl, onClick, width = '2rem', height = '2rem', style,
}) => (
  <input
    type="button"
    onClick={onClick}
    className="icon-button"
    style={{
      backgroundImage: `url(${iconUrl})`,
      height,
      width,
      ...style,
    }}
  />
);

export default IconButton;
