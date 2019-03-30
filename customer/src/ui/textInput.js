import React from 'react';

import '../styles/textInput.css';

const TextInput = ({ title, value, onChange }) => (
  <div className="input">
    <h3 className="input__title">{title}</h3>
    <textarea
      className="input__input"
      onChange={onChange}
      value={value}
    />
  </div>
);

export default TextInput;
