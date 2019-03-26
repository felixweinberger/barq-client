import React from 'react';

const BarListItem = ({ barData, deleteBar, selectBar }) => (
  <div className="barListItem">
    <h2>{barData.name}</h2>
    <p>{barData._id}</p>
    <button className="clicker" id="selectBar" type="button" onClick={() => selectBar(barData)}>Select Bar</button>
    <button className="clicker" id="deleteBar" type="button" onClick={() => deleteBar(barData._id)}>Delete Bar</button>
  </div>
);

export default BarListItem;
