import React from 'react';

import '../styles/text.css';

const text = ({ content, style }) => (
  <p className="text" style={style}>{content}</p>
);

export default text;
