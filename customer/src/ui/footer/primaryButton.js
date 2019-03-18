import React from 'react';

import '../../styles/primaryButton.css';

const PrimaryButton = ({
  title, onClick, loading, loadText, styles,
}) => (
  <input
    type="submit"
    className="primaryButton"
    value={!loading ? title : (loadText || 'Loading...')}
    onClick={onClick}
    styles={{ ...styles }}
  />
);

export default PrimaryButton;
