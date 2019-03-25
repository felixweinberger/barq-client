import React from 'react';

const BarListItem = ({ barData, deleteBar, selectBar }) => (
  <div>
    <h2>{barData.name}</h2>
    <p>{barData._id}</p>
    <button type="submit" onClick={() => deleteBar(barData._id)}>Delete Bar</button>
    <button type="submit" onClick={() => selectBar(barData)}>Select Bar</button>
  </div>
);

export default BarListItem;
