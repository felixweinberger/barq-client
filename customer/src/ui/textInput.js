import React from 'react';

import '../styles/textInput.css';

const specialWishes = ({ text, addText }) => (
  <div className="input">
    <h3>
      Special Wishes:
      { text }
    </h3>
    <input
      type="text"
      onChange={event => addText(event)}
    />
  </div>
);

export default specialWishes;
