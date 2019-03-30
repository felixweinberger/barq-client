import React from 'react';

import '../styles/primaryHead.css';


const primaryHead = ({ title, style }) => (
  <h1 style={style} className="primary-head">{title}</h1>
);

export default primaryHead;
