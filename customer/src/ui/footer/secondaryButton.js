import React from 'react';

import '../../styles/secondaryButton.css';

const SecondaryButton = ({
  title, onClick, loading, loadText, styles,
}) => (
  <input
    type="submit"
    className="secondaryButton"
    value={!loading ? title : (loadText || 'Loading...')}
    onClick={onClick}
    styles={{ ...styles }}
  />
);

export default SecondaryButton;
